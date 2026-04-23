//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\app\hedef-kitle\page.tsx

"use client";

import { useEffect, useState } from "react";

type HedefKitle = {
  KitleID: number;
  HedefKitleAdi: string;
  KitleBasYas: number;
  KitleSonYas: number;
  KitleUlke: string;
  KitleSehir: string;
  KitleCinsiyet: string;
  KitleGelirDuzeyi: string;
};

export default function HedefKitlePage() {
  const [liste, setListe] = useState<HedefKitle[]>([]);

  const [form, setForm] = useState({
    HedefKitleAdi: "",
    KitleBasYas: "",
    KitleSonYas: "",
    KitleUlke: "",
    KitleSehir: "",
    KitleCinsiyet: "",
    KitleGelirDuzeyi: "",
  });

  // Listeyi çek
  async function loadData() {
    const res = await fetch("/api/hedef-kitle");
    const data = await res.json();
    setListe(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  // Form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/hedef-kitle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      HedefKitleAdi: "",
      KitleBasYas: "",
      KitleSonYas: "",
      KitleUlke: "",
      KitleSehir: "",
      KitleCinsiyet: "",
      KitleGelirDuzeyi: "",
    });

    loadData();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Hedef Kitle</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input
          placeholder="Hedef Kitle Adı"
          value={form.HedefKitleAdi}
          onChange={(e) =>
            setForm({ ...form, HedefKitleAdi: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Başlangıç Yaşı"
          value={form.KitleBasYas}
          onChange={(e) =>
            setForm({ ...form, KitleBasYas: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Bitiş Yaşı"
          value={form.KitleSonYas}
          onChange={(e) =>
            setForm({ ...form, KitleSonYas: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Ülke"
          value={form.KitleUlke}
          onChange={(e) =>
            setForm({ ...form, KitleUlke: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Şehir"
          value={form.KitleSehir}
          onChange={(e) =>
            setForm({ ...form, KitleSehir: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Cinsiyet"
          value={form.KitleCinsiyet}
          onChange={(e) =>
            setForm({ ...form, KitleCinsiyet: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Gelir Düzeyi"
          value={form.KitleGelirDuzeyi}
          onChange={(e) =>
            setForm({ ...form, KitleGelirDuzeyi: e.target.value })
          }
        />
        <br />

        <button type="submit">Kaydet</button>
      </form>

      {/* LİSTE */}
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hedef Kitle Adı</th>
            <th>Yaş</th>
            <th>Lokasyon</th>
            <th>Cinsiyet</th>
            <th>Gelir</th>
          </tr>
        </thead>
        <tbody>
          {liste.map((k) => (
            <tr key={k.KitleID}>
              <td>{k.KitleID}</td>
              <td>{k.HedefKitleAdi}</td>
              <td>
                {k.KitleBasYas} - {k.KitleSonYas}
              </td>
              <td>
                {k.KitleUlke} / {k.KitleSehir}
              </td>
              <td>{k.KitleCinsiyet}</td>
              <td>{k.KitleGelirDuzeyi}</td>
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

type HedefKitle = {
  KitleID: number;
  KitleBasYas: number;
  KitleSonYas: number;
  KitleUlke: string;
  KitleSehir: string;
  KitleCinsiyet: string;
  KitleGelirDuzeyi: string;
};

export default function HedefKitlePage() {
  const [liste, setListe] = useState<HedefKitle[]>([]);

  const [form, setForm] = useState({
    KitleBasYas: "",
    KitleSonYas: "",
    KitleUlke: "",
    KitleSehir: "",
    KitleCinsiyet: "",
    KitleGelirDuzeyi: "",
  });

  // Listeyi çek
  async function loadData() {
    const res = await fetch("/api/hedef-kitle");
    const data = await res.json();
    setListe(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  // Form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/hedef-kitle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      KitleBasYas: "",
      KitleSonYas: "",
      KitleUlke: "",
      KitleSehir: "",
      KitleCinsiyet: "",
      KitleGelirDuzeyi: "",
    });

    loadData();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Hedef Kitle</h1>

   

      /*
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input
          placeholder="Başlangıç Yaşı"
          value={form.KitleBasYas}
          onChange={(e) => setForm({ ...form, KitleBasYas: e.target.value })}
        />
        <br />

        <input
          placeholder="Bitiş Yaşı"
          value={form.KitleSonYas}
          onChange={(e) => setForm({ ...form, KitleSonYas: e.target.value })}
        />
        <br />

        <input
          placeholder="Ülke"
          value={form.KitleUlke}
          onChange={(e) => setForm({ ...form, KitleUlke: e.target.value })}
        />
        <br />

        <input
          placeholder="Şehir"
          value={form.KitleSehir}
          onChange={(e) => setForm({ ...form, KitleSehir: e.target.value })}
        />
        <br />

        <input
          placeholder="Cinsiyet"
          value={form.KitleCinsiyet}
          onChange={(e) =>
            setForm({ ...form, KitleCinsiyet: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Gelir Düzeyi"
          value={form.KitleGelirDuzeyi}
          onChange={(e) =>
            setForm({ ...form, KitleGelirDuzeyi: e.target.value })
          }
        />
        <br />

        <button type="submit">Kaydet</button>
      </form>

   
      


      /*
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Yaş</th>
            <th>Lokasyon</th>
            <th>Cinsiyet</th>
            <th>Gelir</th>
          </tr>
        </thead>
        <tbody>
          {liste.map((k) => (
            <tr key={k.KitleID}>
              <td>{k.KitleID}</td>
              <td>
                {k.KitleBasYas} - {k.KitleSonYas}
              </td>
              <td>
                {k.KitleUlke} / {k.KitleSehir}
              </td>
              <td>{k.KitleCinsiyet}</td>
              <td>{k.KitleGelirDuzeyi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


*/