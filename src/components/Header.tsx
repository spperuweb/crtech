import React, { useState, useEffect } from 'react';
import { assets } from '../data/assets';
import SolucionesDropdown from './SolucionesDropdown';

export default function Header() {
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

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="main-header">
      <div className="header-container">
        {/* Logo */}
        <a href="#/" className="header-logo" onClick={closeMenu} aria-label="CR Technologies & Services Inicio">
          <img 
            src={assets.logos.lightBack} 
            alt="CR Technologies & Services" 
            className="header-logo-img"
            width="220"
            height="44"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Navegación principal">
          <SolucionesDropdown currentRoute="home" />
          <a href="#metodo" className="nav-link">Cómo trabajamos</a>
          <a href="#evidencia" className="nav-link">Operaciones reales</a>
          <a href="#nosotros" className="nav-link">Nosotros</a>
        </nav>

        {/* CTA Button */}
        <div className="header-cta-wrapper">
          <a 
            href={whatsappUrl} 
            className="btn btn-primary header-cta-btn"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Hablar con un especialista
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
            <a href="#/drones" className="mobile-solution-link" onClick={closeMenu}>
              Drones Profesionales
            </a>
            <a href="#/energia" className="mobile-solution-link" onClick={closeMenu}>
              Energía EcoFlow
            </a>
            <a href="#/servicios-ti" className="mobile-solution-link" onClick={closeMenu}>
              Servicios TI
            </a>
          </div>

          <a href="#metodo" className="mobile-nav-link" onClick={closeMenu}>Cómo trabajamos</a>
          <a href="#evidencia" className="mobile-nav-link" onClick={closeMenu}>Operaciones reales</a>
          <a href="#nosotros" className="mobile-nav-link" onClick={closeMenu}>Nosotros</a>
          
          <a 
            href={whatsappUrl} 
            className="btn btn-primary mobile-cta-btn"
            target="_blank" 
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Hablar con un especialista
          </a>
        </nav>
      </div>
    </header>
  );
}

