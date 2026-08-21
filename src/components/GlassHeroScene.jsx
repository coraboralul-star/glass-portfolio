import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function WireframeMesh() {
  const meshRef = useRef();

  // Smooth rotational drift
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.6}>
        <torusKnotGeometry args={[1, 0.35, 96, 24]} />
        {/* Sleek, glowing neon wireframe overlay */}
        <meshStandardMaterial
          wireframe
          color="#00f3ff"
          emissive="#00f3ff"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingParticles() {
  const count = 40;
  
  // Generate random positions once to save performance
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      p[i] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8a2be2"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function GlassHeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]} // Capped at 2x for ultra-crisp mobile displays without lag
        gl={{ 
          powerPreference: "high-performance",
          antialias: true,
          alpha: true 
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00f3ff" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#8a2be2" />
        
        <WireframeMesh />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}