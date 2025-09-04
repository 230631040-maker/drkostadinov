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

      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Име и фамилия */}
        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm font-medium text-[#212845]">
            Име и фамилия
          </label>
          <input
            id="name"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#212845]/40"
            placeholder="Име и фамилия"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Рождена дата */}
        <div className="grid gap-1">
          <label htmlFor="birth" className="text-sm font-medium text-[#212845]">
            Рождена дата
          </label>
          <input
            id="birth"
            type="date"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#212845]/40"
            value={form.birth}
            onChange={(e) => setForm({ ...form, birth: e.target.value })}
          />
        </div>

        {/* Дата на първо посещение */}
        <div className="grid gap-1">
          <label htmlFor="firstVisit" className="text-sm font-medium text-[#212845]">
            Дата на първо посещение
          </label>
          <input
            id="firstVisit"
            type="date"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#212845]/40"
            value={form.firstVisit}
            onChange={(e) => setForm({ ...form, firstVisit: e.target.value })}
          />
        </div>

        {/* Телефон */}
        <div className="grid gap-1">
          <label htmlFor="phone" className="text-sm font-medium text-[#212845]">
            Телефон
          </label>
          <input
            id="phone"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#212845]/40"
            placeholder="Телефон"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="grid gap-1">
          <label htmlFor="email" className="text-sm font-medium text-[#212845]">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#212845]/40"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Бутон – тъмно син като хедъра */}
        <button
          type="submit"
          className="text-white px-4 py-2 rounded font-semibold transition hover:opacity-90"
          style={{ backgroundColor: "#212845" }}
        >
          Запази пациента
        </button>
      </form>
    </section>
  );
}
