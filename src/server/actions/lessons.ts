"use server";

import { createClient } from "@/lib/supabase/server";
import type { Lesson } from "@/types";

export async function getLessons(): Promise<Lesson[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .order("order_index");

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function completeLesson(lessonId: string, score: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non authentifié");

  const { error } = await supabase.from("user_lessons").upsert({
    user_id: user.id,
    lesson_id: lessonId,
    completed_at: new Date().toISOString(),
    score,
  });

  if (error) throw new Error(error.message);
}
