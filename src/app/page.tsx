import MobileBar from "@/components/MobileBar";
import Delivery from "@/sections/Delivery";
import Faq from "@/sections/Faq";
import Features from "@/sections/Features";
import FinalCta from "@/sections/FinalCta";
import Footer from "@/sections/Footer";
import Gallery from "@/sections/Gallery";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Manifesto from "@/sections/Manifesto";
import Menu from "@/sections/Menu";
import Numbers from "@/sections/Numbers";
import Reviews from "@/sections/Reviews";
import Ticker from "@/sections/Ticker";
import Visit from "@/sections/Visit";
import ZoomReveal from "@/sections/ZoomReveal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Manifesto />
        <Features />
        <ZoomReveal />
        <Menu />
        <Numbers />
        <Gallery />
        <Reviews />
        <Delivery />
        <Visit />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
