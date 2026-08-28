import logoMark from "@/assets/brand/logo-mark.png";

/**
 * A deliberately compact brand scene for the hero.
 *
 * The previous version combined several independently animated 3-D transforms.
 * On smaller screens those transforms could place the logo and its labels outside
 * the visual's bounds. This scene reserves space for every layer first, then
 * only animates contained decorative rings.
 */
export const HeroVisual = () => (
  <div className="hero-brand-scene" aria-label="Zenvio Labs brand mark">
    <div aria-hidden className="hero-brand-glow" />
    <div aria-hidden className="hero-brand-grid" />

    <div aria-hidden className="hero-orbit hero-orbit--outer">
      <span className="hero-orbit-dot hero-orbit-dot--ember" />
    </div>
    <div aria-hidden className="hero-orbit hero-orbit--middle">
      <span className="hero-orbit-dot hero-orbit-dot--mint" />
    </div>
    <div aria-hidden className="hero-orbit hero-orbit--inner" />

    <div className="hero-logo-lockup">
      <div aria-hidden className="hero-logo-halo" />
      <div className="hero-logo-card">
        <div className="hero-logo-card__shine" />
        <img
          src={logoMark}
          alt=""
          width={256}
          height={256}
          decoding="async"
          className="relative z-10 h-[116px] w-[116px] rounded-[22px] object-cover sm:h-[136px] sm:w-[136px]"
        />
        <span className="hero-logo-status">
          <span className="hero-logo-status__dot" />
          Ready to build
        </span>
      </div>
    </div>

    <div className="hero-brand-caption">
      <span className="hero-brand-caption__dot" />
      Design · Develop · Grow
    </div>

    <div aria-hidden className="hero-brand-note hero-brand-note--top">
      <span className="hero-brand-note__icon">✦</span>
      Fast by default
    </div>
    <div aria-hidden className="hero-brand-note hero-brand-note--bottom">
      <span className="hero-brand-note__icon">↗</span>
      Built to scale
    </div>
  </div>
);
