import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry() {
  const group = useRef();
  const m1 = useRef();
  const m2 = useRef();
  const m3 = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.07;
      group.current.rotation.x = Math.sin(t * 0.12) * 0.06;
    }
    if (m1.current) {
      m1.current.rotation.x += delta * 0.14;
      m1.current.rotation.y += delta * 0.19;
    }
    if (m2.current) {
      m2.current.rotation.x -= delta * 0.11;
      m2.current.rotation.z += delta * 0.16;
    }
    if (m3.current) {
      m3.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={group} position={[1.5, 0.8, -1.1]}>
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.65}>
        <mesh ref={m1} scale={0.82}>
          <torusKnotGeometry args={[1, 0.28, 96, 16]} />
          <meshStandardMaterial
            wireframe
            color="#00f3ff"
            emissive="#00f3ff"
            emissiveIntensity={0.85}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>
      </Float>

      <Float speed={1.7} rotationIntensity={0.45} floatIntensity={0.5}>
        <mesh ref={m2} position={[-2.3, -1.0, 0.5]} scale={0.42}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            wireframe
            color="#8a2be2"
            emissive="#8a2be2"
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>
      </Float>

      <Float speed={1.15} rotationIntensity={0.3} floatIntensity={0.55}>
        <mesh ref={m3} position={[1.7, -1.5, 0.25]} scale={0.32}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            wireframe
            color="#00f3ff"
            emissive="#00f3ff"
            emissiveIntensity={0.6}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

function SoftParticles({ count = 150 }) {
  const points = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 13;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1.5;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.018;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f3ff"
        size={0.032}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function MouseParallax({ children }) {
  const group = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const x = (state.pointer.x * viewport.width) / 38;
    const y = (state.pointer.y * viewport.height) / 38;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x, 0.045);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, y, 0.045);
  });

  return <group ref={group}>{children}</group>;
}

export default function GlassHeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const AmbientGlows = (
    <>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-[#00f3ff]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[28%] left-[12%] w-[360px] h-[360px] bg-[#8a2be2]/13 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[52%] right-[6%] w-[400px] h-[400px] bg-[#00f3ff]/08 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[340px] h-[340px] bg-[#8a2be2]/10 rounded-full blur-[140px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
        }}
      />
    </>
  );

  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden bg-[#050508]">
        {AmbientGlows}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden bg-[#050508]">
      {AmbientGlows}
      <div className="absolute inset-0 h-full w-full">
        <Canvas
          camera={{ position: [0, 0, 7.4], fov: 42 }}
          dpr={[1, 1.7]}
          gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
        >
          <color attach="background" args={['#050508']} />
          <ambientLight intensity={0.38} />
          <directionalLight position={[6, 5, 4]} intensity={1.5} color="#00f3ff" />
          <directionalLight position={[-5, -3, -4]} intensity={0.95} color="#8a2be2" />
          <pointLight position={[0, 2, 3]} intensity={0.65} color="#00f3ff" distance={12} />

          <MouseParallax>
            <FloatingGeometry />
            <SoftParticles count={140} />
          </MouseParallax>
        </Canvas>
      </div>
    </div>
  );
}