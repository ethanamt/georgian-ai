import { getLesson, getNextLesson, getPrevLesson } from "@/lib/lessons";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LessonReader } from "@/components/lessons/LessonReader";
import { Badge } from "@/components/ui/badge";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const prev = getPrevLesson(slug);
  const next = getNextLesson(slug);

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="mb-4">
        <Link
          href="/grammar"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Grammaire
        </Link>
      </div>

      <LessonReader
        title={lesson.title}
        description={lesson.description}
        sections={lesson.sections}
      />

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
        <div>
          {prev && (
            <Link href={`/grammar/${prev.slug}`}>
              <Button variant="outline" size="sm" className="gap-1">
                <ArrowLeft className="size-4" />
                {prev.title}
              </Button>
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link href={`/grammar/${next.slug}`}>
              <Button size="sm" className="gap-1">
                {next.title}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
