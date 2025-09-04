'use client'

// Route: /tests
// Страница: "Тестове и изследвания"
// - Две възрастови групи (Деца, Възрастни)
// - Различни категории според възрастта, групирани по домейни (емоционални, когнитивни, невроразвитийни и др.)
// - Full-width layout с ляв sidebar за категории и дясна част за резултати
// - Подобрени табове (и двете винаги изглеждат като бутони, активният е по-ярък)

import React, { useState, useMemo } from 'react'
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
  Hourglass,
  BookType,
  Languages,
  School,
  CheckCircle2
} from 'lucide-react'

// Цветова палитра
const COLORS = {
  bg: '#000E18',
  card: '#212845',
  accent1: '#D6628D',
  accent2: '#D6ED17',
  accent3: '#39A0B0',
  accentWarm: '#F16C48',
  text: '#FFFFFF',
  textMuted: '#8CFFFB'
}

// Категории по възраст
const DOMAINS_CHILDREN = [
  {
    group: 'Емоционални и поведенчески',
    items: [
      { key: 'stress', label: 'Стрес', icon: Activity },
      { key: 'aggression', label: 'Агресия', icon: AlertTriangle },
      { key: 'anxiety', label: 'Тревожност', icon: Brain },
      { key: 'depression', label: 'Депресия', icon: Heart },
      { key: 'selfesteem', label: 'Самооценка', icon: CheckCircle2 }
    ]
  },
  {
    group: 'Невроразвитийни',
    items: [
      { key: 'adhd', label: 'ADHD', icon: Brain },
      { key: 'asd', label: 'Аутизъм / ASD', icon: Puzzle },
      { key: 'learning', label: 'Разстройства на ученето', icon: BookType },
      { key: 'speech', label: 'Реч и език', icon: Languages },
      { key: 'motor', label: 'Моторика', icon: Activity }
    ]
  },
  {
    group: 'Когнитивни',
    items: [
      { key: 'iq', label: 'Интелект / IQ', icon: Brain },
      { key: 'memory', label: 'Памет', icon: ClipboardList },
      { key: 'attention', label: 'Внимание', icon: Hourglass },
      { key: 'executive', label: 'Изпълнителни функции', icon: Brain }
    ]
  },
  {
    group: 'Социални и семейни',
    items: [
      { key: 'family', label: 'Семейни / Връзки', icon: Users },
      { key: 'peers', label: 'Връстници', icon: Users },
      { key: 'school', label: 'Училищна адаптация', icon: GraduationCap }
    ]
  },
  {
    group: 'Специализирани',
    items: [
      { key: 'development', label: 'Развитийни скрининги', icon: Baby },
      { key: 'adaptive', label: 'Адаптивно функциониране', icon: User }
    ]
  }
]

const DOMAINS_ADULTS = [
  {
    group: 'Емоционални',
    items: [
      { key: 'stress', label: 'Стрес', icon: Activity },
      { key: 'anxiety', label: 'Тревожност', icon: Brain },
      { key: 'depression', label: 'Депресия', icon: Heart },
      { key: 'aggression', label: 'Агресия', icon: AlertTriangle }
    ]
  },
  {
    group: 'Когнитивни и невро',
    items: [
      { key: 'memory', label: 'Памет', icon: ClipboardList },
      { key: 'attention', label: 'Внимание', icon: Hourglass },
      { key: 'executive', label: 'Изпълнителни функции', icon: Brain },
      { key: 'dementia', label: 'Деменции / скрининг', icon: Brain }
    ]
  },
  {
    group: 'Личност и клинични',
    items: [
      { key: 'personality', label: 'Личност', icon: User },
      { key: 'psychosis', label: 'Психотични симптоми', icon: AlertTriangle },
      { key: 'bipolar', label: 'Биполярно разстройство', icon: Brain }
    ]
  },
  {
    group: 'Социални и адаптивни',
    items: [
      { key: 'work', label: 'Работна адаптация', icon: Users },
      { key: 'social', label: 'Социално функциониране', icon: Users },
      { key: 'family', label: 'Семейни отношения', icon: Users }
    ]
  },
  {
    group: 'Специализирани',
    items: [
      { key: 'addictions', label: 'Зависимости', icon: Activity },
      { key: 'psychosomatic', label: 'Психосоматични', icon: Heart }
    ]
  }
]

// Dummy тестове (примерни)
const ALL_TESTS = [
  { code: 'PSS-10', name: 'Скала за възприет стрес (PSS-10)', domains: ['stress'], minAge: 18, maxAge: 99, duration: 5, type: 'самооценка' },
  { code: 'PSS-C', name: 'PSS – детска версия', domains: ['stress'], minAge: 8, maxAge: 17, duration: 7, type: 'самооценка' }
]

function Tab({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2 rounded-2xl border shadow-md transition-all"
      style={{
        backgroundColor: active ? COLORS.accent2 : 'transparent',
        color: active ? '#000' : COLORS.text,
        borderColor: COLORS.accent3
      }}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span className="font-semibold">{children}</span>
    </button>
  )
}

function DomainGroup({ group, items, activeKey, setDomain }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-bold mb-2" style={{ color: COLORS.textMuted }}>{group}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(d => (
          <button
            key={d.key}
            onClick={() => setDomain(d.key)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-all"
            style={{
              backgroundColor: activeKey === d.key ? COLORS.accent1 : COLORS.card,
              color: 'white',
              borderColor: COLORS.accent3
            }}
          >
            {d.icon && <d.icon className="h-4 w-4" />}
            {d.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function TestCard({ test }) {
  return (
    <div className="rounded-2xl p-4 shadow-md border flex flex-col" style={{ backgroundColor: COLORS.card, borderColor: COLORS.accent3 }}>
      <h3 className="text-lg font-semibold text-white">{test.name}</h3>
      <p className="text-sm" style={{ color: COLORS.textMuted }}>{test.code}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs" style={{ color: COLORS.textMuted }}>
        <span>{test.minAge}–{test.maxAge}</span>
        <span>~{test.duration} мин</span>
        <span>{test.type}</span>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-2 rounded-lg font-medium" style={{ backgroundColor: COLORS.accentWarm, color: 'white' }}>Стартирай</button>
        <button className="px-3 py-2 rounded-lg font-medium border" style={{ color: 'white', borderColor: COLORS.accent3 }}>Шаблони</button>
        <button className="px-3 py-2 rounded-lg font-medium border" style={{ color: 'white', borderColor: COLORS.accent3 }}>Скоринг</button>
      </div>
    </div>
  )
}

export default function TestsPage() {
  const [ageTab, setAgeTab] = useState('children')
  const [domain, setDomain] = useState(null)
  const [q, setQ] = useState('')

  const domains = ageTab === 'children' ? DOMAINS_CHILDREN : DOMAINS_ADULTS

  const filtered = useMemo(() => {
    const min = ageTab === 'children' ? 0 : 18
    const max = ageTab === 'children' ? 17 : 150
    return ALL_TESTS.filter(t =>
      t.minAge <= max && t.maxAge >= min &&
      (domain ? t.domains.includes(domain) : true) &&
      (q ? t.name.toLowerCase().includes(q.toLowerCase()) || t.code.toLowerCase().includes(q.toLowerCase()) : true)
    )
  }, [ageTab, domain, q])

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <div className="px-6 py-8 w-full">
        <h1 className="text-3xl font-bold mb-1" style={{ color: COLORS.text }}>Тестове и изследвания</h1>
        <p className="text-sm mb-6" style={{ color: COLORS.textMuted }}>Изберете възрастова група и категория.</p>

        {/* Табове */}
        <div className="flex items-center gap-3 mb-6">
          <Tab active={ageTab === 'children'} onClick={() => setAgeTab('children')} icon={Baby}>Деца (0–17)</Tab>
          <Tab active={ageTab === 'adults'} onClick={() => setAgeTab('adults')} icon={User}>Възрастни (18+)</Tab>
        </div>

        {/* Layout: sidebar + content */}
        <div className="grid grid-cols-12 gap-6 w-full">
          <aside className="col-span-4 xl:col-span-3 p-4 rounded-2xl border overflow-y-auto max-h-[80vh]" style={{ backgroundColor: COLORS.card, borderColor: COLORS.accent3 }}>
            {domains.map(group => (
              <DomainGroup key={group.group} group={group.group} items={group.items} activeKey={domain} setDomain={setDomain} />
            ))}
          </aside>

          <main className="col-span-8 xl:col-span-9">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: COLORS.textMuted }} />
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Търсене по име или код (напр. PSS)"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border bg-transparent outline-none"
                  style={{ color: COLORS.text, borderColor: COLORS.accent3 }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
