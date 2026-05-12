import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import styles from './Card.module.css';

export const Card = ({ children, className = '', hoverEffect = true, onClick }) => {
  const cardRef = useRef(null);
  const mousePosition = useMousePosition();

  // Calculate mouse position relative to card
  let mouseX = 50;
  let mouseY = 50;

  if (cardRef.current && hoverEffect) {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX = mousePosition.x - rect.left;
    mouseY = mousePosition.y - rect.top;
  }

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${hoverEffect ? styles.hoverable : ''} ${className}`}
      whileHover={hoverEffect ? { y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
      style={{
        '--mouse-x': `${mouseX}px`,
        '--mouse-y': `${mouseY}px`,
      }}
    >
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.glow} />
    </motion.div>
  );
};
