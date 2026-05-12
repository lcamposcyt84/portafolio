import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

// ════════════════════════════════════════════
//  TEARDROP RAIN — 2D Sprites (aprobadas)
// ════════════════════════════════════════════
const dropTexture = (() => {
  const S = 128;
  const c = document.createElement('canvas');
  c.width = S; c.height = S;
  const ctx = c.getContext('2d');
  const cx = S/2, tipY = S*0.04, cy = S*0.68, r = S*0.22;

  ctx.beginPath();
  ctx.moveTo(cx, tipY);
  ctx.bezierCurveTo(cx+r*1.7, tipY+(cy-tipY)*0.28, cx+r, cy+r*0.5, cx, cy+r);
  ctx.bezierCurveTo(cx-r, cy+r*0.5, cx-r*1.7, tipY+(cy-tipY)*0.28, cx, tipY);
  ctx.closePath();

  const body = ctx.createRadialGradient(cx, cy, 0, cx, cy, r*1.4);
  body.addColorStop(0,   'rgba(220,245,255,0.65)');
  body.addColorStop(0.4, 'rgba(150,210,255,0.42)');
  body.addColorStop(0.8, 'rgba(70,140,230,0.20)');
  body.addColorStop(1,   'rgba(20,60,160,0.00)');
  ctx.fillStyle = body; ctx.fill();
  ctx.strokeStyle = 'rgba(200,235,255,0.5)'; ctx.lineWidth = 1.4; ctx.stroke();

  // highlight
  const hl = ctx.createRadialGradient(cx-r*0.3, tipY+(cy-tipY)*0.3, 0, cx-r*0.3, tipY+(cy-tipY)*0.3, r*0.5);
  hl.addColorStop(0,   'rgba(255,255,255,0.92)');
  hl.addColorStop(0.5, 'rgba(255,255,255,0.18)');
  hl.addColorStop(1,   'rgba(255,255,255,0.00)');
  ctx.beginPath();
  ctx.ellipse(cx-r*0.28, tipY+(cy-tipY)*0.38, r*0.2, r*0.13, -0.4, 0, Math.PI*2);
  ctx.fillStyle = hl; ctx.fill();

  // caustic dot
  const ca = ctx.createRadialGradient(cx+r*0.1, cy+r*0.52, 0, cx+r*0.1, cy+r*0.52, r*0.18);
  ca.addColorStop(0, 'rgba(230,250,255,0.55)');
  ca.addColorStop(1, 'rgba(230,250,255,0.00)');
  ctx.beginPath();
  ctx.arc(cx+r*0.1, cy+r*0.52, r*0.18, 0, Math.PI*2);
  ctx.fillStyle = ca; ctx.fill();

  return new THREE.CanvasTexture(c);
})();

const RAIN_COUNT = 250;
const RainDrops = () => {
  const groupRef = useRef();
  const drops = useMemo(() =>
    Array.from({ length: RAIN_COUNT }, () => ({
      x:     (Math.random()-0.5) * 45,
      y:     Math.random() * 35 + 5,
      z:     (Math.random()-0.5) * 18 - 2,
      speed: 0.012 + Math.random()*0.028,
      scale: 0.12 + Math.random()*0.22,
    }))
  , []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((s, i) => {
      const d = drops[i];
      d.y -= d.speed;
      if (d.y < -18) { d.y = 22+Math.random()*10; d.x = (Math.random()-0.5)*45; }
      s.position.set(d.x, d.y, d.z);
    });
  });

  return (
    <group ref={groupRef}>
      {drops.map((d, i) => (
        <sprite key={i} position={[d.x, d.y, d.z]} scale={[d.scale, d.scale*1.7, 1]}>
          <spriteMaterial map={dropTexture} transparent alphaTest={0.01} blending={THREE.NormalBlending} depthWrite={false} opacity={0.80} />
        </sprite>
      ))}
    </group>
  );
};

// ════════════════════════════════════════════
//  FLUID LIGHT CASCADE — elemento central
// ════════════════════════════════════════════
const FluidCascade = () => {
  const groupRef = useRef();

  // Curva en S que recorre la pantalla de esquina a esquina
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-12, -4,  -5),
    new THREE.Vector3( -6, -1,  -3),
    new THREE.Vector3(  0,  1,  -2),
    new THREE.Vector3(  6,  0,  -4),
    new THREE.Vector3( 12,  2,  -6),
  ], false, 'catmullrom', 0.5), []);

  const tubeGeo  = useMemo(() => new THREE.TubeGeometry(curve, 200, 0.8, 64, false), [curve]);
  const outerGeo = useMemo(() => new THREE.TubeGeometry(curve, 200, 2.2, 64, false), [curve]);
  const glowGeo  = useMemo(() => new THREE.TubeGeometry(curve, 200, 4.5, 32, false), [curve]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.15) * 1.8;
    groupRef.current.rotation.z = Math.sin(t * 0.1)  * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Exterior difuso — la aura del flujo */}
      <mesh geometry={glowGeo}>
        <meshBasicMaterial color="#1a3aff" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>

      {/* Capa de vidrio principal */}
      <mesh geometry={outerGeo}>
        <meshPhysicalMaterial
          color="#4488ff"
          emissive="#113399"
          emissiveIntensity={0.5}
          metalness={0}
          roughness={0.05}
          transmission={0.96}
          ior={1.35}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Núcleo brillante — la "luz" del flujo */}
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color="#aaddff"
          emissive="#88ccff"
          emissiveIntensity={3}
          toneMapped={false}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

// ════════════════════════════════════════════
//  FLOATING OBJECTS — cubos y esferas premium
// ════════════════════════════════════════════
const GlassCube = ({ position, scale = 1, rot = [0.4,0.4,0], speed = 1.5, intensity = 1.5 }) => (
  <Float speed={speed} rotationIntensity={intensity} floatIntensity={1.5} position={position}>
    <Box args={[scale, scale, scale]} rotation={rot}>
      <meshPhysicalMaterial
        color="#aaccff"
        transmission={0.95}
        ior={1.5}
        roughness={0.04}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0}
        transparent
        opacity={0.88}
      />
    </Box>
  </Float>
);

const OrangeCube = ({ position, scale = 1, speed = 2, intensity = 1.5 }) => (
  <Float speed={speed} rotationIntensity={intensity} floatIntensity={2} position={position}>
    <Box args={[scale, scale, scale]}>
      <meshStandardMaterial color="#ff7b00" emissive="#ff7b00" emissiveIntensity={1.8} toneMapped={false} />
    </Box>
  </Float>
);

const GlassSphere = ({ position, scale = 0.35 }) => (
  <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2} position={position}>
    <Sphere args={[scale, 64, 64]}>
      <meshPhysicalMaterial
        color="#ffffff"
        transmission={0.95}
        roughness={0}
        ior={1.45}
        clearcoat={1}
        transparent
        opacity={0.9}
      />
    </Sphere>
  </Float>
);

const DarkSphere = ({ position, scale = 0.5 }) => (
  <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={position}>
    <Sphere args={[scale, 64, 64]}>
      <meshPhysicalMaterial color="#050510" metalness={0.95} roughness={0.04} clearcoat={1} />
    </Sphere>
  </Float>
);

const FloatingObjects = () => (
  <group>
    {/* Cubos de cristal */}
    <GlassCube position={[-4.5, 1.0,  0]}   scale={0.90} speed={1.6} intensity={1.2} />
    <GlassCube position={[ 0.2, 0.5,  1]}   scale={1.05} speed={1.9} intensity={1.5} />
    <GlassCube position={[-6.5, 0.2,  1]}   scale={0.65} speed={2.1} intensity={1.8} />
    <GlassCube position={[ 4.0, 2.0, -2]}   scale={0.50} speed={1.3} intensity={1.0} />

    {/* Cubos naranja — emissive brillante */}
    <OrangeCube position={[3.5, 1.0, 0]}  scale={1.0} speed={2.0} intensity={1.5} />
    <OrangeCube position={[5.5, 0.5, -2]} scale={0.7} speed={1.6} intensity={1.2} />
    <OrangeCube position={[-3.0,-0.5, 0]} scale={0.4} speed={2.2} intensity={2.0} />

    {/* Esferas de vidrio */}
    <GlassSphere position={[2.0, 2.2, 0]}   scale={0.28} />
    <GlassSphere position={[-1.5, 1.5, 0.5]} scale={0.20} />
    <GlassSphere position={[6.0, 1.0, -1]}  scale={0.38} />

    {/* Esfera oscura "líquida" */}
    <DarkSphere position={[5.0, 0.2, -1]} scale={0.45} />
    <DarkSphere position={[-2.0,-1.0, -1]} scale={0.28} />

    {/* Esferas pequeñas tipo gota — del código original del usuario */}
    <Sphere args={[0.18, 32, 32]} position={[1.2, 2.5, 0.5]}>
      <meshPhysicalMaterial transparent opacity={0.4} transmission={1} thickness={0.4} roughness={0} />
    </Sphere>
    <Sphere args={[0.12, 32, 32]} position={[-0.8, 2.0, 0.3]}>
      <meshPhysicalMaterial transparent opacity={0.35} transmission={1} thickness={0.3} roughness={0} />
    </Sphere>
  </group>
);

// ════════════════════════════════════════════
//  BACKGROUND DISTORT PLANE
// ════════════════════════════════════════════
const BackgroundPlane = () => (
  <mesh position={[0, 0, -8]}>
    <planeGeometry args={[40, 22, 80, 80]} />
    <MeshDistortMaterial
      color="#0d0030"
      speed={1.2}
      distort={0.3}
      radius={1}
      transparent
      opacity={0.85}
    />
  </mesh>
);

// ════════════════════════════════════════════
//  ORBITING LIGHTS — crean el look cinemático
// ════════════════════════════════════════════
const CinematicLights = () => {
  const blueRef  = useRef();
  const orangeRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (blueRef.current) {
      blueRef.current.position.x = Math.sin(t * 0.3) * 12;
      blueRef.current.position.y = Math.cos(t * 0.2) * 6;
    }
    if (orangeRef.current) {
      orangeRef.current.position.x = Math.sin(t * 0.3 + Math.PI) * 12;
      orangeRef.current.position.y = Math.cos(t * 0.2 + Math.PI) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} color="#0a0a1a" />
      <pointLight ref={blueRef}   color="#2266ff" intensity={12} distance={30} position={[-8, 5, 5]} />
      <pointLight ref={orangeRef} color="#ff6600" intensity={10} distance={30} position={[8, -3, 5]} />
      <pointLight color="#cc22ff" intensity={4}  distance={20} position={[0, -4, -2]} />
      <pointLight color="#00ddff" intensity={5}  distance={25} position={[-4, 2,  6]} />
    </>
  );
};

// ════════════════════════════════════════════
//  MAIN SCENE
// ════════════════════════════════════════════
const Scene = () => {
  const sceneRef = useRef();

  useFrame(({ pointer }) => {
    if (!sceneRef.current) return;
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, pointer.x * 0.08, 0.05);
    sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, -pointer.y * 0.05, 0.05);
  });

  return (
    <>
      <CinematicLights />

      <group ref={sceneRef}>
        <BackgroundPlane />
        <FluidCascade />
        <FloatingObjects />
        <RainDrops />
      </group>

      <Stars radius={80} depth={60} count={4000} factor={3} saturation={0} fade speed={0.5} />
      <Environment preset="night" />

      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.85}
          intensity={2.5}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0008, 0.0008]}
        />
        <Vignette offset={0.3} darkness={0.8} />
      </EffectComposer>
    </>
  );
};

// ════════════════════════════════════════════
//  EXPORT
// ════════════════════════════════════════════
export const ThreeBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#050510' }}>
    <Canvas
      camera={{ position: [0, 0, 8], fov: 70 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
    >
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#05051a', 20, 60]} />
      <Scene />
    </Canvas>
  </div>
);
