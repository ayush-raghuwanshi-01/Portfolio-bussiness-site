import { Component, Suspense, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import type { Group } from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

class CanvasGuard extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const Scene = () => {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.18 + state.pointer.x * 0.35;
    group.current.rotation.x = 0.25 + state.pointer.y * 0.2;
  });

  return (
    <>
      <color attach="background" args={["#070914"]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={18} color="#6D5EF5" />
      <pointLight position={[-4, -2, 2]} intensity={10} color="#22d3ee" />
      <pointLight position={[0, 4, -2]} intensity={8} color="#34d399" />
      <Sparkles count={48} scale={8} size={2.4} speed={0.35} color="#a5b4fc" />
      <group ref={group}>
        <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.7}>
          <mesh>
            <icosahedronGeometry args={[1.35, 1]} />
            <MeshDistortMaterial
              color="#6D5EF5"
              roughness={0.18}
              metalness={0.72}
              distort={0.28}
              speed={1.6}
              emissive="#312e81"
              emissiveIntensity={0.35}
            />
          </mesh>
        </Float>
        <mesh rotation={[Math.PI / 2.4, 0.2, 0.15]}>
          <torusGeometry args={[2.15, 0.025, 16, 96]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.7} metalness={0.4} />
        </mesh>
        <mesh rotation={[0.2, 0.8, 0.4]}>
          <torusGeometry args={[1.72, 0.018, 12, 80]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.45} />
        </mesh>
      </group>
    </>
  );
};

const Fallback = () => (
  <div className="absolute inset-0 bg-gradient-aurora">
    <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
    <div className="absolute right-10 top-16 h-40 w-40 rounded-full bg-cyan/30 blur-3xl animate-float" />
  </div>
);

export const HeroCanvas = () => {
  const reduced = useReducedMotion();

  if (reduced) return <Fallback />;

  return (
    <div className="absolute inset-0">
      <CanvasGuard fallback={<Fallback />}>
        <Suspense fallback={<Fallback />}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 5.4], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </CanvasGuard>
    </div>
  );
};
