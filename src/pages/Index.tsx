import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import Marquee from "@/components/portfolio/Marquee";
import Projects from "@/components/portfolio/Projects";
import About from "@/components/portfolio/About";
import Services from "@/components/portfolio/Services";
import Contact from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <Services />
      <Contact />
    </main>
  );
};

export default Index;
