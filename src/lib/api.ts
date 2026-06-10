import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ZodError } from "zod";
import { authOptions } from "@/lib/auth";

type ApiCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "SERVER_ERROR";

export function apiError(message: string, code: ApiCode, status: number) {
  return NextResponse.json({ error: message, code }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return apiError(error.issues[0]?.message ?? "Datele trimise nu sunt valide.", "VALIDATION_ERROR", 400);
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }
  return apiError("A apărut o eroare internă. Te rugăm să încerci din nou.", "SERVER_ERROR", 500);
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return { error: apiError("Autentificarea este necesară.", "UNAUTHORIZED", 401) };
  }

  if (session.user.role !== "ADMIN") {
    return { error: apiError("Nu ai permisiunea de a efectua această acțiune.", "FORBIDDEN", 403) };
  }

  return { session };
}

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (bucket.count >= limit) {
    return apiError("Prea multe solicitări. Te rugăm să încerci mai târziu.", "RATE_LIMITED", 429);
  }

  bucket.count += 1;
  return null;
}
