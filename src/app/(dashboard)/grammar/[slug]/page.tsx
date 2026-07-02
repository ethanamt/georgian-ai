import { getLesson, getNextLesson, getPrevLesson } from "@/lib/lessons";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LessonReader } from "@/components/lessons/LessonReader";

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
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <Link href="/grammar" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← Grammaire
        </Link>
      </div>

      <LessonReader title={lesson.title} description={lesson.description} sections={lesson.sections} />

      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <div>
          {prev && (
            <Link href={`/grammar/${prev.slug}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="size-3" />
              {prev.title}
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link href={`/grammar/${next.slug}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              {next.title}
              <ArrowRight className="size-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
