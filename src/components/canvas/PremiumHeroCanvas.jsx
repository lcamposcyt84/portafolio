import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const PremiumHeroCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // ─── Renderer ───
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // ─── Scene ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030312, 0.018);

    // ─── Camera ───
    const camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 300);
    camera.position.set(0, 0, 38);

    // ─── Lighting ───
    scene.add(new THREE.AmbientLight(0x0a0a2a, 2.5));

    const bluePoint = new THREE.PointLight(0x00c8ff, 6, 80);
    bluePoint.position.set(-15, 15, 20);
    scene.add(bluePoint);

    const purplePoint = new THREE.PointLight(0x7b2fff, 5, 80);
    purplePoint.position.set(18, -10, 15);
    scene.add(purplePoint);

    const whitePoint = new THREE.PointLight(0xffffff, 2, 60);
    whitePoint.position.set(0, 0, 30);
    scene.add(whitePoint);

    // ─── Materials ───
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.92,
      transparent: true,
      opacity: 0.35,
      reflectivity: 1,
      thickness: 0.5,
      side: THREE.DoubleSide,
    });

    const orangeCubeMat = new THREE.MeshStandardMaterial({
      color: 0xff6a20,
      metalness: 0.4,
      roughness: 0.3,
      emissive: 0x331100,
    });

    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.6,
      roughness: 0.2,
      emissive: 0x003344,
    });

    const purpleMat = new THREE.MeshStandardMaterial({
      color: 0x9b59ff,
      metalness: 0.5,
      roughness: 0.25,
      emissive: 0x1a0040,
    });

    // ─── Floating Objects Group ───
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    const floatingObjects = [];

    const spawnObject = (geo, mat, x, y, z, scale = 1) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.scale.setScalar(scale);
      mesh.castShadow = true;
      const rotSpeed = {
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.012,
        z: (Math.random() - 0.5) * 0.006,
      };
      const floatOffset = Math.random() * Math.PI * 2;
      const floatSpeed  = 0.3 + Math.random() * 0.3;
      const floatAmp    = 0.8 + Math.random() * 0.8;
      floatingObjects.push({ mesh, rotSpeed, floatOffset, floatSpeed, floatAmp, baseY: y });
      objectsGroup.add(mesh);
    };

    // Main showcase objects — matching image reference
    const boxGeo    = new THREE.BoxGeometry(3.5, 3.5, 3.5);
    const sphGeo    = new THREE.SphereGeometry(2, 24, 24);
    const octGeo    = new THREE.OctahedronGeometry(2.2);
    const torusGeo  = new THREE.TorusGeometry(1.8, 0.5, 16, 32);

    // Orange cube (center-right) — hero
    spawnObject(boxGeo, orangeCubeMat,  6,  1.5, 2, 1.1);
    // Glass cube (center)
    spawnObject(boxGeo, glassMat,       0,  2,   0, 1.0);
    // Purple octahedron
    spawnObject(octGeo, purpleMat,     -7,  3,  -2, 1.0);
    // Cyan sphere
    spawnObject(sphGeo, cyanMat,       -5, -2,   3, 0.9);
    // Glass sphere
    spawnObject(sphGeo, glassMat,       8, -3,  -4, 0.85);
    // Orange small cube right
    spawnObject(boxGeo, orangeCubeMat,  12, -1,  -6, 0.65);
    // Cyan torus
    spawnObject(torusGeo, cyanMat,     -11, -1,  -5, 0.8);
    // Glass octahedron
    spawnObject(octGeo, glassMat,       4,  5,  -8, 0.7);
    // Small purple sphere BG
    spawnObject(sphGeo, purpleMat,    -10,  5,  -10, 0.55);

    // ─── Glowing Ribbon Wave (ribbon path) ───
    const ribbonGroup = new THREE.Group();
    scene.add(ribbonGroup);

    const buildRibbon = () => {
      const points = [];
      const segments = 120;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = (t - 0.5) * 60;
        const y = Math.sin(t * Math.PI * 2.5) * 5 - 2;
        const z = Math.cos(t * Math.PI * 2) * 3 - 8;
        points.push(new THREE.Vector3(x, y, z));
      }
      const curve  = new THREE.CatmullRomCurve3(points);
      const geo    = new THREE.TubeGeometry(curve, 120, 0.35, 8, false);
      const mat    = new THREE.MeshStandardMaterial({
        color: 0x0088ff,
        emissive: 0x003377,
        emissiveIntensity: 1.2,
        metalness: 0.7,
        roughness: 0.1,
        transparent: true,
        opacity: 0.8,
      });
      const glow   = new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
      });
      const tubeGlow = new THREE.TubeGeometry(curve, 120, 0.8, 8, false);
      ribbonGroup.add(new THREE.Mesh(geo, mat));
      ribbonGroup.add(new THREE.Mesh(tubeGlow, glow));
    };
    buildRibbon();

    // ─── Rain / Light Streaks ───
    const RAIN_COUNT = 120;
    const isMobile   = window.innerWidth < 768;
    const rainCount  = isMobile ? 60 : RAIN_COUNT;

    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);
    const rainVel = new Float32Array(rainCount); // per-drop fall speed

    for (let i = 0; i < rainCount; i++) {
      rainPos[i*3]   = (Math.random() - 0.5) * 70;
      rainPos[i*3+1] = (Math.random() - 0.5) * 50 + 10;
      rainPos[i*3+2] = (Math.random() - 0.5) * 30;
      rainVel[i]     = 0.08 + Math.random() * 0.12;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));

    // Raindrop sprite — elongated oval
    const rainCanvas = document.createElement('canvas');
    rainCanvas.width  = 8;
    rainCanvas.height = 32;
    const rCtx  = rainCanvas.getContext('2d');
    const rGrad = rCtx.createLinearGradient(4, 0, 4, 32);
    rGrad.addColorStop(0, 'rgba(100,200,255,0)');
    rGrad.addColorStop(0.3, 'rgba(100,200,255,0.9)');
    rGrad.addColorStop(1, 'rgba(100,200,255,0)');
    rCtx.fillStyle = rGrad;
    rCtx.beginPath();
    rCtx.ellipse(4, 16, 3, 14, 0, 0, Math.PI * 2);
    rCtx.fill();
    const rainSprite = new THREE.CanvasTexture(rainCanvas);

    const rainMat = new THREE.PointsMaterial({
      size: 0.9,
      map: rainSprite,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.55,
    });
    const rainSystem = new THREE.Points(rainGeo, rainMat);
    scene.add(rainSystem);

    // ─── Background Particle Dust ───
    const DUST_COUNT = isMobile ? 60 : 100;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPos[i*3]   = (Math.random() - 0.5) * 90;
      dustPos[i*3+1] = (Math.random() - 0.5) * 60;
      dustPos[i*3+2] = (Math.random() - 0.5) * 40 - 10;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

    const dustCanvas = document.createElement('canvas');
    dustCanvas.width = dustCanvas.height = 16;
    const dCtx = dustCanvas.getContext('2d');
    const dGrad = dCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    dGrad.addColorStop(0, 'rgba(100,160,255,0.8)');
    dGrad.addColorStop(1, 'rgba(100,160,255,0)');
    dCtx.fillStyle = dGrad;
    dCtx.fillRect(0, 0, 16, 16);

    const dustMat = new THREE.PointsMaterial({
      size: 0.4,
      map: new THREE.CanvasTexture(dustCanvas),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.4,
    });
    scene.add(new THREE.Points(dustGeo, dustMat));

    // ─── Mouse parallax ───
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 1.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 1.0;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ─── Resize ───
    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ─── Pause logic ───
    let paused = false;
    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    // ─── Animation Loop ───
    let frame = 0;
    let rafId;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (paused) return;

      const t = clock.getElapsedTime();
      frame++;

      // Smooth mouse parallax
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      camera.position.x = currentX * 3;
      camera.position.y = -currentY * 2;
      camera.lookAt(scene.position);

      // Floating objects
      for (const obj of floatingObjects) {
        const { mesh, rotSpeed, floatOffset, floatSpeed, floatAmp, baseY } = obj;
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.rotation.z += rotSpeed.z;
        mesh.position.y = baseY + Math.sin(t * floatSpeed + floatOffset) * floatAmp;
      }

      // Ribbon slow wave drift
      ribbonGroup.rotation.y = Math.sin(t * 0.12) * 0.08;
      ribbonGroup.position.y = Math.sin(t * 0.15) * 0.6;

      // Dynamic point light color shift
      bluePoint.position.x = Math.sin(t * 0.3) * 20;
      bluePoint.position.y = Math.cos(t * 0.2) * 12;
      purplePoint.position.x = Math.cos(t * 0.25) * 22;
      purplePoint.position.y = Math.sin(t * 0.35) * 10;

      // Rain fall
      const rPos = rainGeo.attributes.position.array;
      for (let i = 0; i < rainCount; i++) {
        rPos[i*3+1] -= rainVel[i];
        if (rPos[i*3+1] < -30) {
          rPos[i*3+1] = 30;
          rPos[i*3]   = (Math.random() - 0.5) * 70;
        }
      }
      rainGeo.attributes.position.needsUpdate = true;

      // Slow group drift
      objectsGroup.rotation.y = t * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};
