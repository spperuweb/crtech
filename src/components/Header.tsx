import React, { useState } from 'react';
import { assets } from '../data/assets';

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
        <a href="#" className="header-logo" onClick={closeMenu}>
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
          <a href="#soluciones" className="nav-link">Soluciones</a>
          <a href="#/drones" className="nav-link">Drones</a>
          <a href="#/energia" className="nav-link">Energía</a>
          <a href="#/servicios-ti" className="nav-link">Servicios TI</a>
          <a href="#nosotros" className="nav-link">Nosotros</a>
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
          <a href="#soluciones" className="mobile-nav-link" onClick={closeMenu}>Soluciones</a>
          <a href="#/drones" className="mobile-nav-link" onClick={closeMenu}>Drones</a>
          <a href="#/energia" className="mobile-nav-link" onClick={closeMenu}>Energía</a>
          <a href="#/servicios-ti" className="mobile-nav-link" onClick={closeMenu}>Servicios TI</a>
          <a href="#nosotros" className="mobile-nav-link" onClick={closeMenu}>Nosotros</a>
          
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
