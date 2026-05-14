"use client";

import { useScrollReveal, revealStyle } from "@/hooks/use-scroll-reveal";
import { Landmark } from "lucide-react";

const milestones = [
  {
    year: "XIII w.",
    title: "Początki osady",
    description:
      "Pierwsze wzmianki o osadzie Tonie w dokumentach historycznych. Wieś rozwijała się jako część dóbr ziemskich w okolicach Krakowa.",
  },
  {
    year: "XV w.",
    title: "Budowa pierwszego kościoła",
    description:
      "Powstanie drewnianego kościoła pod wezwaniem św. Stanisława Biskupa Męczennika, który stał się centrum życia religijnego społeczności.",
  },
  {
    year: "XVIII w.",
    title: "Rozbudowa parafii",
    description:
      "Okres intensywnego rozwoju parafii. Budowa nowych obiektów sakralnych i rozszerzenie działalności duszpasterskiej.",
  },
  {
    year: "XX w.",
    title: "Współczesny kościół",
    description:
      "Budowa obecnego kościoła parafialnego, który do dziś służy wspólnocie wiernych. Modernizacja i wyposażenie świątyni.",
  },
  {
    year: "Dziś",
    title: "Żywa wspólnota",
    description:
      "Parafia aktywnie działa w ramach Archidiecezji Krakowskiej, prowadząc bogatą działalność duszpasterską i wspólnotową.",
  },
];

export function History() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="historia" className="bg-white py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center" style={revealStyle(visible, 0)}>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-navy-100">
            <Landmark className="size-6 text-navy-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-navy-800 md:text-4xl">
            Historia parafii
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold-400" />
        </div>

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-navy-200 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="relative flex gap-8 md:gap-0"
                style={revealStyle(visible, 200 + i * 150)}
              >
                {/* Dot */}
                <div className="absolute left-4 z-10 -translate-x-1/2 md:left-1/2">
                  <div className="flex size-8 items-center justify-center rounded-full border-2 border-gold-400 bg-white">
                    <div className="size-3 rounded-full bg-gold-400" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    i % 2 === 0
                      ? "md:pr-12 md:text-right"
                      : "md:ml-auto md:pl-12"
                  }`}
                >
                  <span className="inline-block rounded-full bg-navy-100 px-3 py-1 text-sm font-semibold text-navy-700">
                    {m.year}
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-navy-800">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-navy-600">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
