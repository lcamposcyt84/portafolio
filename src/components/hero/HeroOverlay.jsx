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

      <motion.div
        className="hero-subtitle-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        <div className="subtitle-decorator">
          <span className="dot"></span>
          <span className="line"></span>
        </div>
        <p className="hero-subtitle">
          DONDE LA INGENIERÍA SE VUELVE ARTE
        </p>
        <div className="subtitle-decorator right">
          <span className="line"></span>
          <span className="dot"></span>
        </div>
      </motion.div>
    </div>
  );
}
