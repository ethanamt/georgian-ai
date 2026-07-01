import { getReadingText } from "@/lib/reading";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReadingCard } from "@/components/reading/ReadingCard";
import { ReadingExercise } from "@/components/reading/ReadingExercise";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function ReadingTextPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const text = getReadingText(id);
  if (!text) notFound();

  return (
    <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/reading"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4 inline mr-1" />
          Lecture
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-heading font-semibold georgian-text">
          {text.title}
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">{text.titleFr}</p>
          <Badge variant="secondary" className="text-[10px]">
            {text.level}
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {text.paragraphs.map((p, i) => (
          <ReadingCard
            key={i}
            georgian={p.georgian}
            transliteration={p.transliteration}
            french={p.french}
          />
        ))}
      </div>

      <div className="border-t border-border pt-6">
        <ReadingExercise questions={text.questions} />
      </div>
    </div>
  );
}
