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
  const [hoveredBranch, setHoveredBranch] = useState<BranchKey | null>(null);

  // Refs for elements and scoping
  const heroRef = useRef<HTMLDivElement>(null);
  
  const pathDronesRef = useRef<SVGPathElement>(null);
  const pathEnergiaRef = useRef<SVGPathElement>(null);
  const pathItRef = useRef<SVGPathElement>(null);

  const dotDronesRef = useRef<SVGCircleElement>(null);
  const dotEnergiaRef = useRef<SVGCircleElement>(null);
  const dotItRef = useRef<SVGCircleElement>(null);

  const centralDotRef = useRef<SVGCircleElement>(null);
  const centralHaloRef = useRef<SVGCircleElement>(null);

  const btnDronesRef = useRef<HTMLButtonElement>(null);
  const btnEnergiaRef = useRef<HTMLButtonElement>(null);
  const btnItRef = useRef<HTMLButtonElement>(null);

  const dronesMediaRef = useRef<HTMLDivElement>(null);
  const energiaMediaRef = useRef<HTMLDivElement>(null);
  const itMediaRef = useRef<HTMLDivElement>(null);

  const dronesCaptionRef = useRef<HTMLDivElement>(null);
  const energiaCaptionRef = useRef<HTMLDivElement>(null);
  const itCaptionRef = useRef<HTMLDivElement>(null);

  const prevBranchRef = useRef<BranchKey>('drones');

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

  const getMediaRef = (key: BranchKey) => {
    if (key === 'drones') return dronesMediaRef;
    if (key === 'energia') return energiaMediaRef;
    return itMediaRef;
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
    
    // Defer focus so rendering/DOM is updated
    setTimeout(() => {
      const btn = document.querySelector(`.btn-${nextBranch}`) as HTMLButtonElement;
      if (btn) {
        btn.focus();
      }
    }, 0);
  };

  // GSAP 1: Initial Animation Sequence and Media Queries
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // CASE A: REDUCED MOTION ENABLED
      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Instant visual presence, zero displacements or motion
        gsap.set([".hero-badge", ".hero-title", ".hero-description", ".hero-actions"], { opacity: 1, y: 0 });
        gsap.set([centralDotRef.current, centralHaloRef.current], { opacity: 1, scale: 1 });
        
        const paths = [pathDronesRef.current, pathEnergiaRef.current, pathItRef.current];
        const colors = ['#48BFEA', '#F4A825', '#7067E8'];
        
        paths.forEach((p, i) => {
          if (p) {
            const key = branchKeys[i];
            const isSelected = key === selectedBranch;
            gsap.set(p, {
              strokeDasharray: 'none',
              strokeDashoffset: 0,
              stroke: isSelected ? colors[i] : '#CBD5E1',
              strokeWidth: isSelected ? 3.5 : 1.5,
              opacity: isSelected ? 1 : 0.3
            });
          }
        });

        const dots = [dotDronesRef.current, dotEnergiaRef.current, dotItRef.current];
        dots.forEach((dot, i) => {
          if (dot) {
            const key = branchKeys[i];
            const isSelected = key === selectedBranch;
            gsap.set(dot, {
              fill: isSelected ? colors[i] : '#94A3B8',
              r: isSelected ? 7 : 5
            });
          }
        });

        // Set buttons visible
        gsap.set([btnDronesRef.current, btnEnergiaRef.current, btnItRef.current], { opacity: 1, y: 0 });

        // Show selected branch content
        branchKeys.forEach(key => {
          const isCurrent = key === selectedBranch;
          const mediaEl = getMediaRef(key).current;
          const captionEl = getCaptionRef(key).current;
          
          if (mediaEl) {
            gsap.set(mediaEl, { display: isCurrent ? 'block' : 'none', opacity: isCurrent ? 1 : 0, y: 0 });
            const img = mediaEl.querySelector('.editorial-display-img');
            if (img) gsap.set(img, { scale: 1 });
          }
          if (captionEl) {
            gsap.set(captionEl, { display: isCurrent ? 'block' : 'none', opacity: isCurrent ? 1 : 0, y: 0 });
          }
        });
      });

      // CASE B: NO PREFERENCE - PREMIUM CINEMATIC SEQUENCES
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power2.out' }
        });

        // Initial invisible states with targeted offsets
        gsap.set([".hero-badge", ".hero-title", ".hero-description", ".hero-actions"], { opacity: 0, y: 16 });
        gsap.set([centralDotRef.current, centralHaloRef.current], { opacity: 0, scale: 0.9 });
        
        // Setup initial paths offsets
        const paths = [pathDronesRef.current, pathEnergiaRef.current, pathItRef.current];
        paths.forEach(p => {
          if (p) {
            const len = p.getTotalLength();
            gsap.set(p, {
              strokeDasharray: len,
              strokeDashoffset: len,
              opacity: 1
            });
          }
        });

        // Setup dots and buttons invisible
        gsap.set([dotDronesRef.current, dotEnergiaRef.current, dotItRef.current], { opacity: 0 });
        gsap.set([btnDronesRef.current, btnEnergiaRef.current, btnItRef.current], { opacity: 0, y: 6 });

        // Force other branches to be completely hidden on mount
        gsap.set([energiaMediaRef.current, itMediaRef.current, energiaCaptionRef.current, itCaptionRef.current], { display: 'none', opacity: 0 });
        gsap.set([dronesMediaRef.current, dronesCaptionRef.current], { display: 'block', opacity: 0, y: 10 });
        gsap.set(".drones-media img", { scale: 1.02 });

        // Sequence Builder
        tl.to([".hero-badge", ".hero-title", ".hero-description", ".hero-actions"], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out'
        })
        .to([centralDotRef.current, centralHaloRef.current], {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'power2.out'
        }, "-=0.3")
        .to(paths, {
          strokeDashoffset: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power2.inOut'
        }, "-=0.2")
        .to([dotDronesRef.current, dotEnergiaRef.current, dotItRef.current], {
          opacity: 1,
          duration: 0.2
        }, "<+=0.4")
        .to([btnDronesRef.current, btnEnergiaRef.current, btnItRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.08,
          ease: 'power2.out'
        }, "-=0.6")
        .to(dronesMediaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out'
        }, "-=0.35")
        .to(".drones-media img", {
          scale: 1,
          duration: 0.6,
          ease: 'power3.out'
        }, "<")
        .to(dronesCaptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out'
        }, "-=0.45");
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // GSAP 2: Branch switching and active states transition
  useLayoutEffect(() => {
    const prevBranch = prevBranchRef.current;
    prevBranchRef.current = selectedBranch;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const pathRefs = [pathDronesRef.current, pathEnergiaRef.current, pathItRef.current];
    const dotRefs = [dotDronesRef.current, dotEnergiaRef.current, dotItRef.current];
    const colors = ['#48BFEA', '#F4A825', '#7067E8'];

    // Part A: Animate SVG network lines and terminal dots
    branchKeys.forEach((key, i) => {
      const isSelected = key === selectedBranch;
      const pathEl = pathRefs[i];
      const dotEl = dotRefs[i];

      if (pathEl) {
        gsap.killTweensOf(pathEl);
        if (isReduced) {
          gsap.set(pathEl, {
            stroke: isSelected ? colors[i] : '#CBD5E1',
            strokeWidth: isSelected ? 3.5 : 1.5,
            opacity: isSelected ? 1 : 0.3
          });
        } else {
          gsap.to(pathEl, {
            stroke: isSelected ? colors[i] : '#CBD5E1',
            strokeWidth: isSelected ? 3.5 : 1.5,
            opacity: isSelected ? 1 : 0.3,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }

      if (dotEl) {
        gsap.killTweensOf(dotEl);
        if (isReduced) {
          gsap.set(dotEl, {
            fill: isSelected ? colors[i] : '#94A3B8',
            r: isSelected ? 7 : 5
          });
        } else {
          if (isSelected && prevBranch !== selectedBranch) {
            // Pulse node final scale 1 -> 1.08 over 160ms and back to 1
            gsap.timeline()
              .to(dotEl, { r: 7 * 1.08, fill: colors[i], duration: 0.16, ease: 'power2.out' })
              .to(dotEl, { r: 7, duration: 0.16, ease: 'power2.inOut' });
          } else {
            gsap.to(dotEl, {
              fill: isSelected ? colors[i] : '#94A3B8',
              r: isSelected ? 7 : 5,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        }
      }
    });

    // Part B: Switch viewer media panel and caption info cards
    if (prevBranch !== selectedBranch) {
      const prevMedia = getMediaRef(prevBranch).current;
      const prevCaption = getCaptionRef(prevBranch).current;
      const nextMedia = getMediaRef(selectedBranch).current;
      const nextCaption = getCaptionRef(selectedBranch).current;

      // Clean up previous animations immediately to prevent stacking or overlap
      if (prevMedia) gsap.killTweensOf(prevMedia);
      if (prevCaption) gsap.killTweensOf(prevCaption);
      if (nextMedia) gsap.killTweensOf(nextMedia);
      if (nextCaption) gsap.killTweensOf(nextCaption);

      const prevImg = prevMedia?.querySelector('.editorial-display-img');
      const nextImg = nextMedia?.querySelector('.editorial-display-img');
      if (prevImg) gsap.killTweensOf(prevImg);
      if (nextImg) gsap.killTweensOf(nextImg);

      if (isReduced) {
        // Quick 150ms opacity crossfade for reduced motion
        if (prevMedia) gsap.set(prevMedia, { opacity: 0, display: 'none' });
        if (prevCaption) gsap.set(prevCaption, { opacity: 0, display: 'none' });

        if (nextMedia) {
          gsap.set(nextMedia, { display: 'block', opacity: 0 });
          gsap.to(nextMedia, { opacity: 1, duration: 0.15, ease: 'none' });
        }
        if (nextCaption) {
          gsap.set(nextCaption, { display: 'block', opacity: 0 });
          gsap.to(nextCaption, { opacity: 1, duration: 0.15, ease: 'none' });
        }
      } else {
        // Premium editorial transition
        // Animate exit of current content
        if (prevMedia) {
          gsap.to(prevMedia, {
            opacity: 0,
            y: -8, // displacement 6-8px
            duration: 0.14, // 0.12-0.16s
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(prevMedia, { display: 'none' });
            }
          });
        }
        if (prevCaption) {
          gsap.to(prevCaption, {
            opacity: 0,
            y: -8,
            duration: 0.14,
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(prevCaption, { display: 'none' });
            }
          });
        }

        // Animate entrance of new content
        if (nextMedia) {
          gsap.set(nextMedia, { display: 'block', opacity: 0, y: 12 });
          if (nextImg) {
            gsap.set(nextImg, { scale: 1.015 });
          }

          gsap.to(nextMedia, {
            opacity: 1,
            y: 0,
            duration: 0.4, // 0.35-0.45s
            ease: 'power3.out'
          });

          if (nextImg) {
            gsap.to(nextImg, {
              scale: 1,
              duration: 0.4,
              ease: 'power3.out'
            });
          }
        }

        if (nextCaption) {
          gsap.set(nextCaption, { display: 'block', opacity: 0, y: 12 });
          gsap.to(nextCaption, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power3.out'
          });
        }
      }
    }
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

        {/* Right Side: Interactive Editorial Visual with Premium Open Layout */}
        <div className="hero-editorial-right" id="hero-interactive-zone">
          
          {/* Branch routes / path diagram */}
          <div className="branches-interactive-network">
            <svg 
              className="branches-editorial-svg" 
              viewBox="0 0 500 130" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Central Core representing CR Tech at (250, 115) */}
              <circle ref={centralDotRef} cx="250" cy="115" r="5" fill="#168BFF" />
              <circle ref={centralHaloRef} cx="250" cy="115" r="12" stroke="#168BFF" strokeWidth="1" strokeOpacity="0.5" fill="none" />
              
              {/* Connective Paths */}
              {/* Path 1: To Drones (Aire) on the Left (70, 30) */}
              <path 
                ref={pathDronesRef}
                d="M 250 115 C 170 115, 95 85, 70 30" 
                stroke={selectedBranch === 'drones' ? '#48BFEA' : '#CBD5E1'} 
                strokeWidth={selectedBranch === 'drones' ? '3.5' : '1.5'} 
                style={{ transition: 'stroke-width 0.3s ease, stroke 0.3s ease' }}
              />
              <circle 
                ref={dotDronesRef}
                cx="70" 
                cy="30" 
                r={selectedBranch === 'drones' ? '7' : (hoveredBranch === 'drones' ? '6' : '5')} 
                fill={selectedBranch === 'drones' ? '#48BFEA' : (hoveredBranch === 'drones' ? '#48BFEA' : '#94A3B8')} 
                style={{ transition: 'all 0.15s ease' }} 
              />
              
              {/* Path 2: To Energía (Campo) in the Center (250, 20) */}
              <path 
                ref={pathEnergiaRef}
                d="M 250 115 L 250 20" 
                stroke={selectedBranch === 'energia' ? '#F4A825' : '#CBD5E1'} 
                strokeWidth={selectedBranch === 'energia' ? '3.5' : '1.5'} 
                style={{ transition: 'stroke-width 0.3s ease, stroke 0.3s ease' }}
              />
              <circle 
                ref={dotEnergiaRef}
                cx="250" 
                cy="20" 
                r={selectedBranch === 'energia' ? '7' : (hoveredBranch === 'energia' ? '6' : '5')} 
                fill={selectedBranch === 'energia' ? '#F4A825' : (hoveredBranch === 'energia' ? '#F4A825' : '#94A3B8')} 
                style={{ transition: 'all 0.15s ease' }} 
              />
              
              {/* Path 3: To Servicios TI (Empresa) on the Right (430, 30) */}
              <path 
                ref={pathItRef}
                d="M 250 115 C 330 115, 405 85, 430 30" 
                stroke={selectedBranch === 'it' ? '#7067E8' : '#CBD5E1'} 
                strokeWidth={selectedBranch === 'it' ? '3.5' : '1.5'} 
                style={{ transition: 'stroke-width 0.3s ease, stroke 0.3s ease' }}
              />
              <circle 
                ref={dotItRef}
                cx="430" 
                cy="30" 
                r={selectedBranch === 'it' ? '7' : (hoveredBranch === 'it' ? '6' : '5')} 
                fill={selectedBranch === 'it' ? '#7067E8' : (hoveredBranch === 'it' ? '#7067E8' : '#94A3B8')} 
                style={{ transition: 'all 0.15s ease' }} 
              />
            </svg>

            {/* Fully keyboard-accessible branch selector buttons positioned at the endpoints of the SVG */}
            <div 
              className="branch-label-buttons" 
              role="tablist" 
              aria-label="Seleccionar rama de negocio"
              onKeyDown={handleKeyDown}
            >
              {/* Button Wrapper 1: Drones */}
              <div 
                className="branch-btn-wrapper absolute" 
                style={{ left: '14%', top: '15%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
              >
                <button
                  ref={btnDronesRef}
                  onClick={() => handleBranchSelect('drones')}
                  onMouseEnter={() => setHoveredBranch('drones')}
                  onMouseLeave={() => setHoveredBranch(null)}
                  className={`branch-editorial-btn btn-drones ${selectedBranch === 'drones' ? 'active' : ''}`}
                  role="tab"
                  aria-selected={selectedBranch === 'drones'}
                  aria-controls="hero-interactive-zone"
                  tabIndex={selectedBranch === 'drones' ? 0 : -1}
                  type="button"
                >
                  <span className="branch-btn-dot" style={{ backgroundColor: '#48BFEA' }}></span>
                  <div className="branch-btn-text">
                    <span className="branch-btn-tag">Aire</span>
                    <span className="branch-btn-name">Drones</span>
                  </div>
                </button>
              </div>

              {/* Button Wrapper 2: Energía */}
              <div 
                className="branch-btn-wrapper absolute" 
                style={{ left: '50%', top: '2%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
              >
                <button
                  ref={btnEnergiaRef}
                  onClick={() => handleBranchSelect('energia')}
                  onMouseEnter={() => setHoveredBranch('energia')}
                  onMouseLeave={() => setHoveredBranch(null)}
                  className={`branch-editorial-btn btn-energia ${selectedBranch === 'energia' ? 'active' : ''}`}
                  role="tab"
                  aria-selected={selectedBranch === 'energia'}
                  aria-controls="hero-interactive-zone"
                  tabIndex={selectedBranch === 'energia' ? 0 : -1}
                  type="button"
                >
                  <span className="branch-btn-dot" style={{ backgroundColor: '#F4A825' }}></span>
                  <div className="branch-btn-text">
                    <span className="branch-btn-tag">Campo</span>
                    <span className="branch-btn-name">Energía</span>
                  </div>
                </button>
              </div>

              {/* Button Wrapper 3: Servicios TI */}
              <div 
                className="branch-btn-wrapper absolute" 
                style={{ left: '86%', top: '15%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
              >
                <button
                  ref={btnItRef}
                  onClick={() => handleBranchSelect('it')}
                  onMouseEnter={() => setHoveredBranch('it')}
                  onMouseLeave={() => setHoveredBranch(null)}
                  className={`branch-editorial-btn btn-it ${selectedBranch === 'it' ? 'active' : ''}`}
                  role="tab"
                  aria-selected={selectedBranch === 'it'}
                  aria-controls="hero-interactive-zone"
                  tabIndex={selectedBranch === 'it' ? 0 : -1}
                  type="button"
                >
                  <span className="branch-btn-dot" style={{ backgroundColor: '#7067E8' }}></span>
                  <div className="branch-btn-text">
                    <span className="branch-btn-tag">Empresa</span>
                    <span className="branch-btn-name">Servicios TI</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Image / Content Viewer with elegant mask (no card) */}
          <div className="hero-editorial-image-frame overflow-hidden relative">
            
            {/* Drones Content Wrapper */}
            <div 
              ref={dronesMediaRef}
              className="editorial-media-wrapper drones-media absolute inset-0 w-full h-full"
              style={{ display: 'block', opacity: 1 }}
            >
              <img 
                src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto,w_1400,c_fill,g_auto/v1779929016/swellpro-peru-dron-01_uvvj5z.jpg" 
                alt="Dron profesional SwellPro en acción cinematográfica" 
                className="editorial-display-img object-cover w-full h-full"
                fetchPriority="high"
              />
            </div>

            {/* Energía Content Wrapper */}
            <div 
              ref={energiaMediaRef}
              className="editorial-media-wrapper energia-media absolute inset-0 w-full h-full"
              style={{ display: 'none', opacity: 0 }}
            >
              <div className="editorial-product-display w-full h-full flex items-center justify-center">
                <img 
                  src={assets.ecoFlow.deltaPro} 
                  alt="Estación de energía EcoFlow Delta Pro" 
                  className="editorial-display-img object-contain max-h-full"
                  fetchPriority="high"
                />
              </div>
            </div>

            {/* Servicios TI Content Wrapper */}
            <div 
              ref={itMediaRef}
              className="editorial-media-wrapper it-media absolute inset-0 w-full h-full"
              style={{ display: 'none', opacity: 0 }}
            >
              <div className="editorial-it-display w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 400 160" fill="none" className="it-minimal-svg w-full" aria-hidden="true">
                  <path d="M40 80 Q 200 10, 360 80" stroke="#7067E8" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                  <path d="M40 80 H 360" stroke="#7067E8" strokeWidth="1" opacity="0.5" />
                  <circle cx="40" cy="80" r="5" fill="#7067E8" />
                  <circle cx="200" cy="80" r="7" fill="#168BFF" />
                  <circle cx="360" cy="80" r="5" fill="#7067E8" />
                  
                  <text x="40" y="115" fill="#07152C" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-headings)">Infraestructura</text>
                  <text x="200" y="115" fill="#07152C" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-headings)">Soporte TI</text>
                  <text x="360" y="115" fill="#07152C" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-headings)">Seguridad</text>
                </svg>
              </div>
            </div>

          </div>

          {/* Underlay Info Caption - Editorial Layout */}
          <div className="hero-editorial-caption relative overflow-hidden" style={{ minHeight: '80px' }}>
            {branchKeys.map(key => (
              <div 
                key={key}
                ref={getCaptionRef(key)}
                className={`caption-block-${key} absolute inset-0 w-full flex flex-col justify-center`}
                style={{ display: key === 'drones' ? 'flex' : 'none', opacity: key === 'drones' ? 1 : 0 }}
              >
                <span className="caption-tag font-bold" style={{ color: branches[key].color }}>
                  {branches[key].tag} — {branches[key].name}
                </span>
                <p className="caption-text mt-1">{branches[key].phrase}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
