import { ProjectForm } from "@/components/dashboard/AdminForms";
import { prisma } from "@/lib/prisma";
import { formatDateRo } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_420px]">
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Proiecte</h1>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead><tr className="border-b"><th className="py-3">Titlu</th><th>Industrie</th><th>Categorie</th><th>Status</th><th>Creat</th></tr></thead>
            <tbody>{projects.map((project) => <tr key={project.id} className="border-b border-slate-100"><td className="py-4 font-semibold">{project.title}</td><td>{project.industry}</td><td>{project.category}</td><td>{project.status}</td><td>{formatDateRo(project.createdAt)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
      <ProjectForm />
    </div>
  );
}
