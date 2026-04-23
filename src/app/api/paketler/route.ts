//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\app\api\paketler\route.ts

import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await query(`
    SELECT 
      p.PaketID,
      p.DanisSeviye,
      p.DanisSure,
      p.DnsSekli,
      p.DnsUcret,
      p.GorusmeTarih,
      p.PaketDurumu,
      d.DnsAdi,
      d.DnsSoyad
    FROM DanismanlikPaketi p
    JOIN DnsBilgi d ON d.DnsID = p.DnsID
    ORDER BY p.PaketID DESC
  `);

  return NextResponse.json(data);
}

export async function POST(req: Request) {
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

  await query(
    `
    INSERT INTO DanismanlikPaketi
    (DnsID, DanisSeviye, DanisSure, DnsSekli, DnsUcret, GorusmeTarih, PaketDurumu)
    VALUES (@p0, @p1, @p2, @p3, @p4, @p5, @p6)
    `,
    [
      DnsID,
      DanisSeviye,
      DanisSure,
      DnsSekli,
      DnsUcret,
      GorusmeTarih,
      PaketDurumu,
    ]
  );

  return NextResponse.json({ success: true });
}
