import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';

function RefractiveMesh() {
  const meshRef = useRef();

  // Smooth local rotation without overhead
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  // Detect iOS / mobile to dynamically drop heavy shader samples
  const isMobile = useMemo(() => {
    return typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={isMobile ? 1.4 : 1.8}>
        {/* Lower geometry segment count on mobile to save GPU cycles */}
        <torusKnotGeometry args={[1, 0.3, isMobile ? 64 : 128, isMobile ? 16 : 32]} />
        <MeshTransmissionMaterial
          backside={false} // Disabled backside refraction for massive speedup
          samples={isMobile ? 2 : 6} // Drastically reduces pixel sampling
          resolution={isMobile ? 256 : 512} // Caps refraction texture size
          thickness={0.4}
          chromaticAberration={0.04}
          anisotropy={0.05}
          distortion={0.15}
          distortionScale={0.1}
          temporalDistortion={0.0} // Turned off expensive temporal noise
          roughness={0.05}
          color="#ffffff"
          bg="#050508"
        />
      </mesh>
    </Float>
  );
}

export default function GlassHeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 45 }}
        // Caps DPI to prevent rendering at native 3x retina density on Pro Max
        dpr={[1, 1.5]}
        // Optimizes WebGL context settings for mobile GPUs
        gl={{ 
          powerPreference: "high-performance",
          antialias: false, 
          alpha: false,
          stencil: false,
          depth: true
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#00f3ff" />
        <directionalLight position={[-5, -5, -5]} intensity={0.8} color="#8a2be2" />
        
        <RefractiveMesh />
      </Canvas>
    </div>
  );
}