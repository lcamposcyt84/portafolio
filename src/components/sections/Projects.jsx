import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ExternalLink, Code2 } from 'lucide-react';
import { projectsData } from '../../data/projects';
import styles from './Projects.module.css';

export const Projects = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <Section 
      id="projects" 
      title={t('projects.section.title')} 
      subtitle={t('projects.section.subtitle')}
    >
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
                <img src={project.image} alt={t(project.titleKey)} className={styles.image} />
                <div className={styles.overlay}>
                  <span className={styles.viewMore}>{t('projects.actions.viewDetails')}</span>
                </div>
              </div>
              <div className={styles.info}>
                <span className={styles.category}>{t(project.categoryKey)}</span>
                <h3 className={styles.title}>{t(project.titleKey)}</h3>
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
            <img src={selectedProject.image} alt={t(selectedProject.titleKey)} className={styles.modalImage} />
            <span className={styles.category}>{t(selectedProject.categoryKey)}</span>
            <h2 className={styles.modalTitle}>{t(selectedProject.titleKey)}</h2>
            <p className={styles.modalDescription}>{t(selectedProject.descriptionKey)}</p>
            
            <div className={styles.modalTechStack}>
              {selectedProject.tech.map((t, i) => (
                <span key={i} className={styles.techBadge}>{t}</span>
              ))}
            </div>

            <div className={styles.modalActions}>
              <Button onClick={() => window.open(selectedProject.link, '_blank')}>
                <ExternalLink size={18} style={{ marginRight: '8px' }}/> {t('projects.actions.viewProject')}
              </Button>
              {selectedProject.github && selectedProject.github !== '#' && (
                <Button variant="secondary" onClick={() => window.open(selectedProject.github, '_blank')}>
                  <Code2 size={18} style={{ marginRight: '8px' }}/> {t('projects.actions.repository')}
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
};
