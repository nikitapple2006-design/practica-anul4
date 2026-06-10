import type { Metadata } from "next";
import { JsonLd } from "@/components/public/JsonLd";
import { PublicShell } from "@/components/public/PublicShell";
import { SectionHeading } from "@/components/public/SectionHeading";
import { Button } from "@/components/ui/Button";
import { industries, site, technologies } from "@/lib/content";
import { getPublicPackages, getPublicServices } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Servicii software",
  description: "Servicii AMDARIS pentru echipe dedicate, dezvoltare web, cloud, QA, modernizare software și consultanță digitală.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [services, packages] = await Promise.all([
    getPublicServices(),
    getPublicPackages(),
  ]);

  return (
    <PublicShell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", provider: { "@type": "Organization", name: site.name }, serviceType: "Dezvoltare software B2B" }} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-950 sm:text-5xl">Servicii software pentru companii care au nevoie de execuție predictibilă</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Construim echipe, platforme și sisteme digitale cu atenție la arhitectură, securitate, costuri de operare și continuitate.</p>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">{service.name}</h2>
              <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
              <ul className="mt-5 grid gap-2 text-sm text-slate-700">
                {service.features.map((feature) => <li key={feature}>• {feature}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Modele de colaborare" title="Alege modul de livrare potrivit" />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-slate-100 text-slate-950">
                <tr><th className="p-4">Pachet</th><th className="p-4">Investiție</th><th className="p-4">Durată</th><th className="p-4">Livrabile</th><th className="p-4">Acțiune</th></tr>
              </thead>
              <tbody>
                {packages.map((item) => (
                  <tr key={item.id} className="border-b border-slate-200">
                    <td className="p-4 font-semibold">{item.name}<p className="mt-1 font-normal text-slate-600">{item.description}</p></td>
                    <td className="p-4">{item.price}</td>
                    <td className="p-4">{item.duration}</td>
                    <td className="p-4">{item.deliverables.join(", ")}</td>
                    <td className="p-4"><Button href="/contact" variant="secondary">{item.cta}</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading title="Industrii deservite" description="Lucrăm cu organizații care au procese complexe, integrări multiple și nevoi clare de trasabilitate." />
          <div className="mt-6 flex flex-wrap gap-3">{industries.map((item) => <span key={item} className="rounded-md bg-white px-4 py-2 text-sm font-semibold shadow-sm">{item}</span>)}</div>
        </div>
        <div>
          <SectionHeading title="Expertiză tehnică" description="Selectăm stack-ul în funcție de produs, echipă, buget și cerințe operaționale." />
          <div className="mt-6 flex flex-wrap gap-3">{technologies.map((item) => <span key={item} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold">{item}</span>)}</div>
        </div>
      </section>
      <section className="bg-[#0f3d64] px-4 py-16 text-white"><div className="mx-auto max-w-7xl sm:px-6 lg:px-8"><h2 className="text-3xl font-bold">Solicită o consultație</h2><p className="mt-3 max-w-2xl text-blue-50">Discutăm obiectivul, constrângerile și modelul de colaborare potrivit.</p><Button href="/contact" className="mt-6">Contactează-ne</Button></div></section>
    </PublicShell>
  );
}
