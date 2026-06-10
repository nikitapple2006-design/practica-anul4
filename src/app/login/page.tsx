"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useState } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
      callbackUrl: params.get("callbackUrl") ?? "/dashboard",
    });
    setLoading(false);
    if (result?.error) {
      setError("Emailul sau parola nu sunt corecte.");
      return;
    }
    router.push(result?.url ?? "/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-7 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Autentificare dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Acces rezervat echipei AMDARIS.</p>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">Email<input required name="email" type="email" className="rounded-md border border-slate-300 px-4 py-3" /></label>
          <label className="grid gap-2 text-sm font-semibold">Parolă<input required name="password" type="password" minLength={8} className="rounded-md border border-slate-300 px-4 py-3" /></label>
        </div>
        {error ? <p className="mt-4 text-sm font-semibold text-red-700">{error}</p> : null}
        <button disabled={loading} className="mt-6 w-full rounded-md bg-orange-500 px-4 py-3 font-semibold text-white disabled:bg-slate-400">{loading ? "Se verifică..." : "Intră în cont"}</button>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center bg-slate-100 px-4"><p className="text-sm font-semibold text-slate-700">Se încarcă formularul...</p></main>}>
      <LoginForm />
    </Suspense>
  );
}
