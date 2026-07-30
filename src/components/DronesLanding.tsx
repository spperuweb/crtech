import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../data/assets';
import Header from './Header';
import Footer from './Footer';

interface EvidenceCase {
  id: string;
  category: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
}

export default function DronesLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(false);
  const [activeModalCase, setActiveModalCase] = useState<EvidenceCase | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeConfigStep, setActiveConfigStep] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Modal ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalCase) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalCase]);

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

  const openModal = (caseItem: EvidenceCase, triggerEl: React.MouseEvent<HTMLButtonElement>) => {
    lastFocusedElementRef.current = triggerEl.currentTarget;
    setActiveModalCase(caseItem);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModalCase(null);
    document.body.style.overflow = '';
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const whatsappUrl = "https://wa.me/51991664146?text=" + encodeURIComponent("Hola CR Tech, estoy evaluando un drone SwellPro para una operación en Perú y quisiera recibir asesoría.");

  // Video Intersection Observer to pause when outside viewport
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!prefersReducedMotion) {
              videoEl.play().catch(() => {});
              setIsPlaying(true);
            }
          } else {
            videoEl.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
      if (videoEl) videoEl.pause();
    };
  }, []);
  const evidenceCases: EvidenceCase[] = assets.drones.evidenceCases || [];

  const mainEvidenceCase = evidenceCases[0];
  const secondaryCasesTop = evidenceCases.slice(1, 3);
  const secondaryCasesBottom = evidenceCases.slice(3, 5);

  const faqs = [
    {
      q: "¿Los drones se entregan con capacitación?",
      a: "CRTech ofrece capacitación práctica y acompañamiento para pilotos y equipos según la solución seleccionada."
    },
    {
      q: "¿Cuentan con soporte y repuestos en Perú?",
      a: "Brindamos diagnóstico, mantenimiento y orientación sobre repuestos disponibles para las plataformas comercializadas."
    },
    {
      q: "¿Pueden utilizarse en operaciones sobre agua?",
      a: "La selección depende del modelo, el entorno y el objetivo operativo. Evaluamos el caso antes de recomendar una configuración."
    },
    {
      q: "¿Cómo sé qué plataforma necesito?",
      a: "Cuéntanos el entorno, la misión y los equipos requeridos. Un especialista te orientará hacia una alternativa adecuada."
    }
  ];

  return (
    <div className="drones-landing-wrapper">
      {/* 1. HEADER UNIFICADO VERCEL STYLE */}
      <Header currentRoute="drones" />

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
                  href="#evidencia" 
                  onClick={(e) => scrollToSection(e, 'evidencia')}
                  className="btn btn-secondary hero-btn-sub"
                >
                  Ver evidencia de campo
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
              {/* Firma visual: línea curva muy fina */}
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
                {/* Poster fallback image permanently behind video */}
                <img 
                  src={assets.drones.heroPoster} 
                  alt="SwellPro dron en operación real" 
                  className="drones-hero-poster-fallback"
                  loading="eager"
                />

                <video
                  ref={videoRef}
                  className={`drones-hero-video ${heroVideoLoaded ? 'loaded' : ''}`}
                  src={assets.drones.heroVideo}
                  poster={assets.drones.heroPoster}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  autoPlay
                  onLoadedData={() => setHeroVideoLoaded(true)}
                  onCanPlay={() => setHeroVideoLoaded(true)}
                  onError={() => setHeroVideoLoaded(false)}
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
                  <span>SwellPro en operación real</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. BLOQUE DE CONFIANZA INMEDIATO */}
        <section className="drones-trust-strip" aria-label="Respaldo Oficial SwellPro">
          <div className="trust-strip-container">
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

        {/* 3.5 BANNER TIENDA OFICIAL SWELLPRO PERÚ */}
        <section className="swellpro-official-store-banner">
          <div className="section-container">
            <div className="store-banner-layout">
              <div className="store-banner-logo-col">
                <img 
                  src={assets.logos.swellProPeru} 
                  alt="SwellPro Perú Logo Oficial" 
                  className="store-banner-logo-clean" 
                  loading="lazy"
                />
                <span className="store-official-badge">REPRESENTACIÓN OFICIAL EN PERÚ</span>
              </div>
              <div className="store-banner-content-col">
                <div className="store-badge-row">
                  <span className="live-dot-green"></span>
                  <span className="store-badge-text">PORTAL TÉCNICO & TIENDA VIRTUAL SWELLPRO.PE</span>
                </div>
                <h2 className="store-banner-title">
                  ¿Buscas fotos, videos, fichas técnicas y repuestos en stock?
                </h2>
                <p className="store-banner-desc">
                  Visita nuestro portal exclusivo <strong>SwellPro Perú (swellpro.pe)</strong> para explorar el catálogo completo en stock (Fisherman Max, SplashDrone 4, FD2), repuestos originales, hélices, baterías y manuales de usuario.
                </p>
                <div className="store-banner-action">
                  <a 
                    href="https://swellpro.pe/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="store-direct-btn"
                  >
                    <span>Visitar Tienda swellpro.pe</span>
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SECCIÓN DE EVIDENCIA DE CAMPO - PREMIUM STORIES GALLERY 9:16 */}
        <section className="drones-evidence-section" id="evidencia">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">REGISTROS Y PRUEBAS EN VIVO 9:16</span>
              <h2 className="stories-main-heading">
                En Operación, <span className="stories-heading-highlight">no en exhibición.</span>
              </h2>
              <p className="section-subtitle">
                Explora los videos verticales en acción real: resistencia al agua y salitre, despegue marino, maniobras de rescate y liberación de carga útil.
              </p>
            </div>

            {/* Stories Vertical Video Gallery */}
            <div className="stories-gallery-wrapper">
              <div className="stories-cards-container">
                {evidenceCases.map((caseItem, idx) => (
                  <div 
                    key={caseItem.id} 
                    className={`story-card story-card-${idx + 1}`}
                    onClick={(e) => openModal(caseItem, e as unknown as React.MouseEvent<HTMLButtonElement>)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(caseItem, e as unknown as React.MouseEvent<HTMLButtonElement>);
                      }
                    }}
                  >
                    <div className="story-card-inner">
                      {/* Background Muted Video */}
                      <video
                        className="story-bg-video"
                        src={caseItem.videoUrl}
                        poster={caseItem.posterUrl}
                        muted
                        playsInline
                        loop
                        autoPlay
                      />
                      
                      {/* Top Category Badge */}
                      <div className="story-top-badge">
                        <span className="story-live-dot"></span>
                        <span className="story-category-name">{caseItem.category}</span>
                      </div>

                      {/* Center Play Button Overlay */}
                      <div className="story-play-overlay">
                        <div className="story-play-btn" title="Reproducir video en HD">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Bottom Info Overlay */}
                      <div className="story-bottom-info">
                        <h3 className="story-title">{caseItem.title}</h3>
                        <p className="story-desc">{caseItem.description}</p>
                        <div className="story-action-link">
                          <span>Ver en pantalla completa</span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. SECCIÓN "LO QUE TE OFRECEMOS EN NUESTRA LÍNEA DE DRONES" */}
        <section className="drones-capabilities-section" id="capacidades">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">RESPALDO Y SERVICIO</span>
              <h2 className="section-title">
                Todo lo que necesitas para volar con tranquilidad
              </h2>
              <p className="section-subtitle">
                Te acompañamos antes, durante y después de tu compra con atención cercana y servicio técnico directo en Perú.
              </p>
            </div>

            <div className="capabilities-grid-ref">
              
              {/* Card 1: Marca Confiable / SwellPro */}
              <div className="cap-card-ref cap-card-marine">
                <div className="cap-card-top">
                  <div className="cap-badge-pill">
                    <span className="cap-badge-dot"></span>
                    <span>Representación Oficial</span>
                  </div>
                  <h3 className="cap-ref-title">Respaldado por SwellPro</h3>
                  <p className="cap-ref-desc">
                    Trabajamos con la marca líder mundial en drones 100% impermeables, diseñados para resistir el agua, la sal y condiciones exigentes sin riesgo.
                  </p>
                </div>
                <div className="cap-card-bottom">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cap-ref-link">
                    <span>Conocer la marca</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
                {/* 3D Floating Visual Badge */}
                <div className="cap-visual-float">
                  <div className="cap-3d-object">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="cap-3d-svg">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 2: Asesoría Personalizada */}
              <div className="cap-card-ref cap-card-tech">
                <div className="cap-card-top">
                  <div className="cap-badge-pill">
                    <span className="cap-badge-dot"></span>
                    <span>Atención Personalizada</span>
                  </div>
                  <h3 className="cap-ref-title">Recomendaciones a tu medida</h3>
                  <p className="cap-ref-desc">
                    Te escuchamos y te guiamos para elegir la versión y configuración que mejor se ajuste a tu uso, tu presupuesto y lo que realmente necesitas.
                  </p>
                </div>
                <div className="cap-card-bottom">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cap-ref-link">
                    <span>Pedir recomendación</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
                {/* 3D Floating Visual Badge */}
                <div className="cap-visual-float">
                  <div className="cap-3d-object">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="cap-3d-svg">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 3: Accesorios y Repuestos */}
              <div className="cap-card-ref cap-card-orange">
                <div className="cap-card-top">
                  <div className="cap-badge-pill">
                    <span className="cap-badge-dot"></span>
                    <span>Stock y Disponibilidad</span>
                  </div>
                  <h3 className="cap-ref-title">Accesorios y repuestos</h3>
                  <p className="cap-ref-desc">
                    Contamos con baterías extras, hélices, soltadores de carga y cámaras intercambiables para que tu drone siempre esté completo y listo.
                  </p>
                </div>
                <div className="cap-card-bottom">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cap-ref-link">
                    <span>Ver accesorios</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
                {/* 3D Floating Visual Badge */}
                <div className="cap-visual-float">
                  <div className="cap-3d-object">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="cap-3d-svg">
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 4: Soporte Local y Post-venta */}
              <div className="cap-card-ref cap-card-emerald">
                <div className="cap-card-top">
                  <div className="cap-badge-pill">
                    <span className="cap-badge-dot"></span>
                    <span>Atención Local en Perú</span>
                  </div>
                  <h3 className="cap-ref-title">Soporte y seguimiento continuo</h3>
                  <p className="cap-ref-desc">
                    No te dejamos solo después de la compra. Te brindamos acompañamiento, mantenimiento técnico y atención directa para cualquier consulta.
                  </p>
                </div>
                <div className="cap-card-bottom">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cap-ref-link">
                    <span>Consultar soporte</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
                {/* 3D Floating Visual Badge */}
                <div className="cap-visual-float">
                  <div className="cap-3d-object">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="cap-3d-svg">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                </div>
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

        {/* 8. BLOQUE "CÓMO DEFINIMOS TU CONFIGURACIÓN" (TIMELINE INTERACTIVO SIMPLE) */}
        <section className="drones-config-process-section">
          <div className="section-container">
            <div className="config-process-header text-center">
              <span className="section-eyebrow">NUESTRA METODOLOGÍA</span>
              <h2 className="section-title">
                Cómo definimos tu equipo
              </h2>
              <p className="section-subtitle">
                Tres pasos sencillos para asegurarnos de que tengas exactamente lo que necesitas.
              </p>
            </div>

            <div className="config-hover-timeline">
              {[
                {
                  num: "01",
                  title: "Evaluación",
                  desc: "Escuchamos lo que necesitas hacer, dónde vas a volar (mar, río, playa o campo) y qué deseas lograr."
                },
                {
                  num: "02",
                  title: "Recomendación",
                  desc: "Te mostramos el drone y los accesorios ideales para tu trabajo, de forma clara y sin complicaciones."
                },
                {
                  num: "03",
                  title: "Capacitación y soporte local",
                  desc: "Te enseñamos a usar tu equipo paso a paso y te brindamos respaldo continuo con repuestos y atención directa en Perú."
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

        {/* 9. FAQ BREVE (FASE 5B) */}
        <section className="drones-faq-section" id="faq">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">PREGUNTAS FRECUENTES</span>
              <h2 className="section-title">
                Respuestas claras para tu decisión
              </h2>
              <p className="section-subtitle">
                Resolvemos las inquietudes operativas más comunes sobre el despliegue de drones SwellPro en Perú.
              </p>
            </div>

            <div className="faq-grid">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div className={`faq-card ${isOpen ? 'open' : ''}`} key={index}>
                    <button 
                      type="button" 
                      className="faq-question-btn"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-q-text">{faq.q}</span>
                      <span className="faq-icon-indicator">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer-body">
                        <p className="faq-a-text">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. SECCIÓN DE SOPORTE TÉCNICO Y RESPALDO LOCAL */}
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

        {/* 11. CTA FINAL */}
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

      {/* 12. VISOR DE VIDEO MODAL (FASE 5B) */}
      {activeModalCase && (
        <div 
          className="drones-modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-case-title"
        >
          <div 
            className="drones-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button" 
              className="drones-modal-close-btn"
              onClick={closeModal}
              aria-label="Cerrar visor de video"
              title="Cerrar visor de video (Esc)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="close-icon">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="drones-modal-video-wrap">
              <video
                className="drones-modal-video"
                src={activeModalCase.videoUrl}
                poster={activeModalCase.posterUrl}
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            </div>

            <div className="drones-modal-info">
              <span className="modal-category-badge">{activeModalCase.category}</span>
              <h3 id="modal-case-title" className="modal-case-title">{activeModalCase.title}</h3>
              <p className="modal-case-desc">{activeModalCase.description}</p>
              <div className="modal-cta-wrap">
                <a
                  href="https://wa.me/51991664146?text=Hola%20CRTech,%20vi%20los%20casos%20reales%20de%20SwellPro%20Per%C3%BA%20y%20quiero%20consultar%20una%20aplicaci%C3%B3n%20similar."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary modal-cta-btn"
                >
                  Consultar una aplicación similar
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 13. FOOTER UNIFICADO */}
      <Footer />
    </div>
  );
}
