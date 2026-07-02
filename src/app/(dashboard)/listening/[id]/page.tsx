import { getListeningExercise } from "@/lib/listening";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <Link href="/listening" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="size-3" />
        Écoute
      </Link>

      <div>
        <h1 className="font-heading text-xl font-bold">{exercise.title}</h1>
        <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-muted-foreground">{exercise.level}</span>
      </div>

      <ListeningExercise text={exercise.georgianText} translation={exercise.translation} questions={exercise.questions} />
    </div>
  );
}
