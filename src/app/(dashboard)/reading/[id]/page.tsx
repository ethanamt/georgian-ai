import { getReadingText } from "@/lib/reading";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReadingCard } from "@/components/reading/ReadingCard";
import { ReadingExercise } from "@/components/reading/ReadingExercise";
import { ArrowLeft } from "lucide-react";

export default async function ReadingTextPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const text = getReadingText(id);
  if (!text) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <Link href="/reading" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="size-3" />
        Lecture
      </Link>

      <div>
        <h1 className="font-heading text-xl font-bold georgian-text">{text.title}</h1>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-muted-foreground">{text.titleFr}</p>
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-muted-foreground">{text.level}</span>
        </div>
      </div>

      <div className="space-y-4">
        {text.paragraphs.map((p, i) => (
          <ReadingCard key={i} georgian={p.georgian} transliteration={p.transliteration} french={p.french} />
        ))}
      </div>

      <div className="border-t border-white/10 pt-6">
        <ReadingExercise questions={text.questions} />
      </div>
    </div>
  );
}
