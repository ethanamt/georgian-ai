export const dynamic = "force-dynamic";

import { getAlphabetLetters, getLetterProgress } from "@/server/actions/alphabet";
import { LetterDetail } from "@/components/alphabet/LetterDetail";

export default async function AlphabetPage() {
  const letters = await getAlphabetLetters();
  const progress = await getLetterProgress();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold tracking-tight">Alphabet</h1>
        {progress && (
          <span className="text-xs text-muted-foreground rounded-full border border-white/10 px-3 py-1">
            {progress.mastered}/{progress.total}
          </span>
        )}
      </div>

      {progress && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Progression</span>
            <span>{Math.round((progress.mastered / progress.total) * 100)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5">
            <div className="h-full rounded-full bg-white" style={{ width: `${(progress.mastered / progress.total) * 100}%` }} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
        {letters.map((letter) => (
          <LetterDetail key={letter.id} letter={letter} />
        ))}
      </div>
    </div>
  );
}
