import Link from "next/link";
import { BriefcaseBusiness, ExternalLink, Home, Inbox, Settings, Wrench } from "lucide-react";
import { LogoutButton } from "@/components/dashboard/LogoutButton";

const nav = [
  { href: "/dashboard", label: "Panou", icon: Home },
  { href: "/dashboard/projects", label: "Proiecte", icon: BriefcaseBusiness },
  { href: "/dashboard/services", label: "Servicii", icon: Wrench },
  { href: "/dashboard/leads", label: "Solicitări", icon: Inbox },
  { href: "/dashboard/settings", label: "Setări", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-[#08243d] p-5 text-white md:block">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-orange-500 text-lg font-bold text-white shadow-sm">A</span>
          <span>
            <span className="block text-xl font-bold">AMDARIS</span>
            <span className="block text-xs font-medium text-blue-100">Administrare conținut</span>
          </span>
        </Link>
        <nav className="mt-9 grid gap-2" aria-label="Navigare dashboard">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/10 hover:text-white">
                <Icon size={17} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold">Spațiu de lucru</p>
          <p className="mt-1 text-xs leading-5 text-blue-100">Gestionează proiectele, serviciile și solicitările primite de la clienți.</p>
          <div className="mt-4"><LogoutButton /></div>
        </div>
      </aside>
      <div className="md:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-orange-600">Panou</p>
              <p className="text-sm text-slate-600">Panou intern pentru administrarea website-ului AMDARIS.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50">
                Vezi site-ul <ExternalLink size={15} aria-hidden />
              </Link>
              <LogoutButton />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
