import Link from "next/link";

const sections = [
  { href: "/reading", title: "Lecture", desc: "Textes progressifs avec audio" },
  { href: "/writing", title: "Écriture", desc: "Tracez les lettres sur l'écran" },
  { href: "/listening", title: "Écoute", desc: "Compréhension orale" },
  { href: "/conversation", title: "Conversation", desc: "Dialoguez avec l'IA" },
  { href: "/pronunciation", title: "Prononciation", desc: "Parlez comme un natif" },
  { href: "/grammar", title: "Grammaire", desc: "Règles et conjugaisons (A1)" },
  { href: "/lessons/alphabet", title: "Alphabet", desc: "33 lettres Mkhedruli" },
  { href: "/practice", title: "Pratique", desc: "Exercices interactifs" },
];

export default function LessonsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight">Leçons</h1>
      <div className="space-y-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-center justify-between rounded-2xl border border-white/6 bg-[#0e0e10] px-6 py-5 transition-all hover:border-white/15 hover:-translate-y-0.5"
          >
            <div>
              <p className="font-heading text-base font-semibold">{s.title}</p>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
            <span className="text-sm text-muted-foreground">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
