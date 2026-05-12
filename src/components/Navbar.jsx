import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ServicesModal } from './ServicesModal';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['inicio', 'portafolio', 'servicios', 'contacto'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    if (targetId === 'servicios') {
      setIsServicesOpen(true);
      return;
    }

    setActiveSection(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#010208]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative h-16 md:h-24 flex items-center justify-center">
            {/* We crop the bottom 40% of the image to remove the dark text entirely */}
            <img src="/img/logo.png" alt="Logo" className="h-[140%] w-auto object-contain drop-shadow-md" style={{ clipPath: 'inset(0 0 40% 0)', marginTop: '-15%' }} />
            <span className="absolute bottom-[25%] left-1/2 -translate-x-1/2 text-white font-display text-[7px] md:text-[9px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase whitespace-nowrap drop-shadow-lg">
              WEBSTREAM
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {['INICIO', 'PORTAFOLIO', 'SERVICIOS', 'CONTACTO'].map((item) => {
            const targetId = item.toLowerCase();
            const isActive = activeSection === targetId;
            
            return (
              <a
                key={item}
                href={`#${targetId}`}
                onClick={(e) => handleScrollTo(e, targetId)}
                className={`text-[10px] font-display font-bold tracking-[0.15em] transition-colors duration-300 relative group cursor-pointer ${isActive ? 'text-primary' : 'text-white'}`}
              >
                {item}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300 ${isActive ? 'w-full shadow-[0_0_8px_#00f0ff]' : 'w-0 group-hover:w-full'}`}></span>
              </a>
            );
          })}
        </nav>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#010208]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-6"
        >
          {['INICIO', 'PORTAFOLIO', 'SERVICIOS', 'CONTACTO'].map((item) => {
            const targetId = item.toLowerCase();
            const isActive = activeSection === targetId;
            
            return (
              <a
                key={item}
                href={`#${targetId}`}
                onClick={(e) => {
                  handleScrollTo(e, targetId);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-[12px] font-display font-bold tracking-[0.15em] transition-colors duration-300 ${isActive ? 'text-primary' : 'text-white/80'}`}
              >
                {item}
              </a>
            );
          })}
        </motion.nav>
      )}
      </motion.header>

      <ServicesModal isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} />
    </>
  );
};
