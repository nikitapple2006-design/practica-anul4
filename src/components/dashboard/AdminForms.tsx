"use client";

import { ProjectStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { slugify } from "@/lib/utils";

const inputClass = "focus-ring w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-orange-400";
const textareaClass = `${inputClass} min-h-24 resize-y`;

export function ProjectForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      title,
      slug: slugify(String(form.get("slug") || title)),
      description: form.get("description"),
      industry: form.get("industry"),
      clientChallenge: form.get("clientChallenge"),
      solution: form.get("solution"),
      results: form.get("results"),
      technologies: String(form.get("technologies")).split(",").map((item) => item.trim()),
      imageUrl: form.get("imageUrl"),
      category: form.get("category"),
      status: form.get("status"),
    };
    const response = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setMessage(response.ok ? "Proiectul a fost salvat." : (await response.json()).error);
    if (response.ok) router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase text-orange-600">Conținut nou</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">Adaugă proiect</h2>
      </div>
      <input required placeholder="Titlu" className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
      <input name="slug" placeholder="Slug opțional" className={inputClass} />
      <textarea required name="description" minLength={20} placeholder="Descriere" className={textareaClass} />
      <div className="grid gap-3 md:grid-cols-2"><input required name="industry" placeholder="Industrie" className={inputClass} /><input required name="category" placeholder="Categorie" className={inputClass} /></div>
      <textarea required name="clientChallenge" placeholder="Provocarea clientului" className={textareaClass} />
      <textarea required name="solution" placeholder="Soluția" className={textareaClass} />
      <textarea required name="results" placeholder="Rezultate" className={textareaClass} />
      <input required name="technologies" placeholder="Tehnologii separate prin virgulă" className={inputClass} />
      <input required name="imageUrl" placeholder="/brand/project-industrial.svg" className={inputClass} />
      <select name="status" className={inputClass}><option value={ProjectStatus.PUBLISHED}>Publicat</option><option value={ProjectStatus.DRAFT}>Ciornă</option><option value={ProjectStatus.ARCHIVED}>Arhivat</option></select>
      {message ? <p className="rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">{message}</p> : null}
      <button className="focus-ring rounded-md bg-orange-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600">Salvează proiect</button>
    </form>
  );
}

export function ServiceForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      description: form.get("description"),
      icon: form.get("icon"),
      features: String(form.get("features")).split(",").map((item) => item.trim()),
      order: Number(form.get("order")),
      active: true,
    };
    const response = await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setMessage(response.ok ? "Serviciul a fost salvat." : (await response.json()).error);
    if (response.ok) router.refresh();
  }
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase text-orange-600">Catalog servicii</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">Adaugă serviciu</h2>
      </div>
      <input required name="name" placeholder="Nume serviciu" className={inputClass} />
      <textarea required name="description" minLength={20} placeholder="Descriere" className={textareaClass} />
      <input required name="icon" placeholder="Pictogramă lucide" className={inputClass} />
      <input required name="features" placeholder="Caracteristici separate prin virgulă" className={inputClass} />
      <input required name="order" type="number" min={0} defaultValue={9} className={inputClass} />
      {message ? <p className="rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">{message}</p> : null}
      <button className="focus-ring rounded-md bg-orange-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600">Salvează serviciu</button>
    </form>
  );
}

export function LeadStatusSelect({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  async function update(value: string) {
    await fetch(`/api/leads/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: value }) });
    router.refresh();
  }
  return (
    <select defaultValue={status} onChange={(e) => update(e.target.value)} className="focus-ring rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
      <option value="NEW">Nou</option>
      <option value="RESPONDED">Răspuns</option>
      <option value="QUALIFIED">Calificat</option>
      <option value="LOST">Pierdut</option>
    </select>
  );
}
