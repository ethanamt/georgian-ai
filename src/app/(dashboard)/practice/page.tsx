import Link from "next/link";

const practiceTypes = [
  { href: "/practice/alphabet-qcm", title: "Reconnaître l'alphabet", desc: "QCM — Quelle lettre est-ce ?" },
  { href: "/practice/vocabulary", title: "Vocabulaire", desc: "Associez mots géorgiens et français" },
];

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight">Pratique</h1>
      <div className="space-y-3">
        {practiceTypes.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="flex items-center justify-between rounded-2xl border border-white/6 bg-[#0e0e10] px-6 py-5 transition-all hover:border-white/15 hover:-translate-y-0.5"
          >
            <div>
              <p className="font-heading text-base font-semibold">{p.title}</p>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
            <span className="text-sm text-muted-foreground">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
