import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Code2, Server, Database, Smartphone } from 'lucide-react';
import styles from './About.module.css';

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <Section id="about" title="Sobre Mí" subtitle="Más de 5 años transformando ideas complejas en soluciones digitales elegantes y escalables.">
      <motion.div 
        className={styles.bentoGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className={`${styles.bentoItem} ${styles.itemWide}`}>
          <Card className={styles.cardContent} hoverEffect={false}>
            <h3>Ingeniería & Diseño</h3>
            <p>
              Mi enfoque une la excelencia técnica con un diseño de interfaz impecable. No solo escribo código; 
              construyo productos que los usuarios aman y que las empresas pueden escalar. 
              Especializado en el ecosistema React (Next.js, Vite, React Native) y backends robustos (Node.js, PHP).
            </p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.bentoItem}>
          <Card className={styles.cardContent} hoverEffect={true}>
            <div className={styles.iconWrapper}><Code2 size={32} /></div>
            <h4>Frontend Moderno</h4>
            <p className={styles.smallText}>React, Vite, Framer Motion, Three.js, Arquitecturas SPA/SSR.</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.bentoItem}>
          <Card className={styles.cardContent} hoverEffect={true}>
            <div className={styles.iconWrapper}><Server size={32} /></div>
            <h4>Backend Escalable</h4>
            <p className={styles.smallText}>Node.js, PHP, APIs REST, Microservicios, Autenticación JWT.</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.bentoItem}>
          <Card className={styles.cardContent} hoverEffect={true}>
            <div className={styles.iconWrapper}><Database size={32} /></div>
            <h4>Bases de Datos</h4>
            <p className={styles.smallText}>MySQL, PostgreSQL, MongoDB. Optimización de queries y diseño relacional.</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.bentoItem}>
          <Card className={styles.cardContent} hoverEffect={true}>
            <div className={styles.iconWrapper}><Smartphone size={32} /></div>
            <h4>Desarrollo Móvil</h4>
            <p className={styles.smallText}>React Native, Expo. Experiencias nativas fluidas para iOS y Android.</p>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
};
