export const dynamic = "force-dynamic";

import { getAlphabetLetters, getLetterProgress } from "@/server/actions/alphabet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LetterDetail } from "@/components/alphabet/LetterDetail";
import { Progress } from "@/components/ui/progress";

export default async function AlphabetPage() {
  const letters = await getAlphabetLetters();
  const progress = await getLetterProgress();

  const getStatusClass = (letterId: string) => {
    if (!progress) return "border-border";
    const card = progress; // simplified — real status per letter needs DB lookup
    return "border-border";
  };

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-semibold">Alphabet</h1>
        {progress && (
          <Badge variant="secondary" className="text-sm">
            {progress.mastered}/{progress.total}
          </Badge>
        )}
      </div>

      {progress && (
        <div className="space-y-1">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progression</span>
            <span>{Math.round((progress.mastered / progress.total) * 100)}%</span>
          </div>
          <Progress
            value={(progress.mastered / progress.total) * 100}
            className="h-2"
          />
        </div>
      )}

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {letters.map((letter) => (
          <LetterDetail key={letter.id} letter={letter} />
        ))}
      </div>
    </div>
  );
}
