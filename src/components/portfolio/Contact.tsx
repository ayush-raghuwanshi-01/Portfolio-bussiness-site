import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const Contact = () => (
  <section id="contact" className="surface-dark relative py-28">
    <div className="container">
      <div className="glass relative overflow-hidden rounded-[32px] p-10 text-center sm:p-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-50" />
        <div className="relative mx-auto max-w-3xl">
          <span className="eyebrow justify-center">Let's build · Reply in 24h</span>
          <h2 className="mt-5 font-serif-display text-5xl text-foreground sm:text-7xl lg:text-[88px]">
            Have a brand worth <em className="hl-ember not-italic">obsessing over?</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-foreground/70">
            Slide into my inbox or DM. I reply to every message personally — usually within 24 hours.
          </p>

         <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=ayushtechguide@gmail.com&su=Let's Talk: AI, Business & Modern Tech&body=Hi Ayush,%0D%0A%0D%0AI'd like to chat about AI, business, and modern tech. Specifically, my query regarding the new tech world is:%0D%0A%0D%0A[Enter your query here]%0D%0A%0D%0ABest regards,"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-ember px-7 py-4 font-display text-lg font-semibold text-white shadow-ember transition-transform hover:scale-[1.02]"
>
  <Mail className="h-5 w-5" />
  ayushtechguide@gmail.com
  <ArrowUpRight className="h-5 w-5" />
</a>

          <div className="mt-8 flex items-center justify-center gap-3">
            <SocialLink href="https://in.linkedin.com/in/ayush-raghuwanshi-248532254" label="LinkedIn" icon={Linkedin} />
            <SocialLink href="https://github.com/" label="GitHub" icon={Github} />
          </div>
        </div>
      </div>

      <footer className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-border/50 pt-8 text-sm text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} Ayush. Crafted in dark mode.</div>
      </footer>
    </div>
  </section>
);

const SocialLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: typeof Github }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors hover:text-foreground"
  >
    <Icon className="h-4 w-4" /> {label}
  </a>
);

export default Contact;
