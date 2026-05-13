import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function HeroOverlay() {
  const { t } = useTranslation();

  return (
    <div className="hero-overlay">
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ whiteSpace: 'pre-line' }}
      >
        {t('hero.title')}
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
          {t('hero.subtitle')}
        </p>
        <div className="subtitle-decorator right">
          <span className="line"></span>
          <span className="dot"></span>
        </div>
      </motion.div>
    </div>
  );
}
