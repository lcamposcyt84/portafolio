import { Float } from '@react-three/drei';

// Glass/ice cube — matches reference (not neon, just crystal)
const IceCube = ({ position, scale = 1, speed = 1.5, ri = 1.2 }) => (
  <Float speed={speed} rotationIntensity={ri} floatIntensity={1.2} position={position}>
    <mesh scale={[scale, scale, scale]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="#aabbcc"
        metalness={0.1}
        roughness={0.05}
        transmission={0.88}
        ior={1.5}
        thickness={0.5}
        clearcoat={1}
        transparent
        opacity={0.85}
      />
    </mesh>
  </Float>
);

// Terracotta orange cube — matches reference (warm muted orange, NOT neon)
const OrangeCube = ({ position, scale = 1, speed = 1.8, ri = 1.3 }) => (
  <Float speed={speed} rotationIntensity={ri} floatIntensity={1.5} position={position}>
    <mesh scale={[scale, scale, scale]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="#cc4422"
        emissive="#882211"
        emissiveIntensity={0.35}
        metalness={0.3}
        roughness={0.4}
        clearcoat={0.5}
      />
    </mesh>
  </Float>
);

// Dark navy cube — matches the blue-dark cube in reference
const DarkCube = ({ position, scale = 1, speed = 1.4, ri = 1.0 }) => (
  <Float speed={speed} rotationIntensity={ri} floatIntensity={1.0} position={position}>
    <mesh scale={[scale, scale, scale]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="#1a2244"
        emissive="#cc4411"
        emissiveIntensity={0.15}
        metalness={0.6}
        roughness={0.3}
        clearcoat={0.8}
      />
    </mesh>
  </Float>
);

// White matte sphere
const WhiteSphere = ({ position, scale = 0.35 }) => (
  <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.2} position={position}>
    <mesh>
      <sphereGeometry args={[scale, 48, 48]} />
      <meshPhysicalMaterial
        color="#ddddee"
        metalness={0.1}
        roughness={0.15}
        clearcoat={1}
      />
    </mesh>
  </Float>
);

// Near-black liquid sphere
const DarkSphere = ({ position, scale = 0.4 }) => (
  <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1} position={position}>
    <mesh>
      <sphereGeometry args={[scale, 64, 64]} />
      <meshPhysicalMaterial
        color="#080810"
        metalness={0.95}
        roughness={0.04}
        clearcoat={1}
      />
    </mesh>
  </Float>
);

export default function FloatingObjects() {
  return (
    <>
      {/* Along the wave, left side */}
      <IceCube   position={[-7.0, -1.8, -2]} scale={0.75} speed={1.5} ri={1.0} />
      <IceCube   position={[-5.0, -1.2, -1]} scale={0.90} speed={1.8} ri={1.3} />
      <OrangeCube position={[-4.0, -1.5, -1]} scale={0.45} speed={2.0} ri={1.8} />

      {/* Center */}
      <IceCube   position={[ 0.5, -1.0, -1]} scale={1.0} speed={1.6} ri={1.2} />
      <OrangeCube position={[ 1.0, -1.8, -0.5]} scale={0.4} speed={2.1} ri={2.0} />

      {/* Right side — larger objects */}
      <OrangeCube position={[ 5.5,  0.5, -2]} scale={1.1} speed={1.5} ri={1.2} />
      <OrangeCube position={[ 6.8,  1.5, -2]} scale={0.75} speed={1.7} ri={1.0} />
      <DarkCube   position={[ 4.5, -0.5, -1.5]} scale={0.65} speed={1.4} ri={0.9} />

      {/* Spheres along the ribbon */}
      <WhiteSphere position={[-3.0, -0.8, -0.5]} scale={0.22} />
      <WhiteSphere position={[ 3.5,  0.3, -1.0]} scale={0.28} />
      <WhiteSphere position={[ 6.2,  1.2, -1.8]} scale={0.32} />

      <DarkSphere position={[ 4.0, -0.8, -1]} scale={0.38} />
    </>
  );
}
