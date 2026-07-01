import { getListeningExercise } from "@/lib/listening";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ListeningExercise } from "@/components/listening/ListeningExercise";

export default async function ListeningExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exercise = getListeningExercise(id);
  if (!exercise) notFound();

  return (
    <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/listening"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4 inline mr-1" />
          Écoute
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

      <ListeningExercise
        text={exercise.georgianText}
        translation={exercise.translation}
        questions={exercise.questions}
      />
    </div>
  );
}
