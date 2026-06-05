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

  // 🔹 Raporları hesaba göre çek
  async function fetchRaporlar(hesapId?: string) {
    try {
      const url = hesapId
        ? `/api/raporlar?hesapId=${hesapId}`
        : "/api/raporlar";

      const res = await fetch(url);
      const data = await res.json();
      setRaporlar(data);
    } catch (error) {
      console.error("Raporlar yüklenirken hata oluştu:", error);
    }
  }

  // 🔹 Rapor ekle
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
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

      fetchRaporlar(selectedHesap);
    } catch (error) {
      console.error("Rapor ekleme hatası:", error);
    }
  }

  // ESLint Güvenli Veri Yükleme
  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      try {
        const res = await fetch("/api/hesaplar");
        const data = await res.json();
        if (isMounted) {
          setHesaplar(data);
        }
      } catch (error) {
        console.error("useEffect veri yükleme hatası:", error);
      }
    }

    loadData();
    
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
            📊 Performans Raporları
          </h2>
          <p className="text-muted small m-0 mt-1">Hesap analizlerini ve satış performanslarını buradan yönetin.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* SOL KOLON: FİLTRE VE EKLEME FORMU */}
        <div className="col-12 col-xl-4">
          
          {/* 🔽 RAPOR LİSTE FİLTRESİ */}
          <div className="card shadow-sm border-0 mb-4 bg-light">
            <div className="card-body">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Raporları Filtrele</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted">🔍</span>
                <select
                  className="form-select border-start-0 ps-0 fw-medium bg-white"
                  value={selectedHesap}
                  onChange={(e) => {
                    setSelectedHesap(e.target.value);
                    fetchRaporlar(e.target.value);
                  }}
                >
                  <option value="">Tüm Hesapların Raporları</option>
                  {hesaplar.map((h) => (
                    <option key={h.HesapID} value={h.HesapID}>
                      @{h.HesapKullaniciAdi}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ➕ RAPOR EKLE FORMU */}
          <div className="card shadow-sm border-0 border-top border-primary transition-all">
            <div className="card-header bg-white pt-3 border-0">
              <h5 className="card-title fw-bold text-primary m-0">⚡ Yeni Rapor Oluştur</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                
                <div>
                  <label className="form-label text-muted small fw-medium">İlişkili Hesap</label>
                  <select
                    className="form-select border-2"
                    value={form.HesapID}
                    onChange={(e) => setForm({ ...form, HesapID: e.target.value })}
                    required
                  >
                    <option value="">Hesap Seçin...</option>
                    {hesaplar.map((h) => (
                      <option key={h.HesapID} value={h.HesapID}>
                        @{h.HesapKullaniciAdi}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label text-muted small fw-medium">Satış Türü</label>
                  <input
                    className="form-control border-2"
                    placeholder="Örn: Sponsorluk, Link Geliri"
                    value={form.SatisTuru}
                    onChange={(e) => setForm({ ...form, SatisTuru: e.target.value })}
                    required
                  />
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label text-muted small fw-medium">Güncel Kazanç (₺)</label>
                    <input
                      type="number"
                      className="form-control border-2 text-success fw-bold"
                      placeholder="0.00"
                      value={form.GuncelKazanc}
                      onChange={(e) => setForm({ ...form, GuncelKazanc: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-muted small fw-medium">Tıklama Sayısı</label>
                    <input
                      type="number"
                      className="form-control border-2 font-monospace"
                      placeholder="0"
                      value={form.TiklamaSayisi}
                      onChange={(e) => setForm({ ...form, TiklamaSayisi: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label text-muted small fw-medium">Hedef Durumu</label>
                  <input
                    className="form-control border-2"
                    placeholder="Örn: Tamamlandı, Beklemede"
                    value={form.HedefDurumu}
                    onChange={(e) => setForm({ ...form, HedefDurumu: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary fw-bold py-2 mt-2 shadow-sm hover-up">
                  🚀 Raporu Sisteme İşle
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* SAĞ KOLON: RAPOR LİSTESİ TABLOSU */}
        <div className="col-12 col-xl-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title fw-bold text-dark m-0">📋 Aktif Rapor Verileri</h5>
              <span className="badge bg-dark-subtle text-dark-emphasis px-3 py-2 rounded-pill fw-medium">
                Toplam: {raporlar.length} Kayıt
              </span>
            </div>
            
            <div className="card-body p-0">
              {raporlar.length === 0 ? (
                <div className="text-center p-5 text-muted">
                  <div className="fs-1 mb-2">📁</div>
                  <p className="m-0 fw-medium">Gösterilecek rapor bulunamadı.</p>
                  <small>Lütfen soldan farklı bir hesap seçin veya yeni bir rapor ekleyin.</small>
                </div>
              ) : (
                <div className="table-responsive" style={{ maxHeight: "600px" }}>
                  <table className="table table-hover align-middle mb-0 text-nowrap">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th className="ps-4 py-3 text-secondary text-uppercase font-size-sm">Hesap</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Satış Türü</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Kazanç</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Tıklama</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Hedef Durumu</th>
                        <th className="pe-4 py-3 text-secondary text-uppercase font-size-sm text-end">Tarih</th>
                      </tr>
                    </thead>
                    <tbody>
                      {raporlar.map((r) => (
                        <tr key={r.RaporID} className="transition-all table-row-hover">
                          <td className="ps-4 fw-semibold text-primary">
                            @{r.HesapKullaniciAdi}
                          </td>
                          <td>
                            <span className="badge bg-light text-dark border px-2.5 py-1.5 fw-medium">
                              {r.SatisTuru}
                            </span>
                          </td>
                          <td className="fw-bold text-success">
                            {r.GuncelKazanc.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                          </td>
                          <td className="font-monospace text-secondary fw-medium">
                            {r.TiklamaSayisi.toLocaleString('tr-TR')}
                          </td>
                          <td>
                            <span className={`badge px-3 py-2 rounded-pill text-uppercase fw-bold ${
                              r.HedefDurumu?.toLowerCase().includes('tamam') || r.HedefDurumu?.toLowerCase().includes('aktif')
                                ? 'bg-success-subtle text-success' 
                                : 'bg-warning-subtle text-warning-emphasis'
                            }`}>
                              {r.HedefDurumu}
                            </span>
                          </td>
                          <td className="pe-4 text-end text-muted small">
                            {new Date(r.RaporTarih).toLocaleDateString('tr-TR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
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