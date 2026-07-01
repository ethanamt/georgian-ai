import { getPronExercises } from "@/lib/pronunciation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PronunciationPage() {
  const exercises = getPronExercises();

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <h1 className="text-3xl font-heading font-semibold">Prononciation</h1>
      <div className="space-y-3">
        {exercises.map((ex) => (
          <Link key={ex.id} href={`/pronunciation/${ex.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{ex.title}</CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {ex.words.length} mot{ex.words.length > 1 ? "s" : ""}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Badge variant="secondary" className="text-[10px]">
                  {ex.level}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
