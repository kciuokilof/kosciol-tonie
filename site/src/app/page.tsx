import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { MassSchedule } from "@/components/mass-schedule";
import { History } from "@/components/history";
import { Priests } from "@/components/priests";
import { Sacraments } from "@/components/sacraments";
import { Announcements } from "@/components/announcements";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getMassTimes, getAnnouncements, getContactInfo } from "@/lib/sheets";

export default async function Home() {
  const [massTimes, announcements, contactInfo] = await Promise.all([
    getMassTimes(),
    getAnnouncements(),
    getContactInfo(),
  ]);

  const buildDate = new Date().toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <MassSchedule
          sunday={massTimes.sunday}
          weekday={massTimes.weekday}
        />
        <History />
        <Priests />
        <Sacraments />
        <Announcements announcements={announcements} buildDate={buildDate} />
        <Contact contact={contactInfo} />
      </main>
      <Footer />
    </>
  );
}
