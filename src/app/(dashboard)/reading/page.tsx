import { getReadingTexts } from "@/lib/reading";
import Link from "next/link";

export default function ReadingPage() {
  const texts = getReadingTexts();

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight">Lecture</h1>
      <div className="space-y-3">
        {texts.map((t) => (
          <Link
            key={t.id}
            href={`/reading/${t.id}`}
            className="flex items-center justify-between rounded-2xl border border-white/6 bg-[#0e0e10] px-6 py-5 transition-all hover:border-white/15 hover:-translate-y-0.5"
          >
            <div>
              <p className="georgian-text text-base">{t.title}</p>
              <p className="text-sm text-muted-foreground">{t.titleFr}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-white/10 px-2.5 py-0.5">{t.level}</span>
              <span>{t.estimatedMinutes} min</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
