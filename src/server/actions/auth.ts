"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signIn(
  prevState: { error: string | null; success?: boolean },
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email et mot de passe requis" };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { error: null, success: true };
}

export async function signUp(
  prevState: { error: string | null; success?: boolean },
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const displayName = formData.get("displayName") as string;

  if (!email || !password) {
    return { error: "Email et mot de passe requis" };
  }

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

  if (displayName) {
    await supabase.from("profiles").update({ display_name: displayName }).eq("id", user.id);
  }

  revalidatePath("/", "layout");
  return { error: null, success: true };
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
