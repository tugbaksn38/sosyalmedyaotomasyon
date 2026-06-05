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
  DanisSure: number;
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
  const [editing, setEditing] = useState<Paket | null>(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const [dns, paket] = await Promise.all([
        fetch("/api/dns-bilgi").then((r) => r.json()),
        fetch("/api/paketler").then((r) => r.json()),
      ]);
      setDanisanlar(dns);
      setPaketler(paket);
    } catch (error) {
      console.error("Veri yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.DnsID) {
      alert("Lütfen bir danışan seçin!");
      return;
    }

    if (!form.DanisSure || isNaN(Number(form.DanisSure))) {
      alert("Süre sayı olmalıdır (örn: 3)!");
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/paketler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          DnsID: Number(form.DnsID),
          DanisSeviye: form.DanisSeviye,
          DanisSure: Number(form.DanisSure),
          DnsSekli: form.DnsSekli,
          DnsUcret: Number(form.DnsUcret) || 0,
          GorusmeTarih: form.GorusmeTarih,
          PaketDurumu: form.PaketDurumu,
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

      await fetchAll();
    } catch (error) {
      console.error("Ekleme hatası:", error);
      alert("Ekleme başarısız!");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;

    setLoading(true);
    try {
      await fetch("/api/paketler", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          PaketID: editing.PaketID,
          DanisSeviye: editing.DanisSeviye,
          DanisSure: editing.DanisSure,
          DnsSekli: editing.DnsSekli,
          DnsUcret: editing.DnsUcret,
          GorusmeTarih: editing.GorusmeTarih,
          PaketDurumu: editing.PaketDurumu,
        }),
      });

      setEditing(null);
      await fetchAll();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert("Güncelleme başarısız!");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu paketi silmek istiyor musunuz?")) return;

    setLoading(true);
    try {
      await fetch("/api/paketler", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ PaketID: id }),
      });
      await fetchAll();
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Silme başarısız!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0 text-gray-800">📦 Danışmanlık Paketleri</h2>
      </div>

      {/* ✏️ DÜZENLE FORMU */}
      {editing && (
        <div className="card border-warning mb-4 shadow-sm">
          <div className="card-header bg-warning text-dark fw-bold">
            ✏️ Paket Düzenle (ID: {editing.PaketID})
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdate} className="row g-3">
              <div className="col-md-4">
                <input
                  className="form-control"
                  value={editing.DanisSeviye || ""}
                  onChange={(e) => setEditing({ ...editing, DanisSeviye: e.target.value })}
                  placeholder="Danışmanlık Seviyesi"
                />
              </div>
              <div className="col-md-2">
                <input
                  className="form-control"
                  value={editing.DanisSure || ""}
                  onChange={(e) => setEditing({ ...editing, DanisSure: Number(e.target.value) })}
                  placeholder="Süre"
                  type="number"
                />
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  value={editing.DnsSekli || ""}
                  onChange={(e) => setEditing({ ...editing, DnsSekli: e.target.value })}
                  placeholder="Görüşme Şekli"
                />
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  value={editing.DnsUcret || ""}
                  onChange={(e) => setEditing({ ...editing, DnsUcret: Number(e.target.value) })}
                  placeholder="Ücret"
                  type="number"
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  type="date"
                  value={editing.GorusmeTarih ? editing.GorusmeTarih.split("T")[0] : ""}
                  onChange={(e) => setEditing({ ...editing, GorusmeTarih: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  value={editing.PaketDurumu || ""}
                  onChange={(e) => setEditing({ ...editing, PaketDurumu: e.target.value })}
                  placeholder="Durum (Aktif/Pasif)"
                />
              </div>
              <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-warning text-dark fw-bold" disabled={loading}>
                  💾 Kaydet
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(null)}>
                  ❌ İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ➕ EKLE FORMU */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white fw-bold">➕ Yeni Paket Ekle</div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <select
                className="form-select"
                value={form.DnsID}
                onChange={(e) => setForm({ ...form, DnsID: e.target.value })}
              >
                <option value="">👤 Danışan Seç</option>
                {danisanlar.map((d) => (
                  <option key={d.DnsID} value={d.DnsID}>
                    {d.DnsAdi} {d.DnsSoyad}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Danışmanlık Seviyesi"
                value={form.DanisSeviye}
                onChange={(e) => setForm({ ...form, DanisSeviye: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Süre (sayı olarak)"
                value={form.DanisSure}
                onChange={(e) => setForm({ ...form, DanisSure: e.target.value })}
                type="number"
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Görüşme Şekli"
                value={form.DnsSekli}
                onChange={(e) => setForm({ ...form, DnsSekli: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Ücret (₺)"
                value={form.DnsUcret}
                onChange={(e) => setForm({ ...form, DnsUcret: e.target.value })}
                type="number"
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                type="date"
                value={form.GorusmeTarih}
                onChange={(e) => setForm({ ...form, GorusmeTarih: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Paket Durumu (Aktif/Pasif)"
                value={form.PaketDurumu}
                onChange={(e) => setForm({ ...form, PaketDurumu: e.target.value })}
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                ➕ Ekle
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 📋 TABLO */}
      {loading && (
        <div className="d-flex align-items-center gap-2 text-primary my-3">
          <div className="spinner-border spinner-border-sm" role="status"></div>
          <span>Yükleniyor...</span>
        </div>
      )}

      {!loading && paketler.length === 0 && (
        <div className="alert alert-info text-center" role="alert">
          Henüz hiç paket eklenmemiş.
        </div>
      )}

      {!loading && paketler.length > 0 && (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Danışan</th>
                  <th>Seviye</th>
                  <th>Süre</th>
                  <th>Görüşme Şekli</th>
                  <th>Ücret (₺)</th>
                  <th>Tarih</th>
                  <th>Durum</th>
                  <th style={{ width: "160px" }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {paketler.map((p) => (
                  <tr key={p.PaketID}>
                    <td><span className="badge bg-secondary">{p.PaketID}</span></td>
                    <td className="fw-semibold">{p.DnsAdi} {p.DnsSoyad}</td>
                    <td>{p.DanisSeviye}</td>
                    <td>{p.DanisSure} Ay/Seans</td>
                    <td>{p.DnsSekli}</td>
                    <td className="fw-bold text-success">{p.DnsUcret} ₺</td>
                    <td>{p.GorusmeTarih ? new Date(p.GorusmeTarih).toLocaleDateString() : "-"}</td>
                    <td>
                      <span className={`badge ${p.PaketDurumu?.toLowerCase() === 'aktif' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {p.PaketDurumu}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button onClick={() => setEditing(p)} className="btn btn-sm btn-outline-primary">
                          ✏️ Düzenle
                        </button>
                        <button onClick={() => handleDelete(p.PaketID)} className="btn btn-sm btn-outline-danger">
                          🗑️ Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}