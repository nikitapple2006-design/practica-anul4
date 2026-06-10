import { ServiceForm } from "@/components/dashboard/AdminForms";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardServicesPage() {
  const [services, packages] = await Promise.all([
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.servicePackage.findMany({ orderBy: { createdAt: "asc" } }),
  ]);
  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_420px]">
      <section className="grid gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase text-orange-600">Ofertă</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950">Servicii</h1>
          <div className="mt-6 grid gap-3">{services.map((service) => <div key={service.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-md bg-[#0f3d64] text-sm font-bold text-white">{service.order}</span><div className="font-semibold text-slate-950">{service.name}</div></div><p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p></div>)}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase text-orange-600">Modele comerciale</p>
          <h2 className="mt-1 text-xl font-bold text-slate-950">Pachete</h2>
          <div className="mt-5 grid gap-3">{packages.map((item) => <div key={item.id} className="rounded-lg border border-slate-200 p-4"><div className="font-semibold text-slate-950">{item.name}</div><p className="mt-1 text-sm text-slate-600">{item.price} / {item.duration}</p><p className="mt-3 text-xs font-semibold uppercase text-orange-600">{item.cta}</p></div>)}</div>
        </div>
      </section>
      <ServiceForm />
    </div>
  );
}
