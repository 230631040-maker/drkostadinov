"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, ClipboardList, Activity } from "lucide-react";

const links = [
  { href: "/patients", label: "Пациенти", icon: Users, color: "#D6628D" },      // розово-малиново
  { href: "/diagnoses", label: "Диагнози", icon: ClipboardList, color: "#D6ED17" }, // лайм зелено
  { href: "/tests", label: "Тестове и изследвания", icon: Activity, color: "#39A0B0" } // акцент синьо-зелено
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 items-center justify-center w-full px-6 py-4 bg-[#000E18] shadow-md">
      {links.map(({ href, label, icon: Icon, color }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition transform ${
              active ? "scale-105 ring-2 ring-white" : "hover:scale-105"
            }`}
            style={{
              backgroundColor: color,
              color: "#000E18"
            }}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
