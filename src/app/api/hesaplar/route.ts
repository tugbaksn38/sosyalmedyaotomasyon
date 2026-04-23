//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\app\api\hesaplar\route.ts


import { query } from "@/lib/db";
import { NextResponse } from "next/server";

// 📥 LİSTELE
export async function GET() {
  const data = await query(`
    SELECT 
      h.HesapID,
      h.HesapKullaniciAdi,
      h.HesapTuru,
      h.UygulamaAdi,
      d.DnsAdi,
      d.DnsSoyad
    FROM HesapBilgileri h
    JOIN DnsBilgi d ON d.DnsID = h.DnsID
    ORDER BY h.HesapID DESC
  `);

  return NextResponse.json(data);
}

// ➕ EKLE
export async function POST(req: Request) {
  const body = await req.json();

  const {
    DnsID,
    HedefKitleID,
    HesapKullaniciAdi,
    HesapTuru,
    UygulamaAdi,
  } = body;

  await query(
    `
    INSERT INTO HesapBilgileri
    (DnsID, HedefKitleID, HesapKullaniciAdi, HesapTuru, UygulamaAdi)
    VALUES (@p0, @p1, @p2, @p3, @p4)
    `,
    [DnsID, HedefKitleID, HesapKullaniciAdi, HesapTuru, UygulamaAdi]
  );

  return NextResponse.json({ success: true });
}

// ✏️ GÜNCELLE
export async function PUT(req: Request) {
  const body = await req.json();

  const {
    HesapID,
    HesapKullaniciAdi,
    HesapTuru,
    UygulamaAdi,
  } = body;

  await query(
    `
    UPDATE HesapBilgileri
    SET
      HesapKullaniciAdi = @p0,
      HesapTuru = @p1,
      UygulamaAdi = @p2
    WHERE HesapID = @p3
    `,
    [HesapKullaniciAdi, HesapTuru, UygulamaAdi, HesapID]
  );

  return NextResponse.json({ success: true });
}

// 🗑️ SİL
export async function DELETE(req: Request) {
  const { HesapID } = await req.json();

  await query(
    `DELETE FROM HesapBilgileri WHERE HesapID = @p0`,
    [HesapID]
  );

  return NextResponse.json({ success: true });
}


/*
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await query(`
    SELECT 
      h.HesapID,
      h.HesapKullaniciAdi,
      h.HesapTuru,
      h.UygulamaAdi,
      d.DnsAdi,
      d.DnsSoyad,
      hk.KitleSehir,
      hk.KitleCinsiyet
    FROM HesapBilgileri h
    JOIN DnsBilgi d ON d.DnsID = h.DnsID
    JOIN HedefKitleDetay hk ON hk.KitleID = h.HedefKitleID
    ORDER BY h.HesapID DESC
  `);

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    DnsID,
    HedefKitleID,
    HesapKullaniciAdi,
    HesapTuru,
    UygulamaAdi,
  } = body;

  await query(
    `
    INSERT INTO HesapBilgileri
    (DnsID, HedefKitleID, HesapKullaniciAdi, HesapTuru, UygulamaAdi)
    VALUES (@p0, @p1, @p2, @p3, @p4)
    `,
    [
      DnsID,
      HedefKitleID,
      HesapKullaniciAdi,
      HesapTuru,
      UygulamaAdi,
    ]
  );

  return NextResponse.json({ success: true });
}
*/