import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';
import Header from './Header';

gsap.registerPlugin(ScrollTrigger);

export default function ServiciosTILanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>('Redes e infraestructura');

  // Hero interactive 4-services vertical accordion state
  const [activeHeroCard, setActiveHeroCard] = useState<number>(0);

  // FAQ state (accordion)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
          .fromTo('.ti-hero-trust-highlights .highlight-item', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, '-=0.25')
          .fromTo('.topology-card-wrapper', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
          .fromTo('.topo-node-central', { opacity: 0 }, { opacity: 1, duration: 0.35 }, '-=0.2')
          .fromTo('.topo-path', { opacity: 0 }, { opacity: 1, duration: 0.35, stagger: 0.06 }, '-=0.15')
          .fromTo('.topology-status-pill', { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.1');

        // 2. FRANJA DE CONFIANZA
        gsap.fromTo(
          '.ti-trust-card',
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.ti-trust-strip',
              start: 'top 85%',
              once: true
            }
          }
        );

        // 3. STACKED CARDS SECCIÓN SERVICIOS
        gsap.fromTo(
          '.ti-stacked-service-card',
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

        // 4. ESCENARIOS FRECUENTES
        gsap.fromTo(
          '.escenario-cell',
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#escenarios',
              start: 'top 80%',
              once: true
            }
          }
        );

        // 9. MÉTODO DE TRABAJO
        gsap.fromTo(
          '.method-step-block',
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#metodo',
              start: 'top 80%',
              once: true
            }
          }
        );

        // 10. FAQ
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
            '.highlight-item',
            '.topology-card-wrapper',
            '.ti-trust-card',
            '.ti-stacked-service-card',
            '.escenario-cell',
            '.method-step-block',
            '.faq-item-card'
          ],
          { opacity: 1, y: 0 }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buildWhatsappUrl = (area: string) => {
    const text = `Hola CR Tech, quiero solicitar información sobre Servicios TI.\n\nÁrea de interés: ${area}\n\nDeseo coordinar una evaluación técnica para mi empresa.`;
    return `https://wa.me/51991664146?text=${encodeURIComponent(text)}`;
  };

  const defaultWhatsappUrl = 'https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20evaluar%20la%20infraestructura%20TI%20de%20mi%20empresa.';

  const heroServiceCards = [
    {
      id: 'conectividad',
      num: '01',
      badge: 'CONECTIVIDAD',
      title: 'Redes Corporativas & Fibra',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Cableado Cat6A/7', 'Fibra Óptica', 'Wi-Fi 6'],
      accentColor: '#38BDF8',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
          <rect x="2" y="2" width="6" height="6" rx="1" />
          <rect x="16" y="2" width="6" height="6" rx="1" />
          <rect x="9" y="16" width="6" height="6" rx="1" />
          <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
          <path d="M12 13v3" />
        </svg>
      ),
      waText: 'Hola CR Tech, quiero consultar por Conectividad, Cableado y Redes.'
    },
    {
      id: 'soporte',
      num: '02',
      badge: 'OPERACIÓN',
      title: 'Soporte TI & Mesa de Ayuda',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Asistencia 24/7', 'Preventivo', 'Remoto / Sitio'],
      accentColor: '#818CF8',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      waText: 'Hola CR Tech, quiero evaluar un plan de Soporte TI y Mantenimiento.'
    },
    {
      id: 'seguridad',
      num: '03',
      badge: 'SEGURIDAD',
      title: 'Videovigilancia IP 4K',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Monitoreo HD', 'Control Perimetral', 'App Móvil'],
      accentColor: '#34D399',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
      waText: 'Hola CR Tech, quiero cotizar un sistema de Videovigilancia y Cámaras IP.'
    },
    {
      id: 'continuidad',
      num: '04',
      badge: 'DISPONIBILIDAD',
      title: 'Respaldos & Failover',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Backup Nube', 'Redundancia WAN', 'Recuperación 100%'],
      accentColor: '#FBBF24',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
      waText: 'Hola CR Tech, quiero consultar por Respaldos y Continuidad Operativa.'
    }
  ];

  const areaOptions = [
    {
      id: 'redes',
      label: 'Conectividad & Redes',
      description: 'Cableado estructurado, redes corporativas, fibra óptica, enlaces inalámbricos y seguridad de red.',
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
      label: 'Soporte & Operación',
      description: 'Mantenimiento preventivo, correctivo, diagnóstico técnico y soporte para estaciones de trabajo.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="area-icon">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      id: 'videovigilancia',
      label: 'Videovigilancia & Seguridad',
      description: 'Cámaras IP HD, monitoreo centralizado, almacenamiento local/nube y control perimetral.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="area-icon">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      )
    },
    {
      id: 'continuidad',
      label: 'Disponibilidad & Respaldos',
      description: 'Copias de seguridad, redundancia de red WAN, recuperación inmediata y prevención de fallas.',
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
      q: '¿Pueden revisar una infraestructura que ya está instalada?',
      a: 'Sí. La evaluación inicial permite identificar el estado de la instalación existente y definir qué elementos pueden conservarse, reorganizarse o actualizarse.'
    },
    {
      q: '¿El servicio puede ser remoto o presencial?',
      a: 'Depende del diagnóstico, la ubicación y el tipo de incidencia. Algunas revisiones pueden comenzar de forma remota y otras requieren una visita técnica.'
    },
    {
      q: '¿CR Tech suministra también los equipos?',
      a: 'El alcance puede incluir suministro, configuración e instalación de equipos, según las necesidades y la propuesta aprobada.'
    },
    {
      q: '¿Trabajan redes y videovigilancia dentro del mismo proyecto?',
      a: 'Sí, cuando el alcance lo requiere pueden evaluarse como partes relacionadas de la infraestructura.'
    },
    {
      q: '¿Realizan mantenimiento preventivo?',
      a: 'Puede definirse un alcance de mantenimiento según los equipos, la infraestructura y la frecuencia acordada.'
    },
    {
      q: '¿Qué información se necesita para cotizar?',
      a: 'Conviene conocer la ubicación, cantidad de usuarios, espacios involucrados, equipos existentes y objetivo del proyecto. Una evaluación permite precisar el alcance.'
    }
  ];

  return (
    <div className="servicios-ti-wrapper" ref={containerRef}>
      {/* 1. HEADER UNIFICADO */}
      <Header currentRoute="servicios-ti" />

      <main id="servicios-ti-main">
        {/* 2. PREMIUM WIDE HERO SECTION */}
        <section className="ti-hero-section ti-hero-custom-bg">
          <div className="ti-hero-wide-container">
            <div className="ti-hero-grid">
              <div className="ti-hero-content-col">
                <div className="hero-eyebrow-badge">
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
                    className="btn btn-primary btn-lg hero-main-btn"
                  >
                    Explorar servicios TI
                  </a>
                  <a 
                    href={defaultWhatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary btn-lg hero-wa-btn"
                  >
                    Solicitar evaluación técnica
                  </a>
                </div>

                <div className="ti-hero-trust-highlights">
                  <div className="highlight-item">
                    <span className="check-dot"></span>
                    <span>Diagnóstico técnico de sitio</span>
                  </div>
                  <div className="highlight-item">
                    <span className="check-dot"></span>
                    <span>Implementación documentada</span>
                  </div>
                  <div className="highlight-item">
                    <span className="check-dot"></span>
                    <span>Acompañamiento y soporte local</span>
                  </div>
                </div>
              </div>

              {/* Interactive 4-Services Vertical Capsule Accordion (Image-First Visual Reference Match) */}
              <div className="ti-hero-visual-col">
                <div className="ti-hero-accordion-container">
                  {heroServiceCards.map((card, idx) => {
                    const isExpanded = activeHeroCard === idx;
                    return (
                      <div
                        key={card.id}
                        className={`ti-hero-accordion-card ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
                        style={{
                          borderColor: isExpanded ? card.accentColor : 'rgba(255, 255, 255, 0.2)',
                          boxShadow: isExpanded ? `0 20px 50px ${card.accentColor}35` : 'none'
                        }}
                        onMouseEnter={() => setActiveHeroCard(idx)}
                        onClick={() => setActiveHeroCard(idx)}
                      >
                        {/* Background Reference Image with Gradient Overlay */}
                        <div className="hero-card-bg-img-wrap">
                          <img 
                            src={card.image} 
                            alt={card.title} 
                            className="hero-card-bg-img"
                            referrerPolicy="no-referrer"
                          />
                          <div className={`hero-card-overlay ${isExpanded ? 'overlay-expanded' : 'overlay-collapsed'}`} />
                        </div>

                        {isExpanded ? (
                          /* EXPANDED PANEL CONTENT - MINIMAL TEXT, HIGH VISUAL IMPACT */
                          <div className="hero-expanded-content">
                            <div className="hero-card-top-bar">
                              <span 
                                className="hero-badge-pill"
                                style={{ backgroundColor: `${card.accentColor}30`, color: '#FFFFFF', borderColor: card.accentColor }}
                              >
                                {card.num} · {card.badge}
                              </span>
                              <span className="hero-status-pill">
                                <span className="status-dot-active" style={{ backgroundColor: card.accentColor, boxShadow: `0 0 10px ${card.accentColor}` }}></span> ACTIVO
                              </span>
                            </div>

                            <div className="hero-card-bottom-info">
                              <h3 className="hero-card-title">{card.title}</h3>

                              <div className="hero-card-highlights">
                                {card.highlights.map((item, hIdx) => (
                                  <span key={hIdx} className="hero-card-tag">
                                    <span className="tag-dot" style={{ backgroundColor: card.accentColor }}></span>
                                    {item}
                                  </span>
                                ))}
                              </div>

                              <div className="hero-card-cta-row">
                                <a
                                  href={`https://wa.me/51991664146?text=${encodeURIComponent(card.waText)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hero-card-action-btn"
                                  style={{ backgroundColor: card.accentColor, color: '#030A16' }}
                                >
                                  Consultar →
                                </a>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* COLLAPSED CAPSULE BAR */
                          <div className="hero-collapsed-content">
                            <div className="collapsed-top">
                              <span className="collapsed-num" style={{ color: card.accentColor }}>{card.num}</span>
                              <div className="collapsed-icon" style={{ color: card.accentColor }}>
                                {card.icon}
                              </div>
                            </div>

                            <div className="collapsed-title-wrap">
                              <span className="collapsed-title">{card.badge}</span>
                            </div>

                            <div className="collapsed-bottom">
                              <span className="collapsed-dot" style={{ backgroundColor: card.accentColor, boxShadow: `0 0 8px ${card.accentColor}` }}></span>
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

        {/* 3. FRANJA DE CONFIANZA */}
        <section className="ti-trust-strip">
          <div className="section-container">
            <div className="ti-trust-grid">
              <div className="ti-trust-card">
                <div className="trust-card-number">01</div>
                <div className="trust-card-body">
                  <h3 className="trust-card-title">Diagnóstico a medida</h3>
                  <p className="trust-card-desc">Evaluación técnica precisa de sitio según las necesidades de tu operación.</p>
                </div>
              </div>

              <div className="ti-trust-card">
                <div className="trust-card-number">02</div>
                <div className="trust-card-body">
                  <h3 className="trust-card-title">Implementación documentada</h3>
                  <p className="trust-card-desc">Configuración clara, mapas de red y bitácoras totalmente accesibles para el cliente.</p>
                </div>
              </div>

              <div className="ti-trust-card">
                <div className="trust-card-number">03</div>
                <div className="trust-card-body">
                  <h3 className="trust-card-title">Acompañamiento local</h3>
                  <p className="trust-card-desc">Soporte técnico y atención presencial/remota de cercanía en Perú.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SECCIÓN ELEGANTE DE SERVICIOS EN GRID 2X2 PREMIUM (PILARES TI) */}
        <section className="ti-stacked-services-section" id="servicios">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">NUESTROS SERVICIOS ESPECIALIZADOS</span>
              <h2 className="section-title">Infraestructura y servicios integrados en grid 2x2.</h2>
              <p className="section-desc max-w-3xl">
                Soluciones integradas en 4 pilares fundamentales. Cada módulo se adapta al tamaño, volumen de datos e infraestructura física de tu empresa.
              </p>
            </div>

            <div className="ti-services-grid-2x2">
              {/* Card 1: Conectividad */}
              <div className="ti-grid-service-card card-theme-cyan">
                <div className="grid-card-header">
                  <div className="grid-index-wrap">
                    <span className="grid-num num-cyan">01</span>
                    <span className="grid-badge badge-cyan">CONECTIVIDAD</span>
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
                    Diseño, instalación y certificación de infraestructura de red física e inalámbrica. Garantizamos tráfico fluido y alta velocidad entre sedes, oficinas y almacenes.
                  </p>

                  <div className="grid-specs-tags">
                    <span className="grid-spec-pill"><span className="spec-dot dot-cyan"></span> Cableado Cat6A / Cat7</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-cyan"></span> Enlaces Fibra Dedicada</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-cyan"></span> Wi-Fi 6 Empresarial</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-cyan"></span> Routers, Switches & Firewalls</span>
                  </div>
                </div>

                <div className="grid-card-footer">
                  <a 
                    href="#asesoria" 
                    onClick={(e) => { setSelectedArea('Conectividad & Redes'); scrollToSection(e, 'asesoria'); }}
                    className="grid-details-link"
                  >
                    Seleccionar área →
                  </a>
                  <a 
                    href={buildWhatsappUrl('Conectividad & Redes')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-sm btn-cyan"
                  >
                    Consultar →
                  </a>
                </div>
              </div>

              {/* Card 2: Operación */}
              <div className="ti-grid-service-card card-theme-violet">
                <div className="grid-card-header">
                  <div className="grid-index-wrap">
                    <span className="grid-num num-violet">02</span>
                    <span className="grid-badge badge-violet">OPERACIÓN</span>
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
                    Atención técnica remota y presencial para resolver incidencias de hardware y software en estaciones de trabajo y servidores antes de que paralicen tu negocio.
                  </p>

                  <div className="grid-specs-tags">
                    <span className="grid-spec-pill"><span className="spec-dot dot-violet"></span> Mantenimiento Preventivo</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-violet"></span> Asistencia Correctiva SLA</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-violet"></span> Soporte Remoto / Presencial</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-violet"></span> Bitácora Técnica Equipos</span>
                  </div>
                </div>

                <div className="grid-card-footer">
                  <a 
                    href="#asesoria" 
                    onClick={(e) => { setSelectedArea('Soporte & Operación'); scrollToSection(e, 'asesoria'); }}
                    className="grid-details-link"
                  >
                    Seleccionar área →
                  </a>
                  <a 
                    href={buildWhatsappUrl('Soporte TI & Operación')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-sm btn-violet"
                  >
                    Consultar →
                  </a>
                </div>
              </div>

              {/* Card 3: Seguridad */}
              <div className="ti-grid-service-card card-theme-emerald">
                <div className="grid-card-header">
                  <div className="grid-index-wrap">
                    <span className="grid-num num-emerald">03</span>
                    <span className="grid-badge badge-emerald">SEGURIDAD</span>
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
                    Sistemas de seguridad electrónica integrados a tu red local. Monitoreo visual en tiempo real de accesos, almacenes, zonas críticas y plantas operativas.
                  </p>

                  <div className="grid-specs-tags">
                    <span className="grid-spec-pill"><span className="spec-dot dot-emerald"></span> Cámaras IP 4K HD Nocturnas</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-emerald"></span> Centro Monitoreo / NVR</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-emerald"></span> Control por App Móvil</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-emerald"></span> Resguardo Perimetral</span>
                  </div>
                </div>

                <div className="grid-card-footer">
                  <a 
                    href="#asesoria" 
                    onClick={(e) => { setSelectedArea('Videovigilancia & Seguridad'); scrollToSection(e, 'asesoria'); }}
                    className="grid-details-link"
                  >
                    Seleccionar área →
                  </a>
                  <a 
                    href={buildWhatsappUrl('Videovigilancia & Monitoreo')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-sm btn-emerald"
                  >
                    Consultar →
                  </a>
                </div>
              </div>

              {/* Card 4: Disponibilidad */}
              <div className="ti-grid-service-card card-theme-amber">
                <div className="grid-card-header">
                  <div className="grid-index-wrap">
                    <span className="grid-num num-amber">04</span>
                    <span className="grid-badge badge-amber">DISPONIBILIDAD</span>
                  </div>
                  <div className="grid-icon-circle circle-amber">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="grid-svg">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                </div>

                <div className="grid-card-body">
                  <h3 className="grid-card-title">Continuidad Operativa & Respaldos</h3>
                  <p className="grid-card-desc">
                    Estrategias de tolerancia a fallas, copias de seguridad automáticas y conmutación de red para asegurar que la información y las operaciones no sufran pérdidas.
                  </p>

                  <div className="grid-specs-tags">
                    <span className="grid-spec-pill"><span className="spec-dot dot-amber"></span> Backup Local & Nube</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-amber"></span> Redundancia WAN Failover</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-amber"></span> Mapa & Documentación</span>
                    <span className="grid-spec-pill"><span className="spec-dot dot-amber"></span> Recuperación ante Desastres</span>
                  </div>
                </div>

                <div className="grid-card-footer">
                  <a 
                    href="#asesoria" 
                    onClick={(e) => { setSelectedArea('Disponibilidad & Respaldos'); scrollToSection(e, 'asesoria'); }}
                    className="grid-details-link"
                  >
                    Seleccionar área →
                  </a>
                  <a 
                    href={buildWhatsappUrl('Disponibilidad & Respaldos')} 
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

        {/* 5. PROBLEMA OPERATIVO */}
        <section className="ti-problem-section">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">LA INFRAESTRUCTURA FUNCIONA COMO UN SISTEMA</span>
              <h2 className="section-title">Una falla aislada puede detener mucho más que un equipo.</h2>
              <p className="section-desc max-w-3xl">
                Conectividad inestable, equipos sin mantenimiento, puntos ciegos de seguridad o configuraciones sin respaldo pueden afectar toda la operación. Por eso evaluamos la infraestructura como un conjunto conectado.
              </p>
            </div>

            <div className="connected-operativa-line">
              <div className="operativa-item">
                <div className="operativa-node-header">
                  <span className="operativa-badge badge-blue">01</span>
                  <h3 className="operativa-item-title">Conectividad</h3>
                </div>
                <p className="operativa-item-desc">Enlaces, conmutación y tráfico de datos continuo entre áreas y sedes.</p>
              </div>

              <div className="operativa-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="operativa-item">
                <div className="operativa-node-header">
                  <span className="operativa-badge badge-violet">02</span>
                  <h3 className="operativa-item-title">Operación</h3>
                </div>
                <p className="operativa-item-desc">Estaciones de trabajo y dispositivos configurados en estado óptimo.</p>
              </div>

              <div className="operativa-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="operativa-item">
                <div className="operativa-node-header">
                  <span className="operativa-badge badge-green">03</span>
                  <h3 className="operativa-item-title">Seguridad</h3>
                </div>
                <p className="operativa-item-desc">Protección física, videovigilancia y resguardo perimetral de accesos.</p>
              </div>

              <div className="operativa-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="operativa-item">
                <div className="operativa-node-header">
                  <span className="operativa-badge badge-amber">04</span>
                  <h3 className="operativa-item-title">Disponibilidad</h3>
                </div>
                <p className="operativa-item-desc">Respaldos estructurados y pronta recuperación ante incidencias.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ESCENARIOS FRECUENTES */}
        <section className="ti-escenarios-section" id="escenarios">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">ESCENARIOS FRECUENTES</span>
              <h2 className="section-title">Situaciones que conviene evaluar antes de que afecten la operación.</h2>
            </div>

            <div className="escenarios-editorial-grid">
              <div className="escenario-cell">
                <span className="cell-num">01</span>
                <h3 className="cell-title">Conectividad irregular</h3>
                <p className="cell-desc">Usuarios, dispositivos o espacios que pierden acceso o presentan una conexión inestable.</p>
              </div>

              <div className="escenario-cell">
                <span className="cell-num">02</span>
                <h3 className="cell-title">Equipos con incidencias recurrentes</h3>
                <p className="cell-desc">Fallas que se repiten y requieren revisar mantenimiento, configuración o necesidad de actualización.</p>
              </div>

              <div className="escenario-cell">
                <span className="cell-num">03</span>
                <h3 className="cell-title">Cobertura de seguridad incompleta</h3>
                <p className="cell-desc">Zonas sin visibilidad suficiente o sistemas de cámaras que necesitan reorganización.</p>
              </div>

              <div className="escenario-cell">
                <span className="cell-num">04</span>
                <h3 className="cell-title">Información y configuraciones sin respaldo claro</h3>
                <p className="cell-desc">Dependencia de equipos, accesos o archivos que no cuentan con un procedimiento documentado de recuperación.</p>
              </div>
            </div>

            <div className="escenarios-cta-wrap center">
              <a 
                href={defaultWhatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                Conversar sobre mi situación
              </a>
            </div>
          </div>
        </section>

        {/* 11. MÉTODO DE TRABAJO */}
        <section className="ti-method-section" id="metodo">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">NUESTRO MÉTODO</span>
              <h2 className="section-title">Implementación técnica con un proceso claro.</h2>
            </div>

            <div className="method-connected-line">
              <div className="method-step-block">
                <div className="method-step-head">
                  <span className="method-badge">01</span>
                  <h3 className="method-title">Diagnóstico</h3>
                </div>
                <p className="method-desc">Revisamos necesidades, entorno, usuarios, equipos y puntos críticos de la infraestructura existente.</p>
              </div>

              <div className="method-step-block">
                <div className="method-step-head">
                  <span className="method-badge">02</span>
                  <h3 className="method-title">Diseño</h3>
                </div>
                <p className="method-desc">Definimos la arquitectura, especificaciones de componentes y el alcance adecuado para la empresa.</p>
              </div>

              <div className="method-step-block">
                <div className="method-step-head">
                  <span className="method-badge">03</span>
                  <h3 className="method-title">Implementación</h3>
                </div>
                <p className="method-desc">Instalamos, configuramos, realizamos pruebas de esfuerzo y documentamos la solución entregada.</p>
              </div>

              <div className="method-step-block">
                <div className="method-step-head">
                  <span className="method-badge">04</span>
                  <h3 className="method-title">Soporte</h3>
                </div>
                <p className="method-desc">Realizamos mantenimiento preventivo y brindamos acompañamiento técnico continuo según el contrato.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 12. FAQ */}
        <section className="ti-faq-section" id="faq">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">PREGUNTAS FRECUENTES</span>
              <h2 className="section-title">Preguntas antes de solicitar una evaluación.</h2>
            </div>

            <div className="faq-accordion-list max-w-3xl">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="faq-item-card">
                    <button
                      type="button"
                      className="faq-trigger-btn"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-ans-${idx}`}
                    >
                      <span className="faq-question-text">{item.q}</span>
                      <span className={`faq-icon-plus ${isOpen ? 'open' : ''}`}>+</span>
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

        {/* 13. SELECTOR COMPACTO DE CONTACTO DIRECTO */}
        <section className="ti-asesoria-section" id="asesoria">
          <div className="section-container">
            <div className="asesoria-card-container">
              <div className="section-header center">
                <span className="section-eyebrow">CONTACTO DIRECTO</span>
                <h2 className="section-title">Consulta directa por área de interés</h2>
                <p className="section-desc">
                  Si ya sabes qué solución necesitas, selecciona el área y comunícate directamente con nuestro equipo.
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
                        <div className="area-radio-dot"></div>
                      </div>
                      <h3 className="area-card-title">{opt.label}</h3>
                      <p className="area-card-desc">{opt.description}</p>
                    </button>
                  );
                })}
              </div>

              <div className="asesoria-action-bar">
                <div className="selected-area-summary">
                  <span>Área seleccionada: <strong>{selectedArea}</strong></span>
                </div>
                <a 
                  href={buildWhatsappUrl(selectedArea)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary btn-lg"
                >
                  Hablar con un especialista
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 14. CTA FINAL */}
        <section className="ti-final-cta-section">
          <div className="section-container center-content">
            <h2 className="final-cta-title">Una operación conectada necesita una infraestructura que pueda sostenerla.</h2>
            <p className="final-cta-desc">
              Conversemos sobre los usuarios, equipos, espacios y procesos que necesitas mantener activos.
            </p>
            <div className="final-cta-btn-wrap">
              <a 
                href={buildWhatsappUrl(selectedArea)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-lg"
              >
                Solicitar evaluación técnica
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 15. FOOTER */}
      <footer className="site-footer" id="main-footer">
        <div className="footer-container">
          <div className="footer-brand-column">
            <a href="#/" aria-label="CR Technologies & Services inicio">
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
              <li><a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')}>Servicios Apilados</a></li>
              <li><a href="#escenarios" onClick={(e) => scrollToSection(e, 'escenarios')}>Escenarios Frecuentes</a></li>
              <li><a href="#metodo" onClick={(e) => scrollToSection(e, 'metodo')}>Método de Trabajo</a></li>
              <li><a href="#asesoria" onClick={(e) => scrollToSection(e, 'asesoria')}>Contacto por Área</a></li>
            </ul>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-title">Verticales CR Tech</h4>
            <ul className="footer-links-list">
              <li><a href="#/drones">Drones Profesionales</a></li>
              <li><a href="#/energia">Energía Portátil EcoFlow</a></li>
              <li><a href="#/servicios-ti">Servicios TI & Redes</a></li>
              <li><a href="#/">CRTech Principal</a></li>
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
