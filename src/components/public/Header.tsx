"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "/", label: "Acasă" },
  { href: "/services", label: "Servicii" },
  { href: "/projects", label: "Proiecte" },
  { href: "/about", label: "Despre" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Navigare principală">
        <Link href="/" className="flex items-center gap-3 font-bold text-slate-950">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-[#0f3d64] text-white">A</span>
          <span className="text-xl tracking-normal">AMDARIS</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 hover:text-slate-950">
              {item.label}
            </Link>
          ))}
          <Button href="/contact">Contactează-ne</Button>
        </div>
        <button className="focus-ring rounded-md p-2 md:hidden" aria-label="Deschide meniul" onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-3 text-sm font-medium text-slate-800 hover:bg-slate-100" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Button href="/contact" className="mt-2">Contactează-ne</Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
