import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

function FloatingGeometry() {
  const group = useRef();
  const mesh1 = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.08;
      group.current.rotation.x = Math.sin(t * 0.15) * 0.08;
    }
    if (mesh1.current) {
      mesh1.current.rotation.x += delta * 0.15;
      mesh1.current.rotation.y += delta * 0.22;
    }
    if (mesh2.current) {
      mesh2.current.rotation.x -= delta * 0.12;
      mesh2.current.rotation.z += delta * 0.18;
    }
    if (mesh3.current) {
      mesh3.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={group} position={[1.6, 0.9, -1.2]}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh ref={mesh1} scale={0.85}>
          <torusKnotGeometry args={[1, 0.28, 96, 16]} />
          <meshStandardMaterial
            wireframe
            color="#00f3ff"
            emissive="#00f3ff"
            emissiveIntensity={0.55}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={mesh2} position={[-2.4, -1.1, 0.6]} scale={0.45}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            wireframe
            color="#8a2be2"
            emissive="#8a2be2"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={mesh3} position={[1.8, -1.6, 0.3]} scale={0.35}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            wireframe
            color="#00f3ff"
            emissive="#00f3ff"
            emissiveIntensity={0.35}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

function SoftParticles({ count = 180 }) {
  const points = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f3ff"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
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
    const x = (state.pointer.x * viewport.width) / 40;
    const y = (state.pointer.y * viewport.height) / 40;
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

  const AmbientGlows = (
    <>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#00f3ff]/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-[15%] w-[380px] h-[380px] bg-[#8a2be2]/14 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[55%] right-[8%] w-[420px] h-[420px] bg-[#00f3ff]/08 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[12%] left-[12%] w-[360px] h-[360px] bg-[#8a2be2]/10 rounded-full blur-[150px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
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
          camera={{ position: [0, 0, 7.5], fov: 42 }}
          dpr={[1, 1.75]}
          gl={{
            powerPreference: 'high-performance',
            antialias: true,
            alpha: true,
          }}
        >
          <color attach="background" args={['#050508']} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[6, 5, 4]} intensity={1.4} color="#00f3ff" />
          <directionalLight position={[-5, -3, -4]} intensity={0.9} color="#8a2be2" />
          <pointLight position={[0, 2, 3]} intensity={0.6} color="#00f3ff" distance={12} />

          <MouseParallax>
            <FloatingGeometry />
            <SoftParticles count={160} />
          </MouseParallax>

          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.35}
              luminanceSmoothing={0.75}
              intensity={0.85}
              mipmapBlur
            />
            <Noise opacity={0.025} />
            <Vignette eskil={false} offset={0.15} darkness={0.65} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}