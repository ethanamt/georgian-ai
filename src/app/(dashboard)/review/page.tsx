export const dynamic = "force-dynamic";

import { getDueCards } from "@/server/actions/srs";
import { ReviewSession } from "@/components/flashcards/ReviewSession";

export default async function ReviewPage() {
  const cards = await getDueCards();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight text-center mb-8">Révision</h1>
      <ReviewSession cards={cards} />
    </div>
  );
}
