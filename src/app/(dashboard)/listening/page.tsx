import { getListeningExercises } from "@/lib/listening";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ListeningPage() {
  const exercises = getListeningExercises();

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <h1 className="text-3xl font-heading font-semibold">Écoute</h1>
      <div className="space-y-3">
        {exercises.map((ex) => (
          <Link key={ex.id} href={`/listening/${ex.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{ex.title}</CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {ex.estimatedMinutes} min
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-1">
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {ex.translation}
                </p>
                <div className="flex gap-1.5">
                  <Badge variant="secondary" className="text-[10px]">
                    {ex.level}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    {ex.questions.length} question{ex.questions.length > 1 ? "s" : ""}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
