import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';
import Header from './Header';

gsap.registerPlugin(ScrollTrigger);

interface EcoFlowEvidenceCase {
  id: string;
  category: string;
  title: string;
  description: string;
  youtubeId: string;
  embedUrl: string;
  posterUrl: string;
  quality: string;
  modelUsed: string;
  duration: string;
}

export default function EcoFlowLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeConfigStep, setActiveConfigStep] = useState<number>(0);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number>(0);
  const [cardTilt, setCardTilt] = useState({ rotX: 4, rotY: -8 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({
      rotX: y * -16,
      rotY: x * 16,
    });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rotX: 4, rotY: -8 });
  };

  const ecoFlowEvidenceCases: EcoFlowEvidenceCase[] = [
    {
      id: 'eco-case-1',
      category: 'ENERGÍA SOLAR EN CAMPO',
      title: 'EcoFlow Delta Pro con Paneles Solares',
      description: 'Mira cómo se recarga una batería de alta potencia con la luz del sol en medio del campo.',
      youtubeId: 'di4_yVJQLC8',
      embedUrl: 'https://www.youtube.com/embed/di4_yVJQLC8',
      posterUrl: 'https://img.youtube.com/vi/di4_yVJQLC8/maxresdefault.jpg',
      quality: '1080p Full HD',
      modelUsed: 'Delta Pro + Panel 400W',
      duration: '02:15 min',
    },
    {
      id: 'eco-case-2',
      category: 'VIAJES Y MONTAÑA',
      title: 'EcoFlow River 3 en Viajes y Paseos',
      description: 'Carga tus laptops, drones, celulares y luces mientras disfrutas al aire libre.',
      youtubeId: '8SwVZCN7VCU',
      embedUrl: 'https://www.youtube.com/embed/8SwVZCN7VCU',
      posterUrl: 'https://img.youtube.com/vi/8SwVZCN7VCU/maxresdefault.jpg',
      quality: '1080p Full HD',
      modelUsed: 'River 3 Portátil',
      duration: '01:45 min',
    },
    {
      id: 'eco-case-3',
      category: 'CASA Y NEGOCIO SIN APAGONES',
      title: 'EcoFlow para Mantener tu Local Activo',
      description: 'Tus puntos de venta, refrigeradoras, luces e internet siguen funcionando ante un apagón.',
      youtubeId: 'A13QiyTLQWE',
      embedUrl: 'https://www.youtube.com/embed/A13QiyTLQWE',
      posterUrl: 'https://img.youtube.com/vi/A13QiyTLQWE/maxresdefault.jpg',
      quality: '1080p Full HD',
      modelUsed: 'Delta 2 Max / Backup',
      duration: '02:05 min',
    },
  ];

  const [activeGalleryVideo, setActiveGalleryVideo] = useState<EcoFlowEvidenceCase>(ecoFlowEvidenceCases[0]);
  const [isPlayingMainVideo, setIsPlayingMainVideo] = useState<boolean>(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectGalleryVideo = (caseItem: EcoFlowEvidenceCase) => {
    setActiveGalleryVideo(caseItem);
    setIsPlayingMainVideo(true);
    if (playerContainerRef.current) {
      playerContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const whatsappHeroUrl = "https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20asesor%C3%ADa%20para%20elegir%20una%20bater%C3%ADa%20EcoFlow.";
  const whatsappExpertUrl = "https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20hablar%20con%20un%20asesor%20sobre%20bater%C3%ADas%20EcoFlow.";
  const whatsappFinalCtaUrl = "https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20necesito%20asesor%C3%ADa%20para%20comprar%20mi%20EcoFlow%20en%20Per%C3%BA.";

  useEffect(() => {
    document.title = 'EcoFlow Perú | Baterías Portátiles y Paneles Solares | CR Tech';
  }, []);

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReduced) {
        // Hero entrance
        gsap.fromTo(
          ['.ecoflow-hero-eyebrow', '.ecoflow-hero-title', '.ecoflow-hero-desc', '.ecoflow-hero-ctas', '.hero-trust-highlights'],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
        );

        gsap.fromTo(
          '.ecoflow-hero-visual-col',
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
        );

        // Official Brand Banner
        gsap.fromTo(
          '.ecoflow-brand-showcase-section',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: '.ecoflow-brand-showcase-section',
              start: 'top 85%',
              once: true,
            }
          }
        );

        // Energy Flow / Ecosystem
        gsap.fromTo(
          ['.ecoflow-ecosystem-section .section-header', '.accordion-card'],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.ecoflow-ecosystem-section',
              start: 'top 82%',
              once: true
            }
          }
        );

        // Video Gallery
        gsap.fromTo(
          ['.ecoflow-video-ref-section .section-header', '.ref-main-player-box', '.ref-gallery-thumbnails-grid'],
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.ecoflow-video-ref-section',
              start: 'top 82%',
              once: true
            }
          }
        );

        // Applications
        gsap.fromTo(
          ['.ecoflow-applications-section .section-header', '.cap-card-ref'],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            scrollTrigger: {
              trigger: '.ecoflow-applications-section',
              start: 'top 82%',
              once: true
            }
          }
        );

        // Metodología
        gsap.fromTo(
          ['.config-process-header', '.timeline-step-row'],
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.drones-config-process-section',
              start: 'top 82%',
              once: true
            }
          }
        );

        // Familias de Soluciones
        gsap.fromTo(
          ['.ecoflow-families-section .section-header', '.family-card'],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.ecoflow-families-section',
              start: 'top 82%',
              once: true
            }
          }
        );

        // Métodos de Recarga
        gsap.fromTo(
          ['.recharge-section-header', '.recharge-ref-card'],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.ecoflow-recharge-section',
              start: 'top 82%',
              once: true
            }
          }
        );

        // Asesoría y Soporte Local
        gsap.fromTo(
          ['.support-info-col', '.specialist-contact-card'],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.ecoflow-support-section',
              start: 'top 82%',
              once: true
            }
          }
        );

        // CTA Final
        gsap.fromTo(
          ['.final-cta-title', '.final-cta-desc', '.final-cta-btn-wrap'],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.ecoflow-final-cta-section',
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="ecoflow-landing-page">
      {/* HEADER COMPONENT */}
      <Header currentRoute="energia" />

      <main>
        {/* 1. HERO SECTION (Matching Drones Sublanding Hero Reference Layout with Custom Background) */}
        <section className="drones-hero-section ecoflow-hero-custom-bg" id="ecoflow-hero">
          <div className="drones-hero-container">
            
            {/* Copy (Left Column: Eyebrow, Title, Subtitle, Actions & 4 Guarantees) */}
            <div className="drones-hero-copy">
              <div className="drones-eyebrow">
                <span className="eyebrow-accent"></span>
                <span>ECOFLOW PERÚ · DISTRIBUIDOR OFICIAL</span>
              </div>

              <h1 className="drones-hero-title">
                Energía portátil e inteligente para operaciones que no se detienen.
              </h1>

              <p className="drones-hero-subtitle">
                Baterías portátiles y paneles solares EcoFlow para trabajo de campo, viajes, comercios, emergencias y respaldo en casa sin ruidos, humo ni apagones.
              </p>

              <div className="drones-hero-actions">
                <a 
                  href={whatsappHeroUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary hero-btn-main"
                >
                  Cotizar mi EcoFlow
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>

                <a 
                  href="#evidencia" 
                  onClick={(e) => scrollToSection(e, 'evidencia')}
                  className="btn btn-secondary hero-btn-sub"
                >
                  Ver evidencia de campo
                </a>
              </div>

              {/* 4 Guarantees matching reference layout */}
              <div className="drones-hero-guarantees">
                <div className="guarantee-item">
                  <svg className="guarantee-check" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Garantía Oficial EcoFlow</span>
                </div>
                <div className="guarantee-item">
                  <svg className="guarantee-check" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Asesoría técnica especializada</span>
                </div>
                <div className="guarantee-item">
                  <svg className="guarantee-check" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Soporte técnico local en Perú</span>
                </div>
                <div className="guarantee-item">
                  <svg className="guarantee-check" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Repuestos y postventa</span>
                </div>
              </div>
            </div>

            {/* Visual Column (Right Column: Dynamic 3D Tilted Vertical 9:16 Image Card - No Frame, No Text, No Extra Data) */}
            <div className="drones-hero-visual">
              {/* Signature curved line behind card */}
              <svg 
                className="drones-hero-signature-line" 
                viewBox="0 0 500 300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d="M -30 180 C 80 120, 160 220, 320 140 C 400 100, 460 120, 520 80" 
                  stroke="#38BDF8" 
                  strokeWidth="1" 
                  strokeOpacity="0.45"
                  strokeDasharray="4 3"
                />
              </svg>

              {/* Dynamic 3D Vertical 9:16 Card - Pure Image, No Frame, No Text */}
              <div className="ecoflow-tilt-card-wrapper">
                <div 
                  className="ecoflow-tilt-card-pure"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateX(${cardTilt.rotX}deg) rotateY(${cardTilt.rotY}deg) scale3d(1, 1, 1)`
                  }}
                >
                  <img 
                    src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1785200086/EcoFlow-Delta-2-Max-1_HEroCrTech_fran0j.png" 
                    alt="Estación de energía EcoFlow" 
                    className="ecoflow-pure-hero-img"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. LOGO OFICIAL ECOFLOW & MARCA DESTACADA (Banner Azul Oscuro para Contraste Alto) */}
        <section className="ecoflow-brand-showcase-section">
          <div className="section-container">
            <div className="brand-showcase-box">
              <div className="brand-logo-side">
                <span className="brand-official-badge">DISTRIBUIDOR AUTORIZADO PERÚ</span>
                <div className="brand-logo-large">
                  {/* Styled EcoFlow Official Logo typography */}
                  <div className="ecoflow-official-logo-text">
                    <span className="logo-letter-eco">ECO</span>
                    <span className="logo-letter-flow">FLOW</span>
                  </div>
                  <p className="brand-tagline">Power A Free World · CR Technologies & Services</p>
                </div>
              </div>

              <div className="brand-trust-grid">
                <div className="brand-trust-card">
                  <div className="brand-trust-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div>
                    <h4 className="trust-card-title">Equipos 100% Originales</h4>
                    <p className="trust-card-desc">Con sello oficial y garantía directa de fábrica en todo el Perú.</p>
                  </div>
                </div>

                <div className="brand-trust-card">
                  <div className="brand-trust-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                  </div>
                  <div>
                    <h4 className="trust-card-title">Asesoría Sencilla</h4>
                    <p className="trust-card-desc">Dinos qué electrodoméstico quieres encender y te decimos cuál comprar.</p>
                  </div>
                </div>

                <div className="brand-trust-card">
                  <div className="brand-trust-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h4 className="trust-card-title">Soporte Técnico CR Tech</h4>
                    <p className="trust-card-desc">Atención local posventa, envíos rápidos y repuestos en Perú.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. GALERÍA DE VIDEOS (Basado exactamente en la referencia visual dada) */}
        <section className="ecoflow-video-ref-section" id="evidencia">
          <div className="section-container">
            
            <div className="section-header text-center">
              <span className="section-eyebrow">DEMOSTRACIONES EN VIDEO</span>
              <h2 className="stories-main-heading">
                Mira las baterías EcoFlow <span className="stories-heading-highlight">en acción</span>
              </h2>
              <p className="section-subtitle">
                Haz clic en cualquier video de la galería para verlo en el reproductor principal.
              </p>
            </div>

            {/* Reference Style Main Featured Video Player Block */}
            <div className="ref-main-player-box" ref={playerContainerRef}>
              <div className="ref-player-aspect-wrapper">
                {isPlayingMainVideo ? (
                  <iframe
                    src={`${activeGalleryVideo.embedUrl}?autoplay=1&rel=0`}
                    title={activeGalleryVideo.title}
                    className="ref-iframe-player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div 
                    className="ref-player-poster-container"
                    onClick={() => setIsPlayingMainVideo(true)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Reproducir video ${activeGalleryVideo.title}`}
                  >
                    <img 
                      src={activeGalleryVideo.posterUrl} 
                      alt={activeGalleryVideo.title} 
                      className="ref-poster-img"
                    />
                    <div className="ref-poster-overlay" />
                    
                    {/* Big Center Play Icon (Matches Reference Image) */}
                    <div className="ref-center-play-button" title="Reproducir video">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="ref-play-svg">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>

                    <div className="ref-poster-badge-top">
                      <span className="ref-live-dot" />
                      <span>{activeGalleryVideo.category}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Reference-Inspired Bottom Meta Specs Bar (3 Pill Info Columns) */}
              <div className="ref-meta-info-bar">
                <div className="ref-meta-pill">
                  <span className="ref-meta-label">Calidad</span>
                  <span className="ref-meta-value">{activeGalleryVideo.quality}</span>
                </div>

                <div className="ref-meta-pill">
                  <span className="ref-meta-label">Modelo</span>
                  <span className="ref-meta-value">{activeGalleryVideo.modelUsed}</span>
                </div>

                <div className="ref-meta-pill">
                  <span className="ref-meta-label">Duración</span>
                  <span className="ref-meta-value">{activeGalleryVideo.duration}</span>
                </div>
              </div>
            </div>

            {/* Reference-Inspired Recent Generations / Thumbnails Row */}
            <div className="ref-gallery-bottom-block">
              <h3 className="ref-bottom-heading">Videos y Demostraciones Recientes</h3>
              
              <div className="ref-gallery-thumbnails-grid">
                {ecoFlowEvidenceCases.map((caseItem) => {
                  const isSelected = activeGalleryVideo.id === caseItem.id;
                  return (
                    <button
                      key={caseItem.id}
                      type="button"
                      onClick={() => handleSelectGalleryVideo(caseItem)}
                      className={`ref-thumbnail-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="ref-thumb-image-wrap">
                        <img 
                          src={caseItem.posterUrl} 
                          alt={caseItem.title} 
                          className="ref-thumb-img"
                        />
                        <div className="ref-thumb-play-mini">
                          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                      <div className="ref-thumb-info">
                        <span className="ref-thumb-cat">{caseItem.category}</span>
                        <h4 className="ref-thumb-title">{caseItem.title}</h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="ref-whatsapp-help-cta">
                <span>¿Deseas consultar sobre una batería vista en los videos?</span>
                <a 
                  href={`https://wa.me/51991664146?text=${encodeURIComponent(`Hola CR Tech, vi el video de ${activeGalleryVideo.title} y quiero información para comprar en Perú.`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-cyan btn-sm"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* 4. ECOSISTEMA ENERGÉTICO (Fondo Gris Suave para Contraste) */}
        <section className="ecoflow-ecosystem-section">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">PASO A PASO</span>
              <h2 className="section-title">
                ¿Cómo funciona una batería EcoFlow?
              </h2>
              <p className="section-subtitle">
                Tres pasos muy sencillos para tener energía limpia y segura donde vayas.
              </p>
            </div>

            {/* Galería de tarjetas expandibles (Hover Accordion Slider) */}
            <div className="ecoflow-accordion-gallery">
              {[
                {
                  num: "01",
                  badge: "Captura",
                  badgeClass: "badge-sky",
                  title: "1. Atrapas la Energía",
                  desc: "Usa paneles solares en el campo o enchúfala a la pared de tu casa antes de salir.",
                  image: assets.ecoFlow.solarPanels2,
                },
                {
                  num: "02",
                  badge: "Guarda",
                  badgeClass: "badge-cyan",
                  title: "2. Almacenas Seguro",
                  desc: "La energía se guarda en baterías modernas de larga duración, sin ruido y sin peligros.",
                  image: assets.ecoFlow.deltaPro,
                },
                {
                  num: "03",
                  badge: "Controla",
                  badgeClass: "badge-violet",
                  title: "3. Miras en tu Celular",
                  desc: "Ve cuánta batería te queda y cuántas horas de uso tienes desde la App oficial EcoFlow.",
                  image: assets.ecoFlow.delta,
                },
                {
                  num: "04",
                  badge: "Usa",
                  badgeClass: "badge-emerald",
                  title: "4. Enchufas tus Aparatos",
                  desc: "Conecta tu refrigeradora, luces, TV, laptop o herramientas de trabajo como en la pared de tu casa.",
                  image: assets.ecoFlow.powerStream,
                }
              ].map((step, idx) => {
                const isExpanded = activeAccordionIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`accordion-card ${isExpanded ? 'expanded' : ''}`}
                    onMouseEnter={() => setActiveAccordionIndex(idx)}
                    onClick={() => setActiveAccordionIndex(idx)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                  >
                    <div className="accordion-card-bg">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="accordion-bg-img"
                        loading="lazy"
                      />
                      <div className="accordion-overlay"></div>
                    </div>

                    <div className="accordion-card-content">
                      <div className="accordion-top-bar">
                        <span className="accordion-step-num">{step.num}</span>
                        <span className={`accordion-badge ${step.badgeClass}`}>{step.badge}</span>
                      </div>

                      <div className="accordion-text-block">
                        <h3 className="accordion-title">{step.title}</h3>
                        <p className="accordion-desc">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. APLICACIONES DE ENERGÍA (Fondo Blanco Limpio) */}
        <section className="ecoflow-applications-section" id="aplicaciones-ecoflow">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">USOS HABITUALES</span>
              <h2 className="section-title">
                ¿Dónde vas a usar tu batería EcoFlow?
              </h2>
              <p className="section-subtitle">
                Pensadas para acompañarte en tu hogar, en la oficina, en el trabajo de campo o en tus viajes.
              </p>
            </div>

            <div className="capabilities-grid-ref">
              
              {/* Card 1: Trabajo de campo y operaciones profesionales */}
              <div className="cap-card-ref cap-card-marine">
                <div className="cap-card-top">
                  <div className="cap-badge-pill">
                    <span className="cap-badge-dot"></span>
                    <span>Trabajo en Campo</span>
                  </div>
                  <h3 className="cap-ref-title">Para Trabajos de Ingeniería y Campo</h3>
                  <p className="cap-ref-desc">
                    Alimenta laptops de alto rendimiento, drones, impresoras, medidores y herramientas en lugares sin tomacorrientes.
                  </p>
                </div>
                <div className="cap-card-bottom">
                  <a href={whatsappExpertUrl} target="_blank" rel="noopener noreferrer" className="cap-ref-link">
                    <span>Consultar para campo</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Card 2: Respaldo ante cortes y situaciones de emergencia */}
              <div className="cap-card-ref cap-card-tech">
                <div className="cap-card-top">
                  <div className="cap-badge-pill">
                    <span className="cap-badge-dot"></span>
                    <span>Respaldo en Caso de Apagón</span>
                  </div>
                  <h3 className="cap-ref-title">Para tu Casa u Oficina ante Cortes de Luz</h3>
                  <p className="cap-ref-desc">
                    Se va la luz y tu refrigeradora, luces, internet router y TV siguen encendidos automáticamente sin apagarse.
                  </p>
                </div>
                <div className="cap-card-bottom">
                  <a href={whatsappExpertUrl} target="_blank" rel="noopener noreferrer" className="cap-ref-link">
                    <span>Consultar respaldo para hogar</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Card 3: Continuidad para hogares, oficinas y pequeños negocios */}
              <div className="cap-card-ref cap-card-cyan">
                <div className="cap-card-top">
                  <div className="cap-badge-pill">
                    <span className="cap-badge-dot"></span>
                    <span>Locales y Negocios</span>
                  </div>
                  <h3 className="cap-ref-title">Para que tu Negocio no Deje de Vender</h3>
                  <p className="cap-ref-desc">
                    Mantén activos tus sistemas de cobro POS, computadoras, cámaras de seguridad e iluminación durante un apagón.
                  </p>
                </div>
                <div className="cap-card-bottom">
                  <a href={whatsappExpertUrl} target="_blank" rel="noopener noreferrer" className="cap-ref-link">
                    <span>Consultar para negocios</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Card 4: Movilidad, actividades exteriores y campamentos */}
              <div className="cap-card-ref cap-card-emerald">
                <div className="cap-card-top">
                  <div className="cap-badge-pill">
                    <span className="cap-badge-dot"></span>
                    <span>Viajes y Campamentos</span>
                  </div>
                  <h3 className="cap-ref-title">Para Paseos, Playa y Campamentos</h3>
                  <p className="cap-ref-desc">
                    Lleva luz, música, refrigeración y carga para todos tus celulares y cámaras a la playa, campo o montaña.
                  </p>
                </div>
                <div className="cap-card-bottom">
                  <a href={whatsappExpertUrl} target="_blank" rel="noopener noreferrer" className="cap-ref-link">
                    <span>Consultar serie portátil</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5.2 METODOLOGÍA SIMPLE */}
        <section className="drones-config-process-section" id="metodologia">
          <div className="section-container">
            <div className="config-process-header text-center">
              <span className="section-eyebrow">ASESORÍA DIRECTA</span>
              <h2 className="section-title">
                ¿Cómo te ayudamos a elegir la tuya?
              </h2>
              <p className="section-subtitle">
                En tres sencillos pasos sabrás exactamente qué modelo necesitas sin complicaciones.
              </p>
            </div>

            <div className="config-hover-timeline">
              {[
                {
                  num: "01",
                  title: "1. Nos cuentas qué quieres conectar",
                  desc: "Nos escribes por WhatsApp y nos dices qué aparatos necesitas encender (por ejemplo: refrigeradora, 5 focos y tu laptop)."
                },
                {
                  num: "02",
                  title: "2. Te recomendamos el modelo exacto",
                  desc: "Calculamos las horas de uso y te sugerimos el tamaño de batería (RIVER o DELTA) y si necesitas paneles solares."
                },
                {
                  num: "03",
                  title: "3. La recibes y la usas de inmediato",
                  desc: "Te entregamos tu equipo original con garantía en Perú y te enseñamos a usarlo en 5 minutos."
                }
              ].map((step, idx) => {
                const isActive = activeConfigStep === idx;
                return (
                  <div 
                    key={idx}
                    className={`timeline-step-row ${isActive ? 'active' : ''}`}
                    onMouseEnter={() => setActiveConfigStep(idx)}
                    onClick={() => setActiveConfigStep(idx)}
                    role="button"
                    tabIndex={0}
                    aria-selected={isActive}
                  >
                    <div className="timeline-num-col">
                      <span className="timeline-step-num">{step.num}</span>
                    </div>
                    <div className="timeline-indicator-col">
                      <div className="timeline-vertical-line"></div>
                    </div>
                    <div className="timeline-content-col">
                      <h3 className="timeline-step-title">{step.title}</h3>
                      <p className="timeline-step-desc">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. FAMILIAS DE SOLUCIONES */}
        <section className="ecoflow-families-section" id="familias-ecoflow">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">CATÁLOGO DE MODELOS</span>
              <h2 className="section-title">
                Elige el tamaño que mejor se adapte a ti
              </h2>
              <p className="section-subtitle">
                Desde opciones ligeras de mano hasta estaciones de alta potencia para tu casa o negocio.
              </p>
            </div>

            <div className="families-grid">
              
              {/* Family 1: RIVER */}
              <div className="family-card">
                <div className="family-badge sky">SERIE RIVER</div>
                <div className="family-media-box">
                  <img 
                    src={assets.ecoFlow.river2} 
                    alt="EcoFlow Serie RIVER para cargas esenciales" 
                    className="family-img"
                    loading="lazy"
                  />
                </div>
                <div className="family-content">
                  <h3 className="family-title">Serie RIVER — Ligeras y Portátiles</h3>
                  <p className="family-desc">
                    Ideal para llevar en la mochila o auto. Perfecta para viajes, celulares, laptops y luces en casa.
                  </p>
                  <ul className="family-highlights">
                    <li>Super liviana para cargar con una sola mano</li>
                    <li>Carga laptops, celulares, cámaras y focos</li>
                    <li>Se recarga en solo 60 minutos en la pared</li>
                  </ul>
                  <a 
                    href={`https://wa.me/51991664146?text=${encodeURIComponent('Hola CR Tech, deseo consultar sobre la serie EcoFlow RIVER.')}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="family-cta-link"
                  >
                    <span>Consultar precios RIVER por WhatsApp</span>
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
                  <h3 className="family-title">Serie DELTA — Potencia para Todo tu Hogar</h3>
                  <p className="family-desc">
                    Diseñada para encender electrodomésticos grandes: refrigeradoras, microondas, televisores y herramientas de trabajo.
                  </p>
                  <ul className="family-highlights">
                    <li>Enciende refrigeradoras, microondas y herramientas</li>
                    <li>Puedes agregarle baterías extra si necesitas más horas</li>
                    <li>Respaldo automático instantáneo ante apagones</li>
                  </ul>
                  <a 
                    href={`https://wa.me/51991664146?text=${encodeURIComponent('Hola CR Tech, deseo consultar sobre la serie EcoFlow DELTA.')}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="family-cta-link"
                  >
                    <span>Consultar precios DELTA por WhatsApp</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="link-arrow"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </div>

              {/* Family 3: SOLAR Y ECOSISTEMA */}
              <div className="family-card">
                <div className="family-badge green">PANELES SOLARES</div>
                <div className="family-media-box">
                  <img 
                    src={assets.ecoFlow.powerStream} 
                    alt="Paneles solares y accesorios EcoFlow" 
                    className="family-img"
                    loading="lazy"
                  />
                </div>
                <div className="family-content">
                  <h3 className="family-title">Paneles Solares y Accesorios</h3>
                  <p className="family-desc">
                    Paneles plegables e impermeables para recargar tu batería gratis con el sol estés donde estés.
                  </p>
                  <ul className="family-highlights">
                    <li>Paneles portátiles que se doblan como un maletín</li>
                    <li>Resistentes a la lluvia y el polvo en el campo</li>
                    <li>Cables y conectores incluidos de uso directo</li>
                  </ul>
                  <a 
                    href={`https://wa.me/51991664146?text=${encodeURIComponent('Hola CR Tech, deseo consultar sobre paneles solares EcoFlow.')}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="family-cta-link"
                  >
                    <span>Consultar paneles por WhatsApp</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="link-arrow"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 8. MÉTODOS DE RECARGA (Fondo Azul Oscuro de Alto Impacto para Contraste) */}
        <section className="ecoflow-recharge-section" id="metodos-recarga">
          <div className="section-container">
            <div className="recharge-section-header">
              <span className="section-eyebrow">MÚLTIPLES FORMAS DE CARGA</span>
              <h2 className="recharge-main-heading">
                Recárgala como quieras y donde estés.
              </h2>
              <p className="recharge-main-subtitle">
                Cuatro opciones ultra sencillas para que nunca te quedes sin batería en tus viajes, trabajo o casa.
              </p>
            </div>

            <div className="recharge-cards-grid">
              
              {/* Card 001 - Energía Solar */}
              <div className="recharge-ref-card card-cyan">
                <div className="card-top-row">
                  <span className="card-index-num">( 001 )</span>
                  <div className="card-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="card-svg-icon">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                    </svg>
                  </div>
                </div>
                <div className="card-spacer" />
                <div className="card-bottom-content">
                  <h3 className="card-title-text">1. CON EL SOL</h3>
                  <p className="card-desc-text">
                    Despliegas tu panel solar en el campo o playa y recargas gratis con energía limpia.
                  </p>
                </div>
              </div>

              {/* Card 002 - Red Eléctrica AC */}
              <div className="recharge-ref-card card-sky">
                <div className="card-top-row">
                  <span className="card-index-num">( 002 )</span>
                  <div className="card-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="card-svg-icon">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                </div>
                <div className="card-spacer" />
                <div className="card-bottom-content">
                  <h3 className="card-title-text">2. EN LA PARED</h3>
                  <p className="card-desc-text">
                    La enchufas en tu casa antes de salir y se carga al 100% en menos de 1 hora.
                  </p>
                </div>
              </div>

              {/* Card 003 - Toma Vehicular */}
              <div className="recharge-ref-card card-indigo">
                <div className="card-top-row">
                  <span className="card-index-num">( 003 )</span>
                  <div className="card-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="card-svg-icon">
                      <rect x="1" y="3" width="15" height="13" rx="2" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                </div>
                <div className="card-spacer" />
                <div className="card-bottom-content">
                  <h3 className="card-title-text">3. EN TU AUTO</h3>
                  <p className="card-desc-text">
                    Conéctala a la toma del encendedor de tu vehículo mientras manejas rumbo a tu destino.
                  </p>
                </div>
              </div>

              {/* Card 004 - Generador Inteligente */}
              <div className="recharge-ref-card card-emerald">
                <div className="card-top-row">
                  <span className="card-index-num">( 004 )</span>
                  <div className="card-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="card-svg-icon">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <line x1="7" y1="10" x2="7" y2="14" />
                      <line x1="17" y1="10" x2="17" y2="14" />
                      <circle cx="12" cy="12" r="1.5" />
                    </svg>
                  </div>
                </div>
                <div className="card-spacer" />
                <div className="card-bottom-content">
                  <h3 className="card-title-text">4. CON GENERADOR</h3>
                  <p className="card-desc-text">
                    Si estás en una obra o proyecto muy largo, puedes combinarla con un generador tradicional.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 9. ASESORÍA Y SOPORTE LOCAL (Fondo Blanco Limpio) */}
        <section className="ecoflow-support-section" id="soporte-ecoflow">
          <div className="section-container">
            <div className="support-banner-grid">
              
              <div className="support-info-col">
                <span className="section-eyebrow">RESPALDO Y GARANTÍA CR TECH</span>
                <h2 className="section-title text-left">
                  ¿Tienes dudas? Nosotros calculamos la potencia por ti.
                </h2>
                <p className="section-subtitle text-left">
                  No necesitas saber de números, Watts ni amperios. Dinos qué aparatos quieres encender y cuántas horas necesitas que funcionen.
                </p>

                <div className="support-benefits-list">
                  <div className="benefit-row">
                    <div className="benefit-check">✓</div>
                    <span>Te aconsejamos el modelo justo para no gastar de más</span>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-check">✓</div>
                    <span>Te enviamos tu equipo sellado con garantía de fábrica</span>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-check">✓</div>
                    <span>Te enseñamos a usarla paso a paso por videollamada o WhatsApp</span>
                  </div>
                  <div className="benefit-row">
                    <div className="benefit-check">✓</div>
                    <span>Soporte técnico directo en Perú con el equipo de CR Tech</span>
                  </div>
                </div>
              </div>

              {/* Side Card: Direct Specialist Contact */}
              <div className="support-card-col">
                <div className="specialist-contact-card">
                  <div className="card-badge">ASESORÍA INMEDIATA</div>
                  <h3 className="card-heading">¿Quieres comprar la tuya hoy?</h3>
                  <p className="card-text">
                    Escríbenos por WhatsApp y un asesor te responderá en minutos con modelos disponibles y precios en Perú.
                  </p>
                  
                  <a 
                    href={whatsappExpertUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-cyan w-full text-center expert-btn"
                  >
                    <span>Preguntar por WhatsApp</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>

                  <span className="response-time-note">
                    * Si necesitas fichas o especificaciones técnicas detalladas para proyectos de ingeniería, también te las enviamos por WhatsApp.
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
                Nunca más te quedes sin luz en casa o en tus proyectos.
              </h2>
              <p className="final-cta-desc">
                Pide tu asesoría gratuita por WhatsApp y descubre lo fácil que es tener energía portátil EcoFlow en Perú.
              </p>
              <div className="final-cta-btn-wrap">
                <a 
                  href={whatsappFinalCtaUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-cyan final-cta-btn"
                >
                  <span>Pedir Asesoría EcoFlow por WhatsApp</span>
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
              <a href="#/" aria-label="CR Technologies & Services inicio">
                <img 
                  src={assets.logos.darkBack} 
                  alt="CR Technologies & Services" 
                  className="footer-logo"
                  width="220"
                  height="44"
                />
              </a>
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
                <li><a href="#evidencia" onClick={(e) => scrollToSection(e, 'evidencia')}>Galería de Videos</a></li>
                <li><a href="#aplicaciones-ecoflow" onClick={(e) => scrollToSection(e, 'aplicaciones-ecoflow')}>Aplicaciones</a></li>
                <li><a href="#metodologia" onClick={(e) => scrollToSection(e, 'metodologia')}>Metodología</a></li>
                <li><a href="#familias-ecoflow" onClick={(e) => scrollToSection(e, 'familias-ecoflow')}>Modelos</a></li>
                <li><a href="#soporte-ecoflow" onClick={(e) => scrollToSection(e, 'soporte-ecoflow')}>Garantía y Soporte</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Otras Divisiones</h4>
              <ul className="footer-links">
                <li><a href="#/drones">Drones / SwellPro Perú</a></li>
                <li><a href="#/servicios-ti">Servicios TI e Infraestructura</a></li>
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
