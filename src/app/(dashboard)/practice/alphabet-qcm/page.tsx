import { getAlphabet } from "@/lib/alphabet";
import { AlphabetQCMClient } from "@/components/exercises/AlphabetQCMClient";

export default function AlphabetQCMPage() {
  const letters = getAlphabet();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="text-2xl font-heading font-semibold text-center mb-6">
        Reconnaître les lettres
      </h1>
      <AlphabetQCMClient letters={letters} />
    </div>
  );
}
