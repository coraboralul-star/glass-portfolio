import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';

function RefractiveMesh() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.25;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.6}
          chromaticAberration={0.08}
          anisotropy={0.1}
          distortion={0.3}
          distortionScale={0.2}
          temporalDistortion={0.2}
          roughness={0.1}
          color="#ffffff"
          bg="#050508"
        />
      </mesh>
    </Float>
  );
}

export default function GlassHeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f3ff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8a2be2" />
        
        <RefractiveMesh />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}