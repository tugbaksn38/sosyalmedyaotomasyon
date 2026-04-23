//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\app\hesaplar\page.tsx

"use client";

import { useEffect, useState } from "react";

type Danisan = {
  DnsID: number;
  DnsAdi: string;
  DnsSoyad: string;
};

type HedefKitle = {
  KitleID: number;
  HedefKitleAdi: string;
};

type Hesap = {
  HesapID: number;
  HesapKullaniciAdi: string;
  HesapTuru: string;
  UygulamaAdi: string;
  DnsAdi: string;
  DnsSoyad: string;
};

export default function HesaplarPage() {
  const [danisanlar, setDanisanlar] = useState<Danisan[]>([]);
  const [hedefKitleler, setHedefKitleler] = useState<HedefKitle[]>([]);
  const [hesaplar, setHesaplar] = useState<Hesap[]>([]);
  const [editing, setEditing] = useState<Hesap | null>(null);

  const [form, setForm] = useState({
    DnsID: "",
    HedefKitleID: "",
    HesapKullaniciAdi: "",
    HesapTuru: "",
    UygulamaAdi: "",
  });

  async function fetchAll() {
    const [dns, hedef, hesap] = await Promise.all([
      fetch("/api/dns-bilgi").then((r) => r.json()),
      fetch("/api/hedef-kitle").then((r) => r.json()),
      fetch("/api/hesaplar").then((r) => r.json()),
    ]);

    setDanisanlar(dns);
    setHedefKitleler(hedef);
    setHesaplar(hesap);
  }

  // ➕ EKLE
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/hesaplar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        DnsID: Number(form.DnsID),
        HedefKitleID: Number(form.HedefKitleID),
      }),
    });

    setForm({
      DnsID: "",
      HedefKitleID: "",
      HesapKullaniciAdi: "",
      HesapTuru: "",
      UygulamaAdi: "",
    });

    fetchAll();
  }

  // ✏️ GÜNCELLE
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;

    await fetch("/api/hesaplar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    setEditing(null);
    fetchAll();
  }

  // 🗑️ SİL
  async function handleDelete(id: number) {
    if (!confirm("Bu hesabı silmek istiyor musun?")) return;

    await fetch("/api/hesaplar", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ HesapID: id }),
    });

    fetchAll();
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <h2>Hesaplar</h2>

      {/* ✏️ DÜZENLE FORMU */}
      {editing && (
        <form onSubmit={handleUpdate} style={{ marginBottom: 20 }}>
          <input
            value={editing.HesapKullaniciAdi}
            onChange={(e) =>
              setEditing({ ...editing, HesapKullaniciAdi: e.target.value })
            }
          />
          <input
            value={editing.HesapTuru}
            onChange={(e) =>
              setEditing({ ...editing, HesapTuru: e.target.value })
            }
          />
          <input
            value={editing.UygulamaAdi}
            onChange={(e) =>
              setEditing({ ...editing, UygulamaAdi: e.target.value })
            }
          />
          <button type="submit">Kaydet</button>
          <button type="button" onClick={() => setEditing(null)}>
            İptal
          </button>
        </form>
      )}

      {/* ➕ EKLE FORMU */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
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

        <select
          value={form.HedefKitleID}
          onChange={(e) =>
            setForm({ ...form, HedefKitleID: e.target.value })
          }
        >
          <option value="">Hedef Kitle Seç</option>
          {hedefKitleler.map((h) => (
            <option key={h.KitleID} value={h.KitleID}>
              {h.HedefKitleAdi}
            </option>
          ))}
        </select>

        <input
          placeholder="Kullanıcı Adı"
          value={form.HesapKullaniciAdi}
          onChange={(e) =>
            setForm({ ...form, HesapKullaniciAdi: e.target.value })
          }
        />
        <input
          placeholder="Hesap Türü"
          value={form.HesapTuru}
          onChange={(e) =>
            setForm({ ...form, HesapTuru: e.target.value })
          }
        />
        <input
          placeholder="Uygulama"
          value={form.UygulamaAdi}
          onChange={(e) =>
            setForm({ ...form, UygulamaAdi: e.target.value })
          }
        />

        <button type="submit">Ekle</button>
      </form>

      {/* 📋 TABLO */}
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Hesap</th>
            <th>Tür</th>
            <th>Uygulama</th>
            <th>Danışan</th>
            <th>Düzenle</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {hesaplar.map((h) => (
            <tr key={h.HesapID}>
              <td>{h.HesapKullaniciAdi}</td>
              <td>{h.HesapTuru}</td>
              <td>{h.UygulamaAdi}</td>
              <td>{h.DnsAdi} {h.DnsSoyad}</td>
              <td>
                <button onClick={() => setEditing(h)}>Düzenle</button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(h.HesapID)}
                  style={{ color: "red" }}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}