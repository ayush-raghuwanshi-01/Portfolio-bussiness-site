import { useEffect, useMemo, useRef, useState } from "react";
import gymImg from "@/assets/gym-project.jpg";
import asklyticsImg from "@/assets/asklytics-project.jpg";
import prabhaImg from "@/assets/project-prabha.jpg";
import ecommerceImg from "@/assets/Ecommerse-project.jpg";

const LogoMark = () => {
  const [imgOk, setImgOk] = useState(true);
  return (
    <>
      {imgOk && (
        <img
          src="/zenvio-logo.png"
          alt="Zenvio Labs"
          onError={() => setImgOk(false)}
          className="relative h-32 w-32 drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] sm:h-36 sm:w-36"
          style={{
            animation: "zShimmer 5s ease-in-out infinite",
            borderRadius: "18%",
            objectFit: "cover",
          }}
        />
      )}
      {!imgOk && (
        <svg
          viewBox="0 0 80 80"
          className="relative h-32 w-32 drop-shadow-[0_6px_18px_rgba(0,0,0,0.5)] sm:h-36 sm:w-36"
          style={{ animation: "zShimmer 5s ease-in-out infinite" }}
        >
          <defs>
            <linearGradient id="zmetal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF4D6" />
              <stop offset="35%" stopColor="#FFD27A" />
              <stop offset="60%" stopColor="#F4B740" />
              <stop offset="100%" stopColor="#A47218" />
            </linearGradient>
            <linearGradient id="zshine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="zedges" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE9B0" />
              <stop offset="100%" stopColor="#8C5A0C" />
            </linearGradient>
            <linearGradient id="zslash" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(158 72% 65%)" />
              <stop offset="100%" stopColor="hsl(16 92% 68%)" />
            </linearGradient>
          </defs>
          <path d="M16 20h48l-25 21h25V62H16l25-21H16V20z" fill="url(#zedges)" stroke="#6A4508" strokeWidth="1.5" />
          <path d="M18 22h44l-25 21h25V60H18l25-21H18V22z" fill="url(#zmetal)" />
          <path d="M19.2 61.2L60.8 20" stroke="url(#zslash)" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
          <path d="M18 22h44l-25 21h25V60H18l25-21H18V22z" fill="url(#zshine)" opacity="0.55" />
        </svg>
      )}
    </>
  );
};

const slides = [
  { img: gymImg, label: "Gym & Fitness", tag: "Business Website" },
  { img: ecommerceImg, label: "E-commerce Store", tag: "Online Shop" },
  { img: prabhaImg, label: "Prabha — Coaching", tag: "Institute Site" },
  { img: asklyticsImg, label: "Asklytics SaaS", tag: "Business Software" },
];

export const HeroVisual = () => {
  const [active, setActive] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 4, ry: -8 });
  const frameRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 3800);
    return () => clearInterval(id);
  }, []);

  // Pointer parallax + smooth lerp toward target
  const onMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  };

  useEffect(() => {
    let rx = tilt.rx;
    let ry = tilt.ry;
    const targetRx = mouse.y * -16 + 4;
    const targetRy = mouse.x * 20 - 6;
    const animate = () => {
      rx += (targetRx - rx) * 0.08;
      ry += (targetRy - ry) * 0.08;
      setTilt({ rx, ry });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouse.x, mouse.y]);

  // Pre-compute satellite positions so React doesn't re-render them
  const satellites = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        angle: (i / 12) * Math.PI * 2,
        size: 2 + (i % 3),
        color:
          i % 3 === 0
            ? "hsl(158 72% 60%)"
            : i % 3 === 1
              ? "hsl(248 86% 72%)"
              : "hsl(16 92% 66%)",
        orbit: 180 + (i % 4) * 18,
        speed: 18 + (i % 5) * 6,
        delay: i * -1.3,
        glow: i % 4 === 0,
      })),
    [],
  );

  const sparks = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        angle: (i / 6) * Math.PI * 2 + Math.PI / 12,
        len: 14 + (i % 3) * 6,
      })),
    [],
  );

  return (
    <div
      ref={frameRef}
      onMouseMove={onMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      className="relative mx-auto flex h-full w-full max-w-[580px] flex-col items-center"
      style={{ perspective: "1800px" }}
    >
      {/* === 3D Animated Z Logo Scene === */}
      <div
        className="relative flex h-[340px] w-full items-center justify-center sm:h-[420px]"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.1s linear",
        }}
      >
        {/* Conic gradient glow plate behind logo */}
        <div
          aria-hidden
          className="absolute h-[360px] w-[360px] rounded-full opacity-80 sm:h-[420px] sm:w-[420px]"
          style={{
            background:
              "conic-gradient(from 0deg, hsl(248 86% 66% / 0.55), hsl(158 72% 55% / 0.35), hsl(16 92% 60% / 0.45), hsl(188 92% 50% / 0.35), hsl(248 86% 66% / 0.55))",
            filter: "blur(70px)",
            animation: "spin-slow 28s linear infinite",
            transform: "translateZ(-30px)",
          }}
        />

        {/* Inner soft glow */}
        <div
          aria-hidden
          className="absolute h-[240px] w-[240px] rounded-full bg-white/40 blur-[60px] dark:bg-white/5 sm:h-[280px] sm:w-[280px]"
          style={{ transform: "translateZ(-20px)" }}
        />

        {/* Twinkling stars / satellites orbiting at different speeds */}
        {satellites.map((s, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute left-1/2 top-1/2"
            style={{
              width: s.size,
              height: s.size,
              marginLeft: -s.size / 2,
              marginTop: -s.size / 2,
              transformStyle: "preserve-3d",
              animation: `satOrbit${i % 3} ${s.speed}s linear infinite`,
              animationDelay: `${s.delay}s`,
              transform: `translateZ(${20 + (i % 4) * 10}px)`,
            }}
          >
            <span
              className="block h-full w-full rounded-full"
              style={{
                background: s.color,
                boxShadow: s.glow ? `0 0 14px 2px ${s.color}` : `0 0 6px ${s.color}`,
              }}
            />
            <style>{`
              @keyframes satOrbit${i % 3} {
                from { transform: rotate(${s.angle}rad) translateX(${s.orbit}px) rotate(0deg) translateZ(${20 + (i % 4) * 10}px); }
                to   { transform: rotate(${s.angle + Math.PI * 2}rad) translateX(${s.orbit}px) rotate(-360deg) translateZ(${20 + (i % 4) * 10}px); }
              }
            `}</style>
          </div>
        ))}

        {/* Orbital ring 1 — ember, tilted strongly */}
        <div
          aria-hidden
          className="absolute h-[340px] w-[340px] rounded-full sm:h-[400px] sm:w-[400px]"
          style={{
            transform: "rotateX(72deg) rotateY(8deg) translateZ(10px)",
            transformStyle: "preserve-3d",
            border: "1.5px solid hsl(16 92% 60% / 0.45)",
            animation: "ringSpin1 18s linear infinite",
          }}
        >
          <span
            className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-ember"
            style={{ boxShadow: "0 0 24px 4px hsl(16 92% 60% / 0.9)" }}
          />
        </div>
        {/* Orbital ring 2 — green, reverse */}
        <div
          aria-hidden
          className="absolute h-[300px] w-[300px] rounded-full sm:h-[350px] sm:w-[350px]"
          style={{
            transform: "rotateX(60deg) rotateY(-18deg) translateZ(30px)",
            border: "1.5px solid hsl(158 72% 50% / 0.5)",
            animation: "ringSpin2 22s linear infinite reverse",
          }}
        >
          <span
            className="absolute -top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 24px 4px hsl(158 72% 55% / 0.9)" }}
          />
        </div>
        {/* Orbital ring 3 — primary purple, tilted differently */}
        <div
          aria-hidden
          className="absolute h-[380px] w-[380px] rounded-full border border-dashed sm:h-[450px] sm:w-[450px]"
          style={{
            borderColor: "hsl(248 86% 70% / 0.35)",
            transform: "rotateX(78deg) rotateY(40deg) translateZ(-10px)",
            animation: "ringSpin3 36s linear infinite",
          }}
        >
          <span
            className="absolute -top-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary"
            style={{ boxShadow: "0 0 16px 3px hsl(248 86% 70% / 0.9)" }}
          />
        </div>
        {/* Orbital ring 4 — cyan, equatorial (flat) */}
        <div
          aria-hidden
          className="absolute h-[270px] w-[270px] rounded-full sm:h-[320px] sm:w-[320px]"
          style={{
            border: "1px solid hsl(188 92% 60% / 0.5)",
            transform: "translateZ(40px)",
            animation: "ringSpin4 14s linear infinite",
          }}
        />

        {/* Circuit lines radiating from logo */}
        <svg
          aria-hidden
          viewBox="0 0 400 400"
          className="absolute h-[380px] w-[380px] opacity-70 sm:h-[460px] sm:w-[460px]"
          style={{ transform: "translateZ(-10px)" }}
        >
          <defs>
            <linearGradient id="cgrad" x1="0" x2="1">
              <stop offset="0%" stopColor="hsl(158 72% 60% / 0.0)" />
              <stop offset="40%" stopColor="hsl(158 72% 60% / 0.8)" />
              <stop offset="100%" stopColor="hsl(248 86% 70%)" />
            </linearGradient>
          </defs>
          <g stroke="url(#cgrad)" strokeWidth="1" fill="none">
            {Array.from({ length: 10 }).map((_, i) => {
              const angle = (i / 10) * Math.PI * 2;
              const x1 = 200 + Math.cos(angle) * 80;
              const y1 = 200 + Math.sin(angle) * 80;
              const mid = 120 + (i % 3) * 18;
              const x2 = 200 + Math.cos(angle) * mid;
              const y2 = 200 + Math.sin(angle) * mid;
              const x3 = 200 + Math.cos(angle) * (mid + 40);
              const y3 = 200 + Math.sin(angle) * (mid + 40);
              return (
                <g key={i}>
                  <path
                    d={`M${x1},${y1} L${x2},${y2} L${x3},${y3}`}
                    strokeDasharray="4 4"
                    style={{
                      animation: `dashFlow ${6 + (i % 4)}s linear infinite`,
                      strokeDashoffset: 0,
                    }}
                  />
                  <circle
                    cx={x3}
                    cy={y3}
                    r="2.5"
                    fill={i % 2 ? "hsl(158 72% 60%)" : "hsl(248 86% 70%)"}
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* Spark lines shooting out from logo corners */}
        {sparks.map((s, i) => (
          <div
            key={`sp-${i}`}
            aria-hidden
            className="absolute left-1/2 top-1/2 origin-left"
            style={{
              width: s.len,
              height: 2,
              transform: `translate(-50%,-50%) rotate(${s.angle}rad) translateX(110px) translateZ(50px)`,
              background:
                "linear-gradient(90deg, hsl(248 86% 70% / 0.9), hsl(158 72% 60% / 0))",
              animation: `sparkPulse ${2 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
              opacity: 0.7,
            }}
          />
        ))}

        {/* The 3D Logo Mark */}
        <div
          ref={logoRef}
          className="relative"
          style={{
            transform: "translateZ(90px)",
            transformStyle: "preserve-3d",
            animation: "logoFloat 6s ease-in-out infinite",
          }}
        >
          {/* Outermost rotating halo */}
          <div
            aria-hidden
            className="absolute inset-[-28px] rounded-[36px]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, hsl(248 86% 70% / 0.5), transparent 40%, hsl(158 72% 55% / 0.5), transparent 70%)",
              animation: "spin-slow 8s linear infinite",
              filter: "blur(14px)",
            }}
          />

          {/* Back plate (shadow depth) */}
          <div
            aria-hidden
            className="absolute inset-2 rounded-[28px]"
            style={{
              transform: "translateZ(-18px)",
              background: "hsl(232 50% 8%)",
              filter: "blur(14px)",
              opacity: 0.55,
            }}
          />

          {/* Main gradient cube plate */}
          <div className="relative grid h-52 w-52 place-items-center rounded-[28px] bg-gradient-to-br from-[#7C6BFF] via-[#4F46E5] to-[#1E1B4B] shadow-[0_40px_90px_-10px_hsl(248_86%_50%/0.65)] sm:h-60 sm:w-60">
            {/* Gloss top highlight */}
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/20 via-transparent to-transparent" />
            {/* Bottom shadow */}
            <div className="absolute inset-x-2 bottom-2 h-10 rounded-b-[22px] bg-gradient-to-t from-black/40 to-transparent" />
            {/* Gold rim */}
            <div className="absolute inset-0 rounded-[28px] ring-1 ring-amber-300/60" />
            {/* Inner border shine */}
            <div className="absolute inset-[3px] rounded-[25px] ring-1 ring-white/10" />

            {/* Center mark — user's PNG logo if available, otherwise a stylised Z */}
            <LogoMark />

            {/* Pulsing green LIVE dot top-right */}
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_hsl(158_72%_60%)]" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-300">
                Live
              </span>
            </div>

            {/* Corner sparkle */}
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="absolute -left-3 -top-3 h-5 w-5 text-amber-200"
              style={{ animation: "sparkle 3s ease-in-out infinite" }}
            >
              <path
                d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Floating tag chip below logo */}
          <div
            className="absolute left-1/2 top-[calc(100%+14px)] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 backdrop-blur-md"
            style={{ transform: "translate(-50%, 0) translateZ(60px)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_hsl(158_72%_60%)]" />
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-white/85">
              Design · Develop · Grow
            </span>
          </div>
        </div>
      </div>

      {/* === Squarespace-style floating image cards carousel === */}
      <div className="relative mt-2 h-[150px] w-full sm:h-[170px]">
        {slides.map((slide, i) => {
          const offset = (i - active + slides.length) % slides.length;
          let transform = "";
          let opacity = 0;
          let z = 0;
          if (offset === 0) {
            transform = "translate(-50%, 0) scale(1)";
            opacity = 1;
            z = 30;
          } else if (offset === 1 || offset === slides.length - 1) {
            const dir = offset === 1 ? 1 : -1;
            transform = `translate(calc(-50% + ${dir * 130}px), 12px) scale(0.86)`;
            opacity = 0.55;
            z = 20;
          } else if (offset === 2 || offset === slides.length - 2) {
            const dir = offset === 2 ? 1 : -1;
            transform = `translate(calc(-50% + ${dir * 240}px), 22px) scale(0.72)`;
            opacity = 0.25;
            z = 10;
          } else {
            opacity = 0;
          }
          return (
            <div
              key={slide.label}
              onClick={() => setActive(i)}
              role="button"
              aria-label={`${slide.label} — ${slide.tag}`}
              className="absolute left-1/2 top-0 h-[150px] w-[240px] cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card shadow-elegant transition-all duration-700 sm:h-[170px] sm:w-[280px]"
              style={{ transform, opacity, zIndex: z }}
            >
              <img
                src={slide.img}
                alt={slide.label}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                    {slide.tag}
                  </p>
                  <p className="text-sm font-semibold text-white">{slide.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel dots */}
      <div className="mt-4 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show project ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active
                ? "w-8 bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_10px_hsl(158_72%_55%/0.9)]"
                : "w-2 bg-foreground/25 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes logoFloat {
          0%, 100% { transform: translateZ(90px) translateY(0) rotateY(-3deg) rotateX(0deg); }
          50%      { transform: translateZ(90px) translateY(-16px) rotateY(3deg) rotateX(-1deg); }
        }
        @keyframes zShimmer {
          0%, 100% { filter: drop-shadow(0 6px 18px rgba(0,0,0,0.5)) brightness(1); }
          50%      { filter: drop-shadow(0 6px 22px rgba(255,200,90,0.4)) brightness(1.08); }
        }
        @keyframes ringSpin1 { from { transform: rotateX(72deg) rotateY(8deg) rotateZ(0deg) translateZ(10px);} to { transform: rotateX(72deg) rotateY(8deg) rotateZ(360deg) translateZ(10px);} }
        @keyframes ringSpin2 { from { transform: rotateX(60deg) rotateY(-18deg) rotateZ(0deg) translateZ(30px);} to { transform: rotateX(60deg) rotateY(-18deg) rotateZ(360deg) translateZ(30px);} }
        @keyframes ringSpin3 { from { transform: rotateX(78deg) rotateY(40deg) rotateZ(0deg) translateZ(-10px);} to { transform: rotateX(78deg) rotateY(40deg) rotateZ(-360deg) translateZ(-10px);} }
        @keyframes ringSpin4 { from { transform: rotateZ(0deg) translateZ(40px);} to { transform: rotateZ(360deg) translateZ(40px);} }
        @keyframes dashFlow { to { stroke-dashoffset: -40; } }
        @keyframes sparkPulse {
          0%, 100% { opacity: 0.15; transform: translate(-50%,-50%) rotate(var(--r)) translateX(110px) scaleX(0.7); }
          50%      { opacity: 0.9; transform: translate(-50%,-50%) rotate(var(--r)) translateX(130px) scaleX(1.1); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
          50%      { opacity: 1; transform: scale(1.15) rotate(20deg); }
        }
      `}</style>
    </div>
  );
};
