import type { Metadata } from "next";
import { ProjectCard } from "@/components/public/ProjectCard";
import { PublicShell } from "@/components/public/PublicShell";
import { getPublicProjects } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Proiecte și studii de caz",
  description: "Studii de caz AMDARIS pentru platforme web, sisteme operaționale, modernizare software și raportare.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ category?: string; industry?: string; technology?: string; page?: string; search?: string }> }) {
  const params = await searchParams;
  const page = Math.max(Number(params.page ?? 1), 1);
  const limit = 9;
  const allProjects = await getPublicProjects();
  const filtered = allProjects.filter((project) => {
    const search = params.search?.toLowerCase();
    return (!params.category || project.category === params.category)
      && (!params.industry || project.industry === params.industry)
      && (!params.technology || project.technologies.includes(params.technology))
      && (!search || project.title.toLowerCase().includes(search) || project.description.toLowerCase().includes(search));
  });
  const total = filtered.length;
  const projects = filtered.slice((page - 1) * limit, page * limit);
  const categories = [...new Set(allProjects.map((item) => item.category))];
  const industries = [...new Set(allProjects.map((item) => item.industry))];
  const technologies = [...new Set(allProjects.flatMap((item) => item.technologies))];
  const totalPages = Math.ceil(total / limit);

  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-950 sm:text-5xl">Proiecte și studii de caz</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Vezi cum transformăm provocările tehnice în platforme stabile, sisteme integrate și produse pregătite pentru creștere.</p>
        <form className="mt-8 grid gap-3 md:grid-cols-4">
          <input name="search" defaultValue={params.search} placeholder="Caută proiecte" className="focus-ring rounded-md border border-slate-300 bg-white px-4 py-3" />
          <select name="category" defaultValue={params.category ?? ""} className="focus-ring rounded-md border border-slate-300 bg-white px-4 py-3"><option value="">Toate categoriile</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>
          <select name="industry" defaultValue={params.industry ?? ""} className="focus-ring rounded-md border border-slate-300 bg-white px-4 py-3"><option value="">Toate industriile</option>{industries.map((item) => <option key={item}>{item}</option>)}</select>
          <select name="technology" defaultValue={params.technology ?? ""} className="focus-ring rounded-md border border-slate-300 bg-white px-4 py-3"><option value="">Toate tehnologiile</option>{technologies.map((item) => <option key={item}>{item}</option>)}</select>
          <button className="rounded-md bg-orange-500 px-5 py-3 font-semibold text-white md:col-span-4 lg:col-span-1">Aplică filtre</button>
        </form>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        {totalPages > 1 ? <div className="mt-10 text-sm font-semibold text-slate-700">Pagina {page} din {totalPages}</div> : null}
      </section>
    </PublicShell>
  );
}
