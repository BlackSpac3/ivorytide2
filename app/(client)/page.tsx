import Gallery from "./_components/Gallery";
import Hero from "./_components/Hero";
import HoneymoonFund from "./_components/HoneymoonFund";
import RSVP from "./_components/RSVP";

export default function Home() {
  return (
    <div className="font-sans smooth-scroll">
      <section id="home" className="scroll-mt-10">
        <Hero />
      </section>
      <section id="fund" className="scroll-mt-10">
        <HoneymoonFund />
      </section>
      <section id="rsvp" className="scroll-mt-10">
        <RSVP />
      </section>
      <section id="gallery" className="scroll-mt-10">
        <Gallery />
      </section>
    </div>
  );
}
