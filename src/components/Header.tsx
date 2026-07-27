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

  // Sublanding badge rendering
  const renderSublandingBadge = () => {
    if (currentRoute === 'drones') {
      return (
        <a href="#/drones" className="header-sub-badge badge-cyan" title="SwellPro Perú">
          <span className="badge-dot"></span>
          <span>Drones Marinos · SwellPro</span>
        </a>
      );
    }
    if (currentRoute === 'energia') {
      return (
        <a href="#/energia" className="header-sub-badge badge-amber" title="EcoFlow Perú">
          <span className="badge-dot"></span>
          <span>EcoFlow · Representante Oficial</span>
        </a>
      );
    }
    if (currentRoute === 'servicios-ti') {
      return (
        <a href="#/servicios-ti" className="header-sub-badge badge-blue" title="Servicios TI & Infraestructura">
          <span className="badge-dot"></span>
          <span>Servicios TI & Infraestructura</span>
        </a>
      );
    }
    return null;
  };

  // Route-specific nav links
  const renderNavLinks = () => {
    if (currentRoute === 'drones') {
      return (
        <>
          <a href="#modelos-drones" className="nav-pill-link">Modelos</a>
          <a href="#aplicaciones-drones" className="nav-pill-link">Casos de Uso</a>
          <a href="#soporte-drones" className="nav-pill-link">Soporte & Repuestos</a>
          <a href="#faq-drones" className="nav-pill-link">FAQ</a>
        </>
      );
    }
    if (currentRoute === 'energia') {
      return (
        <>
          <a href="#aplicaciones-ecoflow" className="nav-pill-link">Aplicaciones</a>
          <a href="#selector-ecoflow" className="nav-pill-link">Calculador</a>
          <a href="#familias-ecoflow" className="nav-pill-link">Líneas EcoFlow</a>
          <a href="#tecnologia-ecoflow" className="nav-pill-link">Soporte</a>
        </>
      );
    }
    if (currentRoute === 'servicios-ti') {
      return (
        <>
          <a href="#diagnostico" className="nav-pill-link">Diagnóstico</a>
          <a href="#infraestructura" className="nav-pill-link">Infraestructura</a>
          <a href="#soporte" className="nav-pill-link">Soporte TI</a>
          <a href="#escenarios" className="nav-pill-link">Escenarios</a>
        </>
      );
    }
    // Default Home
    return (
      <>
        <a href="#metodo" className="nav-pill-link">Cómo trabajamos</a>
        <a href="#evidencia" className="nav-pill-link">Operaciones reales</a>
        <a href="#nosotros" className="nav-pill-link">Nosotros</a>
        <a href="#faq" className="nav-pill-link">FAQ</a>
      </>
    );
  };

  // Route-specific mobile nav links
  const renderMobileNavLinks = () => {
    if (currentRoute === 'drones') {
      return (
        <div className="mobile-nav-links-list">
          <a href="#modelos-drones" className="mobile-nav-link" onClick={closeMenu}>Modelos SwellPro</a>
          <a href="#aplicaciones-drones" className="mobile-nav-link" onClick={closeMenu}>Casos de Uso</a>
          <a href="#soporte-drones" className="mobile-nav-link" onClick={closeMenu}>Soporte & Repuestos</a>
          <a href="#faq-drones" className="mobile-nav-link" onClick={closeMenu}>FAQ Drones</a>
        </div>
      );
    }
    if (currentRoute === 'energia') {
      return (
        <div className="mobile-nav-links-list">
          <a href="#aplicaciones-ecoflow" className="mobile-nav-link" onClick={closeMenu}>Aplicaciones</a>
          <a href="#selector-ecoflow" className="mobile-nav-link" onClick={closeMenu}>Calculador de Carga</a>
          <a href="#familias-ecoflow" className="mobile-nav-link" onClick={closeMenu}>Líneas EcoFlow</a>
          <a href="#tecnologia-ecoflow" className="mobile-nav-link" onClick={closeMenu}>Soporte Oficial</a>
        </div>
      );
    }
    if (currentRoute === 'servicios-ti') {
      return (
        <div className="mobile-nav-links-list">
          <a href="#diagnostico" className="mobile-nav-link" onClick={closeMenu}>Diagnóstico</a>
          <a href="#infraestructura" className="mobile-nav-link" onClick={closeMenu}>Infraestructura & Redes</a>
          <a href="#soporte" className="mobile-nav-link" onClick={closeMenu}>Soporte TI</a>
          <a href="#escenarios" className="mobile-nav-link" onClick={closeMenu}>Escenarios</a>
        </div>
      );
    }
    // Default Home
    return (
      <div className="mobile-nav-links-list">
        <a href="#metodo" className="mobile-nav-link" onClick={closeMenu}>Cómo trabajamos</a>
        <a href="#evidencia" className="mobile-nav-link" onClick={closeMenu}>Operaciones reales</a>
        <a href="#nosotros" className="mobile-nav-link" onClick={closeMenu}>Nosotros</a>
        <a href="#faq" className="mobile-nav-link" onClick={closeMenu}>FAQ</a>
      </div>
    );
  };

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
            Hablar con un especialista
          </a>
        </nav>
      </div>
    </header>
  );
}


