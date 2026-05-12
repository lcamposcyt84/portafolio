import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const DataFlow = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // ─── Scene & Fog ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05111f, 0.014);

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 500);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // ─── Shared materials ───
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x081b33,
      metalness: 0.6,
      roughness: 0.3,
      transparent: true,
      opacity: 0.85,
    });
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00aeef,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });

    // ─── Tubes ───
    const tubesGroup = new THREE.Group();
    scene.add(tubesGroup);
    const curves = [];

    for (let i = 0; i < 7; i++) {
      const points = [];
      let cur = new THREE.Vector3(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 40 - 10
      );
      points.push(cur);
      const segs = 2 + Math.floor(Math.random() * 3);
      for (let j = 0; j < segs; j++) {
        const dir  = Math.floor(Math.random() * 3);
        const dist = 15 + Math.random() * 35;
        const next = cur.clone();
        if (dir === 0)      next.x += Math.random() > 0.5 ? dist : -dist;
        else if (dir === 1) next.y += Math.random() > 0.5 ? dist : -dist;
        else                next.z += Math.random() > 0.5 ? dist : -dist;
        points.push(next);
        cur = next;
      }
      const curve = new THREE.CatmullRomCurve3(points);
      curve.curveType = 'centripetal';
      curve.tension = 0.6;
      curves.push(curve);

      const radius = 1.2 + Math.random() * 1.5;
      const geo    = new THREE.TubeGeometry(curve, 24, radius, 6, false);
      tubesGroup.add(new THREE.Mesh(geo, tubeMaterial));
      tubesGroup.add(new THREE.Mesh(geo, wireMaterial));
    }

    // ─── Water drops ───
    const dropGeo    = new THREE.SphereGeometry(0.9, 8, 8);
    // Cambiado sutilmente el color para que combine con el electric blue del portafolio
    const dropMat    = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const waterDrops = [];

    for (let i = 0; i < 12; i++) {
      const drop = new THREE.Mesh(dropGeo, dropMat);
      drop.userData = {
        curveIndex:  Math.floor(Math.random() * curves.length),
        progress:    Math.random(),
        speed:       0.002 + Math.random() * 0.002,
        scaleOffset: Math.random() * Math.PI * 2,
      };
      scene.add(drop);
      waterDrops.push(drop);
    }

    const glowLight = new THREE.PointLight(0x00f0ff, 2.5, 60);
    glowLight.position.set(0, 0, 20);
    scene.add(glowLight);

    // ─── Particles ───
    const PARTICLE_COUNT = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPos[i*3]   = (Math.random() - 0.5) * 140;
      pPos[i*3+1] = (Math.random() - 0.5) * 100;
      pPos[i*3+2] = (Math.random() - 0.5) * 80;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const canvas2d = document.createElement('canvas');
    canvas2d.width = 32; canvas2d.height = 32;
    const ctx  = canvas2d.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(0,240,255,0.8)');
    grad.addColorStop(1, 'rgba(0,240,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(16, 16, 16, 0, Math.PI * 2); ctx.fill();
    const sprite = new THREE.CanvasTexture(canvas2d);

    const pMat = new THREE.PointsMaterial({
      size: 1.5, map: sprite, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.35,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // ─── Lighting ───
    scene.add(new THREE.AmbientLight(0x05111f, 3));
    scene.add(new THREE.DirectionalLight(0xffffff, 1.0));

    // ─── Mouse parallax ───
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize, { passive: true });

    let paused = false;
    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    // Using IntersectionObserver if supported
    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => { paused = !entry.isIntersecting; },
        { threshold: 0.05 }
      );
      observer.observe(mount);
    }

    let frame    = 0;
    let lastTime = 0;
    const FPS_CAP = 1000 / 30;
    let rafId;

    const animate = (now) => {
      rafId = requestAnimationFrame(animate);
      if (paused || now - lastTime < FPS_CAP) return;
      lastTime = now;
      frame++;

      for (const drop of waterDrops) {
        drop.userData.progress += drop.userData.speed;
        if (drop.userData.progress > 1) {
          drop.userData.progress = 0;
          drop.userData.curveIndex = Math.floor(Math.random() * curves.length);
        }
        const pt = curves[drop.userData.curveIndex].getPointAt(drop.userData.progress);
        drop.position.copy(pt);
        const s = 0.7 + Math.sin(frame * 0.08 + drop.userData.scaleOffset) * 0.35;
        drop.scale.setScalar(s);
      }

      const pos = pGeo.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i*3+1] += 0.06;
        pos[i*3]   += Math.sin(frame * 0.012 + i) * 0.01;
        if (pos[i*3+1] > 60) pos[i*3+1] = -60;
      }
      pGeo.attributes.position.needsUpdate = true;

      camera.position.x += (mouseX * 25 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 25 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      tubesGroup.rotation.y += 0.0004;

      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
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
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
};
