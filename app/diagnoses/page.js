"use client";
import { useMemo, useState } from "react";

// Шаблон с всички категории F00–F98, само със структури и празни полета за попълване
const categories = [
  {
    code: "F00-F09",
    name: "F00–F09 Органични, включително симптоматични, психични разстройства",
    icon: "🧠",
    diagnoses: [
      { code: "F00", name: "Деменция при болестта на Алцхаймер", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F01", name: "Съдова деменция", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F02", name: "Деменция при други болести", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
        subdiagnoses: [
          { name: "Деменция при болестта на Пик", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Деменция при болестта на Хънтингтън", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Деменция при болестта на Паркинсон", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
        ]
      },
      { code: "F04", name: "Органичен амнестичен синдром", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F05", name: "Делир, непредизвикан от алкохол и други психоактивни вещества", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F06", name: "Други психични разстройства, дължащи се на увреждане/дисфункция на мозъка или соматична болест", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
        subdiagnoses: [
          { name: "Органично разстройство на настроението (депресивно/маниакално)", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Органично тревожно разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Леко когнитивно разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
        ]
      },
      { code: "F07", name: "Разстройства на личността и поведението, дължащи се на мозъчно увреждане", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
        subdiagnoses: [
          { name: "Органично разстройство на личността", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Постенцефалитен синдром", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Постконтузионен синдром", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
        ]
      },
      { code: "F09", name: "Органично или симптоматично психично разстройство, неуточнено", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
    ]
  },
  {
    code: "F10-F19",
    name: "F10–F19 Психични и поведенчески разстройства, дължащи се на употреба на психоактивни вещества",
    icon: "🍺",
    diagnoses: [
      { code: "F10", name: "Разстройства, свързани с употреба на алкохол", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F11", name: "Разстройства, свързани с употреба на опиоиди", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F12", name: "Разстройства, свързани с употреба на канабиноиди", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F13", name: "Разстройства, свързани с употреба на седативни или сънотворни средства", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F14", name: "Разстройства, свързани с употреба на кокаин", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F15", name: "Разстройства, свързани с употреба на стимуланти (вкл. амфетамини, кофеин и др.)", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F16", name: "Разстройства, свързани с употреба на халюциногени", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F17", name: "Разстройства, свързани с употреба на тютюн", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F18", name: "Разстройства, свързани с употреба на летливи разтворители", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F19", name: "Разстройства, свързани с комбинирана употреба или други психоактивни вещества", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
    ]
  },
  {
    code: "F20-F29",
    name: "F20–F29 Шизофрения, шизотипни и налудни разстройства",
    icon: "🌀",
    diagnoses: [
      { code: "F20", name: "Шизофрения", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
        subdiagnoses: [
          { name: "Параноидна", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Хебефренна", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Кататонна", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Недиференцирана", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Постшизофренна депресия", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Резидуална", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Обикновена", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
        ]
      },
      { code: "F21", name: "Шизотипно разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F22", name: "Персистиращи налудни разстройства", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
        subdiagnoses: [
          { name: "Налудно разстройство (параноя)", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
        ]
      },
      { code: "F23", name: "Остри и преходни психотични разстройства", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F24", name: "Индуцирано налудно разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
      { code: "F25", name: "Шизоафективни разстройства", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
        subdiagnoses: [
          { name: "Маниен тип", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Депресивен тип", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Смесен тип", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
        ]
      }
    ]
  },
  {
    code: "F30-F39",
    name: "F30–F39 Разстройства на настроението (афективни разстройства)",
    icon: "🌗",
    diagnoses: [
      { code: "F30", name: "Маниен епизод", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
        subdiagnoses: [
          { name: "Хипомания", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Мания без психотични симптоми", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Мания с психотични симптоми", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
        ]
      },
      { code: "F31", name: "Биполярно афективно разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
        subdiagnoses: [
          { name: "Хипоманиен епизод", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Маниен епизод (с/без психотични симптоми)", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Депресивен епизод (лек, умерен, тежък)", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Смесен епизод", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
        ]
      },
      { code: "F32", name: "Депресивен епизод", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
        subdiagnoses: [
          { name: "Лек", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Умерено тежък", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Тежък (с/без психотични симптоми)", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
        ]
      },
      { code: "F33", name: "Рецидивиращо депресивно разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
        subdiagnoses: [
          { name: "Лек / умерено тежък / тежък", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "В ремисия", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
        ]
      },
      { code: "F34", name: "Персистиращи разстройства на настроението", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
        subdiagnoses: [
          { name: "Дистимия", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
          { name: "Циклотимия", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
        ]
      }
    ]
  },
  {
    code: "F40-F48",
]
},
{ code: "F41", name: "Други тревожни разстройства", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
subdiagnoses: [
{ name: "Паническо разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Генерализирана тревожност", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Смесено тревожно-депресивно разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
]
},
{ code: "F42", name: "Обсесивно-компулсивно разстройство (ОКР)", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ code: "F43", name: "Реакция на тежък стрес и разстройства в адаптацията", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
subdiagnoses: [
{ name: "Остра стресова реакция", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Посттравматично стресово разстройство (ПТСР)", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Разстройство в адаптацията", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
]
},
{ code: "F44", name: "Дисоциативни (конверсионни) разстройства", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
subdiagnoses: [
{ name: "Дисоциативна амнезия", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Дисоциативна фуга", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Дисоциативен ступор", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Смесени дисоциативни разстройства", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
]
},
{ code: "F45", name: "Соматоформни разстройства", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
subdiagnoses: [
{ name: "Соматизационно разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Хипохондрично разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Персистиращо соматоформно болково разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
]
}
]
},


{
code: "F50-F59",
name: "F50–F59 Поведенчески синдроми, свързани с физиологични разстройства и соматични фактори",
icon: "🍽️",
diagnoses: [
{ code: "F50", name: "Разстройства на храненето", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
subdiagnoses: [
{ name: "Нервна анорексия", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Нервна булимия", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Преяждане, свързано с психологични нарушения", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Други/неуточнени разстройства на храненето", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
]
},
{ code: "F51", name: "Неорганични разстройства на съня", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
subdiagnoses: [
{ name: "Безсъние (инсомния)", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Хиперсомния", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Разстройства на ритъма сън-бодърстване", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Сомнамбулизъм (ходене насън)", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Нощни страхове", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Кошмари", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
]
},
{ code: "F52", name: "Сексуални дисфункции, непредизвикани от органично разстройство", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
subdiagnoses: [
{ name: "Липса или загуба на желание", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Недостатъчност на гениталната реакция", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Оргазмена дисфункция", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Преждевременна еякулация", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Вагинизъм / диспареуния (неорганични)", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
]
},
{ code: "F53", name: "Психични и поведенчески разстройства, свързани с послеродовия период", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "",
subdiagnoses: [
{ name: "Леки форми", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ name: "Тежки форми", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }
]
},
{ code: "F55", name: "Злоупотреба с вещества, непредизвикващи зависимост", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" },
{ code: "F59", name: "Поведенчески синдроми, свързани с физиологични нарушения и соматични фактори, неуточнени", description: "", symptoms: "", treatment_med: "", treatment_psych: "", prognosis: "" }


export default function DiagnosesPage() {
const firstCode = categories.length > 0 ? categories[0].code : null;
const [selectedCode, setSelectedCode] = useState(firstCode);
const selectedCategory = useMemo(
() => categories.find((c) => c.code === selectedCode) || categories[0],
[selectedCode]
);


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
<div className="grid gap-6">
{selectedCategory.diagnoses.map((d) => (
<div key={d.code} className="rounded-xl bg-white p-6 shadow grid gap-3">
<h3 className="text-xl font-semibold text-[#D6628D]">
{d.code} – {d.name}
</h3>
<p><strong>Описание:</strong> {d.description}</p>
<p><strong>Симптоми:</strong> {d.symptoms}</p>
<p><strong>Медикаментозно лечение:</strong> {d.treatment_med}</p>
<p><strong>Психологическа подкрепа:</strong> {d.treatment_psych}</p>
<p><strong>Прогноза:</strong> {d.prognosis}</p>


{Array.isArray(d.subdiagnoses) && d.subdiagnoses.length > 0 && (
<div className="pt-2">
<p className="font-semibold">Подгрупи:</p>
<ul className="list-disc pl-6">
{d.subdiagnoses.map((s, i) => (
<li key={i}>
<span className="font-medium">{s.name}</span>
</li>
))}
</ul>
</div>
)}
</div>
))}
</div>
</main>
</div>
);
}
