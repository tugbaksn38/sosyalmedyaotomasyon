//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\app\api\dns-bilgi\route.ts


import { query } from "@/lib/db";
import { NextResponse } from "next/server";

// 📥 LİSTELE
export async function GET() {
  const data = await query(`
    SELECT *
    FROM DnsBilgi
    ORDER BY DnsID DESC
  `);

  return NextResponse.json(data);
}

// ➕ EKLE
export async function POST(req: Request) {
  const body = await req.json();

  const {
    DnsAdi,
    DnsSoyad,
    DnsTelefon,
    DnsMail,
    DnsSehir,
  } = body;

  await query(
    `
    INSERT INTO DnsBilgi
    (DnsAdi, DnsSoyad, DnsTelefon, DnsMail, DnsSehir, HizmetBaslangicTarihi)
    VALUES (@p0, @p1, @p2, @p3, @p4, GETDATE())
    `,
    [DnsAdi, DnsSoyad, DnsTelefon, DnsMail, DnsSehir]
  );

  return NextResponse.json({ success: true });
}

// ✏️ GÜNCELLE (TARİH DEĞİŞMEZ)
export async function PUT(req: Request) {
  const body = await req.json();

  const {
    DnsID,
    DnsAdi,
    DnsSoyad,
    DnsTelefon,
    DnsMail,
    DnsSehir,
  } = body;

  await query(
    `
    UPDATE DnsBilgi
    SET
      DnsAdi = @p0,
      DnsSoyad = @p1,
      DnsTelefon = @p2,
      DnsMail = @p3,
      DnsSehir = @p4
    WHERE DnsID = @p5
    `,
    [DnsAdi, DnsSoyad, DnsTelefon, DnsMail, DnsSehir, DnsID]
  );

  return NextResponse.json({ success: true });
}

// 🗑️ SİL
export async function DELETE(req: Request) {
  const { DnsID } = await req.json();

  await query(
    `
    DELETE FROM DnsBilgi
    WHERE DnsID = @p0
    `,
    [DnsID]
  );

  return NextResponse.json({ success: true });
}