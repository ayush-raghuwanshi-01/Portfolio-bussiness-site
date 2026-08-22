import { useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Testimonials from "@/components/portfolio/Testimonials";
import Community from "@/components/portfolio/Community";
import Booking from "@/components/portfolio/Booking";
import Contact from "@/components/portfolio/Contact";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsPage = () => {
  useEffect(() => {
    document.title = "Client Testimonials — ZenWebStudio";
    const desc = "Real results from real clients who've built websites, software and SaaS with the ZenWebStudio team.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <main className="relative overflow-x-clip">
      <Navbar />

      <section className="relative pt-36 pb-6">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">Testimonials</span>
            <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
              Clients who <span className="text-gradient">trust our team.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Real quotes from founders and businesses who've shipped real products with us.
            </p>
            <div className="mt-7 flex justify-center">
              <Button asChild variant="glass" size="lg">
                <a href="/"><ArrowLeft className="h-4 w-4" /> Back home</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Community />
      <Booking />
      <Contact />
    </main>
  );
};

export default TestimonialsPage;
