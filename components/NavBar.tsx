"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, ClipboardList, Activity } from "lucide-react";

const links = [
  { href: "/patients", label: "Пациенти", icon: Users, color: "#D6628D" },
  { href: "/diagnoses", label: "Диагнози", icon: ClipboardList, color: "#D6ED17" },
  { href: "/tests", label: "Тестове и изследвания", icon: Activity, color: "#39A0B0" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    // фонът идва от header-а, тук е прозрачно
    <nav className="w-full flex items-center justify-center gap-10">
      {links.map(({ href, label, icon: Icon, color }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 font-semibold text-xl transition-transform ${
              active ? "underline scale-105" : "hover:scale-105"
            }`}
            style={{ color }}
          >
            <Icon size={22} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
