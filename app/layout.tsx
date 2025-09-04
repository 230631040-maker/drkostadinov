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
      <body className="bg-[#000E18] text-white">
        <header className="bg-[#000E18] text-white shadow-md">
          <Container>
            <div className="flex items-center justify-between py-4">
              {/* Тук слагаме логото вместо текста */}
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Dr.Kostadinov Logo" className="h-10 w-10 rounded-full" />
                <h1 className="text-2xl font-bold">Dr.Kostadinov</h1>
              </div>
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
