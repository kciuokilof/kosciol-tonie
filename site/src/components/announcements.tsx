"use client";

import { useScrollReveal, revealStyle } from "@/hooks/use-scroll-reveal";
import { Megaphone, CalendarDays } from "lucide-react";
import type { Announcement } from "@/lib/sheets";

interface AnnouncementsProps {
  announcements: Announcement[];
  buildDate: string;
}

export function Announcements({ announcements, buildDate }: AnnouncementsProps) {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="ogloszenia"
      className="bg-navy-50 py-20 md:py-28"
      ref={ref}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center" style={revealStyle(visible, 0)}>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-gold-100">
            <Megaphone className="size-6 text-gold-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-navy-800 md:text-4xl">
            Ogłoszenia parafialne
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold-400" />
        </div>

        <div className="mt-12 space-y-6">
          {announcements.map((a, i) => (
            <div
              key={i}
              className="rounded-xl border border-navy-100 bg-white p-8 shadow-sm"
              style={revealStyle(visible, 200)}
            >
              <div className="mb-4 flex items-center gap-2 text-sm text-navy-500">
                <CalendarDays className="size-4" />
                <span>{a.date}</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy-800">
                {a.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {a.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-navy-700"
                    style={revealStyle(visible, 300 + j * 100)}
                  >
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gold-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-center text-sm text-navy-500"
          style={revealStyle(visible, 600)}
        >
          Ostatnia aktualizacja: {buildDate}
        </p>
      </div>
    </section>
  );
}
