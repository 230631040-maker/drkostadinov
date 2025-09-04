import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Container from "../components/Container";

export const metadata = {
  title: "Dr.Kostadinov",
  description: "Психологично приложение",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      {/* Основният фон да е светло сив, текст тъмно сив */}
      <body className="bg-gray-100 text-gray-900">
        {/* Горната лента: тъмно синьо (#212845) */}
        <header className="bg-[#212845] text-white shadow-md">
          <Container>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                {/* използваме SVG по подразбиране; ако имаш PNG, смени на /logo.png */}
                <img src="/logo.svg" alt="Dr.Kostadinov Logo" className="h-10 w-10 rounded-full" />
                <h1 className="text-2xl font-bold">Dr.Kostadinov</h1>
              </div>
              <NavBar />
            </div>
          </Container>
        </header>

        {/* Централната част остава светла */}
        <main className="py-10">
          <Container>{children}</Container>
        </main>

        <Footer />
      </body>
    </html>
  );
}
