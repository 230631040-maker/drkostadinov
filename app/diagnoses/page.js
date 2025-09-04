"use client";
import { useState } from "react";
import { Brain, Pill, Meh, Smile } from "lucide-react";

// Примерни категории и диагнози (по шаблон)
const categories = [
  {
    code: "F00-F09",
    name: "Органични психични разстройства",
    icon: "🧠",
    diagnoses: [
      {
        code: "F00",
        name: "Деменция при болестта на Алцхаймер",
        description: "Прогресивно невродегенеративно заболяване.",
        symptoms: "Загуба на памет, когнитивен спад, дезориентация.",
        treatment_med: "Антидементни лекарства (донепезил, мемантин).",
        treatment_psych: "Когнитивна рехабилитация, психосоциална подкрепа.",
        prognosis: "Прогресивно влошаване, възможно забавяне с лечение.",
        category: "Органични психични разстройства"
      },
      {
        code: "F01",
        name: "Съдова деменция",
        description: "Деменция, свързана със съдови увреждания.",
        symptoms: "Намалени когнитивни функции след инсулти.",
        treatment_med: "Антихипертензивни, антиагреганти.",
        treatment_psych: "Поддържаща терапия, когнитивни тренировки.",
        prognosis: "Прогресираща, зависи от контрола на рисковите фактори.",
        category: "Органични психични разстройства"
      }
    ]
  },
  {
    code: "F30-F39",
    name: "Афективни разстройства",
    icon: "😔",
    diagnoses: [
      {
        code: "F32",
        name: "Депресивен епизод",
        description: "Епизодично настъпващо депресивно състояние.",
        symptoms: "Понижено настроение, липса на енергия, безсъние.",
        treatment_med: "Антидепресанти (SSRIs, SNRIs).",
        treatment_psych: "Когнитивно-поведенческа терапия, групова терапия.",
        prognosis: "Добро повлияване при ранно лечение.",
        category: "Афективни разстройства"
      }
    ]
  },
  {
    code: "PSY-01",
    name: "Психологически личностови разстройства",
    icon: "🙂",
    diagnoses: [
      {
        code: "PSY-L1",
        name: "Гранично личностово разстройство",
        description: "Емоционална нестабилност, импулсивност.",
        symptoms: "Промени в настроението, самонараняващо поведение.",
        treatment_med: "Антипсихотици (в някои случаи).",
        treatment_psych: "Диалектична поведенческа терапия (DBT).",
        prognosis: "Възможно стабилизиране при дългосрочна терапия.",
        category: "Психологически личностови разстройства"
      }
    ]
  }
];

export default function DiagnosesPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="col-span-1 bg-gray-100 rounded-xl p-4 shadow">
        <h2 className="text-xl font-bold mb-4">Категории</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.code}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left p-2 rounded flex items-center gap-2 ${
                  selectedCategory.code === cat.code
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200"
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
        <h2 className="text-2xl font-bold mb-4">
          {selectedCategory.name}
        </h2>
        <div className="grid gap-6">
          {selectedCategory.diagnoses.map((d) => (
            <div key={d.code} className="rounded-xl bg-white p-6 shadow grid gap-3">
              <h3 className="text-xl font-semibold">
                {d.code} – {d.name}
              </h3>
              <p><strong>Описание:</strong> {d.description}</p>
              <p><strong>Симптоми:</strong> {d.symptoms}</p>
              <p><strong>Лечение (лекарства):</strong> {d.treatment_med}</p>
              <p><strong>Лечение (психология):</strong> {d.treatment_psych}</p>
              <p><strong>Прогноза:</strong> {d.prognosis}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
