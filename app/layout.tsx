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
      <body className="bg-gray-100 text-gray-900">
        {/* Горна лента: тъмно синьо */}
        <header className="bg-[#212845] text-white shadow-md">
          <Container>
            <div className="flex items-center justify-between py-4 gap-4 flex-wrap">
              {/* Само име без лого */}
              <h1 className="text-3xl font-extrabold tracking-tight whitespace-nowrap">
                Dr.Kostadinov
              </h1>
              <div className="flex-1">
                <NavBar />
              </div>
            </div>
          </Container>
        </header>

        {/* Светла централна част */}
        <main className="py-10">
          <Container>{children}</Container>
        </main>

        <Footer />
      </body>
    </html>
  );
}
