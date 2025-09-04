"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPatient() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    birth: "",
    firstVisit: "",
    phone: "",
    email: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Patient saved:", form);
    alert("Пациентът е добавен успешно!");
    router.push("/patients");
  }

  return (
    <section className="grid gap-6 max-w-lg">
      <h2 className="text-3xl font-bold text-[#212845]">➕ Нов пациент</h2>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          className="border rounded p-2"
          placeholder="Име и фамилия"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="date"
          className="border rounded p-2"
          value={form.birth}
          onChange={(e) => setForm({ ...form, birth: e.target.value })}
          placeholder="Рожд. дата"
        />

        <input
          type="date"
          className="border rounded p-2"
          value={form.firstVisit}
          onChange={(e) => setForm({ ...form, firstVisit: e.target.value })}
          placeholder="Дата на първо посещение"
        />

        <input
          className="border rounded p-2"
          placeholder="Телефон"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="email"
          className="border rounded p-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button className="bg-[#D6628D] hover:bg-[#b84d6f] text-white px-4 py-2 rounded transition">
          Запази пациента
        </button>
      </form>
    </section>
  );
}
