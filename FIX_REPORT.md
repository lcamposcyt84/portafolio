# Visual Vistazo - corrección Three.js/R3F

## Problemas encontrados

1. `npm run build` no corría al descomprimir porque el binario de Vite venía sin permiso de ejecución y faltaba el binding opcional nativo de `rolldown` dentro de `node_modules`. Se corrigió reinstalando dependencias con `npm install`.
2. El background anterior usaba una ola casi plana: `TubeGeometry` con una escala vertical muy baja, por eso en la página se veía como una línea horizontal y no como la cascada/flujo transparente de la referencia.
3. La lluvia anterior movía sprites por frame fijo, sin usar `delta`, así que la velocidad dependía de FPS. También no tenía piso, rebote, difuminado ni splash al impactar.

## Archivos modificados

- `src/components/hero/EnergyWave.jsx`
- `src/components/hero/RainParticles.jsx`
- `src/components/hero/HeroScene.jsx`
- `src/styles/hero.css`

## Resultado

- Cinta/cascada 3D más ancha, translúcida, diagonal y con capas de luz azul/naranja/magenta.
- Lluvia lenta y estable con `delta time`.
- Gotas tipo lágrima, estelas suaves, piso de agua y ondas/splash difuminadas cuando impactan.
- Build validado con `npm run build`.

## Para correr

```bash
npm install
npm run dev
```

## Para producción

```bash
npm run build
```
