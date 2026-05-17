const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? "";

/**
 * Fetches a published Google Sheet tab as CSV and parses it into rows.
 * The sheet must be published: File → Share → Publish to the web → CSV.
 */
async function fetchSheet(tabName: string): Promise<string[][]> {
  if (!SHEET_ID) {
    console.warn(`[sheets] GOOGLE_SHEET_ID not set — using fallback data`);
    return [];
  }

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;

  const res = await fetch(url, { next: { revalidate: false } });

  if (!res.ok) {
    console.warn(`[sheets] Failed to fetch "${tabName}": ${res.status}`);
    return [];
  }

  const text = await res.text();
  return parseCSV(text);
}

/** Simple CSV parser that handles quoted fields with commas/newlines. */
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(current.trim());
        current = "";
      } else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(current.trim());
        if (row.some((c) => c !== "")) rows.push(row);
        row = [];
        current = "";
      } else {
        current += ch;
      }
    }
  }
  row.push(current.trim());
  if (row.some((c) => c !== "")) rows.push(row);

  return rows;
}

// ─── Data types ──────────────────────────────────────────────

export interface MassTime {
  time: string;
  note: string | null;
}

export interface Announcement {
  date: string;
  title: string;
  items: string[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  officeHours: string;
}

// ─── Fallback data (used when sheet is not configured) ───────

const FALLBACK_SUNDAY: MassTime[] = [
  { time: "7:30", note: null },
  { time: "9:00", note: null },
  { time: "10:30", note: "suma" },
  { time: "12:00", note: null },
  { time: "18:00", note: null },
];

const FALLBACK_WEEKDAY: MassTime[] = [
  { time: "7:00", note: null },
  { time: "18:00", note: null },
];

const FALLBACK_ANNOUNCEMENTS: Announcement[] = [
  {
    date: "Niedziela, 11 maja 2025",
    title: "Ogłoszenia parafialne",
    items: [
      "W tym tygodniu zapraszamy na nabożeństwo majowe codziennie o godz. 17:30.",
      "W piątek — adoracja Najświętszego Sakramentu po Mszy św. wieczornej.",
      "Trwa zapisy na pielgrzymkę parafialną — szczegóły w kancelarii.",
      "Zachęcamy do ofiar na bieżące potrzeby parafii — Bóg zapłać za każdą pomoc.",
    ],
  },
];

const FALLBACK_CONTACT: ContactInfo = {
  address: "ul. Maciejkowa 3, 31-334 Kraków",
  phone: "+48 12 635 17 44",
  email: "toniestanislaw@wp.pl",
  officeHours: "po Mszy Świętej, zachęcamy do kontaktu telefonicznego",
};

// ─── Fetchers ────────────────────────────────────────────────

/**
 * Sheet "Msze" expected format:
 *   Row 1: header (ignored)
 *   Col A: typ ("niedziela" or "powszedni")
 *   Col B: godzina (e.g. "7:30")
 *   Col C: uwaga (e.g. "suma") — optional
 */
export async function getMassTimes(): Promise<{
  sunday: MassTime[];
  weekday: MassTime[];
}> {
  const rows = await fetchSheet("Msze");
  if (rows.length <= 1) {
    return { sunday: FALLBACK_SUNDAY, weekday: FALLBACK_WEEKDAY };
  }

  const sunday: MassTime[] = [];
  const weekday: MassTime[] = [];

  for (const row of rows.slice(1)) {
    const typ = (row[0] ?? "").toLowerCase();
    const time = row[1] ?? "";
    const note = row[2] || null;

    if (!time) continue;

    if (typ.startsWith("niedz") || typ.startsWith("świ")) {
      sunday.push({ time, note });
    } else {
      weekday.push({ time, note });
    }
  }

  return {
    sunday: sunday.length ? sunday : FALLBACK_SUNDAY,
    weekday: weekday.length ? weekday : FALLBACK_WEEKDAY,
  };
}

/**
 * Sheet "Ogłoszenia" expected format:
 *   Row 1: header (ignored)
 *   Col A: data (e.g. "Niedziela, 18 maja 2025")
 *   Col B: tytuł (e.g. "Ogłoszenia parafialne")
 *   Col C: treść (one announcement point per row with same date)
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  const rows = await fetchSheet("Ogłoszenia");
  if (rows.length <= 1) return FALLBACK_ANNOUNCEMENTS;

  const map = new Map<string, Announcement>();

  for (const row of rows.slice(1)) {
    const date = row[0] ?? "";
    const title = row[1] ?? "Ogłoszenia parafialne";
    const item = row[2] ?? "";

    if (!date || !item) continue;

    const key = date;
    if (!map.has(key)) {
      map.set(key, { date, title, items: [] });
    }
    map.get(key)!.items.push(item);
  }

  const result = Array.from(map.values());
  return result.length ? result : FALLBACK_ANNOUNCEMENTS;
}

/**
 * Sheet "Kontakt" expected format:
 *   Row 1: header (ignored)
 *   Col A: pole (adres / telefon / email / kancelaria)
 *   Col B: wartość
 */
export async function getContactInfo(): Promise<ContactInfo> {
  const rows = await fetchSheet("Kontakt");
  if (rows.length <= 1) return FALLBACK_CONTACT;

  const info = { ...FALLBACK_CONTACT };

  for (const row of rows.slice(1)) {
    const field = (row[0] ?? "").toLowerCase();
    const value = row[1] ?? "";

    if (!value) continue;

    if (field.includes("adres")) info.address = value;
    else if (field.includes("telefon") || field.includes("phone"))
      info.phone = value;
    else if (field.includes("email") || field.includes("mail"))
      info.email = value;
    else if (field.includes("kancelaria") || field.includes("godziny"))
      info.officeHours = value;
  }

  return info;
}
