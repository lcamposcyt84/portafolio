import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function EnergyWave() {
  const g1 = useRef();
  const g2 = useRef();
  const g3 = useRef();

  // Curve sweeps lower-left → upper-right like the reference
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-14, -2.5,  0),
    new THREE.Vector3( -7, -0.5, -1),
    new THREE.Vector3(  0, -1.2, -0.5),
    new THREE.Vector3(  7,  0.5, -1),
    new THREE.Vector3( 14,  2.0,  0),
  ], false, 'catmullrom', 0.5), []);

  // Three overlapping flat ribbons at different scales → silk depth effect
  const rGeo  = useMemo(() => new THREE.TubeGeometry(curve, 250, 5.5, 64, false), [curve]);
  const mGeo  = useMemo(() => new THREE.TubeGeometry(curve, 250, 3.2, 48, false), [curve]);
  const cGeo  = useMemo(() => new THREE.TubeGeometry(curve, 250, 1.2, 32, false), [curve]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const dy = Math.sin(t * 0.15) * 1.2;
    const rz = Math.sin(t * 0.1)  * 0.025;
    [g1, g2, g3].forEach(r => {
      if (!r.current) return;
      r.current.position.y = dy;
      r.current.rotation.z = rz;
    });
  });

  return (
    <>
      {/* Layer 1 — outer diffuse aura (barely visible) */}
      <mesh ref={g1} geometry={rGeo} scale={[1, 0.012, 1]} position={[0, -2.5, -4]}>
        <meshBasicMaterial color="#445588" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>

      {/* Layer 2 — main silk ribbon (steel blue-grey) */}
      <mesh ref={g2} geometry={mGeo} scale={[1, 0.018, 1]} position={[0, -2.5, -4]}>
        <meshPhysicalMaterial
          color="#6688bb"
          emissive="#223366"
          emissiveIntensity={0.3}
          metalness={0.55}
          roughness={0.25}
          transmission={0.6}
          ior={1.3}
          thickness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.82}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Layer 3 — inner bright core (creates the silk highlight) */}
      <mesh ref={g3} geometry={cGeo} scale={[1, 0.014, 1]} position={[0, -2.5, -4]}>
        <meshStandardMaterial
          color="#aabbee"
          emissive="#667799"
          emissiveIntensity={1.2}
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pink/magenta accent light that hits the wave from below */}
      <pointLight color="#bb33ff" intensity={6} distance={18} position={[1, -6, -1]} />
    </>
  );
}
