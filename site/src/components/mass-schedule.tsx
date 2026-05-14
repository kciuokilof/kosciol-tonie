"use client";

import { useScrollReveal, revealStyle } from "@/hooks/use-scroll-reveal";
import { Clock, Sun, CalendarDays } from "lucide-react";
import type { MassTime } from "@/lib/sheets";

interface MassScheduleProps {
  sunday: MassTime[];
  weekday: MassTime[];
}

export function MassSchedule({ sunday, weekday }: MassScheduleProps) {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="msze-swiete"
      className="bg-navy-50 py-20 md:py-28"
      ref={ref}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center" style={revealStyle(visible, 0)}>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-gold-100">
            <Clock className="size-6 text-gold-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-navy-800 md:text-4xl">
            Msze Święte
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold-400" />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Sunday */}
          <div
            className="rounded-xl border border-navy-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            style={revealStyle(visible, 200)}
          >
            <div className="mb-6 flex items-center gap-3">
              <Sun className="size-5 text-gold-500" />
              <h3 className="font-serif text-xl font-semibold text-navy-800">
                Niedziele i Święta
              </h3>
            </div>
            <ul className="space-y-3">
              {sunday.map((m) => (
                <li
                  key={m.time}
                  className="flex items-center justify-between border-b border-navy-50 pb-2 last:border-0"
                >
                  <span className="text-lg font-semibold text-navy-700">
                    {m.time}
                  </span>
                  {m.note && (
                    <span className="rounded-full bg-gold-100 px-3 py-0.5 text-xs font-medium text-gold-700">
                      {m.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Weekdays */}
          <div
            className="rounded-xl border border-navy-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            style={revealStyle(visible, 400)}
          >
            <div className="mb-6 flex items-center gap-3">
              <CalendarDays className="size-5 text-gold-500" />
              <h3 className="font-serif text-xl font-semibold text-navy-800">
                Dni powszednie
              </h3>
            </div>
            <ul className="space-y-3">
              {weekday.map((m) => (
                <li
                  key={m.time}
                  className="flex items-center justify-between border-b border-navy-50 pb-2 last:border-0"
                >
                  <span className="text-lg font-semibold text-navy-700">
                    {m.time}
                  </span>
                  {m.note && (
                    <span className="rounded-full bg-gold-100 px-3 py-0.5 text-xs font-medium text-gold-700">
                      {m.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg bg-navy-50 p-4">
              <p className="text-sm text-navy-600">
                <strong>Kancelaria parafialna:</strong> codziennie po Mszy
                Świętej
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
