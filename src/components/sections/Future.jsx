import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Terminal } from 'lucide-react';
import styles from './Future.module.css';

export const Future = () => {
  return (
    <Section id="future" className={styles.futureSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.terminal}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.header}>
            <div className={styles.dots}>
              <span className={styles.dot} style={{ backgroundColor: '#ff5f56' }}></span>
              <span className={styles.dot} style={{ backgroundColor: '#ffbd2e' }}></span>
              <span className={styles.dot} style={{ backgroundColor: '#27c93f' }}></span>
            </div>
            <div className={styles.title}>
              <Terminal size={14} className={styles.icon} />
              <span>playground_v2.exe</span>
            </div>
          </div>
          <div className={styles.body}>
            <p className={styles.line}><span className={styles.prompt}>$</span> npm run init-playground</p>
            <p className={styles.line}><span className={styles.info}>[INFO]</span> Cargando motor WebGL...</p>
            <p className={styles.line}><span className={styles.info}>[INFO]</span> Inicializando físicas 3D...</p>
            <p className={styles.line}><span className={styles.warn}>[WARN]</span> Minijuegos en desarrollo...</p>
            <p className={styles.line}><span className={styles.prompt}>$</span> <span className={styles.typing}>Próximamente: Una experiencia interactiva completa.</span><span className={styles.cursor}>_</span></p>
          </div>
          <div className={styles.overlay}>
            <h3>Playground V2.0</h3>
            <p>Próximamente</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
