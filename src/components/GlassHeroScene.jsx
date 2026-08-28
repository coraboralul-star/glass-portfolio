import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GooBlobs() {
  const group = useRef();
  const b1 = useRef();
  const b2 = useRef();
  const b3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.06;
    }
    if (b1.current) {
      b1.current.position.y = Math.sin(t * 0.7) * 0.25;
      b1.current.rotation.x = t * 0.15;
      b1.current.rotation.z = t * 0.1;
    }
    if (b2.current) {
      b2.current.position.y = Math.cos(t * 0.55) * 0.2;
      b2.current.rotation.y = t * 0.18;
    }
    if (b3.current) {
      b3.current.position.y = Math.sin(t * 0.4 + 1) * 0.18;
      b3.current.rotation.x = t * 0.12;
    }
  });

  return (
    <group ref={group} position={[1.4, 0.6, -1.2]}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={b1} scale={1.15}>
          <icosahedronGeometry args={[1, 8]} />
          <MeshDistortMaterial
            color="#6d28d9"
            emissive="#4c1d95"
            emissiveIntensity={0.45}
            roughness={0.15}
            metalness={0.4}
            distort={0.45}
            speed={2.2}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.45}>
        <mesh ref={b2} position={[-2.1, -0.9, 0.4]} scale={0.55}>
          <icosahedronGeometry args={[1, 6]} />
          <MeshDistortMaterial
            color="#0891b2"
            emissive="#0e7490"
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.35}
            distort={0.55}
            speed={1.8}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.4}>
        <mesh ref={b3} position={[1.6, -1.4, 0.3]} scale={0.4}>
          <icosahedronGeometry args={[1, 5]} />
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#5b21b6"
            emissiveIntensity={0.3}
            roughness={0.25}
            metalness={0.3}
            distort={0.4}
            speed={2.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

function SoftParticles({ count = 120 }) {
  const points = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.028}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
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
    const x = (state.pointer.x * viewport.width) / 42;
    const y = (state.pointer.y * viewport.height) / 42;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x, 0.04);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, y, 0.04);
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

  // Much quieter ambient — no hard grid, softer orbs so text stays readable
  const Ambient = (
    <>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] right-0 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-violet-700/8 rounded-full blur-[130px] pointer-events-none" />
    </>
  );

  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden bg-[#030305]">
        {Ambient}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden bg-[#030305]">
      {Ambient}
      <div className="absolute inset-0 h-full w-full">
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 42 }}
          dpr={[1, 1.6]}
          gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
        >
          <color attach="background" args={['#030305']} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 4, 3]} intensity={1.1} color="#c4b5fd" />
          <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#22d3ee" />
          <pointLight position={[0, 1, 2]} intensity={0.5} color="#a78bfa" distance={10} />

          <MouseParallax>
            <GooBlobs />
            <SoftParticles count={110} />
          </MouseParallax>
        </Canvas>
      </div>
    </div>
  );
}