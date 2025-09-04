import "./globals.css";

export const metadata = {
  title: "Perfectno",
  description: "My awesome app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <header className="p-4 bg-blue-600 text-white text-center">
          <h1 className="text-2xl font-bold">Perfectno 🚀</h1>
        </header>
        <main className="p-8">{children}</main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          <p>© 2025 Perfectno. Всички права запазени.</p>
        </footer>
      </body>
    </html>
  );
}
