import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const Portfolio = () => {
  return (
    <section id="portafolio" className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-[13px] md:text-[15px] font-sans font-bold text-white tracking-[0.2em] drop-shadow-md">
            SET DE PORTAFOLIO
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projectsData.map((item) => (
            <motion.a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
              variants={cardVariants}
              className="group relative rounded-2xl bg-gradient-to-br from-[#1c2140]/80 via-[#0a0d1e]/90 to-[#04050d]/90 backdrop-blur-xl border border-white/20 p-2.5 flex flex-col hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden mb-4 bg-[#e8e8e8]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl"></div>
              </div>

              {/* Content Box */}
              <div className="flex flex-col flex-grow relative pb-2 px-2">
                <h3 className="text-[14px] font-sans font-bold text-white mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#9090a0] leading-[1.4] pr-6 font-medium">
                  {item.description}
                </p>
                {/* Icons */}
                <div className="absolute bottom-0 right-1 text-[#606070] group-hover:text-white transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
