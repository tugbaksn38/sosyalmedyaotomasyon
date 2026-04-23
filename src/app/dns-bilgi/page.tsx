//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\app\dns-bilgi\page.tsx


"use client";

import { useEffect, useState } from "react";

type DnsBilgi = {
  DnsID: number;
  DnsAdi: string;
  DnsSoyad: string;
  DnsTelefon: string;
  DnsMail: string;
  DnsSehir: string;
  HizmetBaslangicTarihi: string;
};

export default function DnsBilgiPage() {
  const [list, setList] = useState<DnsBilgi[]>([]);
  const [editing, setEditing] = useState<DnsBilgi | null>(null);

  const [form, setForm] = useState({
    DnsAdi: "",
    DnsSoyad: "",
    DnsTelefon: "",
    DnsMail: "",
    DnsSehir: "",
  });

  async function fetchData() {
    const res = await fetch("/api/dns-bilgi");
    const data = await res.json();
    setList(data);
  }

  // ➕ EKLE
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/dns-bilgi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      DnsAdi: "",
      DnsSoyad: "",
      DnsTelefon: "",
      DnsMail: "",
      DnsSehir: "",
    });

    fetchData();
  }

  // ✏️ GÜNCELLE
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;

    await fetch("/api/dns-bilgi", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    setEditing(null);
    fetchData();
  }

  // 🗑️ SİL
  async function handleDelete(id: number) {
    if (!confirm("Bu danışanı silmek istiyor musun?")) return;

    await fetch("/api/dns-bilgi", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ DnsID: id }),
    });

    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Danışanlar</h2>

      {/* ✏️ DÜZENLE FORMU */}
      {editing && (
        <form onSubmit={handleUpdate} style={{ marginBottom: 20 }}>
          <input
            value={editing.DnsAdi}
            onChange={(e) =>
              setEditing({ ...editing, DnsAdi: e.target.value })
            }
            placeholder="Ad"
          />
          <input
            value={editing.DnsSoyad}
            onChange={(e) =>
              setEditing({ ...editing, DnsSoyad: e.target.value })
            }
            placeholder="Soyad"
          />
          <input
            value={editing.DnsTelefon}
            onChange={(e) =>
              setEditing({ ...editing, DnsTelefon: e.target.value })
            }
            placeholder="Telefon"
          />
          <input
            value={editing.DnsMail}
            onChange={(e) =>
              setEditing({ ...editing, DnsMail: e.target.value })
            }
            placeholder="Mail"
          />
          <input
            value={editing.DnsSehir}
            onChange={(e) =>
              setEditing({ ...editing, DnsSehir: e.target.value })
            }
            placeholder="Şehir"
          />

          <button type="submit">Kaydet</button>
          <button type="button" onClick={() => setEditing(null)}>
            İptal
          </button>
        </form>
      )}

      {/* ➕ EKLE FORMU */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Ad"
          value={form.DnsAdi}
          onChange={(e) => setForm({ ...form, DnsAdi: e.target.value })}
        />
        <input
          placeholder="Soyad"
          value={form.DnsSoyad}
          onChange={(e) => setForm({ ...form, DnsSoyad: e.target.value })}
        />
        <input
          placeholder="Telefon"
          value={form.DnsTelefon}
          onChange={(e) =>
            setForm({ ...form, DnsTelefon: e.target.value })
          }
        />
        <input
          placeholder="Mail"
          value={form.DnsMail}
          onChange={(e) => setForm({ ...form, DnsMail: e.target.value })}
        />
        <input
          placeholder="Şehir"
          value={form.DnsSehir}
          onChange={(e) => setForm({ ...form, DnsSehir: e.target.value })}
        />
        <button type="submit">Ekle</button>
      </form>

      {/* 📋 TABLO */}
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Telefon</th>
            <th>Mail</th>
            <th>Şehir</th>
            <th>Başlangıç</th>
            <th>Düzenle</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {list.map((d) => (
            <tr key={d.DnsID}>
              <td>{d.DnsAdi} {d.DnsSoyad}</td>
              <td>{d.DnsTelefon}</td>
              <td>{d.DnsMail}</td>
              <td>{d.DnsSehir}</td>
              <td>
                {new Date(d.HizmetBaslangicTarihi).toLocaleDateString()}
              </td>
              <td>
                <button onClick={() => setEditing(d)}>Düzenle</button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(d.DnsID)}
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