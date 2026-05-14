"use client";

import { useScrollReveal, revealStyle } from "@/hooks/use-scroll-reveal";
import { User } from "lucide-react";

const priests = [
  {
    name: "ks. mgr Jan Urbański",
    title: "Kanonik E.c.",
    role: "Proboszcz / Rektor",
    ordained: "1990",
    extra: "Kapelan OSP powiatu krakowskiego-grodzkiego, Referent Duszpasterstwa Pszczelarzy",
  },
  {
    name: "ks. mgr Jacek Kaznowski",
    title: "Kanonik E.c.",
    role: "Rezydent — Emeryt",
    ordained: "1975",
    extra: null,
  },
];

export function Priests() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="duszpasterze"
      className="bg-navy-50 py-20 md:py-28"
      ref={ref}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center" style={revealStyle(visible, 0)}>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-gold-100">
            <User className="size-6 text-gold-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-navy-800 md:text-4xl">
            Duszpasterze
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold-400" />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {priests.map((p, i) => (
            <div
              key={p.name}
              className="rounded-xl border border-navy-100 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              style={revealStyle(visible, 200 + i * 200)}
            >
              <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-navy-100">
                <User className="size-10 text-navy-400" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy-800">
                {p.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-gold-600">
                {p.title}
              </p>
              <div className="mx-auto mt-3 h-px w-12 bg-navy-200" />
              <p className="mt-3 font-medium text-navy-700">{p.role}</p>
              <p className="mt-1 text-sm text-navy-500">
                Święcenia: {p.ordained}
              </p>
              {p.extra && (
                <p className="mt-3 text-sm leading-relaxed text-navy-500">
                  {p.extra}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
