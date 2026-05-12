import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import styles from './Stack.module.css';

const stackData = [
  { name: 'React', category: 'Frontend' },
  { name: 'Vite', category: 'Tooling' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PHP', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'MySQL', category: 'Database' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Three.js', category: 'Creative' },
  { name: 'Framer Motion', category: 'Creative' }
];

export const Stack = () => {
  return (
    <Section dark id="stack" title="Stack Tecnológico" subtitle="Herramientas y tecnologías que domino para construir el futuro digital.">
      <div className={styles.stackContainer}>
        <div className={styles.marquee}>
          <div className={styles.marqueeContent}>
            {/* Double the list to create seamless infinite loop */}
            {[...stackData, ...stackData].map((tech, index) => (
              <div key={index} className={styles.techItem}>
                <span className={styles.techName}>{tech.name}</span>
                <span className={styles.techCategory}>{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
