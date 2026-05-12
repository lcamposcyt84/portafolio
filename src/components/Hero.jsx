import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section id="inicio" className="relative flex flex-col items-center justify-center z-10 w-full mb-10">
      <div className="container mx-auto text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[36px] md:text-[50px] lg:text-[58px] font-sans font-bold text-white tracking-tight mb-6 drop-shadow-2xl leading-[1.15]"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.7)' }}
        >
          VISUAL VISTAZO: INNOVACIÓN <br />
          EN DISEÑO Y PORTAFOLIO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[13px] md:text-[15px] text-gray-300 max-w-2xl mx-auto font-normal tracking-wide"
        >
          Descubre el futuro de la creatividad.{' '}
          <span className="text-white font-medium">Tu portafolio reimaginado.</span>
        </motion.p>
      </div>
    </section>
  );
};
