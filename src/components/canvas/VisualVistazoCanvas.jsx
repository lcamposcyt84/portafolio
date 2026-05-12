import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ─── 1. THE CINEMATIC WAVE (FLAT RIBBON) ───
const CinematicWave = () => {
  const waveRef = useRef();

  const { curve, geometry } = useMemo(() => {
    // Swoops low behind the cards to frame the bottom
    const curvePoints = [
      new THREE.Vector3(-45, -12, 5),
      new THREE.Vector3(-20, -10, -2),
      new THREE.Vector3(0, -6, -5),
      new THREE.Vector3(20, -2, -8),
      new THREE.Vector3(45, 6, -15)
    ];
    const catmullCurve = new THREE.CatmullRomCurve3(curvePoints);
    
    // Very wide radius (8), scaled flat on Y (0.02) to create a perfect Ribbon
    const tubeGeo = new THREE.TubeGeometry(catmullCurve, 150, 8, 64, false);
    return { curve: catmullCurve, geometry: tubeGeo };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (waveRef.current) {
      waveRef.current.position.y = Math.sin(t * 0.1) * 2 - 2;
      waveRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;
    }
  });

  return (
    <group ref={waveRef}>
      {/* Outer Glass Ribbon */}
      <mesh geometry={geometry} scale={[1, 0.02, 1]}>
        <meshPhysicalMaterial
          color="#00ffff"
          emissive="#0055ff"
          emissiveIntensity={0.6}
          metalness={0.0}
          roughness={0.1}
          transmission={1}
          ior={1.4}
          thickness={0.5}
          clearcoat={1}
          transparent={true}
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner Energy Core */}
      <mesh scale={[1, 0.01, 1]}>
        <tubeGeometry args={[curve, 150, 4, 32, false]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// ─── 2. INTEGRATED FLOATING OBJECTS ───
const IntegratedObjects = () => {
  return (
    <group>
      {/* 1. Hero Orange Cube (Right-Center, floating on the wave) */}
      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={2} position={[12, 1, -8]}>
        <mesh castShadow scale={[0.4, 0.4, 0.4]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ff5a10" emissive="#4d1600" emissiveIntensity={0.5} metalness={0.3} roughness={0.2} />
        </mesh>
      </Float>

      {/* 2. Front Center Glass Cube (Just above the cards) */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1} position={[0, -2, -2]}>
        <mesh castShadow scale={[0.3, 0.3, 0.3]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial color="#88ccff" transmission={1} opacity={1} metalness={0.1} roughness={0.05} thickness={1} />
        </mesh>
      </Float>

      {/* 3. Dark Liquid Sphere (Right) */}
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.5} position={[8, -5, -4]}>
        <mesh castShadow scale={[0.3, 0.3, 0.3]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial color="#05051a" metalness={0.9} roughness={0.1} clearcoat={1} />
        </mesh>
      </Float>

      {/* 4. Glass Sphere (Far Right) */}
      <Float speed={1.4} rotationIntensity={2} floatIntensity={1.2} position={[18, 4, -10]}>
        <mesh castShadow scale={[0.5, 0.5, 0.5]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} ior={1.33} metalness={0.1} roughness={0} />
        </mesh>
      </Float>

      {/* 5. Left Deep Blue Cube */}
      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={1} position={[-14, -4, -6]}>
        <mesh castShadow scale={[0.4, 0.4, 0.4]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#0022ff" emissive="#000033" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      {/* 6. Far Left Glass Cube */}
      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.5} position={[-24, -2, -8]}>
        <mesh castShadow scale={[0.3, 0.3, 0.3]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial color="#4dffff" transmission={0.9} metalness={0.2} roughness={0.1} thickness={0.5} />
        </mesh>
      </Float>
    </group>
  );
};

// ─── 3. ATMOSPHERIC RAIN ───
const AtmosphericRain = () => {
  const rainRef = useRef();
  
  const { positions, velocities } = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60 + 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
      vel[i] = 0.05 + Math.random() * 0.1;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const sprite = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 4;
    canvas.height = 64; // Longer
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(2, 0, 2, 64);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
    grad.addColorStop(0.5, 'rgba(0, 240, 255, 0.4)');
    grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 4, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    if (rainRef.current) {
      const positionsArray = rainRef.current.geometry.attributes.position.array;
      for (let i = 0; i < 200; i++) {
        positionsArray[i * 3 + 1] -= velocities[i];
        if (positionsArray[i * 3 + 1] < -30) {
          positionsArray[i * 3 + 1] = 30;
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={rainRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        map={sprite}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        opacity={0.5}
      />
    </points>
  );
};

// ─── 4. CINEMATIC LIGHTING ───
const CinematicLighting = () => {
  return (
    <>
      <ambientLight intensity={0.5} color="#05051a" />
      {/* Left Cool Light */}
      <pointLight color="#0055ff" intensity={8} distance={100} position={[-20, 10, 10]} />
      <pointLight color="#00d4ff" intensity={4} distance={50} position={[-10, 0, 5]} />
      
      {/* Right Warm Light (Orange/Purple) */}
      <pointLight color="#ff4400" intensity={6} distance={100} position={[20, -5, 10]} />
      <pointLight color="#9900ff" intensity={5} distance={80} position={[15, 15, -5]} />
      
      {/* Center Fill */}
      <pointLight color="#ffffff" intensity={1} distance={40} position={[0, 5, 20]} />
    </>
  );
};

export const VisualVistazoCanvas = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 45 }} // Telephoto feel for monumental scale
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#01010a']} />
        <fog attach="fog" args={['#01010a', 20, 60]} />
        
        <CinematicLighting />
        <CinematicWave />
        <IntegratedObjects />
        <AtmosphericRain />
        
        {/* Adds realistic reflections to physical materials */}
        <Environment preset="city" />
        
        {/* THE SECRET TO THE PREMIUM LOOK: BLOOM */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
