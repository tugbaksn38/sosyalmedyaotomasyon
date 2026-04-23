//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\app\api\raporlar\route.ts


import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const hesapId = searchParams.get("hesapId");

  let sql = `
    SELECT 
      r.RaporID,
      r.SatisTuru,
      r.GuncelKazanc,
      r.TiklamaSayisi,
      r.HedefDurumu,
      r.RaporTarih,
      h.HesapKullaniciAdi
    FROM HesapRapor r
    JOIN HesapBilgileri h ON h.HesapID = r.HesapID
  `;

  const params: any[] = [];

  if (hesapId) {
    sql += " WHERE r.HesapID = @p0";
    params.push(Number(hesapId));
  }

  sql += " ORDER BY r.RaporTarih DESC";

  const data = await query(sql, params);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    HesapID,
    SatisTuru,
    GuncelKazanc,
    TiklamaSayisi,
    HedefDurumu,
  } = body;

  await query(
    `
    INSERT INTO HesapRapor
    (HesapID, SatisTuru, GuncelKazanc, TiklamaSayisi, HedefDurumu, RaporTarih)
    VALUES (@p0, @p1, @p2, @p3, @p4, GETDATE())
    `,
    [
      HesapID,
      SatisTuru,
      GuncelKazanc,
      TiklamaSayisi,
      HedefDurumu,
    ]
  );

  return NextResponse.json({ success: true });
}




/*
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await query(`
    SELECT 
      r.RaporID,
      r.SatisTuru,
      r.GuncelKazanc,
      r.TiklamaSayisi,
      r.HedefDurumu,
      r.RaporTarih,
      h.HesapKullaniciAdi
    FROM HesapRapor r
    JOIN HesapBilgileri h ON h.HesapID = r.HesapID
    ORDER BY r.RaporTarih DESC
  `);

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    HesapID,
    SatisTuru,
    GuncelKazanc,
    TiklamaSayisi,
    HedefDurumu,
  } = body;

  await query(
    `
    INSERT INTO HesapRapor
    (HesapID, SatisTuru, GuncelKazanc, TiklamaSayisi, HedefDurumu, RaporTarih)
    VALUES (@p0, @p1, @p2, @p3, @p4, GETDATE())
    `,
    [
      HesapID,
      SatisTuru,
      GuncelKazanc,
      TiklamaSayisi,
      HedefDurumu,
    ]
  );

  return NextResponse.json({ success: true });
}
*/