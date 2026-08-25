import { useRef, type MouseEvent } from "react";
import asklytics from "@/assets/asklytics-project.jpg";
import mobileGym from "@/assets/brand/mobile-gym-app.jpg";

export const DeviceStack = () => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${8 + y * -10}deg`);
    el.style.setProperty("--ry", `${-16 + x * 14}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "8deg");
    el.style.setProperty("--ry", "-16deg");
  };

  return (
    <div
      className="perspective-scene relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[480px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="pointer-events-none absolute inset-x-8 bottom-0 top-16 rounded-full bg-primary/25 blur-3xl" />
      <div ref={ref} className="device-frame relative h-full w-full">
        <div className="absolute left-[6%] top-[8%] w-[78%] overflow-hidden rounded-[22px] border border-white/10 bg-[#11131c] shadow-elegant [transform:translateZ(28px)]">
          <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-error/80" />
            <span className="h-2 w-2 rounded-full bg-warning/80" />
            <span className="h-2 w-2 rounded-full bg-success/80" />
            <span className="ml-2 font-mono text-[10px] text-white/40">asklytics.in</span>
          </div>
          <img src={asklytics} alt="Asklytics SaaS dashboard" className="aspect-[16/10] w-full object-cover" />
        </div>

        <div className="absolute bottom-[2%] right-[4%] w-[34%] overflow-hidden rounded-[28px] border border-white/15 bg-black shadow-elegant [transform:translateZ(72px)]">
          <img src={mobileGym} alt="Member mobile app" className="aspect-[9/19] w-full object-cover" />
        </div>

        <div className="glass absolute -left-2 top-10 rounded-2xl px-3 py-2 text-xs shadow-elegant [transform:translateZ(90px)] animate-float">
          <div className="font-display text-sm font-semibold">SaaS ready</div>
          <div className="text-[10px] text-foreground/60">Billing · tenants · admin</div>
        </div>
        <div className="glass absolute bottom-16 left-[18%] rounded-2xl px-3 py-2 text-xs shadow-elegant [transform:translateZ(80px)] animate-float [animation-delay:-2s]">
          <div className="font-display text-sm font-semibold">iOS + Android</div>
          <div className="text-[10px] text-foreground/60">One React Native codebase</div>
        </div>
      </div>
    </div>
  );
};
