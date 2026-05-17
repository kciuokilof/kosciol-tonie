export const siteConfig = {
  url: "https://parafiatonie.org",
  name: "Parafia św. Stanisława BM — Kraków-Tonie",
  shortName: "Parafia Tonie",
  description:
    "Parafia św. Stanisława Biskupa Męczennika w Krakowie-Toniach. Msze święte, sakramenty, ogłoszenia parafialne.",
  parish: {
    fullName: "Parafia św. Stanisława Biskupa Męczennika",
    address: {
      street: "ul. Maciejkowa 3",
      postalCode: "31-336",
      city: "Kraków",
      district: "Tonie",
    },
    phone: "+48 12 635 17 44",
    email: "toniestanislaw@wp.pl",
    geo: {
      latitude: 50.1158,
      longitude: 19.9034,
    },
  },
  archdiocese: {
    name: "Archidiecezja Krakowska",
    url: "https://diecezja.pl",
  },
} as const;
