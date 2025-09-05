"use client";
import { useMemo, useState } from "react";
import { User, Calendar, FileText, Stethoscope } from "lucide-react";
import { catalog, getAllDiagnosisNames } from "../../../lib/diagnosesCatalog";

export default function PatientDetails({ params }) {
  const { id } = params;

  // НЯМА твърдо вкарани пациенти. Минимален обект + безопасни стойности.
  const [patient, setPatient] = useState({
    id,
    name: "",       // оставено празно; показваме „Пациент“ ако е празно
    egn: "",
    birth: "",
    phone: "",
    email: "",
  });

  // табове
  const [tab, setTab] = useState("data");

  // сесии (празно по подразбиране)
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ date: "", notes: "" });

  function addSession(e) {
    e.preventDefault();
    if (!newSession.date || !newSession.notes) return;
    setSessions((prev) => [...prev, newSession]);
    setNewSession({ date: "", notes: "" });
  }

  // ⚠️ Диагнози — ПЪЛНИТЕ СЕ ОТ КАТАЛОГА (взима всички имена + поддиагнози)
  const options = useMemo(() => getAllDiagnosisNames(catalog), []);
  const [patientDiagnoses, setPatientDiagnoses] = useState([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [diagNote, setDiagNote] = useState("");

  function addDiagnosis() {
    if (!selectedDiagnosis) return;
    setPatientDiagnoses((prev) => [
      ...prev,
      { name: selectedDiagnosis, note: diagNote },
    ]);
    setSelectedDiagnosis("");
    setDiagNote("");
  }

  // файлове (празно)
  const [files] = useState([]);

  const safe = (v) => (v && String(v).trim().length ? v : "—");
  const displayName = patient.name?.trim() ? patient.name : "Пациент";

  return (
    <section className="grid gap-6">
      <h2 className="text-3xl font-bold">Досие на {displayName}</h2>

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
        <div className="grid gap-6">
          {/* Основна информация */}
          <div className="rounded-xl bg-white p-4 shadow grid gap-2">
            <h3 className="text-xl font-semibold border-b pb-1">
              Основна информация
            </h3>
            <p>
              <strong>Име:</strong> {safe(patient.name)}
            </p>
            <p>
              <strong>ЕГН:</strong> {safe(patient.egn)}
            </p>
            <p>
              <strong>Рожд. дата:</strong> {safe(patient.birth)}
            </p>
            <p>
              <strong>Телефон:</strong> {safe(patient.phone)}
            </p>
            <p>
              <strong>Email:</strong> {safe(patient.email)}
            </p>
          </div>

          {/* Медицинска информация (примерна секция, без фиксирана диагноза) */}
          <div className="rounded-xl bg-white p-4 shadow grid gap-2">
            <h3 className="text-xl font-semibold border-b pb-1">
              Медицинска информация
            </h3>
            <p>
              <strong>Основна диагноза:</strong>{" "}
              {patientDiagnoses[0]?.name ? patientDiagnoses[0].name : "—"}
            </p>
            <p>
              <strong>Бележка от последна среща:</strong> —
            </p>
          </div>
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
            {sessions.length === 0 ? (
              <p className="text-gray-500">Няма въведени сесии.</p>
            ) : (
              sessions.map((s, i) => (
                <div key={i} className="rounded-xl bg-white p-4 shadow">
                  <p>
                    <strong>Дата:</strong> {s.date}
                  </p>
                  <p>{s.notes}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {tab === "diagnoses" && (
        <div className="grid gap-4">
          {/* добавяне на диагноза */}
          <div className="flex gap-2 max-w-2xl items-center">
            <select
              className="border rounded p-2 flex-1"
              value={selectedDiagnosis}
              onChange={(e) => setSelectedDiagnosis(e.target.value)}
            >
              <option value="">-- Избери диагноза --</option>
              {options.length === 0 ? (
                <option disabled>Няма налични диагнози в каталога</option>
              ) : (
                options.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))
              )}
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
            {patientDiagnoses.length === 0 ? (
              <p className="text-gray-500">Няма добавени диагнози.</p>
            ) : (
              patientDiagnoses.map((d, i) => (
                <div key={i} className="rounded-xl bg-white p-4 shadow">
                  <p>
                    <strong>{d.name}</strong>
                  </p>
                  {d.note && <p className="text-sm text-gray-600">{d.note}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {tab === "files" && (
        <div className="grid gap-3">
          <div className="rounded-xl bg-white p-4 shadow">
            <p className="text-gray-500">
              Няма качени файлове. (Ще добавим качване по-късно.)
            </p>
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
