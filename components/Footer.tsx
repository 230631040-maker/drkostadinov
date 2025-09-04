export default function Footer() {
  return (
    <footer className="bg-[#212845] text-white mt-16">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm">
        © {new Date().getFullYear()} Dr.Kostadinov. All rights reserved.
      </div>
    </footer>
  );
}
