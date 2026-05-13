import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PortfolioCard from './PortfolioCard';
import { projectsData } from '../../data/projects';

export default function PortfolioGrid() {
  const { t } = useTranslation();

  return (
    <div className="portfolio-section">
      <div className="portfolio-label-container">
        <motion.a
          href="#contacto"
          className="portfolio-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {t('nav.portfolio')}
        </motion.a>
      </div>

      <div className="portfolio-grid">
        {projectsData.map((project, i) => (
          <PortfolioCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
