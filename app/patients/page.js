"use client";
import { useState } from "react";
import Link from "next/link";

export default function Patients() {
  const [patients, setPatients] = useState([
    { id: 1, name: "Иван Иванов", birth: "1985-06-12", phone: "0888123456", email: "ivan@example.com" },
    { id: 2, name: "Мария Петрова", birth: "1990-03-21", phone: "0888987654", email: "maria@example.com" },
  ]);

  const [search, setSearch] = useState("");

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="grid gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Пациенти</h2>
        <Link href="/patients/new" className="bg-blue-600 text-white px-4 py-2 rounded">
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
        {filtered.map((p) => (
          <Link
            href={`/patients/${p.id}`}
            key={p.id}
            className="rounded-xl bg-white p-4 shadow hover:shadow-md"
          >
            <p><strong>Име:</strong> {p.name}</p>
            <p><strong>Рожд. дата:</strong> {p.birth}</p>
            <p><strong>Телефон:</strong> {p.phone}</p>
            <p><strong>Email:</strong> {p.email}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
