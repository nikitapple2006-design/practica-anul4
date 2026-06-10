import { prisma } from "@/lib/prisma";
import { formatDateRo } from "@/lib/utils";
import { BriefcaseBusiness, Inbox, Sparkles, Wrench, type LucideIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [projects, services, newLeads, recentLeads] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.contactLead.count({ where: { status: "NEW" } }),
    prisma.contactLead.findMany({ orderBy: { submittedAt: "desc" }, take: 5 }),
  ]);
  const summaryCards: Array<[string, number, LucideIcon, string]> = [
    ["Proiecte", projects, BriefcaseBusiness, "Studii de caz și lucrări publicate"],
    ["Servicii", services, Wrench, "Capabilități active în website"],
    ["Solicitări noi", newLeads, Inbox, "Mesaje care așteaptă răspuns"],
  ];

  return (
    <div className="grid gap-8">
      <div className="rounded-xl bg-[#0f3d64] p-7 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase text-orange-200">Administrare AMDARIS</p>
        <h1 className="mt-3 text-3xl font-bold">Panou administrare</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50">Situația curentă pentru conținut, servicii și solicitări noi. Folosește acțiunile rapide pentru actualizări de conținut și urmărirea lead-urilor.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map(([label, value, Icon, description]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-orange-50 text-orange-600"><Icon size={21} aria-hidden /></div>
              <Sparkles size={18} className="text-slate-300" aria-hidden />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-600">{label}</p>
            <p className="mt-2 text-4xl font-bold text-slate-950">{value}</p>
            <p className="mt-2 text-sm text-slate-500">{description}</p>
          </div>
        ))}
      </div>
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-orange-600">Solicitări</p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">Activitate recentă</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-3">
          {recentLeads.map((lead) => (
            <div key={lead.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <p className="text-slate-700"><strong className="text-slate-950">{lead.name}</strong> de la {lead.company} a trimis o solicitare pentru <strong>{lead.serviceNeeded}</strong>.</p>
                <span className="rounded-md bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">{formatDateRo(lead.submittedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
