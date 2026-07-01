import { getLessons } from "@/lib/lessons";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GrammarPage() {
  const lessons = getLessons();

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <h1 className="text-3xl font-heading font-semibold">Grammaire</h1>
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <Link key={lesson.slug} href={`/grammar/${lesson.slug}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span>{lesson.estimatedMinutes} min</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                <p className="text-sm text-muted-foreground">
                  {lesson.description}
                </p>
                <Badge variant="secondary" className="text-[10px]">
                  {lesson.level}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
