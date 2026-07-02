"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseOrNull } from "@/components/providers";
import Link from "next/link";

export default function RegisterPage() {
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
      const displayName = form.get("displayName") as string;

      const result = await supabase.auth.signUp({ email, password });
      const { user } = result.data || {};
      const authError = result.error;

      if (authError || !user) {
        const msg = authError?.message ? String(authError.message) : "Erreur lors de l'inscription";
        setError(msg);
        setPending(false);
        return;
      }

      let { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          setError("Erreur lors de la connexion automatique");
          setPending(false);
          return;
        }
        const sessionCheck = await supabase.auth.getSession();
        currentSession = sessionCheck.data.session;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({ id: user.id, email: user.email!, display_name: displayName || null });
      if (profileError) {
        setError("Erreur lors de la création du profil");
        setPending(false);
        return;
      }

      const { error: settingsError } = await supabase
        .from("settings")
        .insert({ user_id: user.id });
      if (settingsError) {
        setError("Erreur lors de la création des paramètres");
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
        <div className="mb-10 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight">Inscription</h1>
          <p className="mt-2 text-sm text-muted-foreground">Créez votre compte pour commencer</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="displayName" className="text-xs font-medium text-muted-foreground">Prénom (optionnel)</label>
            <input
              id="displayName"
              name="displayName"
              className="w-full rounded-xl border border-white/10 bg-[#0e0e10] px-4 py-3 text-sm outline-none transition-colors focus:border-white/30"
            />
          </div>
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
            {pending ? "Inscription..." : "S'inscrire"}
          </button>
        </form>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Déjà un compte ?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-foreground">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
