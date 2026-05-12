import React from 'react';
import { motion } from 'framer-motion';
import styles from './Section.module.css';

export const Section = ({ id, title, subtitle, children, className = '', dark = false }) => {
  return (
    <section 
      id={id} 
      className={`${styles.section} ${dark ? styles.dark : ''} ${className}`}
    >
      <div className="container">
        {(title || subtitle) && (
          <motion.div 
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </motion.div>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </section>
  );
};
