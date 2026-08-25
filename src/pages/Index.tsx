import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import Marquee from "@/components/portfolio/Marquee";
import Projects from "@/components/portfolio/Projects";
import About from "@/components/portfolio/About";
import Services from "@/components/portfolio/Services";
import Testimonials from "@/components/portfolio/Testimonials";
import Community from "@/components/portfolio/Community";
import Booking from "@/components/portfolio/Booking";
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
      {/* <Testimonials compact /> */}
      {/* <Community /> */}
      <Booking />
      <Contact />
    </main>
  );
};

export default Index;
