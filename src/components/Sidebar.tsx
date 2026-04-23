"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "📊 Dashboard" },
    { href: "/dns-bilgi", label: "👤 Danışanlar" },
    { href: "/hedef-kitle", label: "🎯 Hedef Kitle" },
    { href: "/hesaplar", label: "📱 Hesaplar" },
    { href: "/paketler", label: "📦 Paketler" },
    { href: "/raporlar", label: "📈 Raporlar" },
  ];

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f172a, #020617)",
        color: "#fff",
        padding: "20px",
        boxShadow: "4px 0 12px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          fontSize: "18px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        }}
      >
        🚀 Sosyal Medya Paneli
      </h2>

      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href} style={{ marginBottom: "8px" }}>
                <Link
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: isActive ? "#0f172a" : "#e5e7eb",
                    backgroundColor: isActive ? "#38bdf8" : "transparent",
                    fontWeight: isActive ? "600" : "400",
                    transform: isActive ? "translateX(6px)" : "translateX(0)",
                    transition:
                      "all 0.25s ease, background-color 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(56,189,248,0.15)";
                      e.currentTarget.style.transform = "translateX(6px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}