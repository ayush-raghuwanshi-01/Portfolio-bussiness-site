import { useEffect, useRef, useState } from "react";

// Project images
import gymImg from "@/assets/gym-project.jpg";
import ecommerceImg from "@/assets/Ecommerse-project.jpg";
import prabhaImg from "@/assets/project-prabha.jpg";
import asklyticsImg from "@/assets/asklytics-project.jpg";
import teamImg from "@/assets/team-photo.jpg";
import dashboard1Img from "@/assets/modern-business-website-dashboard-design-1.webp";
import dashboard2Img from "@/assets/modern-business-website-dashboard-design-2.jpg";
import dashboard3Img from "@/assets/modern-business-website-dashboard-design-3.jpg";
import mobile1Img from "@/assets/mobile-app-ui-design-screenshot-clean-mo-1.png";
import mobile2Img from "@/assets/mobile-app-ui-design-screenshot-clean-mo-2.jpg";
import mobile3Img from "@/assets/mobile-app-ui-design-screenshot-clean-mo-3.jpg";

type ProjectTile = {
  img: string;
  title: string;
  tag: string;
};

// 13 tiles split across two rows: 7 top, 6 bottom
const row1Tiles: ProjectTile[] = [
  { img: gymImg, title: "FitCore Gym", tag: "Website" },
  { img: dashboard1Img, title: "Analytics Suite", tag: "Dashboard" },
  { img: ecommerceImg, title: "Bazaar Store", tag: "E-commerce" },
  { img: mobile1Img, title: "Wellness App", tag: "Mobile UI" },
  { img: prabhaImg, title: "Prabha Coaching", tag: "Institute Site" },
  { img: dashboard2Img, title: "Admin Dashboard", tag: "Dashboard" },
  { img: asklyticsImg, title: "Asklytics SaaS", tag: "Business Software" },
];

const row2Tiles: ProjectTile[] = [
  { img: mobile2Img, title: "Fitness Tracker", tag: "Mobile UI" },
  { img: teamImg, title: "Our Team", tag: "About Us" },
  { img: dashboard3Img, title: "BI Dashboard", tag: "Analytics" },
  { img: mobile3Img, title: "Health App", tag: "Mobile UI" },
  { img: dashboard1Img, title: "CRM Platform", tag: "Web App" },
  { img: gymImg, title: "Athlete Hub", tag: "Landing Page" },
];

const IMG_W = 420;
const IMG_H = 280;

const Tile = ({ tile }: { tile: ProjectTile }) => (
  <article
    aria-label={`${tile.title} — ${tile.tag}`}
    className="group relative h-[200px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-elegant ring-1 ring-inset ring-white/10 transition-transform duration-500 hover:-translate-y-px sm:h-[240px] sm:w-[360px] md:h-[280px] md:w-[420px]"
  >
    <img
      src={tile.img}
      alt=""
      loading="lazy"
      decoding="async"
      width={IMG_W}
      height={IMG_H}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-black/75 via-black/40 to-transparent p-4">
      <div>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
          {tile.tag}
        </p>
        <p className="text-sm font-semibold text-white sm:text-[14px] md:text-base">
          {tile.title}
        </p>
      </div>
    </div>
  </article>
);

const MarqueeRow = ({
  tiles,
  direction,
  duration,
}: {
  tiles: ProjectTile[];
  direction: "left" | "right";
  duration: number;
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReducedMotion(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const animationName = direction === "left" ? "pm-scroll" : "pm-scroll-rev";
  const animationStyle: React.CSSProperties = reducedMotion
    ? {}
    : {
        animation: `${animationName} ${duration}s linear infinite`,
        willChange: "transform",
      };

  // Duplicate tiles once so the loop is seamless (no jump)
  const duplicatedTiles = [...tiles, ...tiles];

  return (
    <div ref={trackRef} className="flex gap-5" style={animationStyle}>
      {duplicatedTiles.map((tile, i) => (
        <Tile key={`${tile.title}-${i}`} tile={tile} />
      ))}
    </div>
  );
};

export const ProjectMarquee = () => {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      {/* Section header */}
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <p className="eyebrow">Selected work</p>
        <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl lg:text-6xl">
          A glimpse of what we <span className="hl-ember">build</span>.
        </h2>
      </div>

      {/* Marquee rows — full viewport width, no container wrapper */}
      <div className="mt-10 flex flex-col gap-5">
        {/* Row 1: scrolls right → left, ~45s loop */}
        <MarqueeRow tiles={row1Tiles} direction="left" duration={45} />

        {/* Row 2: scrolls left → right, ~55s loop */}
        <MarqueeRow tiles={row2Tiles} direction="right" duration={55} />
      </div>

      {/* Edge fades — 8% width each side */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[8%] bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[8%] bg-gradient-to-l from-background to-transparent"
      />

      {/* Scoped keyframes for marquee animation */}
      <style>{`
        @keyframes pm-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes pm-scroll-rev {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </section>
  );
};

export default ProjectMarquee;
