import type { Metadata } from "next";
import { PublicShell } from "@/components/public/PublicShell";

export const metadata: Metadata = {
  title: "Despre AMDARIS",
  description: "Misiunea, valorile și experiența AMDARIS în dezvoltare software B2B.",
};

export default function AboutPage() {
  const values = ["Responsabilitate de livrare", "Claritate în comunicare", "Calitate tehnică verificabilă", "Parteneriat pe termen lung"];
  const history = [
    ["2011", "Primele echipe dedicate pentru clienți B2B din Europa."],
    ["2016", "Extindere către proiecte cloud și modernizare de sisteme operaționale."],
    ["2021", "Consolidarea practicilor de QA, DevOps și consultanță de produs."],
    ["2026", "Focus pe platforme digitale scalabile pentru companii cu operațiuni complexe."],
  ];

  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-950 sm:text-5xl">Despre AMDARIS</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Suntem o companie de dezvoltare software orientată spre colaborări B2B în care contează disciplina tehnică, înțelegerea businessului și continuitatea livrării.</p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="rounded-lg bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Misiune</h2>
          <p className="mt-4 leading-7 text-slate-600">Ajutăm companiile să transforme obiectivele digitale în produse software stabile, scalabile și ușor de operat. Punem accent pe echipe potrivite, decizii tehnice argumentate și execuție transparentă.</p>
        </div>
        <div className="rounded-lg bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Echipă</h2>
          <p className="mt-4 leading-7 text-slate-600">Echipa reunește dezvoltatori cu experiență pe front-end și back-end, arhitecți software, specialiști QA, DevOps și consultanți tehnici care lucrează integrat cu echipele clienților.</p>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-950">Valori</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">{values.map((value) => <div key={value} className="rounded-lg border border-slate-200 p-5 text-sm font-semibold text-slate-800">{value}</div>)}</div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-950">Repere</h2>
        <div className="mt-8 grid gap-4">{history.map(([year, text]) => <div key={year} className="grid gap-2 rounded-lg bg-white p-5 shadow-sm md:grid-cols-[120px_1fr]"><strong className="text-orange-600">{year}</strong><p className="text-slate-700">{text}</p></div>)}</div>
      </section>
    </PublicShell>
  );
}
