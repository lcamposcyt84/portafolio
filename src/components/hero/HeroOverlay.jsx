import { motion } from 'framer-motion';

export default function HeroOverlay() {
  return (
    <div className="hero-overlay">
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        WEBSTREAM:
        <br />
        ARQUITECTURA DIGITAL
        <br />
        SIN LÍMITES
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        Donde la ingeniería se vuelve arte.
      </motion.p>
    </div>
  );
}
