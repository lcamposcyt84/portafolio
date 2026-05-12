import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { MonitorSmartphone, Cpu, Layers, TerminalSquare } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  {
    icon: <MonitorSmartphone size={32} />,
    title: 'Desarrollo Web & App',
    description: 'SPAs de alto rendimiento y aplicaciones nativas fluidas. Interfaces premium enfocadas en conversión y experiencia de usuario.'
  },
  {
    icon: <Cpu size={32} />,
    title: 'Arquitectura Backend',
    description: 'Diseño de APIs RESTful y GraphQL, microservicios y sistemas distribuidos capaces de manejar alto tráfico con latencia mínima.'
  },
  {
    icon: <Layers size={32} />,
    title: 'Sistemas a Medida',
    description: 'Dashboards administrativos, plataformas SaaS y herramientas internas complejas con integraciones de terceros.'
  },
  {
    icon: <TerminalSquare size={32} />,
    title: 'Consultoría Tech',
    description: 'Auditoría de código, optimización de bases de datos, modernización de stacks legados y liderazgo técnico para equipos.'
  }
];

export const Services = () => {
  return (
    <Section dark id="services" title="Soluciones" subtitle="Servicios integrales para transformar necesidades de negocio en productos digitales excepcionales.">
      <div className={styles.grid}>
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
