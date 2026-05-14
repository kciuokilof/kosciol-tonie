"use client";

import { useScrollReveal, revealStyle } from "@/hooks/use-scroll-reveal";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { ContactInfo } from "@/lib/sheets";

interface ContactProps {
  contact: ContactInfo;
}

export function Contact({ contact }: ContactProps) {
  const { ref, visible } = useScrollReveal();

  const contactInfo = [
    {
      icon: MapPin,
      label: "Adres",
      value: contact.address,
    },
    {
      icon: Phone,
      label: "Telefon",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "E-mail",
      value: contact.email,
      href: `mailto:${contact.email}`,
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

              return "href" in c && c.href ? (
                <a key={c.label} href={c.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={c.label}>{content}</div>
              );
            })}
          </div>

          {/* Google Map */}
          <div
            className="overflow-hidden rounded-xl border border-navy-100 shadow-sm"
            style={revealStyle(visible, 400)}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.0!2d19.886!3d50.106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47164457b18e7c33%3A0x4b52ae38d2726ec0!2sGaik%207%2C%2031-992%20Krak%C3%B3w!5e0!3m2!1spl!2spl!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa — Parafia Tonie"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
