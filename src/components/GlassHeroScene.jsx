import React, { useRef, useState, useEffect } from 'react';
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
      {/* Positioned slightly up and right, scaled to 0.9 */}
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Shared ambient lights that span the entire document height behind glass cards
  const AmbientFullPageGlows = (
    <>
      {/* Top Hero Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00f3ff]/15 rounded-full blur-[140px]" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#8a2be2]/15 rounded-full blur-[140px]" />

      {/* Middle Experience Glows */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#00f3ff]/10 rounded-full blur-[150px]" />

      {/* Bottom Stack & Education Glows */}
      <div className="absolute top-[75%] left-10 w-[400px] h-[400px] bg-[#8a2be2]/15 rounded-full blur-[150px]" />
      
      {/* Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </>
  );

  // MOBILE: Pure CSS glows spanning full height (0% WebGL GPU, 120 FPS on iOS Safari)
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden bg-[#050508]">
        {AmbientFullPageGlows}
      </div>
    );
  }

  // DESKTOP: Full 3D WebGL Scene + Ambient Full Page Glows
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden bg-[#050508]">
      {AmbientFullPageGlows}
      
      <div className="absolute inset-0 h-full w-full">
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
    </div>
  );
}