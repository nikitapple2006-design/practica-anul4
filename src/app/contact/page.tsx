import type { Metadata } from "next";
import { ContactForm } from "@/components/public/ContactForm";
import { JsonLd } from "@/components/public/JsonLd";
import { PublicShell } from "@/components/public/PublicShell";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactează AMDARIS pentru echipe software dedicate, dezvoltare de aplicații și consultanță tehnică.",
};

export default function ContactPage() {
  return (
    <PublicShell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, email: site.email, telephone: site.phone, address: site.address }} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-950 sm:text-5xl">Hai să discutăm proiectul tău</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Trimite-ne detaliile principale, iar un consultant tehnic va reveni cu întrebările potrivite și următorii pași.</p>
          <div className="mt-8 grid gap-3 text-sm text-slate-700">
            <p><strong>Email:</strong> {site.email}</p>
            <p><strong>Telefon:</strong> {site.phone}</p>
            <p><strong>Adresă:</strong> {site.address}</p>
          </div>
        </div>
        <ContactForm />
      </section>
    </PublicShell>
  );
}
