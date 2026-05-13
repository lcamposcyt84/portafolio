import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './ServicesModal.module.css';

const TECH_LOGOS = [
  { name: 'React', slug: 'react' },
  { name: 'Vite', slug: 'vite' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Python', slug: 'python' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Vue', slug: 'vuedotjs' },
  { name: 'Solidity', slug: 'solidity' }
];

export const ServicesModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const services = [
    { key: 'web', ...t('services.items.web', { returnObjects: true }) },
    { key: 'uiux', ...t('services.items.uiux', { returnObjects: true }) },
    { key: 'mobile', ...t('services.items.mobile', { returnObjects: true }) },
    { key: 'web3', ...t('services.items.web3', { returnObjects: true }) }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
            </button>
            
            <div className={styles.header}>
              <h2 className={styles.title}>{t('services.title')}</h2>
              <p className={styles.subtitle}>{t('services.subtitle')}</p>
            </div>

            <div className={styles.grid}>
              {services.map((service, idx) => (
                <motion.div 
                  key={service.key} 
                  className={styles.serviceCard}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                >
                  <div className={styles.serviceIcon}>
                    <div className={styles.glow}></div>
                  </div>
                  <div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDesc}>{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.techSection}>
              <h3 className={styles.techTitle}>{t('services.techTitle')}</h3>
              <div className={styles.techGrid}>
                {/* ... (keep tech grid as is) */}
                {TECH_LOGOS.map((tech, idx) => (
                  <motion.div 
                    key={tech.name} 
                    className={styles.techBadge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 + 0.4 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <img 
                      src={`https://cdn.simpleicons.org/${tech.slug}`} 
                      alt={tech.name} 
                      className={styles.techIcon}
                    />
                    <span>{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
