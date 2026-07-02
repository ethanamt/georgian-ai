import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, RefreshCw, Mic, PenLine } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Leçons interactives",
    desc: "Alphabet, vocabulaire, grammaire — du A1 au A2",
  },
  {
    icon: RefreshCw,
    title: "Révision intelligente",
    desc: "Algorithme SRS pour une mémorisation optimale",
  },
  {
    icon: Mic,
    title: "Prononciation",
    desc: "Entraînez-vous avec la reconnaissance vocale",
  },
  {
    icon: PenLine,
    title: "Écriture",
    desc: "Tracez les 33 lettres du mkhedruli",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-1/4 top-1/4 size-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 size-48 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,_transparent_60%)] opacity-[0.03]" />
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium text-primary">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          Apprentissage intelligent
        </div>

        <h1 className="text-5xl font-heading font-bold tracking-tight sm:text-6xl">
          Georgian AI
        </h1>
        <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted-foreground">
          15 minutes par jour pour apprendre le géorgien,
          <br />
          avec des leçons adaptées à votre rythme.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/register">
            <Button size="lg" className="w-full min-w-[180px] text-base shadow-button">
              Commencer gratuitement
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full min-w-[160px] text-base">
              Se connecter
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/50 px-4 py-12">
        <div className="mx-auto max-w-lg">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Tout ce dont vous avez besoin
            </p>
            <h2 className="mt-2 text-2xl font-heading font-semibold">
              Apprenez le géorgien, pas à pas
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="card-shadow group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5"
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
