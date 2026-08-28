import type { CSSProperties } from "react";

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

const rowOne: ProjectTile[] = [
  { img: gymImg, title: "FitCore Gym", tag: "Website" },
  { img: dashboard1Img, title: "Analytics Suite", tag: "Dashboard" },
  { img: ecommerceImg, title: "Bazaar Store", tag: "E-commerce" },
  { img: mobile1Img, title: "Wellness App", tag: "Mobile UI" },
  { img: prabhaImg, title: "Prabha Coaching", tag: "Institute site" },
  { img: dashboard2Img, title: "Admin Dashboard", tag: "Dashboard" },
  { img: asklyticsImg, title: "Asklytics SaaS", tag: "Business software" },
];

const rowTwo: ProjectTile[] = [
  { img: mobile2Img, title: "Fitness Tracker", tag: "Mobile UI" },
  { img: teamImg, title: "Our Team", tag: "About us" },
  { img: dashboard3Img, title: "BI Dashboard", tag: "Analytics" },
  { img: mobile3Img, title: "Health App", tag: "Mobile UI" },
  { img: dashboard1Img, title: "CRM Platform", tag: "Web app" },
  { img: gymImg, title: "Athlete Hub", tag: "Landing page" },
];

const ProjectTileCard = ({ tile }: { tile: ProjectTile }) => (
  <article className="project-marquee__card">
    <img
      src={tile.img}
      alt=""
      loading="lazy"
      decoding="async"
      width={420}
      height={280}
      className="project-marquee__image"
    />
    <div className="project-marquee__overlay">
      <p className="project-marquee__tag">{tile.tag}</p>
      <h3 className="project-marquee__title">{tile.title}</h3>
    </div>
  </article>
);

type MarqueeRowProps = {
  tiles: ProjectTile[];
  direction: "left" | "right";
  duration: number;
};

const MarqueeRow = ({ tiles, direction, duration }: MarqueeRowProps) => {
  const animationStyle = {
    "--project-marquee-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div
      className="project-marquee__viewport"
      role="group"
      tabIndex={0}
      aria-label={`${direction === "left" ? "Left" : "Right"} moving project previews. Focus or hover to pause.`}
    >
      <div
        className={`project-marquee__track project-marquee__track--${direction}`}
        style={animationStyle}
      >
        <div className="project-marquee__group">
          {tiles.map((tile) => (
            <ProjectTileCard key={tile.title} tile={tile} />
          ))}
        </div>
        {/* A second, identical group creates the seamless loop. It is hidden
            from assistive technology so each project is only announced once. */}
        <div className="project-marquee__group" aria-hidden="true">
          {tiles.map((tile) => (
            <ProjectTileCard key={`${tile.title}-duplicate`} tile={tile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProjectMarquee = () => (
  <section className="project-marquee" aria-labelledby="project-marquee-title">
    <div className="container">
      <div className="project-marquee__heading">
        <span className="eyebrow">Selected work</span>
        <h2 id="project-marquee-title" className="font-serif-display text-4xl sm:text-5xl lg:text-6xl">
          A glimpse of what we <span className="hl-ember">build</span>.
        </h2>
        <p>Interface previews from websites, products, dashboards, and mobile experiences.</p>
      </div>
    </div>

    <div className="project-marquee__rows">
      <MarqueeRow tiles={rowOne} direction="left" duration={52} />
      <MarqueeRow tiles={rowTwo} direction="right" duration={60} />
    </div>

    <p className="project-marquee__hint">
      Hover or focus the previews to pause the motion.
    </p>
  </section>
);

export default ProjectMarquee;
