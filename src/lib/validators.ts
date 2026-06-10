import { LeadStatus, ProjectStatus } from "@prisma/client";
import { z } from "zod";

const phoneRegex = /^(\+?\d[\d\s().-]{7,})$/;

export const loginSchema = z.object({
  email: z.string().email("Adresa de email nu este validă."),
  password: z.string().min(8, "Parola trebuie să aibă minimum 8 caractere."),
});

export const projectSchema = z.object({
  title: z.string().min(3, "Titlul este prea scurt."),
  slug: z.string().min(3, "Slug-ul este obligatoriu.").regex(/^[a-z0-9-]+$/, "Slug-ul poate conține litere mici, cifre și cratime."),
  description: z.string().min(20, "Descrierea trebuie să fie mai detaliată."),
  industry: z.string().min(2, "Industria este obligatorie."),
  clientChallenge: z.string().min(20, "Provocarea clientului trebuie completată."),
  solution: z.string().min(20, "Soluția trebuie completată."),
  results: z.string().min(20, "Rezultatele trebuie completate."),
  technologies: z.array(z.string().min(1)).min(1, "Adaugă cel puțin o tehnologie."),
  imageUrl: z.string().min(1, "Imaginea principală este obligatorie."),
  category: z.string().min(2, "Categoria este obligatorie."),
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.DRAFT),
});

export const serviceSchema = z.object({
  name: z.string().min(3, "Numele serviciului este obligatoriu."),
  description: z.string().min(20, "Descrierea trebuie să fie mai detaliată."),
  icon: z.string().min(2, "Alege o pictogramă."),
  features: z.array(z.string().min(2)).min(1, "Adaugă cel puțin o caracteristică."),
  order: z.coerce.number().int().min(0),
  active: z.coerce.boolean().default(true),
});

export const packageSchema = z.object({
  name: z.string().min(3, "Numele pachetului este obligatoriu."),
  description: z.string().min(20, "Descrierea trebuie completată."),
  price: z.string().min(2, "Prețul este obligatoriu."),
  duration: z.string().min(2, "Durata este obligatorie."),
  deliverables: z.array(z.string().min(2)).min(1, "Adaugă cel puțin un livrabil."),
  targetIndustries: z.array(z.string().min(2)).min(1, "Adaugă cel puțin o industrie."),
  cta: z.string().min(2, "Textul butonului este obligatoriu."),
});

export const leadSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă minimum 2 caractere."),
  company: z.string().min(2, "Compania este obligatorie."),
  email: z.string().email("Adresa de email nu este validă."),
  phone: z.string().regex(phoneRegex, "Numărul de telefon nu este valid."),
  serviceNeeded: z.string().min(2, "Selectează serviciul dorit."),
  message: z.string().min(10, "Mesajul trebuie să aibă minimum 10 caractere.").max(1000, "Mesajul nu poate depăși 1000 de caractere."),
  budgetRange: z.string().min(2, "Selectează intervalul de buget."),
  timeline: z.string().min(2, "Selectează termenul dorit."),
});

export const leadStatusSchema = z.object({
  status: z.nativeEnum(LeadStatus),
});

export function parseStringList(value: unknown) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
}
