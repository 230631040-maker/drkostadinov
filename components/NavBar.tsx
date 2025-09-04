"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/patients", label: "Patients" },
  { href: "/diagnoses", label: "Diagnoses" },
  { href: "/tests", label: "Tests" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-4 text-sm">
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`px-2 py-1 rounded ${active ? "bg-white/20 underline" : "hover:bg-white/10"}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
