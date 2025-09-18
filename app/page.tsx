import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
// import WeddingDetails from "./components/WeddingDetails";
import HoneymoonFund from "./components/HoneymoonFund";
import Gallery from "./components/Gallery";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="font-sans smooth-scroll">
      <Navigation />
      <section id="home" className="scroll-mt-10">
        <Hero />
      </section>
      {/* <section id="details" className="scroll-mt-10">
        <WeddingDetails />
      </section> */}
      <section id="fund" className="scroll-mt-10">
        <HoneymoonFund />
      </section>
      <section id="rsvp" className="scroll-mt-10">
        <RSVP />
      </section>
      <section id="gallery" className="scroll-mt-10">
        <Gallery />
      </section>

      <Footer />
    </div>
  );
}
