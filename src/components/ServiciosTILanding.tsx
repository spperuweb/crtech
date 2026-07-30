import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';
import Header from './Header';

gsap.registerPlugin(ScrollTrigger);

interface NetworkNode {
  id: string;
  label: string;
  type: string;
  connections: string[];
}

export default function ServiciosTILanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedArea, setSelectedArea] = useState<string>('Redes y conectividad');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeHeroCard, setActiveHeroCard] = useState<number>(1); // Default to card 02 OPERACIÓN

  const heroCards = [
    {
      id: 0,
      num: '01',
      category: 'CONECTIVIDAD',
      shortTab: 'Redes y conectividad',
      tag: '01 · CONECTIVIDAD',
      title: 'Redes Corporativas & Fibra Óptica',
      bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      dotColor: '#38BDF8',
      chips: ['Cableado Cat6A/7', 'Fibra Dedicada', 'Wi-Fi 6 Empresarial'],
      areaName: 'Redes y conectividad'
    },
    {
      id: 1,
      num: '02',
      category: 'OPERACIÓN',
      shortTab: 'Soporte TI',
      tag: '02 · OPERACIÓN',
      title: 'Soporte TI & Mesa de Ayuda',
      bgImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
      dotColor: '#818CF8',
      chips: ['Asistencia 24/7', 'Preventivo', 'Remoto / Sitio'],
      areaName: 'Soporte TI y mantenimiento'
    },
    {
      id: 2,
      num: '03',
      category: 'SEGURIDAD',
      shortTab: 'Videovigilancia',
      tag: '03 · SEGURIDAD',
      title: 'Videovigilancia IP & Monitoreo',
      bgImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      dotColor: '#34D399',
      chips: ['Cámaras IP 4K', 'NVR Central', 'App Móvil'],
      areaName: 'Videovigilancia y monitoreo'
    },
    {
      id: 3,
      num: '04',
      category: 'DISPONIBILIDAD',
      shortTab: 'Continuidad y respaldo',
      tag: '04 · DISPONIBILIDAD',
      title: 'Continuidad & Respaldos',
      bgImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      dotColor: '#FBBF24',
      chips: ['Backup Nube / Local', 'WAN Failover', 'Recovery'],
      areaName: 'Continuidad, respaldo y automatización'
    }
  ];

  useEffect(() => {
    // SEO setup for Servicios TI sublanding page
    document.title = 'Servicios TI, Redes y Videovigilancia en Perú | CR Tech';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Infraestructura de redes, soporte TI, videovigilancia y soluciones de continuidad para empresas e instituciones con atención técnica local de CR Technologies & Services.'
      );
    }
  }, []);

  // GSAP kinetic signature & scroll triggers
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. HERO TIMELINE
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTl
          .fromTo('.hero-eyebrow-badge', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
          .fromTo('.ti-hero-title', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, '-=0.35')
          .fromTo('.ti-hero-desc', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
          .fromTo('.ti-hero-ctas', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
          .fromTo('.ti-hero-trust-bar', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.25')
          .fromTo('.ti-hero-status-panel', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

        // 2. FRANJA DE CONFIANZA
        gsap.fromTo(
          '.ti-trust-card',
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.ti-trust-strip',
              start: 'top 85%',
              once: true
            }
          }
        );

        // 3. CARDS SECCIÓN SERVICIOS 2X2
        gsap.fromTo(
          '.ti-grid-service-card',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#servicios',
              start: 'top 80%',
              once: true
            }
          }
        );

        // 4. DIAGRAMA DE IMPACTO OPERATIVO
        gsap.fromTo(
          '.impact-diagram-wrapper',
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.ti-problem-section',
              start: 'top 75%',
              once: true
            }
          }
        );

        // 5. ESCENARIOS EDITORIAL
        gsap.fromTo(
          '.escenario-editorial-item',
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#escenarios',
              start: 'top 80%',
              once: true
            }
          }
        );

        // 6. PROCESO / MÉTODO DE TRABAJO
        gsap.fromTo(
          '.process-step-node',
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#metodo',
              start: 'top 80%',
              once: true
            }
          }
        );

        // 7. FAQ
        gsap.fromTo(
          '.faq-item-card',
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#faq',
              start: 'top 80%',
              once: true
            }
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            '.hero-eyebrow-badge',
            '.ti-hero-title',
            '.ti-hero-desc',
            '.ti-hero-ctas',
            '.ti-hero-trust-bar',
            '.ti-hero-status-panel',
            '.ti-trust-card',
            '.ti-grid-service-card',
            '.impact-diagram-wrapper',
            '.escenario-editorial-item',
            '.process-step-node',
            '.faq-item-card'
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buildWhatsappUrl = (area: string) => {
    const text = `Hola CR Tech, quiero solicitar información sobre Servicios TI.\n\nÁrea de interés: ${area}\n\nDeseo coordinar una evaluación técnica para mi empresa.`;
    return `https://wa.me/51991664146?text=${encodeURIComponent(text)}`;
  };

  const defaultWhatsappUrl = 'https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20t%C3%A9cnico%20de%20infraestructura%20TI.';

  // Dependency graph nodes for Impact section
  const networkNodes: NetworkNode[] = [
    { id: 'internet', label: 'Enlace Internet', type: 'WAN', connections: ['red', 'servidores', 'operacion'] },
    { id: 'red', label: 'Red Core & Switch', type: 'L2/L3', connections: ['servidores', 'camaras', 'acceso', 'equipo', 'operacion'] },
    { id: 'servidores', label: 'Servidores & Datos', type: 'SRV', connections: ['acceso', 'operacion'] },
    { id: 'camaras', label: 'Cámaras IP & NVR', type: 'CCTV', connections: ['operacion'] },
    { id: 'acceso', label: 'Control de Acceso', type: 'SEC', connections: ['operacion'] },
    { id: 'equipo', label: 'Estaciones & Laptops', type: 'ENDPOINT', connections: ['operacion'] },
    { id: 'operacion', label: 'Continuidad Operativa', type: 'CORE', connections: [] },
  ];

  const areaOptions = [
    {
      id: 'redes',
      label: 'Redes y conectividad',
      tag: 'CABLEADO · FIBRA · WI-FI 6',
      description: 'Cableado estructurado Cat6A/7, enlaces de fibra dedicada, switches administrables y redes Wi-Fi empresariales.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="area-icon">
          <rect x="2" y="2" width="6" height="6" rx="1" />
          <rect x="16" y="2" width="6" height="6" rx="1" />
          <rect x="9" y="16" width="6" height="6" rx="1" />
          <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
          <path d="M12 13v3" />
        </svg>
      )
    },
    {
      id: 'soporte',
      label: 'Soporte TI y mantenimiento',
      tag: 'PREVENTIVO · CORRECTIVO · SLA',
      description: 'Mantenimiento preventivo programado, soporte remoto/sitio y gestión de incidencias para equipos y servidores.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="area-icon">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      id: 'videovigilancia',
      label: 'Videovigilancia y monitoreo',
      tag: 'CÁMARAS IP 4K · NVR · APP',
      description: 'Sistemas IP de seguridad electrónica, monitoreo centralizado en tiempo real y resguardo perimetral de accesos.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="area-icon">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      )
    },
    {
      id: 'continuidad',
      label: 'Continuidad, respaldo y automatización',
      tag: 'BACKUP · FAILOVER WAN · MAPAS',
      description: 'Respaldos automáticos en local y nube, conmutación WAN failover y planes de recuperación inmediata ante desastres.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="area-icon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      )
    }
  ];

  const faqItems = [
    {
      q: '¿Qué información necesito para solicitar una evaluación?',
      a: 'Solo requerimos conocer la ubicación de tu sede o planta, cantidad estimada de usuarios o equipos, áreas físicas involucradas y los principales problemas o metas de tu infraestructura.'
    },
    {
      q: '¿La evaluación inicial tiene costo?',
      a: 'La primera toma de requerimientos y orientación técnica inicial es sin costo para empresas e instituciones. Si se requiere un levantamiento físico de red exhaustivo, te enviaremos una propuesta formal previa.'
    },
    {
      q: '¿Qué tipo de empresas atiende CR Tech?',
      a: 'Atendemos a medianas empresas, corporativos, centros logísticos, almacenes, plantas industriales, clínicas e instituciones en Lima y regiones de Perú que requieren continuidad y seguridad operacional.'
    },
    {
      q: '¿Pueden trabajar con infraestructura ya instalada?',
      a: 'Sí. Auditamos tu infraestructura actual, diagnosticamos el estado del cableado, switches o cámaras existentes y proponemos un plan de repotenciación u optimización reutilizando lo que sea funcional.'
    },
    {
      q: '¿El servicio puede ser remoto o presencial?',
      a: 'Ambos. Combinamos monitoreo y soporte remoto de respuesta inmediata para incidencias lógicas con visitas técnicas presenciales en sitio para mantenimientos físicos y atención de hardware.'
    },
    {
      q: '¿CR Tech suministra también los equipos?',
      a: 'Sí. Somos distribuidores e integradores directos de marcas líderes en networking (Ubiquiti, Cisco, Mikrotik), videovigilancia (Hikvision, Dahua) y protección eléctrica/respaldos.'
    }
  ];

  return (
    <div className="servicios-ti-wrapper" ref={containerRef}>
      {/* 1. HEADER UNIFICADO */}
      <Header currentRoute="servicios-ti" />

      <main id="servicios-ti-main">
        {/* 2. BRAND NAVY HERO SECTION */}
        <section className="ti-hero-section ti-hero-custom-bg">
          <div className="ti-hero-wide-container">
            <div className="ti-hero-grid">
              <div className="ti-hero-content-col">
                <div className="hero-eyebrow-pill">
                  <span className="live-dot-cyan"></span> SERVICIOS TI · INFRAESTRUCTURA & SOPORTE CORPORATIVO
                </div>
                <h1 className="ti-hero-title">
                  Tecnología que permanece disponible cuando tu operación no puede detenerse.
                </h1>
                <p className="ti-hero-desc">
                  Diseñamos e implementamos infraestructura de redes, soporte técnico, videovigilancia y continuidad operativa para empresas e instituciones en todo el Perú.
                </p>

                <div className="ti-hero-ctas">
                  <a 
                    href="#servicios" 
                    onClick={(e) => scrollToSection(e, 'servicios')} 
                    className="btn btn-primary btn-lg hero-btn-blue"
                  >
                    Explorar servicios TI
                  </a>
                  <a 
                    href={defaultWhatsappUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary btn-lg hero-btn-dark"
                  >
                    Solicitar evaluación técnica
                  </a>
                </div>

                <div className="ti-hero-trust-bar">
                  <span className="trust-item"><span className="trust-dot"></span> Diagnóstico técnico de sitio</span>
                  <span className="trust-item"><span className="trust-dot"></span> Implementación documentada</span>
                  <span className="trust-item"><span className="trust-dot"></span> Acompañamiento y soporte local</span>
                </div>
              </div>

              {/* Right Column: Interactive Deck (Desktop) / Tabs + Single Card (Mobile) */}
              <div className="ti-hero-visual-col">
                {/* Mobile Service Selector (<768px) */}
                <div className="ti-mobile-hero-selector">
                  <div className="ti-mobile-tabs-container" role="tablist" aria-label="Seleccionar vertical TI">
                    {heroCards.map((card) => {
                      const isSelected = activeHeroCard === card.id;
                      return (
                        <button
                          key={card.id}
                          type="button"
                          role="tab"
                          id={`ti-hero-tab-${card.id}`}
                          aria-selected={isSelected}
                          aria-controls={`ti-hero-panel-${card.id}`}
                          className={`ti-mobile-tab-btn ${isSelected ? 'is-active' : ''}`}
                          onClick={() => setActiveHeroCard(card.id)}
                        >
                          <span className="tab-dot" style={{ backgroundColor: card.dotColor }} />
                          <span className="tab-text">{card.shortTab}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Single Active Card on Mobile */}
                  {heroCards.map((card) => {
                    if (activeHeroCard !== card.id) return null;

                    return (
                      <div 
                        key={card.id} 
                        id={`ti-hero-panel-${card.id}`}
                        role="tabpanel"
                        aria-labelledby={`ti-hero-tab-${card.id}`}
                        className="ti-mobile-active-card"
                      >
                        <div 
                          className="ti-mobile-card-bg"
                          style={{ backgroundImage: `url(${card.bgImage})` }}
                        />
                        <div className="ti-mobile-card-overlay" />

                        <div className="ti-mobile-card-content">
                          <div className="ti-mobile-card-header">
                            <span className="deck-tag-pill">{card.tag}</span>
                            <span className="deck-status-pill">
                              <span className="status-dot-active" style={{ backgroundColor: card.dotColor, boxShadow: `0 0 8px ${card.dotColor}` }}></span>
                              ACTIVO
                            </span>
                          </div>

                          <div className="ti-mobile-card-body">
                            <h2 className="ti-mobile-card-title">{card.title}</h2>
                            <div className="deck-chips-row">
                              {card.chips.map((chip, idx) => (
                                <span key={idx} className="deck-chip-item">
                                  <span className="chip-bullet" style={{ backgroundColor: card.dotColor }}></span>
                                  {chip}
                                </span>
                              ))}
                            </div>
                            <a 
                              href={buildWhatsappUrl(card.areaName)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary btn-md ti-mobile-card-cta"
                            >
                              Consultar por {card.shortTab} →
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop Accordion Deck (>=768px) */}
                <div className="hero-accordion-deck ti-desktop-accordion-deck">
                  {heroCards.map((card) => {
                    const isExpanded = activeHeroCard === card.id;

                    return (
                      <div
                        key={card.id}
                        className={`hero-deck-card ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
                        onClick={() => setActiveHeroCard(card.id)}
                        onMouseEnter={() => setActiveHeroCard(card.id)}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                      >
                        {/* Background Image Layer */}
                        <div 
                          className="deck-bg-image"
                          style={{ backgroundImage: `url(${card.bgImage})` }}
                        />
                        <div className="deck-overlay" />

                        {isExpanded ? (
                          /* EXPANDED CARD LAYOUT */
                          <div className="deck-expanded-content">
                            <div className="deck-expanded-top">
                              <span className="deck-tag-pill">{card.tag}</span>
                              <span className="deck-status-pill">
                                <span className="status-dot-active" style={{ backgroundColor: card.dotColor, boxShadow: `0 0 8px ${card.dotColor}` }}></span>
                                ACTIVO
                              </span>
                            </div>

                            <div className="deck-expanded-bottom">
                              <h2 className="deck-card-title">{card.title}</h2>
                              <div className="deck-chips-row">
                                {card.chips.map((chip, idx) => (
                                  <span key={idx} className="deck-chip-item">
                                    <span className="chip-bullet" style={{ backgroundColor: card.dotColor }}></span>
                                    {chip}
                                  </span>
                                ))}
                              </div>
                              <a 
                                href={buildWhatsappUrl(card.areaName)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="deck-action-btn"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Consultar →
                              </a>
                            </div>
                          </div>
                        ) : (
                          /* COLLAPSED VERTICAL BAR LAYOUT */
                          <div className="deck-collapsed-content">
                            <span className="collapsed-num" style={{ color: card.dotColor }}>{card.num}</span>
                            <span className="collapsed-title">{card.category}</span>
                            <div className="collapsed-dot-wrap">
                              <span className="collapsed-dot" style={{ backgroundColor: card.dotColor, boxShadow: `0 0 8px ${card.dotColor}` }}></span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SECCIÓN 2X2 ASIMÉTRICA DE SERVICIOS */}
        <section className="ti-stacked-services-section" id="servicios">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">CAPACIDADES TÉCNICAS B2B</span>
              <h2 className="section-title">Infraestructura y servicios integrados en 4 pilares.</h2>
              <p className="section-desc max-w-3xl">
                Soluciones integradas para que tu negocio opere con velocidad, seguridad y respaldo permanente.
              </p>
            </div>

            <div className="ti-services-grid-2x2">
              {/* Card 1: Prominente (Redes) */}
              <div className="ti-grid-service-card card-theme-cyan card-prominent">
                <div className="grid-card-header">
                  <div className="grid-index-wrap">
                    <span className="grid-num num-cyan">01</span>
                    <span className="grid-badge badge-cyan">CONECTIVIDAD & BASE</span>
                  </div>
                  <div className="grid-icon-circle circle-cyan">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="grid-svg">
                      <rect x="2" y="2" width="6" height="6" rx="1" />
                      <rect x="16" y="2" width="6" height="6" rx="1" />
                      <rect x="9" y="16" width="6" height="6" rx="1" />
                      <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
                      <path d="M12 13v3" />
                    </svg>
                  </div>
                </div>

                <div className="grid-card-body">
                  <h3 className="grid-card-title">Redes Corporativas, Cableado & Fibra Óptica</h3>
                  <p className="grid-card-desc">
                    Diseño, instalación y certificación de infraestructura de red física e inalámbrica. Transmisión fluida y estable entre sedes, oficinas y almacenes.
                  </p>

                  <div className="grid-specs-tags">
                    <span className="grid-spec-pill"><span className="spec-dot dot-cyan"></span> Cableado Cat6A / Cat7</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-cyan"></span> Enlaces de Fibra Dedicada</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-cyan"></span> Wi-Fi 6 Empresarial</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-cyan"></span> Firewalls & Switches</span>
                  </div>
                </div>

                <div className="grid-card-footer">
                  <a 
                    href="#asesoria" 
                    onClick={(e) => { setSelectedArea('Redes y conectividad'); scrollToSection(e, 'asesoria'); }}
                    className="grid-details-link"
                  >
                    Ver alcance →
                  </a>
                  <a 
                    href={buildWhatsappUrl('Redes y conectividad')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-sm btn-cyan"
                  >
                    Consultar →
                  </a>
                </div>
              </div>

              {/* Card 2: Operación (Soporte) */}
              <div className="ti-grid-service-card card-theme-violet">
                <div className="grid-card-header">
                  <div className="grid-index-wrap">
                    <span className="grid-num num-violet">02</span>
                    <span className="grid-badge badge-violet">OPERACIÓN CONTINUA</span>
                  </div>
                  <div className="grid-icon-circle circle-violet">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="grid-svg">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                </div>

                <div className="grid-card-body">
                  <h3 className="grid-card-title">Soporte TI Continuo & Mantenimiento</h3>
                  <p className="grid-card-desc">
                    Atención técnica remota y presencial para resolver incidencias en estaciones de trabajo y servidores antes de que frenen la productividad.
                  </p>

                  <div className="grid-specs-tags">
                    <span className="grid-spec-pill"><span className="spec-dot dot-violet"></span> Mantenimiento Preventivo</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-violet"></span> Asistencia Correctiva SLA</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-violet"></span> Mesa de Ayuda Remota/Sitio</span>
                  </div>
                </div>

                <div className="grid-card-footer">
                  <a 
                    href="#asesoria" 
                    onClick={(e) => { setSelectedArea('Soporte TI y mantenimiento'); scrollToSection(e, 'asesoria'); }}
                    className="grid-details-link"
                  >
                    Ver alcance →
                  </a>
                  <a 
                    href={buildWhatsappUrl('Soporte TI y mantenimiento')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-sm btn-violet"
                  >
                    Consultar →
                  </a>
                </div>
              </div>

              {/* Card 3: Seguridad (Videovigilancia) */}
              <div className="ti-grid-service-card card-theme-emerald">
                <div className="grid-card-header">
                  <div className="grid-index-wrap">
                    <span className="grid-num num-emerald">03</span>
                    <span className="grid-badge badge-emerald">MONITOREO & SEGURIDAD</span>
                  </div>
                  <div className="grid-icon-circle circle-emerald">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="grid-svg">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                </div>

                <div className="grid-card-body">
                  <h3 className="grid-card-title">Videovigilancia IP & Monitoreo Central</h3>
                  <p className="grid-card-desc">
                    Sistemas de seguridad electrónica integrados a tu red local. Visibilidad en tiempo real de accesos, almacenes, zonas críticas y plantas.
                  </p>

                  <div className="grid-specs-tags">
                    <span className="grid-spec-pill"><span className="spec-dot dot-emerald"></span> Cámaras IP 4K HD Nocturnas</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-emerald"></span> Centro Monitoreo NVR</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-emerald"></span> Control App Móvil</span>
                  </div>
                </div>

                <div className="grid-card-footer">
                  <a 
                    href="#asesoria" 
                    onClick={(e) => { setSelectedArea('Videovigilancia y monitoreo'); scrollToSection(e, 'asesoria'); }}
                    className="grid-details-link"
                  >
                    Ver alcance →
                  </a>
                  <a 
                    href={buildWhatsappUrl('Videovigilancia y monitoreo')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-sm btn-emerald"
                  >
                    Consultar →
                  </a>
                </div>
              </div>

              {/* Card 4: Estratégica de Cierre (Continuidad & Respaldos) */}
              <div className="ti-grid-service-card card-theme-amber card-wide-closure">
                <div className="grid-card-header">
                  <div className="grid-index-wrap">
                    <span className="grid-num num-amber">04</span>
                    <span className="grid-badge badge-amber">ESTRATEGIA & RESPALDO</span>
                  </div>
                  <div className="grid-icon-circle circle-amber">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="grid-svg">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                </div>

                <div className="grid-card-body">
                  <h3 className="grid-card-title">Continuidad Operativa & Respaldos Automáticos</h3>
                  <p className="grid-card-desc">
                    Estrategias de tolerancia a fallas, copias de seguridad automáticas y conmutación WAN failover para proteger la información crítica de la empresa.
                  </p>

                  <div className="grid-specs-tags">
                    <span className="grid-spec-pill"><span className="spec-dot dot-amber"></span> Backup Local & Nube</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-amber"></span> Redundancia WAN Failover</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-amber"></span> Plan de Recuperación Desastres</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-amber"></span> Mapeo de Credenciales</span>
                  </div>
                </div>

                <div className="grid-card-footer">
                  <a 
                    href="#asesoria" 
                    onClick={(e) => { setSelectedArea('Continuidad, respaldo y automatización'); scrollToSection(e, 'asesoria'); }}
                    className="grid-details-link"
                  >
                    Ver alcance →
                  </a>
                  <a 
                    href={buildWhatsappUrl('Continuidad, respaldo y automatización')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-sm btn-amber"
                  >
                    Consultar →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PROBLEMA OPERATIVO CON DIAGRAMA INTERACTIVO DE RED DE DEPENDENCIAS */}
        <section className="ti-problem-section">
          <div className="section-container">
            <div className="impact-two-col-layout">
              <div className="impact-text-col">
                <span className="section-eyebrow">ARQUITECTURA DE DEPENDENCIAS</span>
                <h2 className="section-title">Una falla aislada puede detener mucho más que un equipo.</h2>
                <p className="section-desc">
                  En entornos B2B, la infraestructura opera como una cadena entrelazada. Una caída en el enlace de Internet o un switch de distribución desconfigurado puede cortar las cámaras de seguridad, el servidor de facturación y el acceso de los colaboradores simultáneamente.
                </p>

                <div className="impact-factor-compact-grid">
                  <div className="compact-factor-card">
                    <span className="factor-dot dot-cyan"></span>
                    <div>
                      <strong className="factor-title">Conectividad</strong>
                      <span className="factor-sub">Tráfico y enlace WAN</span>
                    </div>
                  </div>

                  <div className="compact-factor-card">
                    <span className="factor-dot dot-violet"></span>
                    <div>
                      <strong className="factor-title">Operación</strong>
                      <span className="factor-sub">Equipos y servidores</span>
                    </div>
                  </div>

                  <div className="compact-factor-card">
                    <span className="factor-dot dot-emerald"></span>
                    <div>
                      <strong className="factor-title">Seguridad</strong>
                      <span className="factor-sub">Videovigilancia y acceso</span>
                    </div>
                  </div>

                  <div className="compact-factor-card">
                    <span className="factor-dot dot-amber"></span>
                    <div>
                      <strong className="factor-title">Disponibilidad</strong>
                      <span className="factor-sub">Respaldos y contingencia</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Network Dependency Diagram */}
              <div className="impact-diagram-col">
                <div className="impact-diagram-wrapper">
                  <div className="diagram-header">
                    <span className="diagram-title">RED DE DEPENDENCIAS OPERATIVAS</span>
                    <span className="diagram-hint">Pasa el cursor o toca un nodo para ver conexiones</span>
                  </div>

                  <div className="nodes-mesh-container">
                    {networkNodes.map((node) => {
                      const isHovered = activeNode === node.id;
                      const isConnected = activeNode ? networkNodes.find(n => n.id === activeNode)?.connections.includes(node.id) : false;
                      const isMuted = activeNode && !isHovered && !isConnected;

                      return (
                        <div
                          key={node.id}
                          className={`network-node-card node-${node.id} ${isHovered ? 'is-active-node' : ''} ${isConnected ? 'is-connected-node' : ''} ${isMuted ? 'is-muted-node' : ''}`}
                          onMouseEnter={() => setActiveNode(node.id)}
                          onMouseLeave={() => setActiveNode(null)}
                          onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                          tabIndex={0}
                          role="button"
                          aria-label={`Nodo ${node.label}`}
                        >
                          <div className="node-badge-type">{node.type}</div>
                          <div className="node-main-row">
                            <span className="node-status-dot"></span>
                            <span className="node-label-text">{node.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="diagram-micro-legend">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="legend-icon">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span>Una falla local puede escalar a interrupciones de operación, seguridad y comunicación.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. SITUACIONES QUE CONVIENE EVALUAR (Editorial 2-Column List) */}
        <section className="ti-escenarios-section" id="escenarios">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">EVALUACIÓN PREVENTIVA B2B</span>
              <h2 className="section-title">Situaciones que conviene evaluar antes de que afecten la operación.</h2>
              <p className="section-desc max-w-3xl">
                Detección oportuna de cuellos de botella y vulnerabilidades de infraestructura para evitar tiempos muertos en la producción.
              </p>
            </div>

            <div className="escenarios-editorial-list">
              <div className="escenario-editorial-item">
                <span className="item-num">01</span>
                <div className="item-content">
                  <h3 className="item-title">Conectividad irregular o caídas del servicio</h3>
                  <p className="item-desc">Áreas, impresoras o terminales de trabajo que pierden enlace periódicamente o sufren latencia durante horas de alto tráfico.</p>
                </div>
              </div>

              <div className="escenario-editorial-item">
                <span className="item-num">02</span>
                <div className="item-content">
                  <h3 className="item-title">Equipos con incidencias o lentitud recurrente</h3>
                  <p className="item-desc">Estaciones de trabajo o servidores que requieren reinicios frecuentes sin haber recibido mantenimiento preventivo especializado.</p>
                </div>
              </div>

              <div className="escenario-editorial-item">
                <span className="item-num">03</span>
                <div className="item-content">
                  <h3 className="item-title">Puntos ciegos en la videovigilancia de sede</h3>
                  <p className="item-desc">Almacenes, accesos principales o zonas de carga sin cobertura HD continua o con grabadores NVR sin espacio de almacenamiento suficiente.</p>
                </div>
              </div>

              <div className="escenario-editorial-item">
                <span className="item-num">04</span>
                <div className="item-content">
                  <h3 className="item-title">Información crítica sin copias de seguridad automatizadas</h3>
                  <p className="item-desc">Archivos del negocio o bases de datos respaldadas de forma manual en discos externos expuestos a extravío o falla física.</p>
                </div>
              </div>
            </div>

            <div className="escenarios-cta-wrap center">
              <a 
                href={defaultWhatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-lg"
              >
                Evaluar mi infraestructura
              </a>
              <p className="escenarios-microcopy">
                Primera conversación enfocada en entender tu operación y prioridades.
              </p>
            </div>
          </div>
        </section>

        {/* 7. LÍNEA DE PROCESO DE IMPLEMENTACIÓN TÉCNICA */}
        <section className="ti-method-section" id="metodo">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">METODOLOGÍA DE TRABAJO</span>
              <h2 className="section-title">Implementación técnica con un proceso claro.</h2>
              <p className="section-desc max-w-2xl">
                Etapas estructuradas para garantizar entregas en tiempo, con mapa de red y pruebas de esfuerzo en sitio.
              </p>
            </div>

            <div className="process-timeline-wrapper">
              <div className="process-line-track" aria-hidden="true"></div>

              <div className="process-steps-grid">
                <div className="process-step-node">
                  <div className="node-step-circle">01</div>
                  <h3 className="node-title">Diagnóstico</h3>
                  <p className="node-desc">Revisión de requerimientos, entorno físico, carga de usuarios y puntos vulnerables en sitio.</p>
                </div>

                <div className="process-step-node">
                  <div className="node-step-circle">02</div>
                  <h3 className="node-title">Diseño</h3>
                  <p className="node-desc">Definición de topología de red, especificación técnica de componentes y cotización transparente.</p>
                </div>

                <div className="process-step-node">
                  <div className="node-step-circle">03</div>
                  <h3 className="node-title">Implementación</h3>
                  <p className="node-desc">Montaje de cableado, configuración de switches/cámaras, pruebas de carga y documentación de entrega.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ ACCESIBLE */}
        <section className="ti-faq-section" id="faq">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">RESPUESTAS CLARAS</span>
              <h2 className="section-title">Preguntas antes de solicitar una evaluación.</h2>
            </div>

            <div className="faq-accordion-list max-w-3xl">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`faq-item-card ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-trigger-btn"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-ans-${idx}`}
                    >
                      <span className="faq-question-text">{item.q}</span>
                      <span className={`faq-icon-rotator ${isOpen ? 'open' : ''}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                          <line x1="12" y1="5" x2="12" y2="19" className="line-v" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div id={`faq-ans-${idx}`} className="faq-answer-panel">
                        <p className="faq-answer-text">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 9. SELECTOR DE RUTAS COMERCIALES (Consulta Directa) */}
        <section className="ti-asesoria-section" id="asesoria">
          <div className="section-container">
            <div className="asesoria-card-container">
              <div className="section-header center">
                <span className="section-eyebrow">ORIENTACIÓN TÉCNICA DIRECTA</span>
                <h2 className="section-title">Encuentra el punto de partida para tu operación.</h2>
                <p className="section-desc">
                  Indica el área que necesita atención y orientaremos la evaluación técnica.
                </p>
              </div>

              <div className="area-selector-grid">
                {areaOptions.map((opt) => {
                  const isSelected = selectedArea === opt.label;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`area-option-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedArea(opt.label)}
                      aria-pressed={isSelected}
                    >
                      <div className="area-card-header">
                        <div className="area-icon-wrap">{opt.icon}</div>
                        <span className="area-tag-badge">{opt.tag}</span>
                      </div>
                      <h3 className="area-card-title">{opt.label}</h3>
                      <p className="area-card-desc">{opt.description}</p>
                    </button>
                  );
                })}
              </div>

              <div className="asesoria-action-bar">
                <div className="selected-area-summary">
                  <span className="summary-label">Área seleccionada:</span>
                  <strong className="summary-value">{selectedArea}</strong>
                </div>
                <a 
                  href={buildWhatsappUrl(selectedArea)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary btn-lg"
                >
                  Solicitar evaluación por área →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 10. CTA FINAL (Navy Block) */}
        <section className="ti-final-cta-section">
          <div className="section-container center-content">
            <span className="final-eyebrow">INFRAESTRUCTURA QUE RESPALDA TU OPERACIÓN</span>
            <h2 className="final-cta-title">Una operación conectada necesita una infraestructura que pueda sostenerla.</h2>
            <p className="final-cta-desc">
              Conversemos sobre los puntos críticos de tu operación y definamos una solución técnica con prioridades claras.
            </p>
            <div className="final-cta-btn-wrap">
              <a 
                href={buildWhatsappUrl(selectedArea)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-lg final-btn"
              >
                Solicitar evaluación técnica
              </a>
            </div>
            <p className="final-location-note">Atención para empresas y operaciones en Lima, Perú.</p>
          </div>
        </section>
      </main>

      {/* 11. FOOTER BASE */}
      <footer className="site-footer" id="main-footer">
        <div className="footer-container">
          <div className="footer-brand-column">
            <a href="/crtech" aria-label="CR Technologies & Services inicio">
              <img 
                src={assets.logos.darkBack} 
                alt="CR Technologies & Services" 
                className="footer-logo-img"
                loading="lazy"
                width="220"
                height="44"
              />
            </a>
            <p className="footer-brand-desc">
              Soluciones de infraestructura TI, redes corporativas, soporte técnico, videovigilancia y continuidad para empresas e instituciones en Perú.
            </p>
            <div className="footer-legal-details">
              <span className="legal-item"><strong>Razón Social:</strong> CR Technologies & Services E.I.R.L.</span>
              <span className="legal-item"><strong>RUC:</strong> 20615939791</span>
              <span className="legal-item"><strong>Sede:</strong> Lima, Perú</span>
            </div>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-title">Soluciones TI</h4>
            <ul className="footer-links-list">
              <li><a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')}>Capacidades 2x2</a></li>
              <li><a href="#escenarios" onClick={(e) => scrollToSection(e, 'escenarios')}>Evaluación Preventiva</a></li>
              <li><a href="#metodo" onClick={(e) => scrollToSection(e, 'metodo')}>Proceso de Trabajo</a></li>
              <li><a href="#asesoria" onClick={(e) => scrollToSection(e, 'asesoria')}>Contacto por Área</a></li>
            </ul>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-title">Verticales CR Tech</h4>
            <ul className="footer-links-list">
              <li><a href="/crtech/drones">Drones Profesionales</a></li>
              <li><a href="/crtech/energia">Energía Portátil EcoFlow</a></li>
              <li><a href="/crtech/serviciosti">Servicios TI & Redes</a></li>
              <li><a href="/crtech">CRTech Principal</a></li>
            </ul>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-title">Contacto Directo</h4>
            <ul className="footer-links-list contact-list">
              <li>
                <a 
                  href={defaultWhatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-contact-link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="footer-icon">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  +51 991 664 146
                </a>
              </li>
              <li>
                <span className="footer-schedule">
                  Evaluaciones e implementación para empresas en todo el Perú.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-sub-bar">
          <div className="footer-sub-bar-container">
            <p className="copyright-text">
              © {new Date().getFullYear()} CR Technologies & Services E.I.R.L. Todos los derechos reservados.
            </p>
            <div className="tech-meta-row">
              <span>Infraestructura, Redes & Servicios TI • Soluciones Aplicadas en el Perú</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
