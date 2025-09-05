"use client";
import { useMemo, useState } from "react";

// Главни категории F00–F98
const categoriesInit = [
  { code: "F00-F09", name: "F00–F09 Органични, включително симптоматични, психични разстройства", icon: "🧠", diagnoses: [] },
  { code: "F10-F19", name: "F10–F19 Психични и поведенчески разстройства, дължащи се на употреба на психоактивни вещества", icon: "🍺", diagnoses: [] },
  { code: "F20-F29", name: "F20–F29 Шизофрения, шизотипни и налудни разстройства", icon: "🌀", diagnoses: [] },
  { code: "F30-F39", name: "F30–F39 Разстройства на настроението (афективни разстройства)", icon: "🌗", diagnoses: [] },
  { code: "F40-F48", name: "F40–F48 Невротични, свързани със стрес и соматоформни разстройства", icon: "😰", diagnoses: [] },
  { code: "F50-F59", name: "F50–F59 Поведенчески синдроми, свързани с физиологични разстройства и соматични фактори", icon: "🍽️", diagnoses: [] },
  { code: "F60-F69", name: "F60–F69 Разстройства на личността и поведението в зряла възраст", icon: "🧩", diagnoses: [] },
  { code: "F70-F79", name: "F70–F79 Умствена изостаналост", icon: "📉", diagnoses: [] },
  { code: "F80-F89", name: "F80–F89 Разстройства в психологичното развитие", icon: "🧒", diagnoses: [] },
  { code: "F90-F98", name: "F90–F98 Поведенчески и емоционални разстройства с начало, типично за детството и юношеството", icon: "🎈", diagnoses: [] }
];

export default function DiagnosesPage() {
  const [categories, setCategories] = useState(categoriesInit);
  const firstCode = categories.length > 0 ? categories[0].code : null;
  const [selectedCode, setSelectedCode] = useState(firstCode);
  const [form, setForm] = useState({ code: "", name: "", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" });

  const selectedCategory = useMemo(
    () => categories.find((c) => c.code === selectedCode) || categories[0],
    [selectedCode, categories]
  );

  const addDiagnosis = () => {
    if (!form.code || !form.name) return;
    const updated = categories.map((cat) => {
      if (cat.code === selectedCategory.code) {
        return { ...cat, diagnoses: [...cat.diagnoses, form] };
      }
      return cat;
    });
    setCategories(updated);
    setForm({ code: "", name: "", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" });
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="col-span-1 bg-white rounded-xl p-4 shadow">
        <h2 className="text-xl font-bold mb-4 text-[#212845]">Категории</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.code}>
              <button
                onClick={() => setSelectedCode(cat.code)}
                className={`w-full text-left p-2 rounded flex items-center gap-2 font-medium transition ${
                  selectedCode === cat.code
                    ? "bg-[#212845] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <main className="col-span-3">
        <h2 className="text-2xl font-bold mb-4 text-[#212845]">
          {selectedCategory.name}
        </h2>

        {/* Форма за добавяне */}
        <div className="rounded-xl bg-white p-6 shadow grid gap-3 mb-6">
          <h3 className="text-xl font-semibold text-[#D6628D]">Добави нова диагноза</h3>
          <input placeholder="Код (напр. F00)" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Име" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2 rounded" />
          <textarea placeholder="Описание" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-2 rounded" />
          <textarea placeholder="Симптоми" value={form.symptoms} onChange={(e) => setForm({ ...form, symptoms: e.target.value })} className="border p-2 rounded" />
          <textarea placeholder="Медикаментозно лечение" value={form.treatment_med} onChange={(e) => setForm({ ...form, treatment_med: e.target.value })} className="border p-2 rounded" />
          <textarea placeholder="Психологическа подкрепа" value={form.treatment_psych} onChange={(e) => setForm({ ...form, treatment_psych: e.target.value })} className="border p-2 rounded" />
          <textarea placeholder="Прогноза" value={form.prognosis} onChange={(e) => setForm({ ...form, prognosis: e.target.value })} className="border p-2 rounded" />
          <button onClick={addDiagnosis} className="bg-[#212845] text-white py-2 rounded">Добави</button>
        </div>

        {/* Показване на добавени диагнози */}
        <div className="grid gap-6">
          {selectedCategory.diagnoses.map((d, i) => (
            <div key={i} className="rounded-xl bg-white p-6 shadow grid gap-3">
              <h3 className="text-xl font-semibold text-[#D6628D]">
                {d.code} – {d.name}
              </h3>
              <p><strong>Описание:</strong> {d.description}</p>
              <p><strong>Симптоми:</strong> {d.symptoms}</p>
              <p><strong>Медикаментозно лечение:</strong> {d.treatment_med}</p>
              <p><strong>Психологическа подкрепа:</strong> {d.treatment_psych}</p>
              <p><strong>Прогноза:</strong> {d.prognosis}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
