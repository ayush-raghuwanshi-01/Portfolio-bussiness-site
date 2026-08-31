import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Stunning Brand Name Animation - The Main Focal Point
const BrandNameAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    let frameCount = 0;
    const animate = () => {
      frameCount++;
      if (frameCount % 2 === 0) setTime(t => t + 0.02);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const brandName = "ZenVioLabs".split("");

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center"
      style={{ perspective: "2000px" }}
    >
      {/* Main Brand Name with 3D Flip Animation */}
      <div className="relative flex items-center justify-center">
        {brandName.map((letter, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            className="relative"
            style={{ 
              transformStyle: "preserve-3d",
              transform: `translateZ(${Math.sin(time + i * 0.5) * 20}px)`,
            }}
          >
            <motion.span
              className="inline-block bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text font-display text-5xl font-black tracking-wider text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
              style={{
                textShadow: "none",
                filter: `drop-shadow(0 0 20px rgba(124, 107, 255, ${0.3 + Math.sin(time * 2 + i) * 0.2})) drop-shadow(0 0 40px rgba(124, 107, 255, ${0.2 + Math.sin(time * 2 + i) * 0.1}))`,
              }}
              animate={{
                scale: [1, 1.02, 1],
                rotateY: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.05,
              }}
            >
              {letter}
            </motion.span>
            
            {/* Letter Glow Effect */}
            <motion.div
              className="absolute inset-0 -z-10 blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              style={{
                background: i < 3 
                  ? "radial-gradient(circle, rgba(249, 115, 22, 0.8))" 
                  : i < 6 
                    ? "radial-gradient(circle, rgba(34, 197, 94, 0.8))"
                    : "radial-gradient(circle, rgba(124, 107, 255, 0.8))",
                borderRadius: "50%",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Animated Underline */}
      <motion.div 
        className="mt-2 h-1 w-0 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        style={{
          background: "linear-gradient(90deg, #f97316, #22c55e, #7C6BFF, #f97316)",
          backgroundSize: "200% 100%",
          animation: "gradientFlow 3s linear infinite",
        }}
      />

      {/* Tagline with fade in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-4 text-center"
      >
        <span className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text font-light tracking-[0.3em] text-transparent sm:text-lg md:text-xl uppercase">
          Design · Develop · Grow
        </span>
      </motion.div>

      {/* Particle Effects Around Text */}
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2 + time * 0.2;
        const radius = 150 + Math.sin(time + i * 0.3) * 30;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              background: i % 3 === 0 
                ? "#f97316" 
                : i % 3 === 1 
                  ? "#22c55e" 
                  : "#7C6BFF",
              boxShadow: `0 0 ${4 + (i % 3) * 2}px ${
                i % 3 === 0 
                  ? "#f97316" 
                  : i % 3 === 1 
                    ? "#22c55e" 
                    : "#7C6BFF"
              }`,
              left: "50%",
              top: "50%",
              marginLeft: -1,
              marginTop: -1,
            }}
            animate={{
              x: [0, x, 0],
              y: [0, y, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        );
      })}

      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

// ZVL Logo Animation - Above Brand Name
const ZVLLogoAnimation = () => {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    let frameCount = 0;
    const animate = () => {
      frameCount++;
      if (frameCount % 3 === 0) setTime(t => t + 0.015);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="relative mb-6 flex items-center justify-center" style={{ perspective: "1000px" }}>
      {/* Floating Rings */}
      <motion.div
        className="absolute h-32 w-32 rounded-full border border-purple-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ borderStyle: "dashed" }}
      />
      <motion.div
        className="absolute h-40 w-40 rounded-full border border-green-500/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      {/* ZVL Letters with Merge Animation */}
      <div className="relative flex items-center">
        {/* Z */}
        <motion.svg
          viewBox="0 0 50 50"
          className="h-12 w-12 sm:h-14 sm:w-14"
          animate={{
            x: [0, -5, 0],
            rotateZ: [-3, 3, -3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ zIndex: 3 }}
        >
          <defs>
            <linearGradient id="zGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          <path
            d="M8 12 L42 12 L42 18 L20 38 L42 38 L42 44 L8 44 L8 38 L30 18 L8 18 Z"
            fill="url(#zGradNew)"
            filter="drop-shadow(0 0 10px #f97316)"
          />
        </motion.svg>

        {/* V */}
        <motion.svg
          viewBox="0 0 50 50"
          className="h-14 w-14 sm:h-16 sm:w-16"
          animate={{
            y: [-3, 3, -3],
            rotateY: [0, 15, 0, -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          style={{ zIndex: 4, marginLeft: "-4px", marginRight: "-4px" }}
        >
          <defs>
            <linearGradient id="vGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
          </defs>
          <path
            d="M8 12 L18 12 L25 32 L32 12 L42 12 L30 44 L20 44 Z"
            fill="url(#vGradNew)"
            filter="drop-shadow(0 0 12px #22c55e)"
          />
        </motion.svg>

        {/* L */}
        <motion.svg
          viewBox="0 0 50 50"
          className="h-12 w-12 sm:h-14 sm:w-14"
          animate={{
            x: [0, 5, 0],
            rotateZ: [3, -3, 3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          style={{ zIndex: 3 }}
        >
          <defs>
            <linearGradient id="lGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C6BFF" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <path
            d="M10 12 L20 12 L20 32 L38 32 L38 44 L10 44 Z"
            fill="url(#lGradNew)"
            filter="drop-shadow(0 0 10px #7C6BFF)"
          />
        </motion.svg>

        {/* Energy Connection */}
        <motion.div
          className="absolute -bottom-2 left-0 h-0.5 w-full"
          style={{
            background: "linear-gradient(90deg, #f97316, #22c55e, #7C6BFF)",
          }}
          animate={{
            scaleX: [0.8, 1, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2 + time;
        const radius = 60 + Math.sin(time * 2 + i) * 10;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              background: i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#22c55e" : "#7C6BFF",
              boxShadow: `0 0 8px ${i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#22c55e" : "#7C6BFF"}`,
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: [0, Math.cos(angle) * radius],
              y: [0, Math.sin(angle) * radius],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.1,
            }}
          />
        );
      })}
    </div>
  );
};

export const HeroVisual = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 4, ry: -8 });
  const frameRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

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
    const targetRx = mouse.y * -12 + 4;
    const targetRy = mouse.x * 15 - 6;
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

  // Pre-compute satellite positions
  const satellites = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        angle: (i / 16) * Math.PI * 2,
        size: 2 + (i % 3),
        color:
          i % 3 === 0
            ? "hsl(24 95% 55%)"
            : i % 3 === 1
              ? "hsl(142 70% 50%)"
              : "hsl(248 86% 70%)",
        orbit: 200 + (i % 4) * 20,
        speed: 15 + (i % 5) * 4,
        delay: i * -1.2,
      })),
    [],
  );

  return (
    <div
      ref={frameRef}
      onMouseMove={onMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      className="relative mx-auto flex h-full w-full max-w-[700px] flex-col items-center justify-center"
      style={{ perspective: "1500px" }}
    >
      {/* Main Content Container with 3D Tilt */}
      <motion.div
        className="relative flex flex-col items-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        {/* Background Glow Effects */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full opacity-60 blur-3xl"
          style={{
            background: "radial-gradient(ellipse at center, hsl(248 86% 50% / 0.4) 0%, transparent 70%)",
            transform: "translateZ(-100px)",
          }}
        />
        <div
          aria-hidden
          className="absolute -left-20 top-20 -z-10 h-40 w-40 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(24 95% 55% / 0.5), transparent)" }}
        />
        <div
          aria-hidden
          className="absolute -right-20 bottom-20 -z-10 h-40 w-40 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(142 70% 50% / 0.5), transparent)" }}
        />

        {/* ZVL Logo Animation */}
        <ZVLLogoAnimation />

        {/* Brand Name Animation - THE MAIN FOCAL POINT */}
        <BrandNameAnimation />

        {/* Orbital Rings */}
        {satellites.map((s, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: s.size,
              height: s.size,
              background: s.color,
              boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
              marginLeft: -s.size / 2,
              marginTop: -s.size / 2,
            }}
            animate={{
              x: [
                0,
                Math.cos(s.angle + time * 0.1) * s.orbit,
                Math.cos(s.angle + time * 0.1 + Math.PI * 2) * s.orbit,
                0,
              ],
              y: [
                0,
                Math.sin(s.angle + time * 0.1) * s.orbit,
                Math.sin(s.angle + time * 0.1 + Math.PI * 2) * s.orbit,
                0,
              ],
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: s.speed,
              repeat: Infinity,
              ease: "linear",
              delay: s.delay,
            }}
          />
        ))}

        {/* Orbital Ring Elements */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-orange-500/15"
          style={{ borderStyle: "dashed" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Animated Circuit Lines */}
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 500 500"
          style={{ transform: "translateZ(-50px)" }}
        >
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(248 86% 70%)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(142 70% 50%)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(24 95% 55%)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x1 = 250 + Math.cos(angle) * 100;
            const y1 = 250 + Math.sin(angle) * 100;
            const x2 = 250 + Math.cos(angle) * 180;
            const y2 = 250 + Math.sin(angle) * 180;
            return (
              <g key={i}>
                <motion.path
                  d={`M${x1},${y1} L${x2},${y2}`}
                  stroke="url(#circuitGrad)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
                <motion.circle
                  cx={x2}
                  cy={y2}
                  r="3"
                  fill="url(#circuitGrad)"
                  animate={{ scale: [0.5, 1.5, 0.5], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Spark Effects */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute h-1 w-8 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(248 86% 70% / 0.8), transparent)",
              left: "50%",
              top: "50%",
              originX: 0,
            }}
            animate={{
              x: [-100, 0, 100],
              y: [-50, 0, 50],
              opacity: [0, 1, 0],
              rotate: i * 45,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.25,
            }}
          />
        ))}
      </motion.div>

      {/* Live Badge */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.span
          className="relative flex h-2 w-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#22c55e]" />
        </motion.span>
        <span className="text-xs font-medium uppercase tracking-widest text-emerald-400">
          Live Studio
        </span>
      </motion.div>
    </div>
  );
};
