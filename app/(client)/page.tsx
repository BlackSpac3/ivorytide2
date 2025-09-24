import Gallery from "./_components/Gallery";
import HoneymoonFund from "./_components/HoneymoonFund";
import RSVP from "./_components/RSVP";
import Hero2 from "./_components/hero2";

export default function Home() {
  return (
    <div className="font-sans smooth-scroll">
      <section id="home" className="scroll-mt-10">
        <Hero2 />
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
