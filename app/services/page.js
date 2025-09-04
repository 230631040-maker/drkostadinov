const items = [
  { title: "Консултация", desc: "30–45 мин, онлайн/на място." },
  { title: "Диагностика", desc: "Базов пакет + препоръки." },
  { title: "Терапевтичен план", desc: "Персонализиран, проследяване." },
];
export default function Services() {
  return (
    <section className="grid gap-6">
      <h2 className="text-3xl font-bold">Services</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(s => (
          <div key={s.title} className="rounded-xl bg-white p-6 shadow">
            <h3 className="font-semibold mb-1">{s.title}</h3>
            <p className="text-sm text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
