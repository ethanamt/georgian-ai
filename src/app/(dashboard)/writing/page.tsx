import { getAlphabet } from "@/lib/alphabet";
import { WritingPractice } from "@/components/writing/WritingPractice";

export default function WritingPage() {
  const letters = getAlphabet();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight text-center mb-1">Écriture</h1>
      <p className="text-sm text-muted-foreground text-center mb-8">Entraînez-vous à tracer les lettres géorgiennes</p>
      <WritingPractice letters={letters} />
    </div>
  );
}
