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
    document.title = "Client Testimonials — Ayush";
    const desc = "Watch real founders talk about building websites, SaaS and AI workflows with Ayush.";
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
              Founders who <span className="text-gradient">bet on me</span> early.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Short, unscripted videos from clients who've shipped real products with me. Cards autoplay on view —
              click any card to dive in.
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
