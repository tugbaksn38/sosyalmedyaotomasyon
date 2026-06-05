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
    try {
      const res = await fetch("/api/dns-bilgi");
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  }

  // ESLint Hatalarını Tamamen Kapatan ve Cascading Render'ı Önleyen useEffect Yapısı
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const res = await fetch("/api/dns-bilgi");
        const data = await res.json();
        if (isMounted) {
          setList(data);
        }
      } catch (error) {
        console.error("İlk yükleme hatası:", error);
      }
    }

    loadInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

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

  return (
    <div className="container-fluid py-4 animate fade-in">
      {/* BAŞLIK */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
            👤 Danışan Yönetim Paneli
          </h2>
          <p className="text-muted small m-0 mt-1">Sistemdeki tüm kayıtlı danışanların iletişim ve hizmet süreçleri.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* SOL KOLON: EKLE & DÜZENLE FORMLARI */}
        <div className="col-12 col-xl-4">
          
          {/* ✏️ DÜZENLE FORMU */}
          {editing && (
            <div className="card shadow-sm border-top border-warning border mb-4 transition-all">
              <div className="card-header bg-white pt-3 border-0">
                <h5 className="card-title fw-bold text-warning-emphasis m-0">✏️ Danışan Kartını Düzenle</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleUpdate} className="d-flex flex-column gap-3">
                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label text-muted small fw-medium">Ad</label>
                      <input className="form-control border-2" value={editing.DnsAdi} onChange={(e) => setEditing({ ...editing, DnsAdi: e.target.value })} required />
                    </div>
                    <div className="col-6">
                      <label className="form-label text-muted small fw-medium">Soyad</label>
                      <input className="form-control border-2" value={editing.DnsSoyad} onChange={(e) => setEditing({ ...editing, DnsSoyad: e.target.value })} required />
                    </div>
                  </div>
                  <div>
                    <label className="form-label text-muted small fw-medium">Telefon</label>
                    <input className="form-control border-2" value={editing.DnsTelefon} onChange={(e) => setEditing({ ...editing, DnsTelefon: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label text-muted small fw-medium">E-Posta</label>
                    <input type="email" className="form-control border-2" value={editing.DnsMail} onChange={(e) => setEditing({ ...editing, DnsMail: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label text-muted small fw-medium">Şehir</label>
                    <input className="form-control border-2" value={editing.DnsSehir} onChange={(e) => setEditing({ ...editing, DnsSehir: e.target.value })} required />
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <button type="submit" className="btn btn-warning fw-bold grow text-dark shadow-sm">💾 Güncelle</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditing(null)}>İptal</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ➕ EKLE FORMU */}
          <div className="card shadow-sm border-top border-primary border-2 transition-all">
            <div className="card-header bg-white pt-3 border-0">
              <h5 className="card-title fw-bold text-primary m-0">⚡ Yeni Danışan Ekle</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label text-muted small fw-medium">Ad</label>
                    <input className="form-control border-2" placeholder="Örn: Ahmet" value={form.DnsAdi} onChange={(e) => setForm({ ...form, DnsAdi: e.target.value })} required />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-muted small fw-medium">Soyad</label>
                    <input className="form-control border-2" placeholder="Örn: Yılmaz" value={form.DnsSoyad} onChange={(e) => setForm({ ...form, DnsSoyad: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="form-label text-muted small fw-medium">Telefon</label>
                  <input className="form-control border-2" placeholder="0555..." value={form.DnsTelefon} onChange={(e) => setForm({ ...form, DnsTelefon: e.target.value })} required />
                </div>
                <div>
                  <label className="form-label text-muted small fw-medium">E-Posta Adresi</label>
                  <input type="email" className="form-control border-2" placeholder="isim@domain.com" value={form.DnsMail} onChange={(e) => setForm({ ...form, DnsMail: e.target.value })} required />
                </div>
                <div>
                  <label className="form-label text-muted small fw-medium">Şehir</label>
                  <input className="form-control border-2" placeholder="Örn: Ankara" value={form.DnsSehir} onChange={(e) => setForm({ ...form, DnsSehir: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary fw-bold py-2 mt-2 shadow-sm hover-up">🚀 Kaydı Oluştur</button>
              </form>
            </div>
          </div>
        </div>

        {/* SAĞ KOLON: TABLO LİSTESİ */}
        <div className="col-12 col-xl-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title fw-bold text-dark m-0">📋 Aktif Danışan Listesi</h5>
              <span className="badge bg-dark-subtle text-dark-emphasis px-3 py-2 rounded-pill fw-medium">Toplam: {list.length} Danışan</span>
            </div>

            <div className="card-body p-0">
              {list.length === 0 ? (
                <div className="text-center p-5 text-muted">
                  <div className="fs-1 mb-2">👤</div>
                  <p className="m-0 fw-medium">Sistemde kayıtlı danışan bulunmuyor.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0 text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4 py-3 text-secondary text-uppercase font-size-sm">Ad Soyad</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">İletişim</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Şehir</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Kayıt Tarihi</th>
                        <th className="pe-4 py-3 text-secondary text-uppercase font-size-sm text-end" style={{ width: "130px" }}>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((d) => (
                        <tr key={d.DnsID} className="transition-all table-row-hover">
                          <td className="ps-4 fw-bold text-primary">
                            👤 {d.DnsAdi} {d.DnsSoyad}
                          </td>
                          <td>
                            <div className="small fw-medium text-dark">{d.DnsTelefon}</div>
                            <div className="text-muted small font-monospace">{d.DnsMail}</div>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark border px-2.5 py-1.5 fw-medium">{d.DnsSehir}</span>
                          </td>
                          <td className="text-muted small">
                            {new Date(d.HizmetBaslangicTarihi).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </td>
                          <td className="pe-4 text-end">
                            <div className="d-flex gap-1 justify-content-end">
                              <button onClick={() => setEditing(d)} className="btn btn-sm btn-outline-primary px-2">✏️</button>
                              <button onClick={() => handleDelete(d.DnsID)} className="btn btn-sm btn-outline-danger px-2">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animate.fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .form-control:focus, .form-select:focus { border-color: #3b82f6 !important; box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.15) !important; transform: translateY(-1px); transition: all 0.2s ease-in-out; }
        .hover-up { transition: all 0.2s ease; }
        .hover-up:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important; }
        .table-row-hover:hover { background-color: rgba(59, 130, 246, 0.03) !important; transition: background-color 0.2s ease; }
        .font-size-sm { font-size: 0.75rem !important; letter-spacing: 0.5px; }
      `}</style>
    </div>
  );
}