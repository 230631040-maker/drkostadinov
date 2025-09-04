"use client";
import { useState } from "react";

export default function PatientDetails({ params }) {
  const { id } = params;

  // демо данни
  const patient = {
    id,
    name: "Иван Иванов",
    birth: "1985-06-12",
    phone: "0888123456",
    email: "ivan@example.com",
  };

  const [tab, setTab] = useState("data");
  const [sessions, setSessions] = useState([
    { date: "2025-01-10", notes: "Първа среща" },
    { date: "2025-02-05", notes: "Проследяване" },
  ]);
  const [files, setFiles] = useState([
    { name: "Резултат от тест.pdf" },
    { name: "Снимка.jpg" },
  ]);

  return (
    <section className="grid gap-6">
      <h2 className="text-3xl font-bold">Досие на пациент</h2>

      {/* табове */}
      <div className="flex gap-4">
        <button onClick={() => setTab("data")} className={tab === "data" ? "underline" : ""}>Данни</button>
        <button onClick={() => setTab("sessions")} className={tab === "sessions" ? "underline" : ""}>Сесии</button>
        <button onClick={() => setTab("diagnoses")} className={tab === "diagnoses" ? "underline" : ""}>Диагнози</button>
        <button onClick={() => setTab("files")} className={tab === "files" ? "underline" : ""}>Файлове</button>
      </div>

      {/* съдържание според таба */}
      {tab === "data" && (
        <div className="rounded-xl bg-white p-4 shadow">
          <p><strong>Име:</strong> {patient.name}</p>
          <p><strong>Рожд. дата:</strong> {patient.birth}</p>
          <p><strong>Телефон:</strong> {patient.phone}</p>
          <p><strong>Email:</strong> {patient.email}</p>
        </div>
      )}

      {tab === "sessions" && (
        <div className="grid gap-3">
          {sessions.map((s, i) => (
            <div key={i} className="rounded-xl bg-white p-4 shadow">
              <p><strong>Дата:</strong> {s.date}</p>
              <p>{s.notes}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "diagnoses" && (
        <div className="rounded-xl bg-white p-4 shadow">
          <p>⚠️ Тук по-късно ще свържем диагнози от меню „Диагнози“.</p>
        </div>
      )}

      {tab === "files" && (
        <div className="grid gap-3">
          {files.map((f, i) => (
            <div key={i} className="rounded-xl bg-white p-4 shadow">
              <p>{f.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
