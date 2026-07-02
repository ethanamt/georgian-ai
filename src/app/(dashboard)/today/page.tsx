export const dynamic = "force-dynamic";

import { getUser } from "@/server/actions/auth";
import { getUserProgress } from "@/server/actions/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  BookOpen,
  RefreshCw,
  PenLine,
  Mic,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

const quickActions = [
  { href: "/lessons", label: "Leçon", icon: BookOpen, color: "text-primary" },
  { href: "/review", label: "Révision", icon: RefreshCw, color: "text-accent" },
  { href: "/writing", label: "Écriture", icon: PenLine, color: "text-success" },
  { href: "/pronunciation", label: "Prononciation", icon: Mic, color: "text-chart-5" },
  { href: "/conversation", label: "Conversation", icon: MessageSquareText, color: "text-primary" },
  { href: "/practice", label: "Exercices", icon: Sparkles, color: "text-accent" },
];

export default async function TodayPage() {
  const user = await getUser();
  const progress = await getUserProgress();

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      {/* Greeting */}
      <div className="animate-fade-in space-y-1">
        <h1 className="text-3xl font-heading font-semibold tracking-tight">
          Bonjour{user?.email ? `, ${user.email.split("@")[0]}` : ""}
        </h1>
        <p className="text-muted-foreground text-sm">
          Prêt pour votre session du jour ?
        </p>
      </div>

      {progress && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <Card className="card-shadow animate-slide-up">
              <CardContent className="flex flex-col items-center gap-1 p-4">
                <span className="text-xs text-muted-foreground font-medium">Streak</span>
                <span className="text-2xl font-bold font-heading">{progress.streakDays}</span>
                <span className="text-[10px] text-muted-foreground">jours</span>
              </CardContent>
            </Card>
            <Card className="card-shadow animate-slide-up [animation-delay:100ms]">
              <CardContent className="flex flex-col items-center gap-1 p-4">
                <span className="text-xs text-muted-foreground font-medium">Mots</span>
                <span className="text-2xl font-bold font-heading">{progress.wordsKnown}</span>
                <span className="text-[10px] text-muted-foreground">appris</span>
              </CardContent>
            </Card>
            <Card className="card-shadow animate-slide-up [animation-delay:200ms]">
              <CardContent className="flex flex-col items-center gap-1 p-4">
                <span className="text-xs text-muted-foreground font-medium">Lettres</span>
                <span className="text-2xl font-bold font-heading">{progress.lettersMastered}</span>
                <span className="text-[10px] text-muted-foreground">/33</span>
              </CardContent>
            </Card>
          </div>

          {/* Main CTA */}
          <Link href="/review" className="animate-scale-in block">
            <div className="card-gradient relative flex items-center justify-between overflow-hidden rounded-xl px-5 py-4 shadow-button">
              <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-white/10 blur-xl" />
              <div className="pointer-events-none absolute -bottom-4 -left-4 size-20 rounded-full bg-white/5 blur-lg" />
              <div>
                <p className="text-sm font-medium text-primary-foreground/80">
                  Cartes à réviser
                </p>
                <p className="text-3xl font-bold font-heading text-primary-foreground">
                  {progress.dueCards}
                </p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-full bg-white/20 text-primary-foreground">
                <RefreshCw className="size-6" />
              </div>
            </div>
          </Link>

          {/* Skills */}
          <div className="card-shadow rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Compétences
            </h3>
            <div className="space-y-3">
              {Object.entries(progress.skillScores).map(([skill, score], i) => (
                <div key={skill} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-medium capitalize text-foreground">{skill}</span>
                    <span className="text-muted-foreground">{score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Actions rapides
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="card-shadow group flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card px-2 py-3 transition-all hover:-translate-y-0.5"
                  >
                    <div
                      className={`flex size-9 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10 ${action.color}`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground text-center leading-tight">
                      {action.label}
                    </span>
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
