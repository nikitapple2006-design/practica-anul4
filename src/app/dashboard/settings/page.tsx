import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  return (
    <section className="max-w-3xl rounded-lg bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-950">Setări</h1>
      <div className="mt-6 grid gap-4 text-sm">
        <div className="rounded-md border border-slate-200 p-4"><strong>Nume:</strong> {session?.user.name}</div>
        <div className="rounded-md border border-slate-200 p-4"><strong>Email:</strong> {session?.user.email}</div>
        <div className="rounded-md border border-slate-200 p-4"><strong>Rol:</strong> {session?.user.role}</div>
      </div>
      <p className="mt-6 text-sm leading-6 text-slate-600">Schimbarea parolei și preferințele avansate pot fi legate la un flux intern de administrare. Conturile sunt protejate prin parole hash-uite și sesiuni JWT.</p>
    </section>
  );
}
