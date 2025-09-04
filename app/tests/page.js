'use client'

// Route: /tests
// Страница: "Тестове и изследвания"
// Изисквания: 2 главни подменюта (Деца, Възрастни) -> категории (Стрес, Агресия, ...)
// Спазени цветове от ХРОНОЛОГИЯ.txt: #000E18, #212845, #D6628D, #D6ED17, #39A0B0, #8CFFFB, #DBB91E, #F16C48
// Икони: lucide-react (с резервни emoji при нужда)

import React from 'react'
import { useMemo, useState } from 'react'
import {
  Baby,
  User,
  Users,
  Brain,
  Activity,
  AlertTriangle,
  GraduationCap,
  Puzzle,
  Heart,
  BookOpen,
  ClipboardList,
  Search,
  Hourglass
} from 'lucide-react'

// Цветова палитра (арбитрарни Tailwind цветове)
const COLORS = {
  bg: '#000E18', // тъмен фон
  card: '#212845', // тъмна карта/панел
  accent1: '#D6628D', // розов акцент
  accent2: '#D6ED17', // лайм акцент
  accent3: '#39A0B0', // тийл акцент
  accentWarm: '#F16C48', // топъл акцент (CTA)
  text: '#FFFFFF',
  textMuted: '#8CFFFB'
}

// Домейни/категории
const DOMAINS = [
  { key: 'stress', label: 'Стрес', icon: Activity },
  { key: 'aggression', label: 'Агресия', icon: AlertTriangle },
  { key: 'anxiety', label: 'Тревожност', icon: Brain },
  { key: 'depression', label: 'Депресия', icon: Heart },
  { key: 'adhd', label: 'ADHD', icon: Brain },
  { key: 'asd', label: 'Аутизъм / ASD', icon: Puzzle },
  { key: 'cognitive', label: 'Когнитивни', icon: Brain },
  { key: 'personality', label: 'Личност', icon: User },
  { key: 'family', label: 'Семейни/Връзки', icon: Users },
  { key: 'school', label: 'Училищна адаптация', icon: GraduationCap }
]

// Демонстрационни тестове (MVP seed данни; по-късно идват от БД)
const ALL_TESTS = [
  { code: 'PSS-10', name: 'Скала за възприет стрес (PSS-10)', domains: ['stress'], minAge: 18, maxAge: 99, duration: 5, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'auto' },
  { code: 'PSS-C', name: 'PSS – детска версия', domains: ['stress'], minAge: 8, maxAge: 17, duration: 7, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'auto' },
  { code: 'GAD-7', name: 'Скала за генерализирана тревожност (GAD-7)', domains: ['anxiety'], minAge: 18, maxAge: 99, duration: 3, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'auto' },
  { code: 'SCAS', name: 'Spence Anxiety Scale (SCAS) – деца', domains: ['anxiety'], minAge: 8, maxAge: 17, duration: 10, type: 'самооценка/родител', languages: ['BG'], delivery: 'paper', scoring: 'manual' },
  { code: 'PHQ-9', name: 'Депресия – PHQ-9', domains: ['depression'], minAge: 18, maxAge: 99, duration: 3, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'auto' },
  { code: 'CDI-2', name: 'Детска депресивна инвентаризация (CDI-2)', domains: ['depression'], minAge: 7, maxAge: 17, duration: 10, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'manual' },
  { code: 'BPAQ', name: 'Buss–Perry Aggression Questionnaire (BPAQ)', domains: ['aggression'], minAge: 18, maxAge: 99, duration: 10, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'manual' },
  { code: 'RPQ', name: 'Reactive–Proactive Aggression Questionnaire (RPQ) – деца', domains: ['aggression'], minAge: 8, maxAge: 17, duration: 10, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'manual' },
  { code: 'ASRS', name: 'Adult ADHD Self-Report Scale (ASRS v1.1)', domains: ['adhd'], minAge: 18, maxAge: 99, duration: 5, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'auto' },
  { code: 'Conners-3', name: 'Conners 3 – родител/учител', domains: ['adhd'], minAge: 8, maxAge: 17, duration: 20, type: 'информант', languages: ['BG'], delivery: 'paper', scoring: 'manual' },
  { code: 'AQ-10', name: 'Autism Spectrum Quotient (AQ-10) – възрастни', domains: ['asd'], minAge: 18, maxAge: 99, duration: 3, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'auto' },
  { code: 'CARS-2', name: 'Childhood Autism Rating Scale (CARS-2)', domains: ['asd'], minAge: 2, maxAge: 17, duration: 20, type: 'клиницист', languages: ['BG'], delivery: 'paper', scoring: 'manual' },
  { code: 'MoCA', name: ' Montreal Cognitive Assessment (MoCA)', domains: ['cognitive'], minAge: 18, maxAge: 99, duration: 10, type: 'клиницист', languages: ['BG'], delivery: 'paper', scoring: 'manual' },
  { code: 'WISC-V', name: 'WISC-V – интелект (деца)', domains: ['cognitive'], minAge: 6, maxAge: 16, duration: 60, type: 'клиницист', languages: ['BG'], delivery: 'paper', scoring: 'manual' },
  { code: 'BFI-2', name: 'Big Five Inventory (BFI-2)', domains: ['personality'], minAge: 18, maxAge: 99, duration: 10, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'manual' },
  { code: 'SDQ', name: 'Strengths & Difficulties Questionnaire (SDQ) – деца', domains: ['personality'], minAge: 4, maxAge: 17, duration: 5, type: 'родител/учител', languages: ['BG'], delivery: 'paper', scoring: 'manual' },
  { code: 'FAD', name: 'Family Assessment Device (FAD)', domains: ['family'], minAge: 12, maxAge: 99, duration: 15, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'manual' },
  { code: 'SAS-SR', name: 'Social Adjustment Scale – Self Report (SAS-SR)', domains: ['school'], minAge: 18, maxAge: 99, duration: 15, type: 'самооценка', languages: ['BG'], delivery: 'paper', scoring: 'manual' }
]

function Tab({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all shadow-md ${
        active
          ? 'bg-[' + COLORS.accent2 + '] text-black border-transparent'
          : 'bg-[' + COLORS.card + '] text-white border-[' + COLORS.accent3 + '] hover:opacity-90'
      }`}
      style={{ borderColor: COLORS.accent3 }}
      aria-pressed={active}
    >
      {Icon ? <Icon className="h-5 w-5" /> : null}
      <span className="font-semibold">{children}</span>
    </button>
  )
}

function DomainChip({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-all ${
        active
          ? 'bg-[' + COLORS.accent1 + '] text-white border-transparent'
          : 'bg-[' + COLORS.card + '] text-white border-[' + COLORS.accent3 + '] hover:bg-[' + COLORS.accent3 + '] hover:text-black'
      }`}
      style={{ borderColor: COLORS.accent3 }}
    >
      {Icon ? <Icon className="h-4 w-4" /> : <span>🧪</span>}
      <span>{label}</span>
    </button>
  )
}

function Badge({ children }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs"
      style={{ backgroundColor: COLORS.card, color: COLORS.textMuted }}
    >
      {children}
    </span>
  )
}

function TestCard({ test }) {
  return (
    <div
      className="rounded-2xl p-4 shadow-md border hover:shadow-lg transition-all flex flex-col"
      style={{ backgroundColor: COLORS.card, borderColor: COLORS.accent3 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{test.name}</h3>
          <p className="text-sm" style={{ color: COLORS.textMuted }}>{test.code}</p>
        </div>
        <BookOpen className="h-6 w-6" style={{ color: COLORS.accent2 }} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge><Users className="h-3 w-3" /> {test.minAge}–{test.maxAge}</Badge>
        <Badge><Hourglass className="h-3 w-3" /> ~{test.duration} мин</Badge>
        <Badge><ClipboardList className="h-3 w-3" /> {test.type}</Badge>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="px-3 py-2 rounded-lg font-medium"
          style={{ backgroundColor: COLORS.accentWarm, color: 'white' }}
        >
          Стартирай
        </button>
        <button
          className="px-3 py-2 rounded-lg font-medium border"
          style={{ backgroundColor: 'transparent', color: 'white', borderColor: COLORS.accent3 }}
        >
          Шаблони
        </button>
        <button
          className="px-3 py-2 rounded-lg font-medium border"
          style={{ backgroundColor: 'transparent', color: 'white', borderColor: COLORS.accent3 }}
        >
          Скоринг
        </button>
      </div>
    </div>
  )
}

export default function TestsPage() {
  const [ageTab, setAgeTab] = useState('adults') // 'children' | 'adults'
  const [domain, setDomain] = useState('stress')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const min = ageTab === 'children' ? 0 : 18
    const max = ageTab === 'children' ? 17 : 150
    return ALL_TESTS.filter(t =>
      t.minAge <= max && t.maxAge >= min &&
      (domain ? t.domains.includes(domain) : true) &&
      (q ? (t.name.toLowerCase().includes(q.toLowerCase()) || t.code.toLowerCase().includes(q.toLowerCase())) : true)
    )
  }, [ageTab, domain, q])

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bg }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Заглавие */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.text }}>
              Тестове и изследвания
            </h1>
            <p className="mt-1 text-sm" style={{ color: COLORS.textMuted }}>
              Изберете възрастова група и категория. В списъка ще видите подходящи тестове.
            </p>
          </div>
        </div>

        {/* Табове: Деца / Възрастни */}
        <div className="mt-6 flex items-center gap-3">
          <Tab active={ageTab === 'children'} onClick={() => setAgeTab('children')} icon={Baby}>Деца (0–17)</Tab>
          <Tab active={ageTab === 'adults'} onClick={() => setAgeTab('adults')} icon={User}>Възрастни (18+)</Tab>
        </div>

        {/* Търсене и категории */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Лява колона: категории */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: COLORS.card, borderColor: COLORS.accent3 }}>
              <h2 className="text-base font-semibold mb-3" style={{ color: COLORS.text }}>Категории</h2>
              <div className="flex flex-wrap gap-2">
                {DOMAINS.map(d => (
                  <DomainChip key={d.key} active={domain === d.key} onClick={() => setDomain(d.key)} icon={d.icon} label={d.label} />
                ))}
              </div>
            </div>
          </aside>

          {/* Дясна колона: търсене + резултати */}
          <main className="lg:col-span-8 xl:col-span-9">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: COLORS.textMuted }} />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Търсене по име или код (напр. PSS)"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border bg-transparent outline-none"
                  style={{ color: COLORS.text, borderColor: COLORS.accent3 }}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(t => (
                <TestCard key={t.code} test={t} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center p-10 rounded-2xl border" style={{ backgroundColor: COLORS.card, borderColor: COLORS.accent3 }}>
                  <p style={{ color: COLORS.textMuted }}>Няма намерени тестове по текущите филтри.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
