export const dynamic = "force-dynamic";

import { getUser } from "@/server/actions/auth";
import { getUserProgress } from "@/server/actions/progress";
import Link from "next/link";
import { BookOpen, RefreshCw, PenLine, Mic, MessageSquareText, Sparkles } from "lucide-react";

const quickActions = [
  { href: "/lessons", label: "Leçon", icon: BookOpen },
  { href: "/review", label: "Révision", icon: RefreshCw },
  { href: "/writing", label: "Écriture", icon: PenLine },
  { href: "/pronunciation", label: "Prononciation", icon: Mic },
  { href: "/conversation", label: "Conversation", icon: MessageSquareText },
  { href: "/practice", label: "Exercices", icon: Sparkles },
];

export default async function TodayPage() {
  const user = await getUser();
  const progress = await getUserProgress();

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-bold tracking-tight">
            Bonjour{user?.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="text-sm text-muted-foreground">
            Prêt pour votre session du jour.
          </p>
        </div>

      {progress && (
        <>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Streak", value: progress.streakDays, unit: "jours" },
              { label: "Mots", value: progress.wordsKnown, unit: "appris" },
              { label: "Lettres", value: progress.lettersMastered, unit: "/33" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/6 bg-[#0e0e10] p-5 text-center">
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className="font-heading text-3xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.unit}</p>
              </div>
            ))}
          </div>

          <Link
            href="/review"
            className="flex items-center justify-between rounded-2xl border border-white/6 bg-[#0e0e10] px-6 py-5 transition-all hover:border-white/15 hover:-translate-y-0.5"
          >
            <div>
              <p className="text-xs text-muted-foreground">Cartes à réviser</p>
              <p className="font-heading text-2xl font-bold">{progress.dueCards}</p>
            </div>
            <RefreshCw className="size-5 text-muted-foreground" />
          </Link>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Compétences
            </p>
            <div className="space-y-4">
              {Object.entries(progress.skillScores).map(([skill, score]) => (
                <div key={skill}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="capitalize">{skill}</span>
                    <span className="text-muted-foreground">{score}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-500"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Actions rapides
            </p>
            <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-white/6 bg-[#0e0e10] py-5 transition-all hover:border-white/15 hover:-translate-y-0.5"
                  >
                    <Icon className="size-4" />
                    <span className="text-xs text-muted-foreground">{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
