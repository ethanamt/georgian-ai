import { getCategories } from "@/lib/vocabulary";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VocabularyPage() {
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <h1 className="text-2xl font-heading font-semibold">Vocabulaire</h1>
      <div className="space-y-3">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/practice/vocabulary/${cat.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                {cat.words.length} mot{cat.words.length > 1 ? "s" : ""}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
