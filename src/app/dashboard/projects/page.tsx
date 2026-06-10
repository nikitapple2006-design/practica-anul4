import { ProjectForm } from "@/components/dashboard/AdminForms";
import { prisma } from "@/lib/prisma";
import { formatDateRo } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_420px]">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase text-orange-600">Portofoliu</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-950">Proiecte</h1>
        <p className="mt-2 text-sm text-slate-600">Gestionează studiile de caz afișate pe website.</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="rounded-l-md px-4 py-3">Titlu</th><th className="px-4 py-3">Industrie</th><th className="px-4 py-3">Categorie</th><th className="px-4 py-3">Status</th><th className="rounded-r-md px-4 py-3">Creat</th></tr></thead>
            <tbody>{projects.map((project) => <tr key={project.id} className="border-b border-slate-100"><td className="px-4 py-4 font-semibold text-slate-950">{project.title}</td><td className="px-4 py-4 text-slate-600">{project.industry}</td><td className="px-4 py-4 text-slate-600">{project.category}</td><td className="px-4 py-4"><span className="rounded-md bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">{project.status}</span></td><td className="px-4 py-4 text-slate-600">{formatDateRo(project.createdAt)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
      <ProjectForm />
    </div>
  );
}
