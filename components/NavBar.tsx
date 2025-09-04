"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, ClipboardList, Activity } from "lucide-react"; // иконки

const links = [
  { href: "/patients", label: "Пациенти", icon: Users, color: "#D6628D" }, // розово-малиново
  { href: "/diagnoses", label: "Диагнози", icon: ClipboardList, color: "#D6ED17" }, // лайм зелено
  { href: "/tests", label: "Тестове и изследвания", icon: Activity, color: "#8CFFFB" }, // акцент
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 text-lg font-semibold">
      {links.map(({ href, label, icon: Icon, color }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
              active ? "underline" : "hover:scale-105"
            }`}
            style={{ color }}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
