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
  const renderNavLinks = () => {
    const prefix = currentRoute === 'home' ? '' : '/crtech';
    return (
      <>
        <a href={`${prefix}#metodo`} className="nav-pill-link">Cómo trabajamos</a>
        <a href={`${prefix}#evidencia`} className="nav-pill-link">Operaciones reales</a>
        <a href={`${prefix}#nosotros`} className="nav-pill-link">Nosotros</a>
        <a href={`${prefix}#faq`} className="nav-pill-link">FAQ</a>
      </>
    );
  };

  // Standard mobile nav links across all routes
  const renderMobileNavLinks = () => {
    const prefix = currentRoute === 'home' ? '' : '/crtech';
    return (
      <div className="mobile-nav-links-list">
        <a href={`${prefix}#metodo`} className="mobile-nav-link" onClick={closeMenu}>Cómo trabajamos</a>
        <a href={`${prefix}#evidencia`} className="mobile-nav-link" onClick={closeMenu}>Operaciones reales</a>
        <a href={`${prefix}#nosotros`} className="mobile-nav-link" onClick={closeMenu}>Nosotros</a>
        <a href={`${prefix}#faq`} className="mobile-nav-link" onClick={closeMenu}>FAQ</a>
      </div>
    );
  };

  return (
    <header className={`site-header vercel-header ${isScrolled ? 'scrolled' : ''}`} id="main-header">
      <div className="header-container">
        
        {/* Brand Group (Logo + Sub-line badge) */}
        <div className="header-brand-group">
          <a href="/crtech" className="header-logo" onClick={closeMenu} aria-label="CR Technologies & Services Inicio">
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
            <a href="/crtech/drones" className={`mobile-solution-link ${currentRoute === 'drones' ? 'active' : ''}`} onClick={closeMenu}>
              <span className="mob-dot cyan"></span>
              <span>Drones Profesionales (SwellPro)</span>
            </a>
            <a href="/crtech/energia" className={`mobile-solution-link ${currentRoute === 'energia' ? 'active' : ''}`} onClick={closeMenu}>
              <span className="mob-dot amber"></span>
              <span>Energía EcoFlow (LFP & Solar)</span>
            </a>
            <a href="/crtech/serviciosti" className={`mobile-solution-link ${currentRoute === 'servicios-ti' ? 'active' : ''}`} onClick={closeMenu}>
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


