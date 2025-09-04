"use client";
import { useState } from "react";
import {
  User,
  Calendar,
  FileText,
  Stethoscope,
} from "lucide-react";

export default function PatientDetails({ params }) {
  const { id } = params;

  // демо данни
  const patient = {
    id,
    name: "Иван Иванов",
    egn: "8506123456",
    birth: "1985-06-12",
    phone: "0888123456",
    email: "ivan@example.com",
  };

  // табове
  const [tab, setTab] = useState("data");

  // сесии
  const [sessions, setSessions] = useState([
    { date: "2025-01-10", notes: "Първа среща – оплаквания" },
    { date: "2025-02-05", notes: "Проследяване – подобрение" },
  ]);
  const [newSession, setNewSession] = useState({ date: "", notes: "" });

  function addSession(e) {
    e.preventDefault();
    if (!newSession.date || !newSession.notes) return;
    setSessions([...sessions, newSession]);
    setNewSession({ date: "", notes: "" });
  }

  // диагнози
  const allDiagnoses = ["Депресивен епизод", "Тревожно разстройство", "Шизофрения"];
  const [patientDiagnoses, setPatientDiagnoses] = useState([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [diagNote, setDiagNote] = useState("");

  function addDiagnosis() {
    if (!selectedDiagnosis) return;
    setPatientDiagnoses([
      ...patientDiagnoses,
      { name: selectedDiagnosis, note: diagNote },
    ]);
    setSelectedDiagnosis("");
    setDiagNote("");
  }

  // файлове
  const [files, setFiles] = useState([
    { name: "Резултат от тест.pdf" },
    { name: "Снимка.jpg" },
  ]);

  return (
    <section className="grid gap-6">
      <h2 className="text-3xl font-bold">Досие на {patient.name}</h2>

      {/* табове */}
      <div className="flex gap-4 border-b pb-2">
        <button
          onClick={() => setTab("data")}
          className={tab === "data" ? "font-bold text-blue-600" : ""}
        >
          <User className="inline w-4 h-4 mr-1" /> Данни
        </button>
        <button
          onClick={() => setTab("sessions")}
          className={tab === "sessions" ? "font-bold text-blue-600" : ""}
        >
          <Calendar className="inline w-4 h-4 mr-1" /> Сесии
        </button>
        <button
          onClick={() => setTab("diagnoses")}
          className={tab === "diagnoses" ? "font-bold text-blue-600" : ""}
        >
          <Stethoscope className="inline w-4 h-4 mr-1" /> Диагнози
        </button>
        <button
          onClick={() => setTab("files")}
          className={tab === "files" ? "font-bold text-blue-600" : ""}
        >
          <FileText className="inline w-4 h-4 mr-1" /> Файлове
        </button>
      </div>

      {/* съдържание */}
      {tab === "data" && (
        <div className="rounded-xl bg-white p-4 shadow grid gap-2">
          <p>
            <strong>ЕГН:</strong> {patient.egn}
          </p>
          <p>
            <strong>Рожд. дата:</strong> {patient.birth}
          </p>
          <p>
            <strong>Телефон:</strong> {patient.phone}
          </p>
          <p>
            <strong>Email:</strong> {patient.email}
          </p>
        </div>
      )}

      {tab === "sessions" && (
        <div className="grid gap-4">
          {/* форма за добавяне */}
          <form onSubmit={addSession} className="grid gap-2 max-w-md">
            <input
              type="date"
              className="border rounded p-2"
              value={newSession.date}
              onChange={(e) =>
                setNewSession({ ...newSession, date: e.target.value })
              }
            />
            <textarea
              className="border rounded p-2"
              placeholder="Бележки"
              value={newSession.notes}
              onChange={(e) =>
                setNewSession({ ...newSession, notes: e.target.value })
              }
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              ➕ Добави сесия
            </button>
          </form>

          {/* списък със сесии */}
          <div className="grid gap-3">
            {sessions.map((s, i) => (
              <div key={i} className="rounded-xl bg-white p-4 shadow">
                <p>
                  <strong>Дата:</strong> {s.date}
                </p>
                <p>{s.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "diagnoses" && (
        <div className="grid gap-4">
          {/* добавяне на диагноза */}
          <div className="flex gap-2 max-w-md">
            <select
              className="border rounded p-2 flex-1"
              value={selectedDiagnosis}
              onChange={(e) => setSelectedDiagnosis(e.target.value)}
            >
              <option value="">-- Избери диагноза --</option>
              {allDiagnoses.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <input
              className="border rounded p-2 flex-1"
              placeholder="Бележка"
              value={diagNote}
              onChange={(e) => setDiagNote(e.target.value)}
            />
            <button
              onClick={addDiagnosis}
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              ➕
            </button>
          </div>

          {/* списък с диагнози */}
          <div className="grid gap-3">
            {patientDiagnoses.map((d, i) => (
              <div key={i} className="rounded-xl bg-white p-4 shadow">
                <p>
                  <strong>{d.name}</strong>
                </p>
                {d.note && <p className="text-sm text-gray-600">{d.note}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "files" && (
        <div className="grid gap-3">
          <div className="rounded-xl bg-white p-4 shadow">
            <p>⚠️ Качване на файлове ще добавим, когато вържем Supabase Storage.</p>
          </div>
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
