import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Showcase from "@/components/Showcase";
import Team from "@/components/Team";
// import LogoSliderWrapper from "@/components/LogoSliderWrapper"; // Commented out - demo logos
import Services from "@/components/Services";
import Partnership from "@/components/Partnership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Showcase />
        <Team />
        {/* <LogoSliderWrapper /> */} {/* Commented out - demo logos */}
        <Services />
        <Partnership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
