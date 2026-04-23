//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\app\api\hedef-kitle\route.ts

import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await query(`
    SELECT *
    FROM HedefKitleDetay
    ORDER BY KitleID DESC
  `);

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    HedefKitleAdi,
    KitleBasYas,
    KitleSonYas,
    KitleUlke,
    KitleSehir,
    KitleCinsiyet,
    KitleGelirDuzeyi,
  } = body;

  await query(
    `
    INSERT INTO HedefKitleDetay
    (
      HedefKitleAdi,
      KitleBasYas,
      KitleSonYas,
      KitleUlke,
      KitleSehir,
      KitleCinsiyet,
      KitleGelirDuzeyi
    )
    VALUES (@p0, @p1, @p2, @p3, @p4, @p5, @p6)
    `,
    [
      HedefKitleAdi,
      KitleBasYas,
      KitleSonYas,
      KitleUlke,
      KitleSehir,
      KitleCinsiyet,
      KitleGelirDuzeyi,
    ]
  );

  return NextResponse.json({ success: true });
}


/*
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await query(`
    SELECT *
    FROM HedefKitleDetay
    ORDER BY KitleID DESC
  `);

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    KitleBasYas,
    KitleSonYas,
    KitleUlke,
    KitleSehir,
    KitleCinsiyet,
    KitleGelirDuzeyi,
  } = body;

  await query(
    `
    INSERT INTO HedefKitleDetay
    (KitleBasYas, KitleSonYas, KitleUlke, KitleSehir, KitleCinsiyet, KitleGelirDuzeyi)
    VALUES (@p0, @p1, @p2, @p3, @p4, @p5)
    `,
    [
      KitleBasYas,
      KitleSonYas,
      KitleUlke,
      KitleSehir,
      KitleCinsiyet,
      KitleGelirDuzeyi,
    ]
  );

  return NextResponse.json({ success: true });
}
*/