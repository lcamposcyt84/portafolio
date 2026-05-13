import './styles/hero.css';
import { Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/layout/Footer';
import VideoBackground from './components/hero/VideoBackground';
import HeroOverlay from './components/hero/HeroOverlay';
import PortfolioGrid from './components/hero/PortfolioGrid';
import { useLanguageDetection } from './hooks/useLanguageDetection';

function App() {
  useLanguageDetection();
  return (
    <div className="page-wrapper">
      {/* ── Video Background ── */}
      <VideoBackground />

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero Section ── */}
      <main id="inicio">
        <section className="hero-section">
          <HeroOverlay />
        </section>

        {/* ── Portfolio grid below the wave ── */}
        <div id="portafolio">
          <PortfolioGrid />
        </div>
        
        {/* Placeholder for servicios if added later, currently points to portfolio */}
        <div id="servicios"></div>
      </main>

      {/* ── Footer ── */}
      <div id="contacto">
        <Footer />
      </div>
    </div>
  );
}

export default App;
