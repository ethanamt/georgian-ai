import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const practiceTypes = [
  {
    href: "/practice/alphabet-qcm",
    title: "Reconnaître l'alphabet",
    desc: "QCM — Quelle lettre est-ce ?",
  },
  {
    href: "/practice/vocabulary",
    title: "Vocabulaire",
    desc: "Associez mots géorgiens et français",
  },
];

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <h1 className="text-3xl font-heading font-semibold">Pratique</h1>
      <div className="space-y-3">
        {practiceTypes.map((p) => (
          <Link key={p.href} href={p.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                {p.desc}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
