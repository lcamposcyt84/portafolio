import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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

  const hl = ctx.createRadialGradient(cx-r*0.3, tipY+(cy-tipY)*0.3, 0, cx-r*0.3, tipY+(cy-tipY)*0.3, r*0.5);
  hl.addColorStop(0,   'rgba(255,255,255,0.92)');
  hl.addColorStop(0.5, 'rgba(255,255,255,0.18)');
  hl.addColorStop(1,   'rgba(255,255,255,0.00)');
  ctx.beginPath();
  ctx.ellipse(cx-r*0.28, tipY+(cy-tipY)*0.38, r*0.2, r*0.13, -0.4, 0, Math.PI*2);
  ctx.fillStyle = hl; ctx.fill();

  const ca = ctx.createRadialGradient(cx+r*0.1, cy+r*0.52, 0, cx+r*0.1, cy+r*0.52, r*0.18);
  ca.addColorStop(0, 'rgba(230,250,255,0.55)');
  ca.addColorStop(1, 'rgba(230,250,255,0.00)');
  ctx.beginPath();
  ctx.arc(cx+r*0.1, cy+r*0.52, r*0.18, 0, Math.PI*2);
  ctx.fillStyle = ca; ctx.fill();

  return new THREE.CanvasTexture(c);
})();

const RAIN_COUNT = 220;

export default function RainParticles() {
  const groupRef = useRef();

  const drops = useMemo(() =>
    Array.from({ length: RAIN_COUNT }, () => ({
      x:     (Math.random()-0.5) * 40,
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
      if (d.y < -18) { d.y = 22+Math.random()*10; d.x = (Math.random()-0.5)*40; }
      s.position.set(d.x, d.y, d.z);
    });
  });

  return (
    <group ref={groupRef}>
      {drops.map((d, i) => (
        <sprite key={i} position={[d.x, d.y, d.z]} scale={[d.scale, d.scale*1.7, 1]}>
          <spriteMaterial
            map={dropTexture}
            transparent
            alphaTest={0.01}
            blending={THREE.NormalBlending}
            depthWrite={false}
            opacity={0.80}
          />
        </sprite>
      ))}
    </group>
  );
}
