import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useRef } from 'react';
import * as THREE from 'three';

import EnergyWave from './EnergyWave';
import FloatingObjects from './FloatingObjects';
import RainParticles from './RainParticles';

const ParallaxScene = () => {
  const ref = useRef();
  useFrame(({ pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.05, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -pointer.y * 0.03, 0.04);
  });
  return (
    <group ref={ref}>
      <EnergyWave />
      <FloatingObjects />
      <RainParticles />
    </group>
  );
};

export default function HeroScene() {
  return (
    <div className="hero-canvas-wrapper">
      <Canvas
        camera={{ position: [0, 3, 16], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <color attach="background" args={['#0c1220']} />
        <fog attach="fog" args={['#0c1220', 18, 50]} />

        {/* Ambient — very dark, navy */}
        <ambientLight intensity={0.3} color="#0a0e1a" />

        {/* Left cool blue fill */}
        <directionalLight position={[-8, 5, 5]} intensity={2.5} color="#4466cc" />
        {/* Right warm accent */}
        <directionalLight position={[8, 2, 5]}  intensity={1.8} color="#cc6633" />
        {/* Top rimlight (creates the white highlight on top of cubes) */}
        <directionalLight position={[0, 12, 0]} intensity={1.2} color="#aabbdd" />

        <Environment preset="night" />
        <Stars radius={100} depth={80} count={3000} factor={2.5} saturation={0} fade speed={0.3} />

        <ParallaxScene />

        <EffectComposer disableNormalPass multisampling={4}>
          <Bloom
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            intensity={1.4}
            mipmapBlur
          />
          <Vignette offset={0.3} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
