export default function Home() {
  return (
    <section className="grid gap-6">
      <h2 className="text-3xl font-bold">Welcome to Perfectno</h2>
      <p className="text-lg text-gray-700">
        Това е началната страница. Добави тук кратко представяне и CTA бутон.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1,2,3].map(i => (
          <div key={i} className="rounded-xl bg-white p-6 shadow">
            <h3 className="font-semibold mb-2">Feature {i}</h3>
            <p className="text-sm text-gray-600">Кратко описание на ключов акцент.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
