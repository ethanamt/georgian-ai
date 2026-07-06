"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseOrNull } from "@/components/providers";
import Link from "next/link";
import { Giorgi } from "@/components/mascot/Giorgi";

export default function LoginPage() {
  const router = useRouter();
  const supabase = useSupabaseOrNull();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase non initialisé");
      return;
    }
    setPending(true);
    setError(null);

    try {
      const form = new FormData(e.currentTarget);
      const email = form.get("email") as string;
      const password = form.get("password") as string;

      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setError(authError.message);
        setPending(false);
        return;
      }

      router.push("/today");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center flex flex-col items-center gap-3">
          <Giorgi size={56} variant="wave" />
          <h1 className="font-heading text-3xl font-bold tracking-tight">Connexion</h1>
          <p className="text-sm text-muted-foreground">Connectez-vous pour continuer</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-white/10 bg-[#0e0e10] px-4 py-3 text-sm outline-none transition-colors focus:border-white/30"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-medium text-muted-foreground">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-white/10 bg-[#0e0e10] px-4 py-3 text-sm outline-none transition-colors focus:border-white/30"
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(255,255,255,.1)] disabled:opacity-50"
          >
            {pending ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-foreground">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
