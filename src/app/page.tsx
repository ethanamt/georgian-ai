import Link from "next/link";
import { VepkhiMascot } from "@/components/mascot/VepkhiMascot";
import { MascotState } from "@/components/mascot/vepkhi.states";

const features = [
  { title: "Alphabet", desc: "33 lettres Mkhedruli" },
  { title: "Vocabulaire", desc: "Mots et expressions" },
  { title: "Révision SRS", desc: "Mémorisation optimale" },
  { title: "Prononciation", desc: "Parlez comme un natif" },
  { title: "Écriture", desc: "Tracez les lettres" },
  { title: "Grammaire", desc: "Règles et conjugaisons" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
          <div className="font-heading text-xl font-extrabold tracking-tight select-none">
            Georgian<span className="text-muted-foreground">.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(255,255,255,.1)]"
            >
              S&apos;inscrire
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section className="relative z-10 flex min-h-screen items-center pt-24">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-[1.1fr_1fr] gap-20 items-center px-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <VepkhiMascot state={MascotState.Idle} size="sm" />
                <h1 className="font-heading text-[clamp(3rem,7vw,5rem)] font-extrabold leading-[.95] tracking-[-2px]">
                  Maîtrisez le
                  <br />
                  géorgien.
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-[500px] mb-8 leading-relaxed">
                15 minutes par jour. Leçons, révision intelligente, prononciation et écriture —
                tout ce qu&apos;il vous faut pour parler géorgien.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/register"
                  className="rounded-full bg-white px-6 py-4 font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,.1)]"
                >
                  Commencer
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-white/15 px-6 py-4 text-white transition-all hover:scale-105 hover:border-white/30"
                >
                  Se connecter →
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-white/8 bg-[#0e0e10] p-8 shadow-[0_30px_80px_rgba(0,0,0,.5)] animate-float relative z-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 border-b border-white/6 pb-4">
                    <div className="size-2 rounded-full bg-white/20" />
                    <span className="text-sm text-muted-foreground">Leçon du jour</span>
                  </div>
                  <p className="georgian-text text-2xl">გამარჯობა</p>
                  <p className="text-sm text-muted-foreground">gamardjoba — Bonjour</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["ა","ბ","გ","დ","ე","ვ"].map((l) => (
                      <div key={l} className="aspect-square rounded-xl bg-[#070708] border border-white/6 flex items-center justify-center georgian-text text-lg">
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -inset-8 rounded-2xl border border-white/6 animate-pulseExpand pointer-events-none" />
            </div>
          </div>
        </section>

        <section className="py-24 px-6 relative z-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-4xl font-bold tracking-[-1px] mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-muted-foreground max-w-[600px] mb-16 leading-relaxed">
              Alphabet, vocabulaire, grammaire, prononciation — une méthode complète pour apprendre le géorgien.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/6 bg-[#0e0e10] p-8 transition-all hover:-translate-y-2 hover:border-white/15"
                >
                  <h3 className="font-heading text-lg font-semibold mb-4">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 text-center relative z-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-2px] mb-5">
              Prêt à commencer ?
            </h2>
            <p className="text-muted-foreground mb-10 text-lg max-w-[500px] mx-auto">
              Rejoignez les apprenants qui maîtrisent le géorgien avec notre méthode.
            </p>
            <Link
              href="/register"
              className="inline-block rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,.1)]"
            >
              Commencer maintenant →
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-16 text-center text-sm text-muted-foreground relative z-10">
        <div className="mx-auto max-w-5xl px-6">
          © 2026 Georgian AI.
        </div>
      </footer>

      <style>{`
        @keyframes pulseExpand {
          0% { transform: scale(0.92); opacity: 1; }
          100% { transform: scale(1.15); opacity: 0; }
        }
        .animate-pulseExpand {
          animation: pulseExpand 3s ease-out infinite;
        }
      `}</style>
    </div>
  );
}
