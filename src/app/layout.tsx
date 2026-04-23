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
          {/* Sidebar */}
          <Sidebar />

          {/* Ana içerik */}
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
