"use server";

import { createClient } from "@/lib/supabase/server";
import type { UserProgress } from "@/types";

export async function getUserProgress(): Promise<UserProgress | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: cards } = await supabase
    .from("srs_cards")
    .select("status, next_review")
    .eq("user_id", user.id);

  const { data: analytics } = await supabase
    .from("analytics")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(1)
    .single();

  const lettersMastered =
    cards?.filter((c) => c.status === "mastered").length || 0;
  const wordsKnown = cards?.length || 0;
  const dueCards =
    cards?.filter((c) => {
      if (c.status === "mastered") return false;
      if (!c.next_review) return true;
      return new Date(c.next_review) <= new Date();
    }).length || 0;

  return {
    wordsKnown,
    lettersMastered,
    dueCards,
    totalTimeMinutes: analytics?.total_minutes || 0,
    streakDays: analytics?.streak_days || 0,
    skillScores: {
      reading: analytics?.skill_reading || 0,
      writing: analytics?.skill_writing || 0,
      listening: analytics?.skill_listening || 0,
      speaking: analytics?.skill_speaking || 0,
      grammar: analytics?.skill_grammar || 0,
      vocabulary: analytics?.skill_vocabulary || 0,
    },
  };
}
