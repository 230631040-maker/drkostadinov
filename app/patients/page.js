"use client"; 
import { useState } from "react";
import Link from "next/link";
import { User, Activity } from "lucide-react"; // иконки

export default function Patients() {
  // ❌ премахнати фиксираните пациенти
  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="grid gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Пациенти</h2>
        <Link
          href="/patients/new"
          className="text-white px-4 py-2 rounded"
          style={{ backgroundColor: "#212845" }}
        >
          ➕ Добави нов пациент
        </Link>
      </div>

      <input
        type="text"
        placeholder="Търсене по име..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 max-w-md"
      />

      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <p className="text-gray-500">Няма добавени пациенти.</p>
        ) : (
          filtered.map((p, index) => (
            <Link
              href={`/patients/${p.id}`}
              key={p.id}
              className={`rounded-xl p-4 shadow hover:shadow-md transition 
                ${index % 2 === 0 ? "bg-white" : "bg-[#f5faff]"}`}
            >
              <p className="flex items-center gap-2">
                <User size={18} className="text-[#212845]" />
                <span>
                  <strong>Име:</strong> {p.name}
                </span>
              </p>
              <p>
                <strong>Рожд. дата:</strong> {p.birth}
              </p>
              <p>
                <strong>Телефон:</strong> {p.phone}
              </p>
              <p>
                <strong>Email:</strong> {p.email}
              </p>
              <p className="flex items-center gap-2">
                <Activity size={18} className="text-[#D6628D]" />
                <span>
                  <strong>Основна диагноза:</strong> {p.diagnosis}
                </span>
              </p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
