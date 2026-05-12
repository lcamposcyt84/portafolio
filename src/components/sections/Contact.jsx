import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { Mail, Send, MessageSquare } from 'lucide-react';
import styles from './Contact.module.css';

export const Contact = () => {
  const [formState, setFormState] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      e.target.reset();
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <Section dark id="contact" title="Trabajemos Juntos" subtitle="¿Tienes un proyecto en mente? Hablemos de cómo puedo ayudarte a construirlo.">
      <div className={styles.container}>
        <motion.div 
          className={styles.contactInfo}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3>Información de Contacto</h3>
          <p>Actualmente estoy disponible para roles remotos, consultorías y proyectos freelance interesantes.</p>
          
          <div className={styles.links}>
            <a href="mailto:hello@ejemplo.com" className={styles.linkCard}>
              <Mail className={styles.icon} />
              <div>
                <h4>Email</h4>
                <span>hello@ejemplo.com</span>
              </div>
            </a>
            
            <a href="#" className={styles.linkCard}>
              <MessageSquare className={styles.icon} />
              <div>
                <h4>WhatsApp</h4>
                <span>+1 234 567 890</span>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.form 
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" required placeholder="John Doe" className={styles.input} />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required placeholder="john@ejemplo.com" className={styles.input} />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" required rows="4" placeholder="Cuéntame sobre tu proyecto..." className={styles.textarea}></textarea>
          </div>
          
          <Button type="submit" variant="primary" className={styles.submitBtn}>
            {formState === 'idle' && <><Send size={18} style={{ marginRight: '8px' }}/> Enviar Mensaje</>}
            {formState === 'submitting' && 'Enviando...'}
            {formState === 'success' && '¡Mensaje Enviado!'}
          </Button>
        </motion.form>
      </div>
    </Section>
  );
};
