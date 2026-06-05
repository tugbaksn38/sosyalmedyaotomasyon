// Önce Bootstrap yükleniyor (Genel stiller)
import "bootstrap/dist/css/bootstrap.min.css";
// Sonra senin kendi CSS dosyan ve Tailwind yükleniyor (Bootstrap'i ezebilmesi için)
import "./globals.css"; 
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body style={{ margin: 0 }}>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
          }}
        >
          {/* Sidebar yapın aynen korunuyor */}
          <Sidebar />

          {/* Ana içerik yapın aynen korunuyor */}
          <main
            style={{
              flex: 1,
              padding: "20px",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}