"use client";

import { useScrollReveal, revealStyle } from "@/hooks/use-scroll-reveal";
import {
  Droplets,
  Flame,
  Heart,
  Sparkles,
  Cross,
} from "lucide-react";

const sacraments = [
  {
    icon: Droplets,
    name: "Chrzest Święty",
    description:
      "Zgłoszenia w kancelarii parafialnej. Wymagane: akt urodzenia dziecka, świadectwo ślubu kościelnego rodziców, dane chrzestnych.",
  },
  {
    icon: Flame,
    name: "Bierzmowanie",
    description:
      "Przygotowanie odbywa się w ramach katechezy szkolnej. Szczegóły i zapisy w kancelarii parafialnej.",
  },
  {
    icon: Sparkles,
    name: "Pierwsza Komunia Święta",
    description:
      "Przygotowanie w ramach katechezy szkolnej w klasie III szkoły podstawowej. Informacje u katechety lub w kancelarii.",
  },
  {
    icon: Heart,
    name: "Małżeństwo",
    description:
      "Narzeczeni zgłaszają się w kancelarii min. 3 miesiące przed planowaną datą ślubu. Wymagane: metryki chrztu, zaświadczenia z USC.",
  },
  {
    icon: Cross,
    name: "Pogrzeb",
    description:
      "Formalności w kancelarii parafialnej. Wymagane: akt zgonu, kartka od księdza, który udzielił sakramentów chorych.",
  },
];

export function Sacraments() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="sakramenty" className="bg-white py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center" style={revealStyle(visible, 0)}>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-navy-100">
            <Sparkles className="size-6 text-navy-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-navy-800 md:text-4xl">
            Sakramenty
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold-400" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sacraments.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                style={revealStyle(visible, 200 + i * 100)}
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-gold-50">
                  <Icon className="size-6 text-gold-600" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-navy-800">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
