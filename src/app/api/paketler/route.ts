import { query } from "@/lib/db";
import { NextResponse } from "next/server";

// 📥 LİSTELE
export async function GET() {
  try {
    const data = await query(`
      SELECT 
        p.PaketID,
        p.DnsID,
        p.DanisSeviye,
        p.DanisSure,
        p.DnsSekli,
        p.DnsUcret,
        p.GorusmeTarih,
        p.PaketDurumu,
        d.DnsAdi,
        d.DnsSoyad
      FROM DanismanlikPaketi p
      INNER JOIN DnsBilgi d ON d.DnsID = p.DnsID
      ORDER BY p.PaketID DESC
    `);

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET hatası:", error);
    return NextResponse.json({ error: "Veriler alınamadı" }, { status: 500 });
  }
}

// ➕ EKLE
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      DnsID,
      DanisSeviye,
      DanisSure,
      DnsSekli,
      DnsUcret,
      GorusmeTarih,
      PaketDurumu,
    } = body;

    if (!DnsID) {
      return NextResponse.json({ error: "Danışan seçilmelidir" }, { status: 400 });
    }

    if (!DanisSure || isNaN(Number(DanisSure))) {
      return NextResponse.json({ error: "Süre sayı olmalıdır (örn: 3)" }, { status: 400 });
    }

    await query(
      `
      INSERT INTO DanismanlikPaketi
      (DnsID, DanisSeviye, DanisSure, DnsSekli, DnsUcret, GorusmeTarih, PaketDurumu)
      VALUES (@p0, @p1, @p2, @p3, @p4, @p5, @p6)
      `,
      [DnsID, DanisSeviye, Number(DanisSure), DnsSekli, DnsUcret, GorusmeTarih, PaketDurumu]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST hatası:", error);
    return NextResponse.json({ error: "Ekleme başarısız" }, { status: 500 });
  }
}

// ✏️ GÜNCELLE
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const {
      PaketID,
      DanisSeviye,
      DanisSure,
      DnsSekli,
      DnsUcret,
      GorusmeTarih,
      PaketDurumu,
    } = body;

    if (!PaketID) {
      return NextResponse.json({ error: "PaketID gerekli" }, { status: 400 });
    }

    await query(
      `
      UPDATE DanismanlikPaketi
      SET
        DanisSeviye = @p0,
        DanisSure = @p1,
        DnsSekli = @p2,
        DnsUcret = @p3,
        GorusmeTarih = @p4,
        PaketDurumu = @p5
      WHERE PaketID = @p6
      `,
      [DanisSeviye, Number(DanisSure), DnsSekli, DnsUcret, GorusmeTarih, PaketDurumu, PaketID]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT hatası:", error);
    return NextResponse.json({ error: "Güncelleme başarısız" }, { status: 500 });
  }
}

// 🗑️ SİL
export async function DELETE(req: Request) {
  try {
    const { PaketID } = await req.json();

    if (!PaketID) {
      return NextResponse.json({ error: "PaketID gerekli" }, { status: 400 });
    }

    await query(
      `DELETE FROM DanismanlikPaketi WHERE PaketID = @p0`,
      [PaketID]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE hatası:", error);
    return NextResponse.json({ error: "Silme başarısız" }, { status: 500 });
  }
}