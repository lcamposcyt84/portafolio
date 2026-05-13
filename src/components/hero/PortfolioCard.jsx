import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function PortfolioCard({ project, index }) {
  const { t } = useTranslation();

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
    >
      <div className="card-image-wrapper">
        <img src={project.image} alt={t(project.titleKey)} className="card-image" loading="lazy" />
        <div className="card-image-overlay" />
      </div>

      <div className="card-content">
        <span className="card-category">{t(project.categoryKey)}</span>
        <h3 className="card-title">{t(project.titleKey)}</h3>
        <p className="card-desc">{t(project.descriptionKey).slice(0, 72)}…</p>

        <div className="card-footer">
          <div className="card-tech">
            {project.tech.map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
          <svg className="card-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}
