import { LeadStatusSelect } from "@/components/dashboard/AdminForms";
import { prisma } from "@/lib/prisma";
import { formatDateRo } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardLeadsPage() {
  const leads = await prisma.contactLead.findMany({ orderBy: { submittedAt: "desc" } });
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-950">Solicitări contact</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead><tr className="border-b"><th className="py-3">Contact</th><th>Companie</th><th>Serviciu</th><th>Buget</th><th>Termen</th><th>Status</th><th>Data</th></tr></thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-100 align-top">
                <td className="py-4"><strong>{lead.name}</strong><p className="text-slate-600">{lead.email}</p><p className="text-slate-600">{lead.phone}</p></td>
                <td>{lead.company}</td><td>{lead.serviceNeeded}</td><td>{lead.budgetRange}</td><td>{lead.timeline}</td><td><LeadStatusSelect id={lead.id} status={lead.status} /></td><td>{formatDateRo(lead.submittedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
