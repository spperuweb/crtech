import React, { useState } from 'react';
import { assets } from '../data/assets';
import SolucionesDropdown from './SolucionesDropdown';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header" id="main-header">
      <div className="header-container">
        {/* Logo */}
        <a href="#/" className="header-logo" onClick={closeMenu}>
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
          <a href="#soluciones" className="nav-link">Visión General</a>
          <a href="#nosotros" className="nav-link">Nosotros</a>
          <a href="#metodo" className="nav-link">Método</a>
        </nav>

        {/* CTA Button */}
        <div className="header-cta-wrapper">
          <a 
            href={assets.contact.whatsappUrl} 
            className="btn btn-primary header-cta-btn"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Solicitar asesoría
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

          <a href="#soluciones" className="mobile-nav-link" onClick={closeMenu}>Visión General</a>
          <a href="#nosotros" className="mobile-nav-link" onClick={closeMenu}>Nosotros</a>
          <a href="#metodo" className="mobile-nav-link" onClick={closeMenu}>Método</a>
          
          <a 
            href={assets.contact.whatsappUrl} 
            className="btn btn-primary mobile-cta-btn"
            target="_blank" 
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Solicitar asesoría
          </a>
        </nav>
      </div>
    </header>
  );
}

