import { getAlphabet } from "@/lib/alphabet";
import { WritingPractice } from "@/components/writing/WritingPractice";

export default function WritingPage() {
  const letters = getAlphabet();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="text-2xl font-heading font-semibold text-center mb-1">
        Écriture
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Entraînez-vous à tracer les lettres géorgiennes
      </p>
      <WritingPractice letters={letters} />
    </div>
  );
}
