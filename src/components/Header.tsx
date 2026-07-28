import React, { useState, useEffect } from 'react';
import { assets } from '../data/assets';
import SolucionesDropdown from './SolucionesDropdown';

interface HeaderProps {
  currentRoute?: 'home' | 'drones' | 'energia' | 'servicios-ti';
}

export default function Header({ currentRoute = 'home' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const whatsappUrl = `https://wa.me/51991664146?text=${encodeURIComponent(
    'Hola, quisiera recibir asesoría para identificar la solución tecnológica adecuada para mi operación.'
  )}`;

  // Sublanding badge rendering removed as requested
  const renderSublandingBadge = () => null;

  // Standard main nav links across all routes
  const renderNavLinks = () => (
    <>
      <a href="#metodo" className="nav-pill-link">Cómo trabajamos</a>
      <a href="#evidencia" className="nav-pill-link">Operaciones reales</a>
      <a href="#nosotros" className="nav-pill-link">Nosotros</a>
      <a href="#faq" className="nav-pill-link">FAQ</a>
    </>
  );

  // Standard mobile nav links across all routes
  const renderMobileNavLinks = () => (
    <div className="mobile-nav-links-list">
      <a href="#metodo" className="mobile-nav-link" onClick={closeMenu}>Cómo trabajamos</a>
      <a href="#evidencia" className="mobile-nav-link" onClick={closeMenu}>Operaciones reales</a>
      <a href="#nosotros" className="mobile-nav-link" onClick={closeMenu}>Nosotros</a>
      <a href="#faq" className="mobile-nav-link" onClick={closeMenu}>FAQ</a>
    </div>
  );

  return (
    <header className={`site-header vercel-header ${isScrolled ? 'scrolled' : ''}`} id="main-header">
      <div className="header-container">
        
        {/* Brand Group (Logo + Sub-line badge) */}
        <div className="header-brand-group">
          <a href="#/" className="header-logo" onClick={closeMenu} aria-label="CR Technologies & Services Inicio">
            <img 
              src={assets.logos.lightBack} 
              alt="CR Technologies & Services" 
              className="header-logo-img"
              width="210"
              height="42"
            />
          </a>
          {renderSublandingBadge()}
        </div>

        {/* Vercel-Style Floating Pill Navigation */}
        <nav className="desktop-nav vercel-pill-nav" aria-label="Navegación principal">
          <SolucionesDropdown currentRoute={currentRoute} />
          {renderNavLinks()}
        </nav>

        {/* CTA Button */}
        <div className="header-cta-wrapper">
          <a 
            href={whatsappUrl} 
            className="btn btn-primary header-cta-btn"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Contáctanos
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label="Abrir menú de navegación"
          type="button"
        >
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'active' : ''}`}>
        <nav className="mobile-nav" aria-label="Navegación móvil">
          <div className="mobile-solutions-group">
            <span className="mobile-solutions-title">Soluciones CRTech</span>
            <a href="#/drones" className={`mobile-solution-link ${currentRoute === 'drones' ? 'active' : ''}`} onClick={closeMenu}>
              <span className="mob-dot cyan"></span>
              <span>Drones Profesionales (SwellPro)</span>
            </a>
            <a href="#/energia" className={`mobile-solution-link ${currentRoute === 'energia' ? 'active' : ''}`} onClick={closeMenu}>
              <span className="mob-dot amber"></span>
              <span>Energía EcoFlow (LFP & Solar)</span>
            </a>
            <a href="#/servicios-ti" className={`mobile-solution-link ${currentRoute === 'servicios-ti' ? 'active' : ''}`} onClick={closeMenu}>
              <span className="mob-dot blue"></span>
              <span>Servicios TI & Redes</span>
            </a>
          </div>

          {renderMobileNavLinks()}
          
          <a 
            href={whatsappUrl} 
            className="btn btn-primary mobile-cta-btn"
            target="_blank" 
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Contáctanos
          </a>
        </nav>
      </div>
    </header>
  );
}


