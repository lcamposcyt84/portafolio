import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

export const Button = ({ children, variant = 'primary', size = 'md', onClick, className = '' }) => {
  const baseClass = styles.button;
  const variantClass = styles[variant];
  const sizeClass = styles[`size-${size}`];

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
    >
      <span className={styles.content}>{children}</span>
      {variant === 'primary' && <div className={styles.glow}></div>}
    </motion.button>
  );
};
