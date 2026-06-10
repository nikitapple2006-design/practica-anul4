import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  return (
    <section className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase text-orange-600">Cont</p>
      <h1 className="mt-1 text-2xl font-bold text-slate-950">Setări</h1>
      <p className="mt-2 text-sm text-slate-600">Detalii despre sesiunea administrativă curentă.</p>
      <div className="mt-6 grid gap-4 text-sm">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><strong className="text-slate-950">Nume:</strong> <span className="text-slate-700">{session?.user.name}</span></div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><strong className="text-slate-950">Email:</strong> <span className="text-slate-700">{session?.user.email}</span></div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><strong className="text-slate-950">Rol:</strong> <span className="text-slate-700">{session?.user.role}</span></div>
      </div>
      <p className="mt-6 text-sm leading-6 text-slate-600">Schimbarea parolei și preferințele avansate pot fi legate la un flux intern de administrare. Conturile sunt protejate prin parole hash-uite și sesiuni JWT.</p>
    </section>
  );
}
