"use client";

import { useState } from "react";
import { useScrollReveal, revealStyle } from "@/hooks/use-scroll-reveal";
import { MapPin, Phone, Mail, Clock, Check, Copy } from "lucide-react";
import type { ContactInfo } from "@/lib/sheets";

interface ContactProps {
  contact: ContactInfo;
}

export function Contact({ contact }: ContactProps) {
  const { ref, visible } = useScrollReveal();
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const contactInfo = [
    {
      icon: MapPin,
      label: "Adres",
      value: contact.address,
      copyable: true,
    },
    {
      icon: Phone,
      label: "Telefon",
      value: contact.phone,
      copyable: true,
    },
    {
      icon: Mail,
      label: "E-mail",
      value: contact.email,
      copyable: true,
    },
    {
      icon: Clock,
      label: "Kancelaria",
      value: contact.officeHours,
    },
  ];

  return (
    <section id="kontakt" className="bg-white py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center" style={revealStyle(visible, 0)}>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-navy-100">
            <MapPin className="size-6 text-navy-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-navy-800 md:text-4xl">
            Kontakt
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold-400" />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact cards */}
          <div className="space-y-4" style={revealStyle(visible, 200)}>
            {contactInfo.map((c) => {
              const Icon = c.icon;
              const content = (
                <div className="flex items-start gap-4 rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-50">
                    <Icon className="size-5 text-gold-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-500">
                      {c.label}
                    </p>
                    <p className="mt-0.5 font-medium text-navy-800">
                      {c.value}
                    </p>
                  </div>
                </div>
              );

              return "copyable" in c && c.copyable ? (
                <button
                  key={c.label}
                  type="button"
                  className="block w-full text-left"
                  onClick={() => {
                    navigator.clipboard.writeText(c.value);
                    setCopiedLabel(c.label);
                    setTimeout(() => setCopiedLabel(null), 2000);
                  }}
                >
                  <div className="flex items-start gap-4 rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-50">
                      <Icon className="size-5 text-gold-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy-500">
                        {c.label}
                      </p>
                      <p className="mt-0.5 font-medium text-navy-800">
                        {c.value}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center self-center text-navy-400">
                      {copiedLabel === c.label ? (
                        <Check className="size-4 text-green-500" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </div>
                  </div>
                </button>
              ) : (
                <div key={c.label}>{content}</div>
              );
            })}
          </div>

          {/* Google Map */}
          <div
            className="overflow-hidden rounded-xl border border-navy-100 shadow-sm"
            style={revealStyle(visible, 400)}
            role="region"
            aria-label="Mapa lokalizacji parafii"
          >
            <iframe
              src="https://www.google.com/maps?q=Maciejkowa+3,+31-336+Krak%C3%B3w,+Poland&hl=pl&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa lokalizacji — Parafia św. Stanisława BM, ul. Maciejkowa 3, Kraków-Tonie"
            />
            <noscript>
              <p className="p-4 text-sm text-navy-600">
                ul. Maciejkowa 3, 31-336 Kraków-Tonie —{" "}
                <a
                  href="https://www.google.com/maps?q=Maciejkowa+3,+31-336+Krak%C3%B3w,+Poland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Zobacz na Google Maps
                </a>
              </p>
            </noscript>
          </div>
        </div>
      </div>
    </section>
  );
}
