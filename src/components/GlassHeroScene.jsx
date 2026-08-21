import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function WireframeMesh() {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      {/* Positioned slightly up and right, scaled down to 0.9 */}
      <mesh ref={meshRef} position={[1.8, 1.2, -1]} scale={0.9}>
        <torusKnotGeometry args={[1, 0.3, 64, 16]} />
        <meshStandardMaterial
          wireframe
          color="#00f3ff"
          emissive="#00f3ff"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function GlassHeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen width or mobile browser
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // MOBILE: Pure CSS ambient glow background (0% GPU usage, locked 120 FPS)
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden bg-[#050508]">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#00f3ff]/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-[#8a2be2]/20 rounded-full blur-[100px]" />
      </div>
    );
  }

  // DESKTOP: Full 3D WebGL Scene
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ powerPreference: "high-performance", antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00f3ff" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#8a2be2" />
        <WireframeMesh />
      </Canvas>
    </div>
  );
}