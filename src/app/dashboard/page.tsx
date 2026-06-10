import { prisma } from "@/lib/prisma";
import { formatDateRo } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [projects, services, newLeads, recentLeads] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.contactLead.count({ where: { status: "NEW" } }),
    prisma.contactLead.findMany({ orderBy: { submittedAt: "desc" }, take: 5 }),
  ]);

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Panou administrare</h1>
        <p className="mt-2 text-slate-600">Situația curentă pentru conținut, servicii și solicitări noi.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[["Proiecte", projects], ["Servicii", services], ["Lead-uri noi", newLeads]].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-white p-6 shadow-sm"><p className="text-sm font-semibold text-slate-600">{label}</p><p className="mt-3 text-3xl font-bold text-slate-950">{value}</p></div>
        ))}
      </div>
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">Activitate recentă</h2>
        <div className="mt-5 grid gap-3">
          {recentLeads.map((lead) => <div key={lead.id} className="rounded-md border border-slate-200 p-4 text-sm"><strong>{lead.name}</strong> de la {lead.company} a trimis o solicitare pentru {lead.serviceNeeded} pe {formatDateRo(lead.submittedAt)}.</div>)}
        </div>
      </section>
    </div>
  );
}
