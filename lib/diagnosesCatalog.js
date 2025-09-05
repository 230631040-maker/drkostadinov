// lib/diagnosesCatalog.js
export const catalog = [
  { code: "F00-F09", name: "F00–F09 Органични, включително симптоматични, психични разстройства", icon: "🧠", diagnoses: [] },
  { code: "F10-F19", name: "F10–F19 Психични и поведенчески разстройства, дължащи се на употреба на психоактивни вещества", icon: "🍺", diagnoses: [] },
  { code: "F20-F29", name: "F20–F29 Шизофрения, шизотипни и налудни разстройства", icon: "🌀", diagnoses: [] },
  { code: "F30-F39", name: "F30–F39 Разстройства на настроението (афективни разстройства)", icon: "🌗", diagnoses: [] },
  { code: "F40-F48", name: "F40–F48 Невротични, свързани със стрес и соматоформни разстройства", icon: "😰", diagnoses: [] },
  { code: "F50-F59", name: "F50–F59 Поведенчески синдроми, свързани с физиологични разстройства и соматични фактори", icon: "🍽️", diagnoses: [] },
  { code: "F60-F69", name: "F60–F69 Разстройства на личността и поведението в зряла възраст", icon: "🧩", diagnoses: [] },
  { code: "F70-F79", name: "F70–F79 Умствена изостаналост", icon: "📉", diagnoses: [] },
  { code: "F80-F89", name: "F80–F89 Разстройства в психологичното развитие", icon: "🧒", diagnoses: [] },
  { code: "F90-F98", name: "F90–F98 Поведенчески и емоционални разстройства с начало, типично за детството и юношеството", icon: "🎈", diagnoses: [] },
];

export function getAllDiagnosisNames(cat = catalog) {
  const names = [];
  for (const c of cat) {
    for (const d of c.diagnoses || []) {
      if (d?.name) names.push(d.name);
      if (Array.isArray(d.subdiagnoses)) {
        for (const s of d.subdiagnoses) {
          if (s?.name) names.push(s.name);
        }
      }
    }
  }
  return names.sort((a, b) => a.localeCompare(b, "bg"));
}
