import { getPronExercise } from "@/lib/pronunciation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
    <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/pronunciation"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4 inline mr-1" />
          Prononciation
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-heading font-semibold">
          {exercise.title}
        </h1>
        <Badge variant="secondary" className="text-[10px]">
          {exercise.level}
        </Badge>
      </div>

      <div className="space-y-8">
        {exercise.words.map((word, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{word.french}</span>
              <span className="text-muted-foreground italic">
                {word.transliteration}
              </span>
            </div>
            <PronunciationRecorder
              expectedText={word.georgian}
              expectedTransliteration={word.transliteration}
            />
            {i < exercise.words.length - 1 && (
              <hr className="border-border my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
