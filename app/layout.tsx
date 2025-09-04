import "./globals.css";
import Link from "next/link";

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
        <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Perfectno 🚀</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </nav>
        </header>
        <main className="p-8">{children}</main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          <p>© 2025 Perfectno. Всички права запазени.</p>
        </footer>
      </body>
    </html>
  );
}
