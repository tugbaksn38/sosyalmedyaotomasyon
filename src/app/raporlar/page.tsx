//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\app\raporlar\page.tsx


"use client";

import { useEffect, useState } from "react";

type Hesap = {
  HesapID: number;
  HesapKullaniciAdi: string;
};

type Rapor = {
  RaporID: number;
  HesapKullaniciAdi: string;
  SatisTuru: string;
  GuncelKazanc: number;
  TiklamaSayisi: number;
  HedefDurumu: string;
  RaporTarih: string;
};

export default function RaporlarPage() {
  const [hesaplar, setHesaplar] = useState<Hesap[]>([]);
  const [raporlar, setRaporlar] = useState<Rapor[]>([]);
  const [selectedHesap, setSelectedHesap] = useState("");

  const [form, setForm] = useState({
    HesapID: "",
    SatisTuru: "",
    GuncelKazanc: "",
    TiklamaSayisi: "",
    HedefDurumu: "",
  });

  // 🔹 Hesapları çek
  async function fetchHesaplar() {
    const res = await fetch("/api/hesaplar");
    const data = await res.json();
    setHesaplar(data);
  }

  // 🔹 Raporları hesaba göre çek
  async function fetchRaporlar(hesapId?: string) {
    const url = hesapId
      ? `/api/raporlar?hesapId=${hesapId}`
      : "/api/raporlar";

    const res = await fetch(url);
    const data = await res.json();
    setRaporlar(data);
  }

  // 🔹 Rapor ekle
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/raporlar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        HesapID: Number(form.HesapID),
        SatisTuru: form.SatisTuru,
        GuncelKazanc: Number(form.GuncelKazanc),
        TiklamaSayisi: Number(form.TiklamaSayisi),
        HedefDurumu: form.HedefDurumu,
      }),
    });

    setForm({
      HesapID: "",
      SatisTuru: "",
      GuncelKazanc: "",
      TiklamaSayisi: "",
      HedefDurumu: "",
    });

    // aynı hesap seçiliyse listeyi yenile
    fetchRaporlar(selectedHesap);
  }

  useEffect(() => {
    fetchHesaplar();
  }, []);

  return (
    <div>
      <h2>Raporlar</h2>

      {/* 🔽 RAPOR LİSTE FİLTRESİ */}
      <div style={{ marginBottom: 20 }}>
        <select
          value={selectedHesap}
          onChange={(e) => {
            setSelectedHesap(e.target.value);
            fetchRaporlar(e.target.value);
          }}
        >
          <option value="">Hesap Seç (Raporları Gör)</option>
          {hesaplar.map((h) => (
            <option key={h.HesapID} value={h.HesapID}>
              {h.HesapKullaniciAdi}
            </option>
          ))}
        </select>
      </div>

      {/* ➕ RAPOR EKLE FORMU */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <select
          value={form.HesapID}
          onChange={(e) => setForm({ ...form, HesapID: e.target.value })}
        >
          <option value="">Hesap Seç</option>
          {hesaplar.map((h) => (
            <option key={h.HesapID} value={h.HesapID}>
              {h.HesapKullaniciAdi}
            </option>
          ))}
        </select>

        <input
          placeholder="Satış Türü"
          value={form.SatisTuru}
          onChange={(e) =>
            setForm({ ...form, SatisTuru: e.target.value })
          }
        />

        <input
          placeholder="Güncel Kazanç"
          value={form.GuncelKazanc}
          onChange={(e) =>
            setForm({ ...form, GuncelKazanc: e.target.value })
          }
        />

        <input
          placeholder="Tıklama Sayısı"
          value={form.TiklamaSayisi}
          onChange={(e) =>
            setForm({ ...form, TiklamaSayisi: e.target.value })
          }
        />

        <input
          placeholder="Hedef Durumu"
          value={form.HedefDurumu}
          onChange={(e) =>
            setForm({ ...form, HedefDurumu: e.target.value })
          }
        />

        <button type="submit">Rapor Ekle</button>
      </form>

      {/* 📋 RAPOR LİSTESİ */}
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Hesap</th>
            <th>Satış Türü</th>
            <th>Kazanç</th>
            <th>Tıklama</th>
            <th>Durum</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {raporlar.map((r) => (
            <tr key={r.RaporID}>
              <td>{r.HesapKullaniciAdi}</td>
              <td>{r.SatisTuru}</td>
              <td>{r.GuncelKazanc}</td>
              <td>{r.TiklamaSayisi}</td>
              <td>{r.HedefDurumu}</td>
              <td>{new Date(r.RaporTarih).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




/*
"use client";

import { useEffect, useState } from "react";

type Hesap = {
  HesapID: number;
  HesapKullaniciAdi: string;
};

type Rapor = {
  RaporID: number;
  HesapKullaniciAdi: string;
  SatisTuru: string;
  GuncelKazanc: number;
  TiklamaSayisi: number;
  HedefDurumu: string;
  RaporTarih: string;
};

export default function RaporlarPage() {
  const [hesaplar, setHesaplar] = useState<Hesap[]>([]);
  const [raporlar, setRaporlar] = useState<Rapor[]>([]);

  const [form, setForm] = useState({
    HesapID: "",
    SatisTuru: "",
    GuncelKazanc: "",
    TiklamaSayisi: "",
    HedefDurumu: "",
  });
async function fetchAll() {
  // 1️⃣ Hesaplar
  const hesapRes = await fetch("/api/hesaplar");
  const hesapData = await hesapRes.json();
  setHesaplar(hesapData);

  // 2️⃣ Raporlar
  try {
    const raporRes = await fetch("/api/raporlar");
    const raporData = await raporRes.json();
    setRaporlar(raporData);
  } catch (err) {
    console.error("Raporlar yüklenemedi", err);
    setRaporlar([]);
  }
}


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/raporlar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        HesapID: Number(form.HesapID),
        SatisTuru: form.SatisTuru,
        GuncelKazanc: Number(form.GuncelKazanc),
        TiklamaSayisi: Number(form.TiklamaSayisi),
        HedefDurumu: form.HedefDurumu,
      }),
    });

    setForm({
      HesapID: "",
      SatisTuru: "",
      GuncelKazanc: "",
      TiklamaSayisi: "",
      HedefDurumu: "",
    });

    fetchAll();
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <h2>Raporlar</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <select
          value={form.HesapID}
          onChange={(e) => setForm({ ...form, HesapID: e.target.value })}
        >
          <option value="">Hesap Seç</option>
          {hesaplar.map((h) => (
            <option key={h.HesapID} value={h.HesapID}>
              {h.HesapKullaniciAdi}
            </option>
          ))}
        </select>

        <input
          placeholder="Satış Türü"
          value={form.SatisTuru}
          onChange={(e) =>
            setForm({ ...form, SatisTuru: e.target.value })
          }
        />

        <input
          placeholder="Güncel Kazanç"
          value={form.GuncelKazanc}
          onChange={(e) =>
            setForm({ ...form, GuncelKazanc: e.target.value })
          }
        />

        <input
          placeholder="Tiklama Sayısı"
          value={form.TiklamaSayisi}
          onChange={(e) =>
            setForm({ ...form, TiklamaSayisi: e.target.value })
          }
        />

        <input
          placeholder="Hedef Durumu"
          value={form.HedefDurumu}
          onChange={(e) =>
            setForm({ ...form, HedefDurumu: e.target.value })
          }
        />

        <button type="submit">Ekle</button>
      </form>

   
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Hesap</th>
            <th>Satış Türü</th>
            <th>Kazanç</th>
            <th>Tıklama</th>
            <th>Durum</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {raporlar.map((r) => (
            <tr key={r.RaporID}>
              <td>{r.HesapKullaniciAdi}</td>
              <td>{r.SatisTuru}</td>
              <td>{r.GuncelKazanc}</td>
              <td>{r.TiklamaSayisi}</td>
              <td>{r.HedefDurumu}</td>
              <td>{new Date(r.RaporTarih).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
*/