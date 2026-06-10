import Link from "next/link";
import { Code2, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-[#08243d] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="text-2xl font-bold">AMDARIS</div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            Construim echipe software și produse digitale pentru companii care au nevoie de execuție tehnică serioasă, comunicare clară și rezultate măsurabile.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase text-slate-300">Navigare</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/services">Servicii</Link>
            <Link href="/projects">Proiecte</Link>
            <Link href="/about">Despre</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase text-slate-300">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Mail size={16} aria-hidden /> {site.email}</span>
            <span className="flex items-center gap-2"><Phone size={16} aria-hidden /> {site.phone}</span>
            <span className="flex items-center gap-2"><MapPin size={16} aria-hidden /> {site.address}</span>
          </div>
          <div className="mt-5 flex gap-3" aria-label="Rețele sociale">
            <Link href="#" aria-label="LinkedIn AMDARIS" className="rounded-md bg-white/10 p-2"><Share2 size={18} /></Link>
            <Link href="#" aria-label="Repository AMDARIS" className="rounded-md bg-white/10 p-2"><Code2 size={18} /></Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-400">© 2026 AMDARIS. Toate drepturile rezervate.</div>
    </footer>
  );
}
