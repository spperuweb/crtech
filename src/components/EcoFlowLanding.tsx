import React, { useState, useEffect } from 'react';
import { assets } from '../data/assets';

export default function EcoFlowLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // SEO setup for EcoFlow landing page
    document.title = 'EcoFlow Perú | Energía Portátil y Soluciones Solares | CR Tech';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Estaciones de energía EcoFlow, paneles solares y soluciones de respaldo con asesoría y soporte local de CR Technologies & Services en Perú.'
      );
    }
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappQuoteUrl = "https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20cotizar%20una%20soluci%C3%B3n%20EcoFlow.";
  const whatsappHeroUrl = "https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20asesor%C3%ADa%20para%20elegir%20una%20soluci%C3%B3n%20EcoFlow.";
  const whatsappExpertUrl = "https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20hablar%20con%20un%20especialista%20sobre%20soluciones%20EcoFlow.";
  const whatsappFinalCtaUrl = "https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20solicito%20asesor%C3%ADa%20para%20una%20soluci%C3%B3n%20EcoFlow.";

  return (
    <div className="ecoflow-landing-wrapper">
      {/* 1. HEADER DEDICADO ECOFLOW / CR TECH */}
      <header className="ecoflow-header sticky-header">
        <div className="header-container">
          <a href="#/" className="header-logo-group" aria-label="CR Tech - Inicio">
            <img 
              src={assets.logos.lightBack} 
              alt="CR Technologies & Services" 
              className="crtech-header-logo"
            />
            <span className="logo-divider">|</span>
            <div className="ecoflow-official-tag">
              <span className="ecoflow-brand-name">EcoFlow</span>
              <span className="ecoflow-badge">Representante Oficial</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Navegación EcoFlow">
            <a href="#aplicaciones-ecoflow" onClick={(e) => scrollToSection(e, 'aplicaciones-ecoflow')} className="nav-link">
              Aplicaciones
            </a>
            <a href="#familias-ecoflow" onClick={(e) => scrollToSection(e, 'familias-ecoflow')} className="nav-link">
              Soluciones
            </a>
            <a href="#tecnologia-ecoflow" onClick={(e) => scrollToSection(e, 'tecnologia-ecoflow')} className="nav-link">
              Tecnología
            </a>
            <a href="#soporte-ecoflow" onClick={(e) => scrollToSection(e, 'soporte-ecoflow')} className="nav-link">
              Soporte
            </a>
            <a href="#/" className="nav-link nav-link-return">
              ← Volver a CRTech
            </a>
          </nav>

          <div className="header-actions">
            <a 
              href={whatsappQuoteUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary header-cta-btn"
            >
              <span>Cotizar por WhatsApp</span>
            </a>

            {/* Mobile Menu Button */}
            <button 
              type="button" 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <nav className="mobile-nav-links">
              <a href="#aplicaciones-ecoflow" onClick={(e) => scrollToSection(e, 'aplicaciones-ecoflow')} className="mobile-nav-link">
                Aplicaciones
              </a>
              <a href="#familias-ecoflow" onClick={(e) => scrollToSection(e, 'familias-ecoflow')} className="mobile-nav-link">
                Soluciones
              </a>
              <a href="#tecnologia-ecoflow" onClick={(e) => scrollToSection(e, 'tecnologia-ecoflow')} className="mobile-nav-link">
                Tecnología
              </a>
              <a href="#soporte-ecoflow" onClick={(e) => scrollToSection(e, 'soporte-ecoflow')} className="mobile-nav-link">
                Soporte Local
              </a>
              <a href="#/" onClick={closeMenu} className="mobile-nav-link text-sky-600 font-bold">
                ← Volver a CRTech Home
              </a>
            </nav>
            <div className="mobile-drawer-footer">
              <a 
                href={whatsappQuoteUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary w-full text-center"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* 2. HERO EDITORIAL ECOFLOW */}
        <section className="ecoflow-hero-section">
          <div className="section-container">
            <div className="ecoflow-hero-grid">
              
              {/* Copy Column */}
              <div className="ecoflow-hero-copy">
                <span className="hero-eyebrow-badge">
                  <span className="amber-dot"></span>
                  ECOFLOW PERÚ · REPRESENTACIÓN OFICIAL
                </span>

                <h1 className="ecoflow-hero-title">
                  Energía disponible donde tu operación la necesita.
                </h1>

                <p className="ecoflow-hero-desc">
                  Estaciones portátiles, generación solar y soluciones de respaldo para trabajo de campo, hogares, empresas e instituciones, con asesoría y soporte local en Perú.
                </p>

                <div className="ecoflow-hero-ctas">
                  <a 
                    href={whatsappHeroUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-amber hero-primary-btn"
                  >
                    <span>Encontrar mi solución</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>

                  <a 
                    href="#aplicaciones-ecoflow" 
                    onClick={(e) => scrollToSection(e, 'aplicaciones-ecoflow')}
                    className="btn btn-secondary hero-secondary-btn"
                  >
                    <span>Explorar aplicaciones</span>
                  </a>
                </div>

                <div className="hero-trust-highlights">
                  <div className="highlight-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-svg"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Respaldo oficial CR Tech</span>
                  </div>
                  <div className="highlight-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-svg"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Dimensionamiento exacto</span>
                  </div>
                  <div className="highlight-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-svg"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Soporte técnico local</span>
                  </div>
                </div>
              </div>

              {/* Visual Composition Column: SOL -> ALMACENAMIENTO -> OPERACIÓN */}
              <div className="ecoflow-hero-visual-col">
                <div className="energy-flow-visual-card">
                  
                  {/* Subtle connecting curve vector */}
                  <svg className="energy-flow-line-svg" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M 60 70 Q 250 20 420 180 T 120 310" 
                      stroke="url(#solar-amber-gradient)" 
                      strokeWidth="2.5" 
                      strokeDasharray="6 6" 
                    />
                    <defs>
                      <linearGradient id="solar-amber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="50%" stopColor="#0284C7" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Stage 1: Solar Panel (Generación) */}
                  <div className="visual-stage-node stage-generation">
                    <div className="stage-badge amber">1. GENERACIÓN</div>
                    <img 
                      src={assets.ecoFlow.solarPanels} 
                      alt="Paneles Solares EcoFlow" 
                      className="stage-img img-solar"
                      loading="eager"
                    />
                    <span className="stage-label">Paneles Solares</span>
                  </div>

                  {/* Stage 2: EcoFlow Station (Almacenamiento - Protagonist) */}
                  <div className="visual-stage-node stage-storage protagonist">
                    <div className="stage-badge blue">2. ALMACENAMIENTO</div>
                    <img 
                      src={assets.ecoFlow.deltaPro} 
                      alt="Estación EcoFlow Delta Pro" 
                      className="stage-img img-station"
                      loading="eager"
                    />
                    <span className="stage-label">Estaciones LFP Delta Pro</span>
                  </div>

                  {/* Stage 3: Active Device (Consumo / Operación) */}
                  <div className="visual-stage-node stage-operation">
                    <div className="stage-badge green">3. OPERACIÓN</div>
                    <img 
                      src={assets.ecoFlow.airConditioner} 
                      alt="Equipos en operación EcoFlow" 
                      className="stage-img img-device"
                      loading="eager"
                    />
                    <span className="stage-label">Equipos e Instrumentos</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. FRANJA DE CONFIANZA */}
        <section className="ecoflow-trust-strip">
          <div className="section-container">
            <div className="trust-strip-grid">
              
              <div className="trust-strip-item">
                <div className="trust-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="trust-icon">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="trust-text">
                  <h3 className="trust-title">Representante Oficial EcoFlow en Perú</h3>
                  <p className="trust-desc">Garantía directa de origen, equipos originales y respaldo de marca institucional.</p>
                </div>
              </div>

              <div className="trust-strip-item">
                <div className="trust-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="trust-icon">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <div className="trust-text">
                  <h3 className="trust-title">Asesoría para Dimensionar la Solución</h3>
                  <p className="trust-desc">Cálculo de consumo en Watts, picos de arranque y tiempo de autonomía requerido.</p>
                </div>
              </div>

              <div className="trust-strip-item">
                <div className="trust-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="trust-icon">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="trust-text">
                  <h3 className="trust-title">Soporte Técnico y Atención Local</h3>
                  <p className="trust-desc">Orientación para la puesta en marcha, mantenimiento y soporte posventa en Perú.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. ECOSISTEMA ENERGÉTICO */}
        <section className="ecoflow-ecosystem-section">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">UN SISTEMA, NO UN EQUIPO AISLADO</span>
              <h2 className="section-title">
                De la luz solar a una operación que continúa.
              </h2>
              <p className="section-subtitle">
                EcoFlow integra generación, almacenamiento y consumo de energía en una solución adaptable al lugar, la demanda y el tiempo de autonomía requerido.
              </p>
            </div>

            {/* Visual Stream Sequence */}
            <div className="ecosystem-flow-container">
              
              <div className="flow-step-card">
                <div className="flow-step-header">
                  <span className="step-number">01</span>
                  <span className="step-tag tag-amber">Generación</span>
                </div>
                <div className="flow-step-media">
                  <img 
                    src={assets.ecoFlow.solarPanels2} 
                    alt="Generación con paneles solares EcoFlow" 
                    className="flow-img"
                    loading="lazy"
                  />
                </div>
                <div className="flow-step-body">
                  <h3 className="step-heading">Paneles Solares</h3>
                  <p className="step-text">
                    Captura limpia mediante paneles portátiles o rígidos monocristalinos con tasa de conversión de hasta el 23%.
                  </p>
                </div>
              </div>

              <div className="flow-connector-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>

              <div className="flow-step-card feature-step">
                <div className="flow-step-header">
                  <span className="step-number">02</span>
                  <span className="step-tag tag-blue">Almacenamiento</span>
                </div>
                <div className="flow-step-media">
                  <img 
                    src={assets.ecoFlow.deltaPro} 
                    alt="Almacenamiento en estación portatil EcoFlow Delta Pro" 
                    className="flow-img"
                    loading="lazy"
                  />
                </div>
                <div className="flow-step-body">
                  <h3 className="step-heading">Estaciones Portátiles</h3>
                  <p className="step-text">
                    Baterías de química LiFePO4 de larga vida (hasta 3,500 ciclos) con recarga ultra-rápida X-Stream y gestión inteligente BMS.
                  </p>
                </div>
              </div>

              <div className="flow-connector-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>

              <div className="flow-step-card">
                <div className="flow-step-header">
                  <span className="step-number">03</span>
                  <span className="step-tag tag-green">Consumo</span>
                </div>
                <div className="flow-step-media">
                  <img 
                    src={assets.ecoFlow.powerStream} 
                    alt="Suministro y consumo operativo EcoFlow PowerStream" 
                    className="flow-img"
                    loading="lazy"
                  />
                </div>
                <div className="flow-step-body">
                  <h3 className="step-heading">Suministro Operativo</h3>
                  <p className="step-text">
                    Alimentación estable para herramientas, servidores, iluminación, sensores, refrigeración y cargas esenciales sin interrupciones.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. APLICACIONES DE ENERGÍA */}
        <section className="ecoflow-applications-section" id="aplicaciones-ecoflow">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">ENERGÍA APLICADA</span>
              <h2 className="section-title">
                Diseñada para seguir funcionando cuando la red no está disponible.
              </h2>
              <p className="section-subtitle">
                Estructurada para responder a las exigencias térmicas, operativas e infraestructurales de diversos sectores en el país.
              </p>
            </div>

            <div className="app-cards-grid">
              
              <div className="app-card">
                <div className="app-card-icon-bar">
                  <span className="app-num">01</span>
                  <div className="app-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                </div>
                <h3 className="app-card-title">Trabajo de campo y operaciones profesionales</h3>
                <p className="app-card-desc">
                  Energía confiable para ingeniería, geología, producción audiovisual, medición, rescate y operaciones técnicas en ubicaciones sin red eléctrica.
                </p>
              </div>

              <div className="app-card">
                <div className="app-card-icon-bar">
                  <span className="app-num">02</span>
                  <div className="app-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  </div>
                </div>
                <h3 className="app-card-title">Respaldo ante cortes y situaciones de emergencia</h3>
                <p className="app-card-desc">
                  Conmutación de respaldo para mantener la iluminación, refrigeración indispensable, bombas y enlaces de comunicación ante fallas eléctricas.
                </p>
              </div>

              <div className="app-card">
                <div className="app-card-icon-bar">
                  <span className="app-num">03</span>
                  <div className="app-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  </div>
                </div>
                <h3 className="app-card-title">Continuidad para hogares, oficinas y pequeños negocios</h3>
                <p className="app-card-desc">
                  Suministro constante para computadoras, routers, servidores ligeros, puntos de venta (POS) y electrodomésticos clave en entornos urbanos y rurales.
                </p>
              </div>

              <div className="app-card">
                <div className="app-card-icon-bar">
                  <span className="app-num">04</span>
                  <div className="app-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                  </div>
                </div>
                <h3 className="app-card-title">Movilidad, actividades exteriores y campamentos</h3>
                <p className="app-card-desc">
                  Sistemas compactos y silenciosos de fácil transporte para vehículos de expedición, talleres móviles y estancias prolongadas al aire libre.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 6. FAMILIAS DE SOLUCIONES */}
        <section className="ecoflow-families-section" id="familias-ecoflow">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">UNA SOLUCIÓN PARA CADA NIVEL DE DEMANDA</span>
              <h2 className="section-title">
                Desde cargas esenciales hasta operaciones de mayor consumo.
              </h2>
              <p className="section-subtitle">
                Gamas de productos adaptadas según la movilidad, potencia nominal y energía acumulable requerida.
              </p>
            </div>

            <div className="families-grid">
              
              {/* Family 1: RIVER */}
              <div className="family-card">
                <div className="family-badge amber">SERIE RIVER</div>
                <div className="family-media-box">
                  <img 
                    src={assets.ecoFlow.river2} 
                    alt="EcoFlow Serie RIVER para cargas esenciales" 
                    className="family-img"
                    loading="lazy"
                  />
                </div>
                <div className="family-content">
                  <h3 className="family-title">RIVER — Movilidad y cargas esenciales</h3>
                  <p className="family-desc">
                    Soluciones compactas para iluminación, comunicaciones, computadoras, carga de equipos y trabajo móvil.
                  </p>
                  <ul className="family-highlights">
                    <li>Designación ultraligera para fácil transporte manual</li>
                    <li>Recarga ultra-rápida de 0 a 100% en 60 minutos</li>
                    <li>Baterías LFP con más de 3,000 ciclos de vida útil</li>
                  </ul>
                  <a 
                    href={`https://wa.me/51991664146?text=${encodeURIComponent('Hola CR Tech, deseo consultar una configuración con EcoFlow RIVER.')}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="family-cta-link"
                  >
                    <span>Consultar configuración por WhatsApp</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="link-arrow"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </div>

              {/* Family 2: DELTA */}
              <div className="family-card featured-family">
                <div className="family-badge blue">SERIE DELTA</div>
                <div className="family-media-box">
                  <img 
                    src={assets.ecoFlow.deltaPro} 
                    alt="EcoFlow Serie DELTA para alto rendimiento" 
                    className="family-img"
                    loading="lazy"
                  />
                </div>
                <div className="family-content">
                  <h3 className="family-title">DELTA — Respaldo y mayor capacidad</h3>
                  <p className="family-desc">
                    Estaciones diseñadas para herramientas, equipos profesionales, respaldo doméstico y operaciones con mayores exigencias de potencia.
                  </p>
                  <ul className="family-highlights">
                    <li>Capacidad expandible mediante baterías inteligentes extra</li>
                    <li>Inversor de onda senoidal pura de alto amperaje</li>
                    <li>Conmutación rápida para respaldo automático de red</li>
                  </ul>
                  <a 
                    href={`https://wa.me/51991664146?text=${encodeURIComponent('Hola CR Tech, deseo consultar una configuración con EcoFlow DELTA.')}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="family-cta-link"
                  >
                    <span>Consultar configuración por WhatsApp</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="link-arrow"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </div>

              {/* Family 3: SOLAR Y ECOSISTEMA */}
              <div className="family-card">
                <div className="family-badge green">ECOSISTEMA SOLAR</div>
                <div className="family-media-box">
                  <img 
                    src={assets.ecoFlow.powerStream} 
                    alt="Paneles solares y accesorios EcoFlow" 
                    className="family-img"
                    loading="lazy"
                  />
                </div>
                <div className="family-content">
                  <h3 className="family-title">Solar y Ecosistema Inteligente</h3>
                  <p className="family-desc">
                    Paneles, sistemas PowerStream y dispositivos complementarios para generar, administrar y aprovechar la energía de manera flexible.
                  </p>
                  <ul className="family-highlights">
                    <li>Paneles solares plegables e impermeables IP68</li>
                    <li>Inversores micro-grid PowerStream para autoconsumo</li>
                    <li>Acondicionamiento y accesorios de integración</li>
                  </ul>
                  <a 
                    href={`https://wa.me/51991664146?text=${encodeURIComponent('Hola CR Tech, deseo consultar sobre paneles solares y ecosistema EcoFlow.')}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="family-cta-link"
                  >
                    <span>Consultar configuración por WhatsApp</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="link-arrow"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. TECNOLOGÍAS ECOFLOW */}
        <section className="ecoflow-tech-section" id="tecnologia-ecoflow">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">ENERGÍA GESTIONADA CON INTELIGENCIA</span>
              <h2 className="section-title">
                Carga, rendimiento y control desde un mismo ecosistema.
              </h2>
              <p className="section-subtitle">
                Arquitectura de ingeniería orientada a proteger la vida útil de las baterías y maximizar la eficiencia en campo.
              </p>
            </div>

            <div className="tech-pillars-grid">
              
              <div className="tech-pillar-card">
                <div className="pillar-num">01</div>
                <h3 className="pillar-title">X-Stream Technology</h3>
                <p className="pillar-desc">
                  Sistema de recarga directa desde la red de corriente alterna sin adaptadores pesados. Permite cargar la estación hasta un 80% en aproximadamente 50 minutos.
                </p>
              </div>

              <div className="tech-pillar-card">
                <div className="pillar-num">02</div>
                <h3 className="pillar-title">X-Boost Management</h3>
                <p className="pillar-desc">
                  Algoritmo inteligente de gestión de voltaje que permite alimentar cargas de alta demanda resistiva que superan la potencia salida nominal del equipo.
                </p>
              </div>

              <div className="tech-pillar-card">
                <div className="pillar-num">03</div>
                <h3 className="pillar-title">BMS (Battery Management System)</h3>
                <p className="pillar-desc">
                  Supervisión constante de voltaje, corriente y temperatura. Mantiene el balance dinámico de las celdas LiFePO4 garantizando una vida útil prolongada.
                </p>
              </div>

              <div className="tech-pillar-card">
                <div className="pillar-num">04</div>
                <h3 className="pillar-title">Aplicación EcoFlow</h3>
                <p className="pillar-desc">
                  Control remoto mediante Wi-Fi o Bluetooth para verificar niveles de consumo, ajustar velocidades de carga, automatizar salidas y monitorear la entrada solar.
                </p>
              </div>

            </div>

            <p className="tech-disclaimer text-center">
              * Las funciones, compatibilidad y rendimiento varían según el modelo y la configuración seleccionada.
            </p>
          </div>
        </section>

        {/* 8. MÉTODOS DE RECARGA */}
        <section className="ecoflow-recharge-section">
          <div className="section-container">
            <div className="section-header text-center">
              <h2 className="section-title">
                Recarga donde estés.
              </h2>
              <p className="section-subtitle">
                Cuatro alternativas de entrada de energía para mantener tu estación lista en cualquier escenario.
              </p>
            </div>

            <div className="recharge-sequence">
              
              <div className="recharge-item">
                <div className="recharge-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                </div>
                <h3 className="recharge-name">1. Energía solar</h3>
                <p className="recharge-desc">Mediante paneles portátiles o instalados para autoconsumo limpio en campo.</p>
              </div>

              <div className="recharge-divider" aria-hidden="true"></div>

              <div className="recharge-item">
                <div className="recharge-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <h3 className="recharge-name">2. Toma de corriente</h3>
                <p className="recharge-desc">Recarga ultra-rápida desde cualquier enchufe de pared convencional.</p>
              </div>

              <div className="recharge-divider" aria-hidden="true"></div>

              <div className="recharge-item">
                <div className="recharge-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                </div>
                <h3 className="recharge-name">3. Vehículo</h3>
                <p className="recharge-desc">Recarga continua conectada a la toma de 12V/24V de tu automóvil o camión.</p>
              </div>

              <div className="recharge-divider" aria-hidden="true"></div>

              <div className="recharge-item">
                <div className="recharge-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <h3 className="recharge-name">4. Generador EcoFlow</h3>
                <p className="recharge-desc">Integración directa con generadores inteligentes para autonomías prolongadas.</p>
              </div>

            </div>
          </div>
        </section>

        {/* 9. ASESORÍA Y SOPORTE LOCAL */}
        <section className="ecoflow-support-section" id="soporte-ecoflow">
          <div className="section-container">
            <div className="support-banner-grid">
              
              <div className="support-info-col">
                <span className="section-eyebrow">RESPALDO OFICIAL EN PERÚ</span>
                <h2 className="section-title text-left">
                  No necesitas elegir por potencia solamente.
                </h2>
                <p className="section-subtitle text-left">
                  Evaluamos los equipos que deseas alimentar, el consumo en Watts, el tiempo de autonomía y las condiciones del entorno para recomendar una configuración adecuada.
                </p>

                <div className="support-benefits-list">
                  <div className="benefit-row">
                    <div className="benefit-check">✓</div>
                    <span>Dimensionamiento según el consumo de tu operación</span>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-check">✓</div>
                    <span>Configuración exacta de estación, baterías extra y paneles</span>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-check">✓</div>
                    <span>Orientación de uso, instalación y puesta en marcha</span>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-check">✓</div>
                    <span>Garantía y atención técnica directa en Perú con CR Tech</span>
                  </div>
                </div>
              </div>

              {/* Side Card: Direct Specialist Contact */}
              <div className="support-card-col">
                <div className="specialist-contact-card">
                  <div className="card-badge">ASESORÍA OFICIAL</div>
                  <h3 className="card-heading">Cuéntanos qué necesitas mantener activo.</h3>
                  <p className="card-text">
                    Un especialista técnico de CR Tech revisará las especificaciones de tus equipos y te sugerirá el kit EcoFlow óptimo.
                  </p>
                  
                  <a 
                    href={whatsappExpertUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-amber w-full text-center expert-btn"
                  >
                    <span>Hablar con un especialista</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>

                  <span className="response-time-note">
                    Atención inmediata vía WhatsApp | CR Tech Perú
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 10. CTA FINAL */}
        <section className="ecoflow-final-cta-section">
          <div className="section-container">
            <div className="ecoflow-final-cta-card">
              <h2 className="final-cta-title">
                Convierte la energía disponible en continuidad operativa.
              </h2>
              <p className="final-cta-desc">
                Cuéntanos qué equipos necesitas alimentar y durante cuánto tiempo. Te asesoramos con la configuración oficial EcoFlow en Perú.
              </p>
              <div className="final-cta-btn-wrap">
                <a 
                  href={whatsappFinalCtaUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-amber final-cta-btn"
                >
                  <span>Solicitar asesoría EcoFlow</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 11. FOOTER DEDICADO ECOFLOW */}
      <footer className="ecoflow-footer">
        <div className="footer-container">
          <div className="ecoflow-footer-main">
            
            <div className="footer-brand-col">
              <img 
                src={assets.logos.lightBack} 
                alt="CR Technologies & Services" 
                className="footer-logo"
              />
              <p className="footer-brand-desc">
                CR Technologies & Services es representante e integrador oficial de soluciones de energía portátil y solar EcoFlow en Perú.
              </p>
              <div className="footer-whatsapp-badge">
                <span className="wa-label">Atención y Soporte:</span>
                <span className="wa-num">{assets.contact.whatsappNumber}</span>
              </div>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">EcoFlow Perú</h4>
              <ul className="footer-links">
                <li><a href="#aplicaciones-ecoflow" onClick={(e) => scrollToSection(e, 'aplicaciones-ecoflow')}>Aplicaciones</a></li>
                <li><a href="#familias-ecoflow" onClick={(e) => scrollToSection(e, 'familias-ecoflow')}>Soluciones</a></li>
                <li><a href="#tecnologia-ecoflow" onClick={(e) => scrollToSection(e, 'tecnologia-ecoflow')}>Tecnología</a></li>
                <li><a href="#soporte-ecoflow" onClick={(e) => scrollToSection(e, 'soporte-ecoflow')}>Soporte Local</a></li>
                <li><a href="#/">← Volver a CRTech Home</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Otras Divisiones</h4>
              <ul className="footer-links">
                <li><a href="#/drones">Drones / SwellPro Perú</a></li>
                <li><a href="#/">Servicios TI e Infraestructura</a></li>
                <li><a href="#/">CR Tech Principal</a></li>
              </ul>
            </div>

          </div>

          <div className="ecoflow-footer-bottom">
            <p>© {new Date().getFullYear()} CR Technologies & Services E.I.R.L. Todos los derechos reservados. Representación Autorizada EcoFlow Perú.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
