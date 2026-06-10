import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/public/JsonLd";
import { ProjectCard } from "@/components/public/ProjectCard";
import { PublicShell } from "@/components/public/PublicShell";
import { SectionHeading } from "@/components/public/SectionHeading";
import { site, stats, technologies, testimonials } from "@/lib/content";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, projects] = await Promise.all([
    prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" }, take: 6 }),
    prisma.project.findMany({ where: { status: "PUBLISHED" }, orderBy: { createdAt: "desc" }, take: 4 }),
  ]);

  return (
    <PublicShell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, email: site.email, telephone: site.phone, address: site.address }} />
      <section className="bg-[#0f3d64] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase text-orange-200">Dezvoltare software B2B</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-normal sm:text-6xl">Echipe software dedicate pentru produse digitale care trebuie să funcționeze impecabil.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">AMDARIS ajută companiile să construiască, să modernizeze și să scaleze platforme software prin ingineri experimentați, procese clare și responsabilitate de livrare.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Contactează-ne <ArrowRight className="ml-2" size={18} aria-hidden /></Button>
              <Button href="/projects" variant="secondary">Vezi proiecte</Button>
            </div>
          </div>
          <div className="grid content-end gap-4">
            <div className="rounded-lg bg-white p-6 text-slate-950 shadow-xl">
              <h2 className="text-xl font-bold">Model de colaborare matur</h2>
              <div className="mt-5 grid gap-4">
                {["Specialiști selectați pentru contextul tehnic", "Ritm de livrare transparent și predictibil", "Arhitectură pregătită pentru creștere"].map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 text-orange-500" size={18} aria-hidden /> {item}</div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg bg-white/10 p-5">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Servicii" title="Capabilități pentru produse software serioase" description="Acoperim întregul traseu tehnic: de la analiză și arhitectură până la dezvoltare, testare, cloud și operare." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-950">{service.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Proiecte" title="Studii de caz recente" description="Exemple de platforme și sisteme livrate pentru companii care aveau nevoie de stabilitate, integrare și viteză de execuție." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Tehnologii" title="Stack-uri moderne, alese pragmatic" description="Folosim tehnologii robuste, susținute de ecosisteme mature și potrivite pentru produse care trebuie întreținute pe termen lung." />
        <div className="mt-8 flex flex-wrap gap-3">
          {technologies.map((tech) => <span key={tech} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{tech}</span>)}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Clienți" title="Colaborări bazate pe responsabilitate" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.company} className="rounded-lg bg-white p-6 shadow-sm">
                <blockquote className="text-sm leading-6 text-slate-700">„{item.quote}”</blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-slate-950">{item.author}, {item.company}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f3d64] px-4 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Gata pentru a porni un proiect?</h2>
            <p className="mt-3 max-w-2xl text-blue-50">Spune-ne ce vrei să construiești sau ce sistem trebuie modernizat. Revenim cu pașii tehnici potriviți.</p>
          </div>
          <Button href="/contact">Solicită o consultație</Button>
        </div>
      </section>
    </PublicShell>
  );
}
