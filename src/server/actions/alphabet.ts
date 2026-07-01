"use server";

import { createClient } from "@/lib/supabase/server";
import { getAlphabet, getTotalLetters } from "@/lib/alphabet";

export async function getAlphabetLetters() {
  return getAlphabet();
}

export async function getLetterProgress() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("srs_cards")
    .select("vocabulary_id, status")
    .eq("user_id", user.id);

  const total = getTotalLetters();
  const mastered =
    data?.filter((c) => c.status === "mastered").length || 0;
  const inProgress =
    data?.filter((c) => c.status === "learning" || c.status === "review")
      .length || 0;

  return { total, mastered, inProgress };
}
