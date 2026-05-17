import { siteConfig } from "@/lib/site-config";
import type { MassTime } from "@/lib/sheets";

interface StructuredDataProps {
  sundayMasses: MassTime[];
  weekdayMasses: MassTime[];
}

function massTimesToOpeningHours(
  masses: MassTime[],
  days: string[],
) {
  return masses.map((m) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens: m.time.padStart(5, "0"),
    closes: m.time.padStart(5, "0"),
  }));
}

export function StructuredData({ sundayMasses, weekdayMasses }: StructuredDataProps) {
  const { parish, archdiocese } = siteConfig;
  const addr = parish.address;

  const church = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: parish.fullName,
    url: siteConfig.url,
    telephone: parish.phone,
    email: parish.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: addr.street,
      postalCode: addr.postalCode,
      addressLocality: addr.city,
      addressRegion: addr.district,
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: parish.geo.latitude,
      longitude: parish.geo.longitude,
    },
    parentOrganization: {
      "@type": "Organization",
      name: archdiocese.name,
      url: archdiocese.url,
    },
    openingHoursSpecification: [
      ...massTimesToOpeningHours(sundayMasses, ["Sunday"]),
      ...massTimesToOpeningHours(weekdayMasses, [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]),
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "pl",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(church) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
