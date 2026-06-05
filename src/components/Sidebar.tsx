"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const links = [
    { href: "/", label: "Dashboard", icon: "📊" },
    { href: "/dns-bilgi", label: "Danışanlar", icon: "👤" },
    { href: "/hedef-kitle", label: "Hedef Kitle", icon: "🎯" },
    { href: "/hesaplar", label: "Hesaplar", icon: "📱" },
    { href: "/paketler", label: "Paketler", icon: "📦" },
    { href: "/raporlar", label: "Raporlar", icon: "📈" },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .sidebar-link {
          position: relative;
          overflow: hidden;
        }
        
        .sidebar-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 70%;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          border-radius: 0 4px 4px 0;
          transition: width 0.3s ease;
        }
        
        .sidebar-link:hover::before {
          width: 4px;
        }
        
        .sidebar-link.active::before {
          width: 4px;
          background: linear-gradient(135deg, #38bdf8, #a78bfa);
        }
      `}</style>
      
      <aside
        style={{
          width: "280px",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 10s ease infinite",
          color: "#fff",
          padding: "28px 20px",
          boxShadow: "4px 0 20px rgba(0,0,0,0.3), inset -1px 0 0 rgba(255,255,255,0.05)",
          position: "relative",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Animated Logo Section */}
        <div
          style={{
            marginBottom: "40px",
            textAlign: "center",
            animation: "fadeInSlide 0.6s ease-out",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginBottom: "12px",
              display: "inline-block",
              animation: "pulse 2s ease-in-out infinite",
              cursor: "pointer",
            }}
          >
            🚀
          </div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #38bdf8, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.5px",
              margin: 0,
            }}
          >
            Sosyal Medya Paneli
          </h2>
          <div
            style={{
              height: "3px",
              width: "50px",
              background: "linear-gradient(90deg, #38bdf8, #a78bfa)",
              margin: "12px auto 0",
              borderRadius: "2px",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Navigation */}
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {links.map((link, index) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredLink === link.href;

              return (
                <li
                  key={link.href}
                  style={{
                    marginBottom: "12px",
                    animation: `fadeInSlide 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <Link
                    href={link.href}
                    className={`sidebar-link ${isActive ? "active" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      textDecoration: "none",
                      color: isActive ? "#ffffff" : "#cbd5e1",
                      backgroundColor: isActive 
                        ? "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(139,92,246,0.15))"
                        : isHovered 
                        ? "rgba(56,189,248,0.1)" 
                        : "transparent",
                      fontWeight: isActive ? "600" : "500",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: isActive || isHovered ? "translateX(8px)" : "translateX(0)",
                      position: "relative",
                      backdropFilter: isActive ? "blur(10px)" : "none",
                    }}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        transition: "transform 0.3s ease",
                        transform: isActive || isHovered ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {link.icon}
                    </span>
                    <span style={{ flex: 1 }}>{link.label}</span>
                    {isActive && (
                      <span
                        style={{
                          fontSize: "12px",
                          animation: "pulse 1s ease-in-out infinite",
                        }}
                      >
                        ●
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Decoration */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            right: "20px",
            textAlign: "center",
            paddingTop: "20px",
            borderTop: "1px solid rgba(56,189,248,0.2)",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
              transition: "color 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            ⚡ v2.0 | Premium
          </div>
        </div>
      </aside>
    </>
  );
}