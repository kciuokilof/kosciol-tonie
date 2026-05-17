"use client";

import { useScrollReveal, revealStyle } from "@/hooks/use-scroll-reveal";
import { BookOpen } from "lucide-react";

export function About() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="o-parafii" className="bg-white py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center" style={revealStyle(visible, 0)}>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-navy-100">
            <BookOpen className="size-6 text-navy-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-navy-800 md:text-4xl">
            O parafii
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold-400" />
        </div>

        <div
          className="mt-10 space-y-6 text-center text-lg leading-relaxed text-navy-700/80"
          style={revealStyle(visible, 200)}
        >
          <p>
            Parafia pw. św. Stanisława Biskupa Męczennika w Krakowie-Toniach to
            wspólnota wiernych działająca w ramach Archidiecezji Krakowskiej,
            w dekanacie Kraków-Krowodrza. Nasz kościół parafialny, położony
            przy ul. Maciejkowej 3, jest miejscem codziennej modlitwy, celebracji
            sakramentów i spotkań wspólnotowych.
          </p>
          <p>
            Patronem naszej parafii jest{" "}
            <strong className="text-navy-800">
              św. Stanisław Biskup Męczennik
            </strong>{" "}
            — jeden z głównych patronów Polski, biskup krakowski, który poniósł
            śmierć męczeńską w 1079 roku. Jego postawa odwagi i wierności
            prawdzie stanowi dla nas wzór chrześcijańskiego życia i inspirację
            do codziennego dawania świadectwa wiary.
          </p>
          <p>
            Zapraszamy wszystkich parafian i gości do uczestnictwa w życiu
            naszej wspólnoty — we Mszach Świętych, nabożeństwach oraz
            wydarzeniach parafialnych.
          </p>
        </div>
      </div>
    </section>
  );
}
