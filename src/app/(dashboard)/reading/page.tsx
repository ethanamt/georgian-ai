import { getReadingTexts } from "@/lib/reading";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ReadingPage() {
  const texts = getReadingTexts();

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <h1 className="text-3xl font-heading font-semibold">Lecture</h1>
      <div className="space-y-3">
        {texts.map((t) => (
          <Link key={t.id} href={`/reading/${t.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg georgian-text">
                    {t.title}
                  </CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {t.estimatedMinutes} min
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-1">
                <p className="text-sm text-muted-foreground">{t.titleFr}</p>
                <Badge variant="secondary" className="text-[10px]">
                  {t.level}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
