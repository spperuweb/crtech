import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

type BranchKey = 'drones' | 'energia' | 'it';

interface BranchData {
  id: BranchKey;
  tag: string;
  name: string;
  phrase: string;
  link: string;
  linkText: string;
  color: string;
  bgColor: string;
  accentClass: string;
}

export default function Hero() {
  const [selectedBranch, setSelectedBranch] = useState<BranchKey>('drones');

  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  
  const cardEnergiaRef = useRef<HTMLButtonElement>(null);
  const cardDronesRef = useRef<HTMLButtonElement>(null);
  const cardItRef = useRef<HTMLButtonElement>(null);

  const dronesCaptionRef = useRef<HTMLDivElement>(null);
  const energiaCaptionRef = useRef<HTMLDivElement>(null);
  const itCaptionRef = useRef<HTMLDivElement>(null);

  const prevBranchRef = useRef<BranchKey>('drones');
  const initialTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstBranchEffectRef = useRef(true);

  const branches: Record<BranchKey, BranchData> = {
    drones: {
      id: 'drones',
      tag: 'Aire',
      name: 'Drones Profesionales',
      phrase: 'Sistemas aéreos impermeables SwellPro para inspección, monitoreo y pesca en Perú.',
      link: '#/drones',
      linkText: 'Explorar Drones',
      color: '#48BFEA',
      bgColor: 'rgba(72, 191, 234, 0.08)',
      accentClass: 'accent-cyan'
    },
    energia: {
      id: 'energia',
      tag: 'Campo',
      name: 'Energía Portátil',
      phrase: 'Estaciones EcoFlow y paneles solares para trabajo continuo y respaldo en campo.',
      link: '#/energia',
      linkText: 'Explorar Energía',
      color: '#F4A825',
      bgColor: 'rgba(244, 168, 37, 0.08)',
      accentClass: 'accent-amber'
    },
    it: {
      id: 'it',
      tag: 'Empresa',
      name: 'Servicios TI',
      phrase: 'Redes corporativas, videovigilancia y soporte técnico con acompañamiento local.',
      link: '#/servicios-ti',
      linkText: 'Explorar Servicios TI',
      color: '#7067E8',
      bgColor: 'rgba(112, 103, 232, 0.08)',
      accentClass: 'accent-violet'
    }
  };

  const branchKeys: BranchKey[] = ['drones', 'energia', 'it'];

  const getCardRef = (key: BranchKey) => {
    if (key === 'energia') return cardEnergiaRef;
    if (key === 'drones') return cardDronesRef;
    return cardItRef;
  };

  const getCaptionRef = (key: BranchKey) => {
    if (key === 'drones') return dronesCaptionRef;
    if (key === 'energia') return energiaCaptionRef;
    return itCaptionRef;
  };

  const handleBranchSelect = (key: BranchKey) => {
    setSelectedBranch(key);
  };

  // Keyboard accessibility handler for tablist
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = branchKeys.indexOf(selectedBranch);
    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % branchKeys.length;
        e.preventDefault();
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + branchKeys.length) % branchKeys.length;
        e.preventDefault();
        break;
      case 'Home':
        nextIndex = 0;
        e.preventDefault();
        break;
      case 'End':
        nextIndex = branchKeys.length - 1;
        e.preventDefault();
        break;
      default:
        return;
    }

    const nextBranch = branchKeys[nextIndex];
    setSelectedBranch(nextBranch);
    
    setTimeout(() => {
      const cardEl = getCardRef(nextBranch).current;
      if (cardEl) {
        cardEl.focus();
      }
    }, 0);
  };

  const getCardTransforms = (key: BranchKey, isSelected: boolean) => {
    const xPercent = key === 'energia' ? -108 : key === 'drones' ? -50 : 8;
    const yPercent = -50;
    const rotate = key === 'energia' ? (isSelected ? -3 : -7) : key === 'drones' ? 0 : (isSelected ? 3 : 7);
    const y = isSelected ? -12 : 20;
    const scale = isSelected ? 1.04 : 0.94;
    const opacity = isSelected ? 1 : 0.78;
    const zIndex = isSelected ? 3 : (key === 'drones' ? 2 : 1);

    return { xPercent, yPercent, rotate, y, scale, opacity, zIndex };
  };

  // GSAP 1: Initial Animation Sequence
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".hero-eyebrow", ".hero-title-line-1", ".hero-title-line-2", ".hero-description", ".hero-actions", ".hero-trust-microcopy"], { opacity: 1, y: 0 });
        gsap.set(".hero-fan-container", { opacity: 1, y: 0 });
        
        branchKeys.forEach((key) => {
          const cardEl = getCardRef(key).current;
          if (!cardEl) return;
          const isSelected = key === selectedBranch;
          const transforms = getCardTransforms(key, isSelected);

          gsap.set(cardEl, {
            xPercent: transforms.xPercent,
            yPercent: transforms.yPercent,
            rotate: transforms.rotate,
            y: transforms.y,
            scale: transforms.scale,
            opacity: transforms.opacity,
            zIndex: transforms.zIndex
          });
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' }
        });
        initialTimelineRef.current = tl;

        gsap.set([".hero-eyebrow", ".hero-title-line-1", ".hero-title-line-2", ".hero-description", ".hero-actions", ".hero-trust-microcopy"], { opacity: 0, y: 18 });
        gsap.set(".hero-fan-container", { opacity: 0, y: 16 });

        // Initial GSAP card setup prior to timeline animation
        branchKeys.forEach((key) => {
          const cardEl = getCardRef(key).current;
          if (!cardEl) return;
          const isSelected = key === selectedBranch;
          const t = getCardTransforms(key, isSelected);
          const initialXOffset = key === 'energia' ? -48 : key === 'it' ? 48 : 0;
          const initialYOffset = key === 'drones' ? 18 : 0;

          gsap.set(cardEl, {
            xPercent: t.xPercent,
            yPercent: t.yPercent,
            rotate: t.rotate,
            x: initialXOffset,
            y: t.y + initialYOffset,
            scale: t.scale,
            opacity: 0,
            zIndex: t.zIndex
          });
        });

        tl.to([".hero-eyebrow", ".hero-title-line-1", ".hero-title-line-2", ".hero-description", ".hero-actions", ".hero-trust-microcopy"], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out'
        })
        .to(".hero-fan-container", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, "-=0.4")
        .to(branchKeys.map(key => getCardRef(key).current), {
          x: 0,
          xPercent: (i) => getCardTransforms(branchKeys[i], branchKeys[i] === selectedBranch).xPercent,
          yPercent: -50,
          y: (i) => getCardTransforms(branchKeys[i], branchKeys[i] === selectedBranch).y,
          rotate: (i) => getCardTransforms(branchKeys[i], branchKeys[i] === selectedBranch).rotate,
          scale: (i) => getCardTransforms(branchKeys[i], branchKeys[i] === selectedBranch).scale,
          opacity: (i) => getCardTransforms(branchKeys[i], branchKeys[i] === selectedBranch).opacity,
          zIndex: (i) => getCardTransforms(branchKeys[i], branchKeys[i] === selectedBranch).zIndex,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out'
        }, "-=0.45");
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // GSAP 2: Branch switching transitions
  useLayoutEffect(() => {
    if (isFirstBranchEffectRef.current) {
      isFirstBranchEffectRef.current = false;
      return;
    }

    prevBranchRef.current = selectedBranch;

    if (initialTimelineRef.current?.isActive()) {
      initialTimelineRef.current.progress(1);
    }
    initialTimelineRef.current = null;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Card transform & opacity updates
    branchKeys.forEach((key) => {
      const cardEl = getCardRef(key).current;
      if (!cardEl) return;

      const isSelected = key === selectedBranch;
      const transforms = getCardTransforms(key, isSelected);

      if (isReduced) {
        gsap.set(cardEl, {
          xPercent: transforms.xPercent,
          yPercent: transforms.yPercent,
          rotate: transforms.rotate,
          y: transforms.y,
          scale: transforms.scale,
          opacity: transforms.opacity,
          zIndex: transforms.zIndex
        });
      } else {
        gsap.to(cardEl, {
          xPercent: transforms.xPercent,
          yPercent: transforms.yPercent,
          rotate: transforms.rotate,
          y: transforms.y,
          scale: transforms.scale,
          opacity: transforms.opacity,
          zIndex: transforms.zIndex,
          duration: 0.24,
          ease: 'power2.inOut'
        });
      }
    });

    // Caption crossfade
    branchKeys.forEach((key) => {
      const captionEl = getCaptionRef(key).current;
      if (!captionEl) return;
      const isCurrent = key === selectedBranch;

      if (isReduced) {
        gsap.set(captionEl, {
          display: isCurrent ? 'flex' : 'none',
          opacity: isCurrent ? 1 : 0,
          y: 0
        });
      } else {
        if (isCurrent) {
          gsap.set(captionEl, { display: 'flex', opacity: 0, y: 8 });
          gsap.to(captionEl, {
            opacity: 1,
            y: 0,
            duration: 0.28,
            ease: 'power2.out'
          });
        } else {
          gsap.to(captionEl, {
            opacity: 0,
            y: -6,
            duration: 0.15,
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(captionEl, { display: 'none' });
            }
          });
        }
      }
    });
  }, [selectedBranch]);

  const whatsappUrl = `https://wa.me/51991664146?text=${encodeURIComponent(
    'Hola, quisiera recibir asesoría para identificar la solución tecnológica adecuada para mi operación.'
  )}`;

  return (
    <section className="hero-section hero-dark-atmosphere" id="hero" ref={heroRef}>
      {/* Background Image Layer */}
      <div className="hero-bg-media" aria-hidden="true">
        <img 
          src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1783573198/CRtech_Background_Hero_vv59xw.png" 
          alt="" 
          className="hero-bg-img"
        />
        <div className="hero-navy-overlay"></div>
        <div className="hero-text-gradient"></div>
        <div className="hero-vignette"></div>
      </div>

      <div className="hero-grid">
        
        {/* Left Side: Editorial Copy & CTAs */}
        <div className="hero-copy">
          <span className="hero-eyebrow">
            TECNOLOGÍA PARA OPERACIONES QUE NO PUEDEN DETENERSE
          </span>
          <h1 className="hero-title">
            <span className="hero-title-line-1">Tu operación no puede detenerse.</span>
            <span className="hero-title-line-2 highlight-cyan">La tecnología correcta tampoco.</span>
          </h1>
          <p className="hero-description">
            Drones profesionales, energía autónoma y servicios TI, seleccionados, implementados y respaldados por especialistas en Perú.
          </p>
          
          <div className="hero-actions">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary hero-btn-main"
            >
              Hablar con un especialista
            </a>
            <a 
              href="#soluciones" 
              className="btn btn-secondary hero-btn-sub"
            >
              Explorar soluciones
            </a>
          </div>

          <div className="hero-trust-microcopy">
            <span className="trust-dot">●</span>
            <span>Representación oficial</span>
            <span className="trust-sep">·</span>
            <span>Implementación técnica</span>
            <span className="trust-sep">·</span>
            <span>Soporte local</span>
          </div>
        </div>

        {/* Right Side: 3-Card Fan Composition */}
        <div className="hero-editorial-right" id="hero-interactive-zone">
          
          <div 
            className="hero-fan-container" 
            role="tablist" 
            aria-label="Verticales de CR Technologies"
            onKeyDown={handleKeyDown}
          >
            {/* Card 1: Energía (Campo) */}
            <button
              ref={cardEnergiaRef}
              onClick={() => handleBranchSelect('energia')}
              className={`fan-card fan-card-energia ${selectedBranch === 'energia' ? 'active' : ''}`}
              role="tab"
              aria-selected={selectedBranch === 'energia'}
              aria-controls="hero-interactive-zone"
              tabIndex={selectedBranch === 'energia' ? 0 : -1}
              type="button"
              style={{
                zIndex: getCardTransforms('energia', selectedBranch === 'energia').zIndex,
                opacity: getCardTransforms('energia', selectedBranch === 'energia').opacity
              }}
            >
              <div className="fan-card-image-wrapper">
                <img 
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1784819108/Ecoflow_Panelsolar_wutdy1.jpg" 
                  alt="Paneles Solares y Energía Portátil EcoFlow" 
                  className="fan-card-img"
                />
                <div className="fan-card-overlay">
                  <div className="fan-card-badge">
                    <span className="fan-card-dot" style={{ backgroundColor: '#F4A825' }}></span>
                    <span className="fan-card-tag">CAMPO</span>
                  </div>
                  <div className="fan-card-title">Energía</div>
                </div>
              </div>
            </button>

            {/* Card 2: Drones (Aire) */}
            <button
              ref={cardDronesRef}
              onClick={() => handleBranchSelect('drones')}
              className={`fan-card fan-card-drones ${selectedBranch === 'drones' ? 'active' : ''}`}
              role="tab"
              aria-selected={selectedBranch === 'drones'}
              aria-controls="hero-interactive-zone"
              tabIndex={selectedBranch === 'drones' ? 0 : -1}
              type="button"
              style={{
                zIndex: getCardTransforms('drones', selectedBranch === 'drones').zIndex,
                opacity: getCardTransforms('drones', selectedBranch === 'drones').opacity
              }}
            >
              <div className="fan-card-image-wrapper">
                <img 
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1779929015/swellpro-peru-dron_jhkqhb.jpg" 
                  alt="Dron profesional SwellPro para inspección y logística" 
                  className="fan-card-img"
                />
                <div className="fan-card-overlay">
                  <div className="fan-card-badge">
                    <span className="fan-card-dot" style={{ backgroundColor: '#48BFEA' }}></span>
                    <span className="fan-card-tag">AIRE</span>
                  </div>
                  <div className="fan-card-title">Drones</div>
                </div>
              </div>
            </button>

            {/* Card 3: Servicios TI (Empresa) */}
            <button
              ref={cardItRef}
              onClick={() => handleBranchSelect('it')}
              className={`fan-card fan-card-it ${selectedBranch === 'it' ? 'active' : ''}`}
              role="tab"
              aria-selected={selectedBranch === 'it'}
              aria-controls="hero-interactive-zone"
              tabIndex={selectedBranch === 'it' ? 0 : -1}
              type="button"
              style={{
                zIndex: getCardTransforms('it', selectedBranch === 'it').zIndex,
                opacity: getCardTransforms('it', selectedBranch === 'it').opacity
              }}
            >
              <div className="fan-card-image-wrapper">
                <img 
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1784819329/pexels-tima-miroshnichenko-5717235_kggduv.jpg" 
                  alt="Servicios TI e Infraestructura Corporativa" 
                  className="fan-card-img"
                />
                <div className="fan-card-overlay">
                  <div className="fan-card-badge">
                    <span className="fan-card-dot" style={{ backgroundColor: '#7067E8' }}></span>
                    <span className="fan-card-tag">EMPRESA</span>
                  </div>
                  <div className="fan-card-title">Servicios TI</div>
                </div>
              </div>
            </button>
          </div>

          {/* Caption & Contextual CTA for active branch */}
          <div className="hero-editorial-caption">
            {branchKeys.map(key => (
              <div 
                key={key}
                ref={getCaptionRef(key)}
                className={`caption-block-${key} hero-caption`}
                style={{ display: key === selectedBranch ? 'flex' : 'none', opacity: key === selectedBranch ? 1 : 0 }}
              >
                <div className="hero-caption-left">
                  <div className="hero-caption-header">
                    <span className="hero-caption-dot" style={{ backgroundColor: branches[key].color }}></span>
                    <span className="hero-caption-label" style={{ color: branches[key].color }}>
                      {branches[key].tag.toUpperCase()} · {branches[key].name}
                    </span>
                  </div>
                  <p className="hero-caption-description">
                    {branches[key].phrase}
                  </p>
                </div>
                <div className="hero-caption-right">
                  <a href={branches[key].link} className="hero-caption-btn" style={{ borderColor: branches[key].color }}>
                    <span>{branches[key].linkText}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow-icon">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
