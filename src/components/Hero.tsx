import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { assets } from '../data/assets';

type BranchKey = 'drones' | 'energia' | 'it';

interface BranchData {
  id: BranchKey;
  tag: string;
  name: string;
  phrase: string;
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
      phrase: 'Sistemas aéreos no tripulados para inspección y logística.',
      color: '#48BFEA', // Cian
      bgColor: 'rgba(72, 191, 234, 0.08)',
      accentClass: 'accent-cyan'
    },
    energia: {
      id: 'energia',
      tag: 'Campo',
      name: 'Energía Portátil',
      phrase: 'Soluciones de carga autónoma y respaldo crítico.',
      color: '#F4A825', // Ámbar
      bgColor: 'rgba(244, 168, 37, 0.08)',
      accentClass: 'accent-amber'
    },
    it: {
      id: 'it',
      tag: 'Empresa',
      name: 'Servicios TI',
      phrase: 'Infraestructura digital y soporte para despliegues.',
      color: '#7067E8', // Violeta
      bgColor: 'rgba(112, 103, 232, 0.08)',
      accentClass: 'accent-violet'
    }
  };

  const branchKeys: BranchKey[] = ['drones', 'energia', 'it'];
  const selectedData = branches[selectedBranch];

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
        gsap.set([".hero-badge", ".hero-title", ".hero-description", ".hero-actions"], { opacity: 1, y: 0 });
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

        gsap.set([".hero-badge", ".hero-title", ".hero-description", ".hero-actions"], { opacity: 0, y: 16 });
        gsap.set(".hero-fan-container", { opacity: 0, y: 14 });

        // Initial GSAP card offsets prior to animation
        if (cardEnergiaRef.current) gsap.set(cardEnergiaRef.current, { xPercent: -108, yPercent: -50, x: -48, rotate: -7, opacity: 0 });
        if (cardDronesRef.current) gsap.set(cardDronesRef.current, { xPercent: -50, yPercent: -50, y: 18, rotate: 0, opacity: 0 });
        if (cardItRef.current) gsap.set(cardItRef.current, { xPercent: 8, yPercent: -50, x: 48, rotate: 7, opacity: 0 });

        tl.to([".hero-badge", ".hero-title", ".hero-description", ".hero-actions"], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out'
        })
        .to(".hero-fan-container", {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out'
        }, "-=0.3")
        .to([cardEnergiaRef.current, cardDronesRef.current, cardItRef.current], {
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
        }, "-=0.4");
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
          duration: 0.32,
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
          display: isCurrent ? 'grid' : 'none',
          opacity: isCurrent ? 1 : 0,
          y: 0
        });
      } else {
        if (isCurrent) {
          gsap.set(captionEl, { display: 'grid', opacity: 0, y: 8 });
          gsap.to(captionEl, {
            opacity: 1,
            y: 0,
            duration: 0.3,
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

  return (
    <section className="hero-section" id="hero" ref={heroRef}>
      <div className="hero-grid">
        
        {/* Left Side: Copy and CTAs */}
        <div className="hero-copy">
          <span className="hero-badge">
            Soluciones tecnológicas para operaciones reales
          </span>
          <h1 className="hero-title">
            Elige la tecnología que tu operación necesita.
          </h1>
          <p className="hero-description">
            Drones profesionales, energía autónoma y servicios TI integrados con asesoría, implementación y soporte local en Perú.
          </p>
          
          <div className="hero-actions">
            <a 
              href={assets.contact.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              Solicitar asesoría
            </a>
            <a 
              href="#soluciones" 
              className="btn btn-secondary"
            >
              Explorar soluciones
            </a>
          </div>
        </div>

        {/* Right Side: 3-Card Image Fan Composition */}
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
            >
              <div className="fan-card-image-wrapper">
                <img 
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422204/Ecoflow_paneles_solares_e4mpcp.png" 
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
            >
              <div className="fan-card-image-wrapper">
                <img 
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1779933447/fd3-image-17_e1q8iz.jpg" 
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
            >
              <div className="fan-card-image-wrapper">
                <div className="editorial-it-display w-full h-full flex items-center justify-center bg-slate-950 p-3">
                  <svg viewBox="0 0 240 240" fill="none" className="it-minimal-svg w-4/5 h-4/5" aria-hidden="true">
                    <rect x="20" y="30" width="200" height="42" rx="8" fill="#1E293B" stroke="#7067E8" strokeWidth="2" />
                    <circle cx="44" cy="51" r="5" fill="#7067E8" />
                    <circle cx="62" cy="51" r="5" fill="#48BFEA" />
                    <line x1="88" y1="51" x2="190" y2="51" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />

                    <rect x="20" y="94" width="200" height="42" rx="8" fill="#1E293B" stroke="#48BFEA" strokeWidth="2" />
                    <circle cx="44" cy="115" r="5" fill="#48BFEA" />
                    <circle cx="62" cy="115" r="5" fill="#10B981" />
                    <line x1="88" y1="115" x2="190" y2="115" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />

                    <rect x="20" y="158" width="200" height="42" rx="8" fill="#1E293B" stroke="#7067E8" strokeWidth="2" />
                    <circle cx="44" cy="179" r="5" fill="#7067E8" />
                    <circle cx="62" cy="179" r="5" fill="#F4A825" />
                    <line x1="88" y1="179" x2="190" y2="179" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />

                    <path d="M120 72 V 94 M120 136 V 158" stroke="#7067E8" strokeWidth="2" strokeDasharray="2 2" opacity="0.8" />
                  </svg>
                </div>
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

          {/* Underlay Info Caption */}
          <div className="hero-editorial-caption overflow-hidden">
            {branchKeys.map(key => (
              <div 
                key={key}
                ref={getCaptionRef(key)}
                className={`caption-block-${key} hero-caption absolute inset-0 w-full`}
                style={{ display: key === selectedBranch ? 'grid' : 'none', opacity: key === selectedBranch ? 1 : 0 }}
              >
                <span className="hero-caption-label" style={{ color: selectedData.color }}>
                  {selectedData.tag.toUpperCase()} — {selectedData.name.toUpperCase()}
                </span>
                <span className="hero-caption-description">
                  {selectedData.phrase}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
