import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../data/assets';

export default function DronesLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const closeMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = assets.contact.swellProWhatsappUrl;

  return (
    <div className="drones-landing-wrapper">
      {/* 1. HEADER DEDICADO DRONES */}
      <header className="site-header drones-header" id="drones-header">
        <div className="header-container">
          {/* Logo + ID Secundaria */}
          <div className="drones-brand-group">
            <a href="#/" className="header-logo" title="Volver a CR Technologies">
              <img 
                src={assets.logos.lightBack} 
                alt="CR Technologies & Services" 
                className="header-logo-img"
                width="200"
                height="40"
              />
            </a>
            <div className="drones-secondary-badge" aria-label="Identificación secundaria">
              <span className="badge-dot"></span>
              <span className="badge-text">Drones profesionales · SwellPro Perú</span>
            </div>
          </div>

          {/* Nav Desktop */}
          <nav className="desktop-nav" aria-label="Navegación Drones SwellPro">
            <a href="#aplicaciones" onClick={(e) => scrollToSection(e, 'aplicaciones')} className="nav-link">
              Aplicaciones
            </a>
            <a href="#capacidades" onClick={(e) => scrollToSection(e, 'capacidades')} className="nav-link">
              Capacidades
            </a>
            <a href="#soporte" onClick={(e) => scrollToSection(e, 'soporte')} className="nav-link">
              Soporte
            </a>
            <a href="#/" className="nav-link nav-link-return">
              ← Volver a CRTech
            </a>
          </nav>

          {/* CTA Header */}
          <div className="header-cta-wrapper">
            <a 
              href={whatsappUrl}
              className="btn btn-primary drones-cta-btn"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          <nav className="mobile-nav" aria-label="Navegación móvil Drones">
            <div className="mobile-badge-item">
              <span>Drones profesionales · SwellPro Perú</span>
            </div>
            <a href="#aplicaciones" onClick={(e) => scrollToSection(e, 'aplicaciones')} className="mobile-nav-link">
              Aplicaciones
            </a>
            <a href="#capacidades" onClick={(e) => scrollToSection(e, 'capacidades')} className="mobile-nav-link">
              Capacidades
            </a>
            <a href="#soporte" onClick={(e) => scrollToSection(e, 'soporte')} className="mobile-nav-link">
              Soporte
            </a>
            <a href="#/" className="mobile-nav-link mobile-return-link" onClick={closeMenu}>
              ← Volver a CRTech Home
            </a>
            <a 
              href={whatsappUrl}
              className="btn btn-primary mobile-cta-btn"
              target="_blank" 
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Cotizar por WhatsApp
            </a>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main id="drones-main-content">
        
        {/* 2. HERO PREMIUM */}
        <section className="drones-hero-section" id="drones-hero">
          <div className="drones-hero-container">
            
            {/* Copy (44% approximate) */}
            <div className="drones-hero-copy">
              <div className="drones-eyebrow">
                <span className="eyebrow-accent"></span>
                <span>SWELLPRO PERÚ · REPRESENTACIÓN OFICIAL</span>
              </div>

              <h1 className="drones-hero-title">
                Tecnología aérea para operaciones que no esperan condiciones perfectas.
              </h1>

              <p className="drones-hero-subtitle">
                Drones impermeables para inspección, monitoreo, pesca, rescate y trabajo de campo, con capacitación, repuestos y soporte local en Perú.
              </p>

              <div className="drones-hero-actions">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary hero-btn-main"
                >
                  Cotizar un drone
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
                <a 
                  href="#aplicaciones" 
                  onClick={(e) => scrollToSection(e, 'aplicaciones')}
                  className="btn btn-secondary hero-btn-sub"
                >
                  Explorar aplicaciones
                </a>
              </div>

              {/* 4 Guarantees */}
              <div className="drones-hero-guarantees">
                <div className="guarantee-item">
                  <svg className="guarantee-check" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Representación oficial</span>
                </div>
                <div className="guarantee-item">
                  <svg className="guarantee-check" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Capacitación especializada</span>
                </div>
                <div className="guarantee-item">
                  <svg className="guarantee-check" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Soporte técnico local</span>
                </div>
                <div className="guarantee-item">
                  <svg className="guarantee-check" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Repuestos y postventa</span>
                </div>
              </div>
            </div>

            {/* Visual Column (56% approximate) with SVG Curve Signature */}
            <div className="drones-hero-visual">
              {/* Firma visual: línea curva muy fina conectando copy con video (estática, max 1px, color azul agua) */}
              <svg 
                className="drones-hero-signature-line" 
                viewBox="0 0 500 300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d="M -30 180 C 80 120, 160 220, 320 140 C 400 100, 460 120, 520 80" 
                  stroke="#33B9E8" 
                  strokeWidth="1" 
                  strokeOpacity="0.45"
                  strokeDasharray="4 3"
                />
              </svg>

              <div className="drones-video-frame">
                <video
                  ref={videoRef}
                  className="drones-hero-video"
                  src={assets.drones.heroVideo}
                  poster={assets.drones.heroPoster}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  autoPlay
                />

                {/* Accessible Play/Pause Toggle */}
                <button 
                  type="button" 
                  className="drones-video-toggle-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pausar video de drones" : "Reproducir video de drones"}
                  title={isPlaying ? "Pausar video" : "Reproducir video"}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="toggle-icon">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="toggle-icon">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <div className="drones-video-badge">
                  <span className="live-dot"></span>
                  <span>SwellPro FD3 en operación real</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. BLOQUE DE CONFIANZA INMEDIATO */}
        <section className="drones-trust-strip" aria-label="Respaldo Oficial SwellPro">
          <div className="trust-strip-container">
            <div className="trust-brand-item">
              <img 
                src={assets.logos.swellProPeru} 
                alt="SwellPro Perú Logo" 
                className="trust-swellpro-logo" 
                loading="lazy"
                width="160"
                height="32"
              />
            </div>
            <div className="trust-divider" aria-hidden="true"></div>
            <div className="trust-features-row">
              <div className="trust-feature-pill">
                <svg className="pill-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Representante oficial en Perú</span>
              </div>
              <div className="trust-feature-pill">
                <svg className="pill-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Capacitación para pilotos y equipos</span>
              </div>
              <div className="trust-feature-pill">
                <svg className="pill-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Soporte técnico y repuestos locales</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SECCIÓN "OPERACIONES REALES" */}
        <section className="drones-operations-section" id="aplicaciones">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">APLICACIONES OPERATIVAS</span>
              <h2 className="section-title">
                Diseñados para entrar donde la operación lo exige.
              </h2>
              <p className="section-subtitle">
                Aplicamos tecnología aérea impermeable en escenarios donde el agua, la distancia y las condiciones del terreno requieren continuidad operativa.
              </p>
            </div>

            {/* Composición editorial no repetitiva */}
            <div className="operations-editorial-grid">
              
              {/* Card Principal Destacada */}
              <div className="op-card op-card-primary">
                <div className="op-card-image-wrap">
                  <img 
                    src={assets.drones.operations.inspection} 
                    alt="Dron impermeabilizado en monitoreo e inspección costera" 
                    className="op-img"
                    loading="lazy"
                  />
                  <div className="op-card-badge">01 · Inspección Principal</div>
                </div>
                <div className="op-card-body">
                  <h3 className="op-card-title">Inspección y monitoreo</h3>
                  <p className="op-card-text">
                    Supervisión de infraestructura costera, puertos, plataformas e instalaciones industriales expuestas al salitre, humedad y viento severo.
                  </p>
                </div>
              </div>

              {/* Columna Secundaria (3 Cards) */}
              <div className="op-secondary-column">
                
                <div className="op-card op-card-horizontal">
                  <div className="op-card-image-wrap">
                    <img 
                      src={assets.drones.operations.fishing} 
                      alt="Operaciones de pesca y liberación de carga útil" 
                      className="op-img"
                      loading="lazy"
                    />
                    <div className="op-card-badge">02</div>
                  </div>
                  <div className="op-card-body">
                    <h3 className="op-card-title">Pesca y operaciones marítimas</h3>
                    <p className="op-card-text">
                      Lanzamiento de líneas de pesca, transporte de cargas ligeras en mar abierto y despliegue directamente desde embarcaciones.
                    </p>
                  </div>
                </div>

                <div className="op-card op-card-horizontal">
                  <div className="op-card-image-wrap">
                    <img 
                      src={assets.drones.operations.rescue} 
                      alt="Búsqueda y rescate en entornos acuáticos" 
                      className="op-img"
                      loading="lazy"
                    />
                    <div className="op-card-badge">03</div>
                  </div>
                  <div className="op-card-body">
                    <h3 className="op-card-title">Búsqueda y rescate</h3>
                    <p className="op-card-text">
                      Respuesta rápida en situaciones de emergencia sobre el mar, ríos o lagunas con capacidad de entrega inmediata de insumos o salvavidas.
                    </p>
                  </div>
                </div>

                <div className="op-card op-card-horizontal">
                  <div className="op-card-image-wrap">
                    <img 
                      src={assets.drones.operations.security} 
                      alt="Seguridad y vigilancia en trabajo de campo" 
                      className="op-img"
                      loading="lazy"
                    />
                    <div className="op-card-badge">04</div>
                  </div>
                  <div className="op-card-body">
                    <h3 className="op-card-title">Seguridad y trabajo de campo</h3>
                    <p className="op-card-text">
                      Patrullaje perimetral y monitoreo ambiental en áreas de difícil acceso con precipitaciones o alta humedad constante.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 5. SECCIÓN "CAPACIDADES QUE SOSTIENEN LA OPERACIÓN" */}
        <section className="drones-capabilities-section" id="capacidades">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">TECNOLOGÍA RESISTENTE</span>
              <h2 className="section-title">
                Capacidades que sostienen la operación
              </h2>
              <p className="section-subtitle">
                Plataformas diseñadas con ingeniería náutica y aeronáutica para responder con fiabilidad en el campo.
              </p>
            </div>

            <div className="capabilities-grid">
              
              <div className="capability-card">
                <div className="cap-icon-wrap">
                  <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
                  </svg>
                </div>
                <h3 className="cap-title">Operación sobre agua</h3>
                <p className="cap-desc">
                  Sellado impermeabilizado y flotabilidad nativa para operar, amarizar y despegar sobre agua dulce o salada sin riesgo de daños.
                </p>
              </div>

              <div className="capability-card">
                <div className="cap-icon-wrap">
                  <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
                <h3 className="cap-title">Transmisión y monitoreo</h3>
                <p className="cap-desc">
                  Enlaces de video digital de baja latencia para visualización en tiempo real desde estaciones de control en tierra o embarcaciones.
                </p>
              </div>

              <div className="capability-card">
                <div className="cap-icon-wrap">
                  <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <h3 className="cap-title">Cámaras y cargas especializadas</h3>
                <p className="cap-desc">
                  Módulos intercambiables con sensores 4K, visores térmicos nocturnos y sistemas mecánicos de soltador de carga útil.
                </p>
              </div>

              <div className="capability-card">
                <div className="cap-icon-wrap">
                  <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <h3 className="cap-title">Configuración para el entorno real</h3>
                <p className="cap-desc">
                  Ajuste de parámetros, calibración especializada y equipamiento adaptado a las condiciones ambientales de la costa, sierra o selva peruana.
                </p>
              </div>

            </div>

            <div className="capabilities-cta-bar">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                Consultar la configuración adecuada
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* 6. VISTA PREVIA DE SOLUCIONES */}
        <section className="drones-solutions-preview-section" id="modelos">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">ARQUITECTURAS DE PLATAFORMA</span>
              <h2 className="section-title">
                No necesitas cualquier drone. Necesitas la plataforma correcta.
              </h2>
              <p className="section-subtitle">
                Tres enfoques de plataforma adaptables a la misión operativa de tu organización.
              </p>
            </div>

            <div className="solutions-preview-grid">
              
              {/* Category 1 */}
              <div className="sol-preview-card">
                <div className="sol-card-media">
                  <img 
                    src={assets.drones.solutions.inspection} 
                    alt="Plataforma de Inspección y Monitoreo SwellPro" 
                    className="sol-img"
                    loading="lazy"
                  />
                </div>
                <div className="sol-card-content">
                  <h3 className="sol-card-name">Inspección y monitoreo</h3>
                  <p className="sol-card-desc">
                    Plataforma multirrotor impermeable optimizada para supervisión visual y térmica en zonas marinas e industriales.
                  </p>
                  <a 
                    href={`https://wa.me/51991664146?text=${encodeURIComponent('Hola CRTech, deseo consultar sobre la plataforma de Inspección y Monitoreo SwellPro.')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="sol-card-link"
                  >
                    <span>Consultar por WhatsApp</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Category 2 */}
              <div className="sol-preview-card">
                <div className="sol-card-media">
                  <img 
                    src={assets.drones.solutions.fishingPayload} 
                    alt="Plataforma de Pesca y Liberación de Carga SwellPro" 
                    className="sol-img"
                    loading="lazy"
                  />
                </div>
                <div className="sol-card-content">
                  <h3 className="sol-card-name">Pesca y liberación de carga</h3>
                  <p className="sol-card-desc">
                    Sistemas de alta tracción y soltador de carga útil para pesca costera y logística marítima rápida.
                  </p>
                  <a 
                    href={`https://wa.me/51991664146?text=${encodeURIComponent('Hola CRTech, deseo consultar sobre la plataforma de Pesca y Liberación de Carga SwellPro.')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="sol-card-link"
                  >
                    <span>Consultar por WhatsApp</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Category 3 */}
              <div className="sol-preview-card">
                <div className="sol-card-media">
                  <img 
                    src={assets.drones.solutions.specialized} 
                    alt="Plataforma de Operaciones Especializadas SwellPro" 
                    className="sol-img"
                    loading="lazy"
                  />
                </div>
                <div className="sol-card-content">
                  <h3 className="sol-card-name">Operaciones especializadas</h3>
                  <p className="sol-card-desc">
                    Equipamiento versátil para rescate acuático, emergencias, investigación ambiental y misiones complejas.
                  </p>
                  <a 
                    href={`https://wa.me/51991664146?text=${encodeURIComponent('Hola CRTech, deseo consultar sobre las plataformas de Operaciones Especializadas SwellPro.')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="sol-card-link"
                  >
                    <span>Consultar por WhatsApp</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. SECCIÓN DE SOPORTE TÉCNICO Y RESPALDO LOCAL */}
        <section className="drones-support-section" id="soporte">
          <div className="section-container">
            <div className="support-banner-grid">
              <div className="support-info-col">
                <span className="section-eyebrow">RESPALDO OFICIAL EN PERÚ</span>
                <h2 className="support-title">
                  Servicio Técnico, Capacitación y Repuestos Originales
                </h2>
                <p className="support-text">
                  Como representantes oficiales de SwellPro en Perú, en CR Technologies & Services acompañamos cada proyecto desde la evaluación previa hasta el mantenimiento preventivo y reparación local.
                </p>

                <ul className="support-bullets">
                  <li>
                    <span className="bullet-dot"></span>
                    <div>
                      <strong>Taller técnico en Perú:</strong> Diagnósticos especializados y servicio postventa directo sin envíos al exterior.
                    </div>
                  </li>
                  <li>
                    <span className="bullet-dot"></span>
                    <div>
                      <strong>Stock de repuestos críticos:</strong> Hélices, motores, baterías y módulos listos para entrega.
                    </div>
                  </li>
                  <li>
                    <span className="bullet-dot"></span>
                    <div>
                      <strong>Entrenamiento a pilotos:</strong> Capacitación práctica en operación segura y maniobras sobre agua.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="support-card-highlight">
                <div className="highlight-badge">GARANTÍA DE FÁBRICA</div>
                <h3 className="highlight-heading">Atención y Asesoría Técnica Directa</h3>
                <p className="highlight-desc">
                  ¿Tienes dudas sobre la compatibilidad de sensores o la mejor configuración para tu operación en Perú?
                </p>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary-light"
                >
                  Hablar con un especialista técnico
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CTA FINAL */}
        <section className="drones-final-cta-section">
          <div className="section-container">
            <div className="drones-final-cta-card">
              <div className="cta-card-content">
                <h2 className="cta-card-title">
                  Cuéntanos dónde necesitas operar.
                </h2>
                <p className="cta-card-text">
                  Evaluaremos el entorno, el objetivo y las condiciones de trabajo para recomendarte una solución aérea adecuada.
                </p>
                <div className="cta-card-actions">
                  <a 
                    href={whatsappUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary cta-btn-large"
                  >
                    Hablar con un especialista
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 9. FOOTER DEDICADO DRONES */}
      <footer className="drones-footer">
        <div className="footer-container">
          <div className="drones-footer-main">
            <div className="footer-brand-col">
              <a href="#/" className="footer-logo">
                <img 
                  src={assets.logos.lightBack} 
                  alt="CR Technologies & Services" 
                  className="footer-logo-img" 
                  loading="lazy"
                  width="180"
                  height="36"
                />
              </a>
              <p className="footer-brand-tagline">
                Representación Oficial de SwellPro en Perú · Soluciones aéreas impermeables para misiones críticas.
              </p>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-title">Navegación</h4>
              <ul className="footer-links">
                <li><a href="#aplicaciones" onClick={(e) => scrollToSection(e, 'aplicaciones')}>Aplicaciones</a></li>
                <li><a href="#capacidades" onClick={(e) => scrollToSection(e, 'capacidades')}>Capacidades</a></li>
                <li><a href="#modelos" onClick={(e) => scrollToSection(e, 'modelos')}>Soluciones</a></li>
                <li><a href="#soporte" onClick={(e) => scrollToSection(e, 'soporte')}>Soporte Técnico</a></li>
                <li><a href="#/">← Volver a CRTech Home</a></li>
              </ul>
            </div>

            <div className="footer-contact-col">
              <h4 className="footer-col-title">Contacto Perú</h4>
              <p className="footer-contact-text">
                Atención directa para cotizaciones y asesoría en campo.
              </p>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-wa-link"
              >
                <span>WhatsApp: {assets.contact.whatsappNumber}</span>
              </a>
            </div>
          </div>

          <div className="drones-footer-bottom">
            <p>© {new Date().getFullYear()} CR Technologies & Services. Representante oficial de SwellPro en Perú.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
