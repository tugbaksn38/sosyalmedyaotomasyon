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
    try {
      const res = await fetch("/api/hedef-kitle");
      const data = await res.json();
      setListe(data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  }

  // ESLint Güvenli ve Temiz useEffect Yüklemesi
  useEffect(() => {
    let isMounted = true;
    
    async function initData() {
      try {
        const res = await fetch("/api/hedef-kitle");
        const data = await res.json();
        if (isMounted) {
          setListe(data);
        }
      } catch (error) {
        console.error("useEffect yükleme hatası:", error);
      }
    }

    initData();
    return () => {
      isMounted = false;
    };
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
    <div className="container-fluid py-4 animate fade-in">
      {/* BAŞLIK */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
            🎯 Hedef Kitle Tanımlamaları
          </h2>
          <p className="text-muted small m-0 mt-1">Kampanyalar ve analizler için demografik kitle grupları oluşturun.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* SOL KOLON: FORM (Daha cool ve minimalist tasarlandı) */}
        <div className="col-12 col-xl-4">
          <div className="card shadow-sm border-start border-primary border-3 transition-all bg-white rounded-3">
            <div className="card-header bg-transparent pt-4 pb-0 border-0">
              <h5 className="card-title fw-bold text-dark m-0 d-flex align-items-center gap-2">
                <span className="text-primary">✨</span> Yeni Kitle Grubu
              </h5>
            </div>
            <div className="card-body pt-3">
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label text-secondary small fw-medium">Kitle Tanım Adı</label>
                  <input
                    className="form-control border-light-subtle bg-light-subtle"
                    placeholder="Örn: Genç Girişimciler"
                    value={form.HedefKitleAdi}
                    onChange={(e) => setForm({ ...form, HedefKitleAdi: e.target.value })}
                    required
                  />
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label text-secondary small fw-medium">En Az Yaş</label>
                    <input
                      type="number"
                      className="form-control border-light-subtle bg-light-subtle"
                      placeholder="Başlangıç"
                      value={form.KitleBasYas}
                      onChange={(e) => setForm({ ...form, KitleBasYas: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-secondary small fw-medium">En Çok Yaş</label>
                    <input
                      type="number"
                      className="form-control border-light-subtle bg-light-subtle"
                      placeholder="Bitiş"
                      value={form.KitleSonYas}
                      onChange={(e) => setForm({ ...form, KitleSonYas: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label text-secondary small fw-medium">Ülke</label>
                    <input
                      className="form-control border-light-subtle bg-light-subtle"
                      placeholder="Örn: Türkiye"
                      value={form.KitleUlke}
                      onChange={(e) => setForm({ ...form, KitleUlke: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-secondary small fw-medium">Şehir</label>
                    <input
                      className="form-control border-light-subtle bg-light-subtle"
                      placeholder="Örn: İstanbul"
                      value={form.KitleSehir}
                      onChange={(e) => setForm({ ...form, KitleSehir: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label text-secondary small fw-medium">Cinsiyet</label>
                    <input
                      className="form-control border-light-subtle bg-light-subtle"
                      placeholder="Örn: Hepsi"
                      value={form.KitleCinsiyet}
                      onChange={(e) => setForm({ ...form, KitleCinsiyet: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label text-secondary small fw-medium">Gelir Düzeyi</label>
                    <input
                      className="form-control border-light-subtle bg-light-subtle"
                      placeholder="Örn: Orta"
                      value={form.KitleGelirDuzeyi}
                      onChange={(e) => setForm({ ...form, KitleGelirDuzeyi: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-dark fw-semibold py-2.5 mt-2 shadow-sm hover-up text-white">
                  🚀 Kitleyi Sisteme Kaydet
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* SAĞ KOLON: LİSTE */}
        <div className="col-12 col-xl-8">
          <div className="card shadow-sm border-0 bg-white rounded-3 h-100">
            <div className="card-header bg-transparent py-4 border-bottom border-light d-flex justify-content-between align-items-center">
              <h5 className="card-title fw-bold text-dark m-0">📋 Kayıtlı Segmentler</h5>
              <span className="badge bg-light text-dark border border-light-subtle px-3 py-2 rounded-pill fw-semibold">
                Toplam: {liste.length} Kitle
              </span>
            </div>

            <div className="card-body p-0">
              {liste.length === 0 ? (
                <div className="text-center p-5 text-muted">
                  <div className="fs-1 mb-2">🎯</div>
                  <p className="m-0 fw-medium">Henüz bir kitle segmenti eklenmedi.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0 text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4 py-3 text-secondary text-uppercase font-size-sm">ID</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Kitle Adı</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Yaş Aralığı</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Coğrafi Konum</th>
                        <th className="py-3 text-secondary text-uppercase font-size-sm">Cinsiyet</th>
                        <th className="pe-4 py-3 text-secondary text-uppercase font-size-sm">Gelir Düzeyi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {liste.map((k) => (
                        <tr key={k.KitleID} className="transition-all table-row-hover">
                          <td className="ps-4">
                            <span className="badge bg-light text-secondary border border-light-subtle px-2.5 py-1.5 fw-medium">
                              {k.KitleID}
                            </span>
                          </td>
                          <td className="fw-semibold text-dark">{k.HedefKitleAdi}</td>
                          <td className="fw-medium font-monospace text-secondary">{k.KitleBasYas} - {k.KitleSonYas} Yaş</td>
                          <td className="text-muted">📍 {k.KitleUlke} / {k.KitleSehir}</td>
                          <td>
                            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2.5 py-1.5 fw-medium text-uppercase">
                              {k.KitleCinsiyet}
                            </span>
                          </td>
                          <td className="pe-4 fw-medium text-muted">{k.KitleGelirDuzeyi}</td>
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
        .form-control {
          border-color: #e2e8f0 !important;
          background-color: #f8fafc !important;
          transition: all 0.15s ease-in-out;
        }
        .form-control:focus {
          background-color: #ffffff !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
        }
        .hover-up { transition: all 0.2s ease; }
        .hover-up:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important; }
        .table-row-hover:hover { background-color: #f8fafc !important; }
        .font-size-sm { font-size: 0.72rem !important; letter-spacing: 0.5px; opacity: 0.8; }
      `}</style>
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