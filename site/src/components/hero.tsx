"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const fade = (delay: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 800ms ease-out ${delay}ms, transform 800ms ease-out ${delay}ms`,
  });

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="/hero.jpg"
        alt="Kościół parafialny św. Stanisława Biskupa Męczennika w Krakowie-Toniach"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        <div style={fade(200)}>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold-300">
            Archidiecezja Krakowska
          </p>
        </div>

        <h1
          className="font-serif text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
          style={fade(400)}
        >
          Parafia św. Stanisława
          <br />
          <span className="text-gold-300">Biskupa Męczennika</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl text-lg text-white/80 md:text-xl"
          style={fade(600)}
        >
          Kraków-Tonie — wspólnota wiary, nadziei i miłości
        </p>

        <div style={fade(800)} className="mt-10">
          <a
            href="#msze-swiete"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-8 py-3 text-base font-semibold text-white transition-all hover:bg-gold-600 hover:shadow-lg"
          >
            Msze Święte
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={fade(1200)}
      >
        <a href="#o-parafii" aria-label="Przewiń w dół">
          <ChevronDown className="size-8 animate-bounce text-white/60" />
        </a>
      </div>
    </section>
  );
}
