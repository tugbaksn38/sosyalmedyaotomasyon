//C:\Users\sifre\Desktop\sosyalmedya\sosyalmedya\src\app\page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

type Stats = {
  danisan: number;
  hesap: number;
  paket: number;
  rapor: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    danisan: 0,
    hesap: 0,
    paket: 0,
    rapor: 0,
  });

  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      setLoading(true);

      const [dnsRes, hesapRes, paketRes, raporRes] = await Promise.all([
        fetch("/api/dns-bilgi"),
        fetch("/api/hesaplar"),
        fetch("/api/paketler"),
        fetch("/api/raporlar"),
      ]);

      const [dns, hesap, paket, rapor] = await Promise.all([
        dnsRes.json(),
        hesapRes.json(),
        paketRes.json(),
        raporRes.json(),
      ]);

      setStats({
        danisan: Array.isArray(dns) ? dns.length : 0,
        hesap: Array.isArray(hesap) ? hesap.length : 0,
        paket: Array.isArray(paket) ? paket.length : 0,
        rapor: Array.isArray(rapor) ? rapor.length : 0,
      });
    } catch (err) {
      console.error("Dashboard veri hatası:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  const barData = {
    labels: ["Danışan", "Hesap", "Paket", "Rapor"],
    datasets: [
      {
        label: "Toplam Sayılar",
        data: [
          stats.danisan,
          stats.hesap,
          stats.paket,
          stats.rapor,
        ],
        backgroundColor: [
          "#4f46e5",
          "#16a34a",
          "#f59e0b",
          "#dc2626",
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ["Danışan", "Hesap", "Paket", "Rapor"],
    datasets: [
      {
        data: [
          stats.danisan,
          stats.hesap,
          stats.paket,
          stats.rapor,
        ],
        backgroundColor: [
          "#6366f1",
          "#22c55e",
          "#fbbf24",
          "#ef4444",
        ],
      },
    ],
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-gray-800 fw-bold">📊 Dashboard</h2>

      {/* 🔢 SAYI KARTLARI */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-md-3">
          <StatCard title="Danışan" value={stats.danisan} borderClass="border-start border-primary border" />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <StatCard title="Hesap" value={stats.hesap} borderClass="border-start border-success border-2" />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <StatCard title="Paket" value={stats.paket} borderClass="border-start border-warning border-2" />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <StatCard title="Rapor" value={stats.rapor} borderClass="border-start border-danger border-2" />
        </div>
      </div>

      {/* 📈 GRAFİKLER */}
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-light fw-bold">Genel Durum</div>
            <div className="card-body">
              <Bar data={barData} options={{ responsive: true }} />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-light fw-bold">Dağılım</div>
            <div className="card-body d-flex align-items-center justify-content-center">
              <div style={{ maxWidth: "300px", width: "100%" }}>
                <Doughnut data={doughnutData} options={{ responsive: true }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔹 KÜÇÜK KART
function StatCard({ title, value, borderClass }: { title: string; value: number; borderClass?: string }) {
  return (
    <div className={`card shadow-sm h-100 ${borderClass || ''}`}>
      <div className="card-body py-3">
        <div className="text-uppercase font-weight-bold text-muted small mb-1">{title}</div>
        <div className="h3 mb-0 font-weight-bold text-dark fw-bold">{value}</div>
      </div>
    </div>
  );
}