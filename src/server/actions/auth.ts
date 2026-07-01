"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signIn(
  prevState: { error: string | null },
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email et mot de passe requis" };
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur serveur" };
  }

  revalidatePath("/", "layout");
  redirect("/today");
}

export async function signUp(
  prevState: { error: string | null },
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const displayName = formData.get("displayName") as string;

  if (!email || !password) {
    return { error: "Email et mot de passe requis" };
  }

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !user) {
      return { error: authError?.message || "Erreur lors de l'inscription" };
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      email,
      display_name: displayName || null,
    });

    if (profileError) {
      return { error: "Erreur lors de la création du profil" };
    }

    await supabase.from("settings").insert({ user_id: user.id });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur serveur" };
  }

  revalidatePath("/", "layout");
  redirect("/today");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
