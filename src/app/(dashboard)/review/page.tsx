export const dynamic = "force-dynamic";

import { getDueCards } from "@/server/actions/srs";
import { ReviewSession } from "@/components/flashcards/ReviewSession";

export default async function ReviewPage() {
  const cards = await getDueCards();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="text-3xl font-heading font-semibold mb-6 text-center">
        Révision
      </h1>
      <ReviewSession cards={cards} />
    </div>
  );
}
