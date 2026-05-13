import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const TECH_LOGOS = [
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Vite', slug: 'vite' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Python', slug: 'python' },
  { name: 'PHP', slug: 'php' },
  { name: 'Vercel', slug: 'vercel' },
  { name: 'Tailwind', slug: 'tailwindcss' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'Firebase', slug: 'firebase' },
];

export const Footer = () => {
  const { t } = useTranslation();
  const [activeQR, setActiveQR] = useState(null);

  return (
    <footer className={styles.footer}>
      {/* Tech Stack Logo Marquee */}
      <div className={styles.techMarqueeContainer}>
        <div className={styles.techMarqueeTrack}>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className={styles.techMarqueeContent} aria-hidden={i > 0}>
              {TECH_LOGOS.map((tech, index) => (
                <div key={`${i}-${index}`} className={styles.techItem}>
                  <img 
                    src={`https://cdn.simpleicons.org/${tech.slug}`} 
                    alt={tech.name} 
                    className={styles.techIcon}
                    onError={e => e.currentTarget.style.display = 'none'}
                  />
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.brand}>
          <a href="#" className={styles.logo}>
            <img src="/img/logo.png" alt="Logo" className={styles.logoImage} />
            <span className={styles.logoOverlayText}>WEBSTREAM</span>
          </a>
          <p className={styles.description}>
            {t('footer.description')}
          </p>
        </div>
        
        <div className={styles.links}>
          <a href="https://wa.me/584245547749" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </a>
          <button onClick={() => setActiveQR('instagram')} className={styles.socialLink} aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </button>
          <button onClick={() => setActiveQR('tiktok')} className={styles.socialLink} aria-label="TikTok">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
          </button>
          <a href="#" className={styles.socialLink} aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Webstream. {t('footer.rights')}</p>
        </div>
      </div>

      {activeQR && (
        <div className={styles.modalOverlay} onClick={() => setActiveQR(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setActiveQR(null)}>✕</button>
            <img 
              src={activeQR === 'instagram' ? "/img/red1.jpeg" : "/img/red2.jpeg"} 
              alt={`${activeQR} QR Code`} 
              className={styles.modalQRImage}
            />
            <p className={styles.modalText}>
              {t('footer.scanToFollow')} {activeQR === 'instagram' ? 'Instagram' : 'TikTok'}
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};
