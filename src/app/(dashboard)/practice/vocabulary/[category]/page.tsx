import { getCategory } from "@/lib/vocabulary";
import { notFound } from "next/navigation";
import { VocabPracticeClient } from "@/components/exercises/VocabPracticeClient";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="text-2xl font-heading font-semibold text-center mb-1">
        {cat.icon} {cat.name}
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-6">
        {cat.words.length} mot{cat.words.length > 1 ? "s" : ""}
      </p>
      <VocabPracticeClient words={cat.words} />
    </div>
  );
}
