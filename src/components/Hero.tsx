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
          const baseRotate = key === 'energia' ? -6 : key === 'drones' ? 0 : 6;
          const activeRotate = key === 'energia' ? -3 : key === 'drones' ? 0 : 3;

          gsap.set(cardEl, {
            rotate: isSelected ? activeRotate : baseRotate,
            y: isSelected ? -12 : 18,
            scale: isSelected ? 1.03 : 0.94,
            opacity: isSelected ? 1 : 0.78,
            zIndex: isSelected ? 30 : (key === 'drones' ? 15 : 10)
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
        if (cardEnergiaRef.current) gsap.set(cardEnergiaRef.current, { x: 48, rotate: -6, opacity: 0 });
        if (cardDronesRef.current) gsap.set(cardDronesRef.current, { y: 18, rotate: 0, opacity: 0 });
        if (cardItRef.current) gsap.set(cardItRef.current, { x: -48, rotate: 6, opacity: 0 });

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
          y: (i) => {
            const key = branchKeys[i];
            return key === selectedBranch ? -12 : 18;
          },
          rotate: (i) => {
            const key = branchKeys[i];
            if (key === selectedBranch) {
              return key === 'energia' ? -3 : key === 'drones' ? 0 : 3;
            }
            return key === 'energia' ? -6 : key === 'drones' ? 0 : 6;
          },
          scale: (i) => (branchKeys[i] === selectedBranch ? 1.03 : 0.94),
          opacity: (i) => (branchKeys[i] === selectedBranch ? 1 : 0.78),
          zIndex: (i) => (branchKeys[i] === selectedBranch ? 30 : branchKeys[i] === 'drones' ? 15 : 10),
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
      const baseRotate = key === 'energia' ? -6 : key === 'drones' ? 0 : 6;
      const activeRotate = key === 'energia' ? -3 : key === 'drones' ? 0 : 3;

      const targetRotate = isSelected ? activeRotate : baseRotate;
      const targetY = isSelected ? -12 : 18;
      const targetScale = isSelected ? 1.03 : 0.94;
      const targetOpacity = isSelected ? 1 : 0.78;
      const targetZIndex = isSelected ? 30 : (key === 'drones' ? 15 : 10);

      if (isReduced) {
        gsap.set(cardEl, {
          rotate: targetRotate,
          y: targetY,
          scale: targetScale,
          opacity: targetOpacity,
          zIndex: targetZIndex
        });
      } else {
        gsap.to(cardEl, {
          rotate: targetRotate,
          y: targetY,
          scale: targetScale,
          opacity: targetOpacity,
          zIndex: targetZIndex,
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
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422177/Ecoflow_delta_PRO_g9xhmt.png" 
                  alt="Energía Portátil EcoFlow Delta Pro" 
                  className="fan-card-img fan-card-img-contain"
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
                  alt="Dron profesional SwellPro" 
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
                <div className="editorial-it-display w-full h-full flex items-center justify-center bg-slate-900 p-2">
                  <svg viewBox="0 0 400 160" fill="none" className="it-minimal-svg w-full" aria-hidden="true">
                    <path d="M40 80 Q 200 10, 360 80" stroke="#7067E8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
                    <path d="M40 80 H 360" stroke="#7067E8" strokeWidth="1.5" opacity="0.6" />
                    <circle cx="40" cy="80" r="6" fill="#7067E8" />
                    <circle cx="200" cy="80" r="8" fill="#48BFEA" />
                    <circle cx="360" cy="80" r="6" fill="#7067E8" />
                    
                    <text x="40" y="115" fill="#E2E8F0" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-headings)">Infraestructura</text>
                    <text x="200" y="115" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="var(--font-headings)">Soporte TI</text>
                    <text x="360" y="115" fill="#E2E8F0" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-headings)">Seguridad</text>
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
                style={{ display: key === selectedBranch ? 'flex' : 'none', opacity: key === selectedBranch ? 1 : 0 }}
              >
                <span className="hero-caption-label" style={{ color: branches[key].color }}>
                  {branches[key].tag.toUpperCase()} — {branches[key].name.toUpperCase()}
                </span>
                <span className="hero-caption-description">
                  {branches[key].phrase}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
