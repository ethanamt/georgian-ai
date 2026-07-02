import { getPronExercise } from "@/lib/pronunciation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PronunciationRecorder } from "@/components/pronunciation/PronunciationRecorder";

export default async function PronExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exercise = getPronExercise(id);
  if (!exercise) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <Link href="/pronunciation" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="size-3" />
        Prononciation
      </Link>

      <div>
        <h1 className="font-heading text-xl font-bold">{exercise.title}</h1>
        <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-muted-foreground">{exercise.level}</span>
      </div>

      <div className="space-y-8">
        {exercise.words.map((word, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{word.french}</span>
              <span className="text-muted-foreground italic">{word.transliteration}</span>
            </div>
            <PronunciationRecorder expectedText={word.georgian} expectedTransliteration={word.transliteration} />
            {i < exercise.words.length - 1 && <hr className="border-white/10 my-4" />}
          </div>
        ))}
      </div>
    </div>
  );
}
