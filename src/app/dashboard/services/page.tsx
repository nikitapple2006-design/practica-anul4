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
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-950">Servicii</h1>
          <div className="mt-5 grid gap-3">{services.map((service) => <div key={service.id} className="rounded-md border border-slate-200 p-4"><div className="font-semibold">{service.order}. {service.name}</div><p className="mt-1 text-sm text-slate-600">{service.description}</p></div>)}</div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Pachete</h2>
          <div className="mt-5 grid gap-3">{packages.map((item) => <div key={item.id} className="rounded-md border border-slate-200 p-4"><div className="font-semibold">{item.name}</div><p className="mt-1 text-sm text-slate-600">{item.price} / {item.duration}</p></div>)}</div>
        </div>
      </section>
      <ServiceForm />
    </div>
  );
}
