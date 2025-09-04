"use client";
import { useState } from "react";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", diagnosis: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.age || !form.diagnosis) return;
    setPatients([...patients, { ...form, id: Date.now() }]);
    setForm({ name: "", age: "", diagnosis: "" });
  }

  return (
    <section className="grid gap-6">
      <h2 className="text-3xl font-bold">Patients</h2>

      <form onSubmit={handleSubmit} className="grid gap-3 max-w-md">
        <input
          className="border rounded p-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border rounded p-2"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <input
          className="border rounded p-2"
          placeholder="Diagnosis"
          value={form.diagnosis}
          onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Patient
        </button>
      </form>

      <div className="grid gap-3">
        {patients.map((p) => (
          <div key={p.id} className="rounded-xl bg-white p-4 shadow">
            <p><strong>Name:</strong> {p.name}</p>
            <p><strong>Age:</strong> {p.age}</p>
            <p><strong>Diagnosis:</strong> {p.diagnosis}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
