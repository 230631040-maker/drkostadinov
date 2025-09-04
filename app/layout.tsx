import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

export const metadata = {
  title: "Perfectno",
  description: "Professional site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-blue-600 text-white">
          <Container>
            <div className="flex items-center justify-between py-4">
              <h1 className="text-2xl font-bold">Perfectno 🚀</h1>
              <NavBar />
            </div>
          </Container>
        </header>
        <main className="py-10">
          <Container>{children}</Container>
        </main>
        <Footer />
      </body>
    </html>
  );
}
