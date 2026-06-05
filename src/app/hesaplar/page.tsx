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
    try {
      const [dns, hedef, hesap] = await Promise.all([
        fetch("/api/dns-bilgi").then((r) => r.json()),
        fetch("/api/hedef-kitle").then((r) => r.json()),
        fetch("/api/hesaplar").then((r) => r.json()),
      ]);

      setDanisanlar(dns);
      setHedefKitleler(hedef);
      setHesaplar(hesap);
    } catch (error) {
      console.error("Veriler yüklenirken hata oluştu:", error);
    }
  }

  // ➕ EKLE
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
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
    } catch (error) {
      console.error("Ekleme hatası:", error);
    }
  }

  // ✏️ GÜNCELLE
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;

    try {
      await fetch("/api/hesaplar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      setEditing(null);
      fetchAll();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    }
  }

  // 🗑️ SİL
  async function handleDelete(id: number) {
    if (!confirm("Bu hesabı silmek istiyor musun?")) return;

    try {
      await fetch("/api/hesaplar", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ HesapID: id }),
      });

      fetchAll();
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  }

  // ESLint Güvenli Veri Yükleme
  useEffect(() => {
    let isMounted = true;

    async function loadAllData() {
      try {
        const [dns, hedef, hesap] = await Promise.all([
          fetch("/api/dns-bilgi").then((r) => r.json()),
          fetch("/api/hedef-kitle").then((r) => r.json()),
          fetch("/api/hesaplar").then((r) => r.json()),
        ]);

        if (isMounted) {
          setDanisanlar(dns);
          setHedefKitleler(hedef);
          setHesaplar(hesap);
        }
      } catch (error) {
        console.error("useEffect veri yükleme hatası:", error);
      }
    }

    loadAllData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container-fluid py-4 animate fade-in">
      {/* BAŞLIK */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
            📱 Sosyal Medya Hesapları
          </h2>
          <p className="text-muted small m-0 mt-1">Danışanlara ait hesapları, platformları ve hesap türlerini yönetin.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* SOL KOLON: EKLEME VE DÜZENLEME FORMLARI */}
        <div className="col-12 col-xl-4">
          
          {/* ✏️ DÜZENLE FORMU */}
          {editing && (
            <div className="card shadow-sm border-0 border-top border-warning mb-4 transition-all">
              <div className="card-header bg-white pt-3 border-0">
                <h5 className="card-title fw-bold text-warning-emphasis m-0">✏️ Hesabı Düzenle</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleUpdate} className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label text-muted small fw-medium">Kullanıcı Adı</label>
                    <input
                      className="form-control border-2"
                      value={editing.HesapKullaniciAdi}
                      onChange={(e) =>
                        setEditing({ ...editing, HesapKullaniciAdi: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label text-muted small fw-medium">Hesap Türü</label>
                    <input
                      className="form-control border-2"
                      value={editing.HesapTuru}
                      onChange={(e) =>
                        setEditing({ ...editing, HesapTuru: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label text-muted small fw-medium">Uygulama / Platform</label>
                    <input
                      className="form-control border-2"
                      value={editing.UygulamaAdi}
                      onChange={(e) =>
                        setEditing({ ...editing, UygulamaAdi: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <button type="submit" className="btn btn-warning fw-bold grow shadow-sm text-dark">
                      💾 Değişiklikleri Kaydet
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditing(null)}>
                      İptal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ➕ EKLE FORMU */}
          <div className="card shadow-sm border-0 border-top border-primary transition-all">
            <div className="card-header bg-white pt-3 border-0">
              <h5 className="card-title fw-bold text-primary m-0">⚡ Yeni Hesap Kaydet</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                
                <div>
                  <label className="form-label text-muted small fw-medium">İlişkili Danışan</label>
                  <select
                    className="form-select border-2"
                    value={form.DnsID}
                    onChange={(e) => setForm({ ...form, DnsID: e.target.value })}
                    required
                  >
                    <option value="">Danışan Seçin...</option>
                    {danisanlar.map((d) => (
                      <option key={d.DnsID} value={d.DnsID}>
                        {d.DnsAdi} {d.DnsSoyad}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label text-muted small fw-medium">Hedef Kitle Segmenti</label>
                  <select
                    className="form-select border-2"
                    value={form.HedefKitleID}
                    onChange={(e) => setForm({ ...form, HedefKitleID: e.target.value })}
                    required
                  >
                    <option value="">Hedef Kitle Seçin...</option>
                    {hedefKitleler.map((h) => (
                      <option key={h.KitleID} value={h.KitleID}>
                        {h.HedefKitleAdi}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label text-muted small fw-medium">Kullanıcı Adı</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-2 border-end-0 text-muted">@</span>
                    <input
                      className="form-control border-2 border-start-0 ps-0"
                      placeholder="kullaniciadi"
                      value={form.HesapKullaniciAdi}
                      onChange={(e) =>
                        setForm({ ...form, HesapKullaniciAdi: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label text-muted small fw-medium">Hesap Türü</label>
                    <input
                      className="form-control border-2"
                      placeholder="Örn: İçerik Üretici"
                      value={form.HesapTuru}
                      onChange={(e) =>
                        setForm({ ...form, HesapTuru: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-muted small fw-medium">Uygulama</label>
                    <input
                      className="form-control border-2"
                      placeholder="Örn: Instagram"
                      value={form.UygulamaAdi}
                      onChange={(e) =>
                        setForm({ ...form, UygulamaAdi: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary fw-bold py-2 mt-2 shadow-sm hover-up">
                  🚀 Hesabı Ekle
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* SAĞ KOLON: HESAP LİSTESİ TABLOSU */}
        <div className="col-12 col-xl-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title fw-bold text-dark m-0">📋 Sistemdeki Hesaplar</h5>
              <span className="badge bg-dark-subtle text-dark-emphasis px-3 py-2 rounded-pill fw-medium">
                Toplam: {hesaplar.length} Hesap
              </span>
            </div>
            
            <div className="card-body p-0">
              {hesaplar.length === 0 ? (
                <div className="text-center p-5 text-muted">
                  <div className="fs-1 mb-2">📱</div>
                  <p className="m-0 fw-medium">Henüz kayıtlı hesap bulunamadı.</p>
                  <small>Soldaki formu kullanarak ilk hesabı tanımlayabilirsiniz.</small>
                </div>
              ) : (
                <div className="table-responsive" style={{ maxHeight: "600px" }}>
                  <table className="table table-hover align-middle mb-0 text-nowrap">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th className="ps-4 py-3 text-secondary text-uppercase font-size-sm">Hesap Kullanıcı Adı</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Platform</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Hesap Türü</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Atanan Danışan</th>
                        <th className="pe-4 py-3 text-secondary text-uppercase font-size-sm text-end" style={{ width: "140px" }}>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hesaplar.map((h) => (
                        <tr key={h.HesapID} className="transition-all table-row-hover">
                          <td className="ps-4 fw-bold text-primary">
                            @{h.HesapKullaniciAdi}
                          </td>
                          <td>
                            <span className="badge bg-info-subtle text-info-emphasis border border-info px-2.5 py-1.5 fw-semibold text-uppercase">
                              {h.UygulamaAdi}
                            </span>
                          </td>
                          <td>
                            <span className="text-secondary fw-medium">
                              {h.HesapTuru}
                            </span>
                          </td>
                          <td className="fw-semibold text-dark">
                            👤 {h.DnsAdi} {h.DnsSoyad}
                          </td>
                          <td className="pe-4 text-end">
                            <div className="d-flex gap-1 justify-content-end">
                              <button 
                                onClick={() => setEditing(h)} 
                                className="btn btn-sm btn-outline-primary px-2"
                              >
                                ✏️
                              </button>
                              <button 
                                onClick={() => handleDelete(h.HesapID)} 
                                className="btn btn-sm btn-outline-danger px-2"
                              >
                                🗑️
                              </button>
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
        .animate.fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .form-control:focus, .form-select:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.15) !important;
          transform: translateY(-1px);
          transition: all 0.2s ease-in-out;
        }
        .hover-up {
          transition: all 0.2s ease;
        }
        .hover-up:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        }
        .table-row-hover:hover {
          background-color: rgba(59, 130, 246, 0.03) !important;
          transition: background-color 0.2s ease;
        }
        .font-size-sm {
          font-size: 0.75rem !important;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
}