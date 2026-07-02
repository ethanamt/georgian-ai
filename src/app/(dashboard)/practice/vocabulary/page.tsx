import { getCategories } from "@/lib/vocabulary";
import Link from "next/link";

export default function VocabularyPage() {
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight">Vocabulaire</h1>
      <div className="space-y-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/practice/vocabulary/${cat.id}`}
            className="flex items-center justify-between rounded-2xl border border-white/6 bg-[#0e0e10] px-6 py-5 transition-all hover:border-white/15 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <span>{cat.icon}</span>
              <p className="font-heading text-base font-semibold">{cat.name}</p>
            </div>
            <p className="text-xs text-muted-foreground">{cat.words.length} mot{cat.words.length > 1 ? "s" : ""}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
