import { LeadStatusSelect } from "@/components/dashboard/AdminForms";
import { prisma } from "@/lib/prisma";
import { formatDateRo } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardLeadsPage() {
  const leads = await prisma.contactLead.findMany({ orderBy: { submittedAt: "desc" } });
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase text-orange-600">Vânzări</p>
      <h1 className="mt-1 text-2xl font-bold text-slate-950">Solicitări contact</h1>
      <p className="mt-2 text-sm text-slate-600">Urmărește solicitările primite prin formular și actualizează statusul fiecărui lead.</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="rounded-l-md px-4 py-3">Contact</th><th className="px-4 py-3">Companie</th><th className="px-4 py-3">Serviciu</th><th className="px-4 py-3">Buget</th><th className="px-4 py-3">Termen</th><th className="px-4 py-3">Status</th><th className="rounded-r-md px-4 py-3">Data</th></tr></thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-100 align-top">
                <td className="px-4 py-4"><strong className="text-slate-950">{lead.name}</strong><p className="text-slate-600">{lead.email}</p><p className="text-slate-600">{lead.phone}</p></td>
                <td className="px-4 py-4 text-slate-700">{lead.company}</td><td className="px-4 py-4 text-slate-700">{lead.serviceNeeded}</td><td className="px-4 py-4 text-slate-700">{lead.budgetRange}</td><td className="px-4 py-4 text-slate-700">{lead.timeline}</td><td className="px-4 py-4"><LeadStatusSelect id={lead.id} status={lead.status} /></td><td className="px-4 py-4 text-slate-600">{formatDateRo(lead.submittedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
