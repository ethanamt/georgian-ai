"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseOrNull } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

      console.log("signUp attempt:", email);

      const result = await supabase.auth.signUp({ email, password });
      const { user } = result.data || {};
      const authError = result.error;

      console.log("signUp result:", { user, authError: authError ? { message: authError.message, ...authError } : null });

      if (authError || !user) {
        const msg = authError?.message ? String(authError.message) : "Erreur lors de l'inscription";
        setError(msg);
        setPending(false);
        return;
      }

      if (displayName) {
        await supabase.from("profiles").update({ display_name: displayName }).eq("id", user.id);
      }

      router.push("/today");
    } catch (err) {
      console.error("signUp error:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-heading">Inscription</CardTitle>
          <CardDescription>
            Créez votre compte pour commencer à apprendre le géorgien
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Prénom (optionnel)</Label>
              <Input id="displayName" name="displayName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Inscription..." : "S'inscrire"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <a href="/login" className="text-primary hover:underline">Se connecter</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
