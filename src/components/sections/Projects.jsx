import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ExternalLink, Code2 } from 'lucide-react';
import { projectsData } from '../../data/projects';
import styles from './Projects.module.css';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <Section id="projects" title="Proyectos Destacados" subtitle="Una selección de trabajos que demuestran mi capacidad para construir soluciones completas end-to-end.">
      <div className={styles.grid}>
        {projectsData.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={styles.projectCard} onClick={() => handleOpenModal(project)}>
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} className={styles.image} />
                <div className={styles.overlay}>
                  <span className={styles.viewMore}>Ver Detalles</span>
                </div>
              </div>
              <div className={styles.info}>
                <span className={styles.category}>{project.category}</span>
                <h3 className={styles.title}>{project.title}</h3>
                <div className={styles.techStack}>
                  {project.tech.slice(0, 3).map((t, i) => (
                    <span key={i} className={styles.techBadge}>{t}</span>
                  ))}
                  {project.tech.length > 3 && <span className={styles.techBadge}>+{project.tech.length - 3}</span>}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={!!selectedProject} onClose={handleCloseModal}>
        {selectedProject && (
          <div className={styles.modalContent}>
            <img src={selectedProject.image} alt={selectedProject.title} className={styles.modalImage} />
            <span className={styles.category}>{selectedProject.category}</span>
            <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
            <p className={styles.modalDescription}>{selectedProject.description}</p>
            
            <div className={styles.modalTechStack}>
              {selectedProject.tech.map((t, i) => (
                <span key={i} className={styles.techBadge}>{t}</span>
              ))}
            </div>

            <div className={styles.modalActions}>
              <Button onClick={() => window.open(selectedProject.link, '_blank')}>
                <ExternalLink size={18} style={{ marginRight: '8px' }}/> Ver Proyecto
              </Button>
              {selectedProject.github && selectedProject.github !== '#' && (
                <Button variant="secondary" onClick={() => window.open(selectedProject.github, '_blank')}>
                  <Code2 size={18} style={{ marginRight: '8px' }}/> Repositorio
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
};
