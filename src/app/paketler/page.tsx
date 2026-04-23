//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\app\paketler\page.tsx

"use client";

import { useEffect, useState } from "react";

type Danisan = {
  DnsID: number;
  DnsAdi: string;
  DnsSoyad: string;
};

type Paket = {
  PaketID: number;
  DanisSeviye: string;
  DanisSure: string;
  DnsSekli: string;
  DnsUcret: number;
  GorusmeTarih: string;
  PaketDurumu: string;
  DnsAdi: string;
  DnsSoyad: string;
};

export default function PaketlerPage() {
  const [danisanlar, setDanisanlar] = useState<Danisan[]>([]);
  const [paketler, setPaketler] = useState<Paket[]>([]);

  const [form, setForm] = useState({
    DnsID: "",
    DanisSeviye: "",
    DanisSure: "",
    DnsSekli: "",
    DnsUcret: "",
    GorusmeTarih: "",
    PaketDurumu: "",
  });

  async function fetchAll() {
    const [dns, paket] = await Promise.all([
      fetch("/api/dns-bilgi").then((r) => r.json()),
      fetch("/api/paketler").then((r) => r.json()),
    ]);

    setDanisanlar(dns);
    setPaketler(paket);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/paketler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        DnsID: Number(form.DnsID),
        DnsUcret: Number(form.DnsUcret),
      }),
    });

    setForm({
      DnsID: "",
      DanisSeviye: "",
      DanisSure: "",
      DnsSekli: "",
      DnsUcret: "",
      GorusmeTarih: "",
      PaketDurumu: "",
    });

    fetchAll();
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <h2>Paketler</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <select
          value={form.DnsID}
          onChange={(e) => setForm({ ...form, DnsID: e.target.value })}
        >
          <option value="">Danışan Seç</option>
          {danisanlar.map((d) => (
            <option key={d.DnsID} value={d.DnsID}>
              {d.DnsAdi} {d.DnsSoyad}
            </option>
          ))}
        </select>

        <input
          placeholder="Danışmanlık Seviyesi"
          value={form.DanisSeviye}
          onChange={(e) =>
            setForm({ ...form, DanisSeviye: e.target.value })
          }
        />

        <input
          placeholder="Süre"
          value={form.DanisSure}
          onChange={(e) =>
            setForm({ ...form, DanisSure: e.target.value })
          }
        />

        <input
          placeholder="Görüşme Şekli"
          value={form.DnsSekli}
          onChange={(e) =>
            setForm({ ...form, DnsSekli: e.target.value })
          }
        />

        <input
          placeholder="Ücret"
          value={form.DnsUcret}
          onChange={(e) =>
            setForm({ ...form, DnsUcret: e.target.value })
          }
        />

        <input
          type="date"
          value={form.GorusmeTarih}
          onChange={(e) =>
            setForm({ ...form, GorusmeTarih: e.target.value })
          }
        />

        <input
          placeholder="Paket Durumu"
          value={form.PaketDurumu}
          onChange={(e) =>
            setForm({ ...form, PaketDurumu: e.target.value })
          }
        />

        <button type="submit">Ekle</button>
      </form>

      {/* LİSTE */}
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Danışan</th>
            <th>Seviye</th>
            <th>Süre</th>
            <th>Ücret</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {paketler.map((p) => (
            <tr key={p.PaketID}>
              <td>{p.DnsAdi} {p.DnsSoyad}</td>
              <td>{p.DanisSeviye}</td>
              <td>{p.DanisSure}</td>
              <td>{p.DnsUcret}</td>
              <td>{p.PaketDurumu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
