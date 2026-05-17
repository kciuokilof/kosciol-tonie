"use client";

import { useState, useEffect } from "react";
import { Menu, X, Church } from "lucide-react";

const links = [
  { href: "#o-parafii", label: "O parafii" },
  { href: "#msze-swiete", label: "Msze Święte" },
  { href: "#historia", label: "Historia" },
  { href: "#duszpasterze", label: "Duszpasterze" },
  { href: "#sakramenty", label: "Sakramenty" },
  { href: "#ogloszenia", label: "Ogłoszenia" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Menu główne">
        <a
          href="#"
          className={`flex items-center gap-2 font-serif text-lg font-semibold transition-colors ${
            scrolled ? "text-navy-800" : "text-white"
          }`}
        >
          <Church className="size-5" />
          <span className="hidden sm:inline">Parafia Tonie</span>
        </a>

        {/* Desktop */}
        <ul className="hidden gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-gold-500 ${
                  scrolled ? "text-navy-700" : "text-white/90"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden transition-colors ${
            scrolled ? "text-navy-800" : "text-white"
          }`}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy-100 bg-white/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-navy-700 hover:text-gold-500"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
