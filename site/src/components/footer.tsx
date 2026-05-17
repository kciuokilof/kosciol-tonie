import { Church } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-800 py-10 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <Church className="size-6 text-gold-400" />
            <address className="not-italic">
              <p className="font-serif text-lg font-semibold">
                Parafia św. Stanisława BM
              </p>
              <p className="text-sm text-navy-300">
                ul. Maciejkowa 3, 31-336 Kraków-Tonie
              </p>
            </address>
          </div>

          <div className="text-sm text-navy-300">
            <a
              href="https://diecezja.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold-400"
            >
              Archidiecezja Krakowska
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-navy-700 pt-6 text-center text-sm text-navy-400">
          &copy; {new Date().getFullYear()} Parafia św. Stanisława Biskupa
          Męczennika, Kraków-Tonie. Wszelkie prawa zastrzeżone.
          <span className="mx-2">·</span>
          Realizacja:{" "}
          <a
            href="https://qualantic.io"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold-400"
          >
            qualantic.io
          </a>
        </div>
      </div>
    </footer>
  );
}
