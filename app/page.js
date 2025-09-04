"use client";
import { Brain } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      {/* Икона на мозък */}
      <div className="p-6 rounded-full bg-[#D6ED17]/20">
        <Brain size={80} className="text-[#212845]" />
      </div>

      {/* Приветствено съобщение */}
      <h1 className="text-4xl font-extrabold text-[#212845]">
        Добре дошли при <span className="text-[#D6628D]">Dr.Kostadinov</span>
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl">
        Вашето приложение за психично здраве, диагнози и изследвания.
      </p>
    </div>
  );
}
