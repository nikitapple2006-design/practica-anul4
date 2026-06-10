import Link from "next/link";
import { BriefcaseBusiness, Home, Inbox, Settings, Wrench } from "lucide-react";
import { LogoutButton } from "@/components/dashboard/LogoutButton";

const nav = [
  { href: "/dashboard", label: "Panou", icon: Home },
  { href: "/dashboard/projects", label: "Proiecte", icon: BriefcaseBusiness },
  { href: "/dashboard/services", label: "Servicii", icon: Wrench },
  { href: "/dashboard/leads", label: "Lead-uri", icon: Inbox },
  { href: "/dashboard/settings", label: "Setări", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-5 md:block">
        <Link href="/dashboard" className="text-2xl font-bold text-slate-950">AMDARIS</Link>
        <nav className="mt-8 grid gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"><Icon size={17} aria-hidden />{item.label}</Link>;
          })}
        </nav>
        <div className="absolute bottom-5 left-5 right-5"><LogoutButton /></div>
      </aside>
      <div className="md:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-8">
          <Link href="/" className="text-sm font-semibold text-slate-700">Vezi site-ul public</Link>
          <LogoutButton />
        </header>
        <main className="px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
