import { Instagram, Linkedin, Twitter, Youtube, Facebook, MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/site";

type Social = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
};

// NOTE: Replace placeholder URLs with real handles once you have them.
const socials: Social[] = [
  { label: "Instagram", href: "https://instagram.com/zenviolabs", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/zenviolabs", Icon: Linkedin },
  { label: "X / Twitter", href: "https://twitter.com/zenviolabs", Icon: Twitter },
  { label: "YouTube", href: "https://youtube.com/@zenviolabs", Icon: Youtube },
  { label: "Facebook", href: "https://facebook.com/zenviolabs", Icon: Facebook },
  { label: "WhatsApp", href: whatsappHref(), Icon: MessageCircle, highlight: true },
];

export const SocialRail = () => (
  <div
    aria-label="Social links"
    className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
  >
    {socials.map(({ label, href, Icon, highlight }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className={`group grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 ${
          highlight
            ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_-6px_hsl(158_72%_50%/0.7)] hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_28px_-4px_hsl(158_72%_50%/0.9)]"
            : "border-border/60 bg-background/40 text-foreground/60 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-background/80 hover:text-foreground hover:shadow-[0_0_18px_-6px_hsl(248_86%_66%/0.6)]"
        }`}
      >
        <Icon className="h-4 w-4" />
      </a>
    ))}
    <span
      aria-hidden
      className="mt-1 h-16 w-px bg-gradient-to-b from-border via-foreground/20 to-transparent"
    />
  </div>
);
