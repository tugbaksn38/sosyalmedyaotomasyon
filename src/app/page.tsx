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

  // 📊 BAR CHART
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

  // 🍩 DOUGHNUT CHART
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
    return <div style={{ padding: 20 }}>Yükleniyor...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      {/* 🔢 SAYI KARTLARI */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <StatCard title="Danışan" value={stats.danisan} />
        <StatCard title="Hesap" value={stats.hesap} />
        <StatCard title="Paket" value={stats.paket} />
        <StatCard title="Rapor" value={stats.rapor} />
      </div>

      {/* 📈 GRAFİKLER */}
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ width: "55%" }}>
          <h4>Genel Durum</h4>
          <Bar data={barData} />
        </div>

        <div style={{ width: "35%" }}>
          <h4>Dağılım</h4>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
}

// 🔹 KÜÇÜK KART
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        minWidth: 130,
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}