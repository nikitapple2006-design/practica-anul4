import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/public/JsonLd";
import { ProjectCard } from "@/components/public/ProjectCard";
import { PublicShell } from "@/components/public/PublicShell";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await prisma.project.findFirst({ where: { OR: [{ id }, { slug: id }] } });
  if (!project) return { title: "Proiect indisponibil" };
  return { title: project.title, description: project.description, openGraph: { title: project.title, description: project.description, type: "article" } };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findFirst({ where: { OR: [{ id }, { slug: id }] }, include: { images: { orderBy: { order: "asc" } } } });
  if (!project) notFound();
  const related = await prisma.project.findMany({ where: { status: "PUBLISHED", industry: project.industry, NOT: { id: project.id } }, take: 3 });

  return (
    <PublicShell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.description, about: project.industry }} />
      <article>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase text-orange-600">{project.industry} / {project.category}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-slate-950 sm:text-5xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{project.description}</p>
          <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-lg bg-slate-100"><Image src={project.imageUrl} alt={`Imagine principală pentru ${project.title}`} fill className="object-cover" priority /></div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[["Provocarea clientului", project.clientChallenge], ["Soluția livrată", project.solution], ["Rezultate", project.results]].map(([title, text]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-slate-950">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></div>
          ))}
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-950">Tehnologii folosite</h2>
          <div className="mt-5 flex flex-wrap gap-3">{project.technologies.map((tech) => <span key={tech} className="rounded-md bg-white px-4 py-2 text-sm font-semibold shadow-sm">{tech}</span>)}</div>
        </section>
        {related.length ? <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-slate-950">Proiecte similare</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((item) => <ProjectCard key={item.id} project={item} />)}</div></div></section> : null}
      </article>
    </PublicShell>
  );
}
