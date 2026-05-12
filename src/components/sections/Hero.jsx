import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { VisualVistazoCanvas } from '../canvas/VisualVistazoCanvas';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { projectsData } from '../../data/projects';
import styles from './Hero.module.css';

export const Hero = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section className={styles.hero}>
      {/* ── Three.js Canvas background ── */}
      <VisualVistazoCanvas />

      {/* ── Deep gradient vignette ── */}
      <div className={styles.vignette} />

      {/* ── UI Overlay ── */}
      <div className={styles.overlay}>
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* ── Headline ── */}
          <motion.h1 className={styles.title} variants={itemVariants}>
            VISUAL VISTAZO: INNOVACIÓN <br /> EN DISEÑO Y PORTAFOLIO
          </motion.h1>

          {/* ── Subheadline ── */}
          <motion.p className={styles.subtitle} variants={itemVariants}>
            Descubre el futuro de la creatividad.{' '}
            <span className={styles.accentText}>Tu portafolio reimaginado.</span>
          </motion.p>

          {/* ── Portfolio Cards Strip ── */}
          <motion.div className={styles.cardsSection} variants={itemVariants}>
            <p className={styles.cardsLabel}>SET DE PORTAFOLIO</p>
            <div className={styles.cardsGrid}>
              {projectsData.map((project, i) => (
                <motion.div
                  key={project.id}
                  className={styles.glassCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.6, ease: 'easeOut' }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>
                      {project.description.slice(0, 80)}...
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Scroll hint ── */}
          <motion.div
            className={styles.scrollHint}
            variants={itemVariants}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Project Modal ── */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className={styles.modalContent}>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className={styles.modalImage}
            />
            <span className={styles.cardCategory}>{selectedProject.category}</span>
            <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
            <p className={styles.modalDesc}>{selectedProject.description}</p>
            <div className={styles.modalTech}>
              {selectedProject.tech.map((t, i) => (
                <span key={i} className={styles.techBadge}>{t}</span>
              ))}
            </div>
            <div className={styles.modalActions}>
              <Button onClick={() => window.open(selectedProject.link, '_blank')}>
                <ExternalLink size={16} style={{ marginRight: 8 }} />
                Ver proyecto en vivo
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
