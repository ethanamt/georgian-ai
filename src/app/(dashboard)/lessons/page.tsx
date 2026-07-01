import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
    {
      href: "/reading",
      title: "Lecture",
      desc: "Textes géorgiens progressifs avec audio et exercices",
    },
    {
      href: "/writing",
      title: "Écriture",
      desc: "Entraînez-vous à tracer les lettres sur l'écran",
    },
    {
      href: "/listening",
      title: "Écoute",
      desc: "Exercices de compréhension orale avec audio",
    },
    {
      href: "/conversation",
      title: "Conversation",
      desc: "Dialoguez avec Nino, votre professeur IA",
    },
    {
      href: "/pronunciation",
      title: "Prononciation",
      desc: "Entraînez-vous à prononcer le géorgien",
    },
  {
    href: "/grammar",
    title: "Grammaire",
    desc: "Leçons de grammaire géorgienne (A1)",
  },
  {
    href: "/lessons/alphabet",
    title: "Alphabet",
    desc: "Apprenez les 33 lettres du Mkhedruli",
  },
  {
    href: "/practice",
    title: "Pratique",
    desc: "Exercices interactifs pour tester vos connaissances",
  },
];

export default function LessonsPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <h1 className="text-3xl font-heading font-semibold">Leçons</h1>
      <div className="space-y-3">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                {s.desc}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
