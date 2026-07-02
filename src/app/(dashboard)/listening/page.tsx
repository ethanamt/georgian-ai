import { getListeningExercises } from "@/lib/listening";
import Link from "next/link";

export default function ListeningPage() {
  const exercises = getListeningExercises();

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight">Écoute</h1>
      <div className="space-y-3">
        {exercises.map((ex) => (
          <Link
            key={ex.id}
            href={`/listening/${ex.id}`}
            className="flex items-center justify-between rounded-2xl border border-white/6 bg-[#0e0e10] px-6 py-5 transition-all hover:border-white/15 hover:-translate-y-0.5"
          >
            <div>
              <p className="font-heading text-base font-semibold">{ex.title}</p>
              <p className="text-sm text-muted-foreground line-clamp-1">{ex.translation}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-white/10 px-2.5 py-0.5">{ex.level}</span>
              <span>{ex.estimatedMinutes} min</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
