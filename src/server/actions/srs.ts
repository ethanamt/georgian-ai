"use server";

import { createClient } from "@/lib/supabase/server";
import type { SRSReviewResult } from "@/types";

export async function getDueCards(): Promise<SRSReviewResult[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non authentifié");

  const { data, error } = await supabase
    .rpc("get_due_cards", { p_user_id: user.id });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function reviewCard(cardId: string, quality: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non authentifié");

  const { data: card, error: cardError } = await supabase
    .from("srs_cards")
    .select("*")
    .eq("id", cardId)
    .single();

  if (cardError || !card) throw new Error("Carte non trouvée");

  const { data: sm2Result, error: sm2Error } = await supabase.rpc(
    "calculate_sm2",
    {
      p_ease_factor: card.ease_factor,
      p_interval: card.interval_days,
      p_repetitions: card.repetitions,
      p_quality: quality,
    }
  );

  if (sm2Error) throw new Error(sm2Error.message);

  const { error: updateError } = await supabase
    .from("srs_cards")
    .update({
      ease_factor: sm2Result.new_ease_factor,
      interval_days: sm2Result.new_interval,
      repetitions: sm2Result.new_repetitions,
      next_review: sm2Result.next_review_date,
      last_reviewed: new Date().toISOString(),
      status:
        sm2Result.new_repetitions >= 3
          ? "mastered"
          : sm2Result.new_repetitions >= 1
            ? "review"
            : "learning",
    })
    .eq("id", cardId);

  if (updateError) throw new Error(updateError.message);

  return sm2Result;
}

export async function createCard(vocabularyId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non authentifié");

  const { error } = await supabase.from("srs_cards").insert({
    user_id: user.id,
    vocabulary_id: vocabularyId,
  });

  if (error) throw new Error(error.message);
}

export async function getSRSStats() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non authentifié");

  const { data, error } = await supabase
    .from("srs_cards")
    .select("status")
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  return {
    new: data?.filter((c) => c.status === "new").length || 0,
    learning: data?.filter((c) => c.status === "learning").length || 0,
    review: data?.filter((c) => c.status === "review").length || 0,
    mastered: data?.filter((c) => c.status === "mastered").length || 0,
  };
}
