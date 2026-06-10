import { PublicShell } from "@/components/public/PublicShell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase text-orange-600">404</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950">Pagina nu a fost găsită</h1>
        <p className="mt-4 text-slate-600">Adresa accesată nu există sau a fost mutată. Poți reveni la pagina principală sau consulta serviciile disponibile.</p>
        <div className="mt-8 flex justify-center gap-3"><Button href="/">Acasă</Button><Button href="/services" variant="secondary">Servicii</Button></div>
      </section>
    </PublicShell>
  );
}
