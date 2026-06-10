"use client";

import { useEffect, useState } from "react";
import { serviceOptions } from "@/lib/content";

const budgets = ["sub 10.000 EUR", "10.000-25.000 EUR", "25.000-50.000 EUR", "peste 50.000 EUR"];
const timelines = ["sub 1 lună", "1-3 luni", "3-6 luni", "peste 6 luni"];
const empty = { name: "", company: "", email: "", phone: "", serviceNeeded: "", message: "", budgetRange: "", timeline: "" };

export function ContactForm() {
  const [form, setForm] = useState(() => {
    if (typeof window === "undefined") return empty;
    const saved = window.localStorage.getItem("amdaris-contact-draft");
    return saved ? JSON.parse(saved) as typeof empty : empty;
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("amdaris-contact-draft", JSON.stringify(form));
  }, [form]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus("error");
      setMessage(data.error ?? "Solicitarea nu a putut fi trimisă.");
      return;
    }
    setStatus("success");
    setMessage(data.message);
    setForm(empty);
    localStorage.removeItem("amdaris-contact-draft");
  }

  const inputClass = "focus-ring w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950";

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">Nume<input required minLength={2} className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">Companie<input required className={inputClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">Email<input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">Telefon<input required className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">Serviciu<select required className={inputClass} value={form.serviceNeeded} onChange={(e) => setForm({ ...form, serviceNeeded: e.target.value })}><option value="">Selectează</option>{serviceOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">Buget<select required className={inputClass} value={form.budgetRange} onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}><option value="">Selectează</option>{budgets.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">Termen<select required className={inputClass} value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}><option value="">Selectează</option>{timelines.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">Mesaj<textarea required minLength={10} maxLength={1000} rows={6} className={inputClass} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
      {message ? <p className={status === "success" ? "text-sm font-semibold text-green-700" : "text-sm font-semibold text-red-700"}>{message}</p> : null}
      <button disabled={status === "loading"} className="focus-ring rounded-md bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-400">
        {status === "loading" ? "Se trimite..." : "Trimite solicitarea"}
      </button>
    </form>
  );
}
