import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';

gsap.registerPlugin(ScrollTrigger);

export default function SolutionsOverview() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.fromTo(
          ['.section-header', '#drones .solution-block-info', '#drones .solution-block-media', '#energia .solution-block-info', '#energia .solution-block-media', '#servicios-ti .solution-block-info', '#servicios-ti .solution-block-media'],
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.15,
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
        gsap.set(['.drone-flight-path'], { strokeDashoffset: 0, opacity: 1 });
        gsap.set(['.drone-path-dot'], { opacity: 1, scale: 1 });
        return;
      }

      // 1. Header Animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-header',
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      headerTl.fromTo(
        '.section-title',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
      ).fromTo(
        '.highlight-text',
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power3.out' },
        '-=0.2'
      );

      const mm = gsap.matchMedia();

      // Desktop & Tablet (>= 768px)
      mm.add('(min-width: 768px)', () => {
        // Drones Block
        const dronesTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#drones',
            start: 'top 78%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
        dronesTl
          .fromTo(
            '#drones .solution-block-info',
            { opacity: 0, x: -24 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
          )
          .fromTo(
            '#drones .solution-block-media',
            { opacity: 0, x: 24, scale: 0.98 },
            { opacity: 1, x: 0, scale: 1, duration: 0.65, ease: 'power3.out' },
            '<'
          )
          .fromTo(
            '#drones .block-features-list li',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.06 },
            '-=0.3'
          );

        // Energía Block
        const energiaTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#energia',
            start: 'top 78%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
        energiaTl
          .fromTo(
            '#energia .solution-block-media',
            { opacity: 0, x: -22 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
          )
          .fromTo(
            '#energia .solution-block-info',
            { opacity: 0, x: 22 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
            '<'
          )
          .fromTo(
            '#energia .block-features-list li',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.06 },
            '-=0.3'
          );

        // Servicios TI Block
        const tiTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#servicios-ti',
            start: 'top 78%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
        tiTl
          .fromTo(
            '#servicios-ti .solution-block-info',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
          )
          .fromTo(
            '#servicios-ti .solution-block-media',
            { opacity: 0, x: 20, scale: 0.985 },
            { opacity: 1, x: 0, scale: 1, duration: 0.65, ease: 'power3.out' },
            '<'
          )
          .fromTo(
            '#servicios-ti .block-features-list li',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.06 },
            '-=0.3'
          );
      });

      // Mobile (< 768px)
      mm.add('(max-width: 767px)', () => {
        // Drones Mobile
        const dronesMobTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#drones',
            start: 'top 82%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
        dronesMobTl
          .fromTo(
            '#drones .solution-block-info',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
          )
          .fromTo(
            '#drones .solution-block-media',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
            '-=0.3'
          )
          .fromTo(
            '#drones .block-features-list li',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', stagger: 0.05 },
            '-=0.2'
          );

        // Energía Mobile
        const energiaMobTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#energia',
            start: 'top 82%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
        energiaMobTl
          .fromTo(
            '#energia .solution-block-info',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
          )
          .fromTo(
            '#energia .solution-block-media',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
            '-=0.3'
          )
          .fromTo(
            '#energia .block-features-list li',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', stagger: 0.05 },
            '-=0.2'
          );

        // Servicios TI Mobile
        const tiMobTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#servicios-ti',
            start: 'top 82%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
        tiMobTl
          .fromTo(
            '#servicios-ti .solution-block-info',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
          )
          .fromTo(
            '#servicios-ti .solution-block-media',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
            '-=0.3'
          )
          .fromTo(
            '#servicios-ti .block-features-list li',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', stagger: 0.05 },
            '-=0.2'
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="solutions-section" id="soluciones" ref={sectionRef}>
      {/* SECTION 6: Commercial Transition Editorial Header */}
      <div className="commercial-transition-header">
        <span className="transition-eyebrow">UN SOLO CRITERIO. TRES CAPACIDADES.</span>
        <h2 className="transition-title">
          No necesitas acumular tecnología.<br />
          <span className="highlight-text">Necesitas una operación que responda.</span>
        </h2>
        <p className="transition-description">
          CRTech analiza el entorno, identifica el riesgo operativo y articula la tecnología adecuada para mantener personas, equipos e información en movimiento.
        </p>
        
        <div className="transition-signals-grid">
          <div className="signal-pill">
            <span className="signal-icon">👁</span>
            <span className="signal-text">Mayor visibilidad para decidir</span>
          </div>
          <div className="signal-pill">
            <span className="signal-icon">⚡</span>
            <span className="signal-text">Autonomía para continuar</span>
          </div>
          <div className="signal-pill">
            <span className="signal-icon">🛡</span>
            <span className="signal-text">Infraestructura para responder</span>
          </div>
        </div>
      </div>

      {/* SECTION 7: Reconstructed 3 Verticals */}
      <div className="solutions-blocks-container">
        
        {/* BLOCK 1: Drones Profesionales (Aire) */}
        <div className="solution-block-item" id="drones">
          <div className="solution-block-grid">
            
            <div className="solution-block-info">
              <span className="block-eyebrow cyan">AIRE · DRONES PROFESIONALES</span>
              <h3 className="block-title">Observa, alcanza y responde donde la operación lo exige.</h3>
              <p className="block-description">
                Tecnología aérea impermeable para inspección, monitoreo, pesca, rescate y trabajo de campo, con capacitación, repuestos y soporte especializado en Perú.
              </p>
              
              <ul className="block-features-list">
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Visibilidad extendida:</strong> Amplía la visibilidad sin exponer innecesariamente al equipo.
                  </div>
                </li>
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Resistencia extrema:</strong> Opera sobre agua, costa y entornos exigentes.
                  </div>
                </li>
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Respaldo en Perú:</strong> Cuenta con capacitación y soporte técnico local.
                  </div>
                </li>
              </ul>

              <div className="block-cta-row">
                <a 
                  href="#/drones" 
                  className="btn btn-secondary-accent cyan"
                >
                  Explorar Drones Profesionales
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            <div className="solution-block-media">
              <div className="media-card-frame">
                <img 
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1783573198/CRtech_Background_Hero_vv59xw.png" 
                  alt="Drones Profesionales SwellPro CRTech" 
                  className="block-media-img"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
                <svg 
                  viewBox="0 0 600 400" 
                  fill="none" 
                  className="drone-overlay-svg" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="dronePathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#0284C7" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  <path 
                    className="drone-flight-path"
                    d="M 60 320 C 180 290, 240 180, 420 120 C 470 100, 510 110, 530 90" 
                    stroke="url(#dronePathGrad)" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    pathLength="1"
                  />
                  <circle className="drone-path-dot" cx="530" cy="90" r="4.5" fill="#38BDF8" />
                </svg>
                <div className="media-caption">
                  <span>Operación de Drones SwellPro para inspección, rescate y pesca profesional</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BLOCK 2: Energía Autónoma (Campo) */}
        <div className="solution-block-item alt-bg" id="energia">
          <div className="solution-block-grid reverse">
            
            <div className="solution-block-info">
              <span className="block-eyebrow amber">CAMPO · ENERGÍA AUTÓNOMA</span>
              <h3 className="block-title">Mantén equipos y procesos activos incluso fuera de la red.</h3>
              <p className="block-description">
                Estaciones EcoFlow y generación solar dimensionadas para trabajo de campo, respaldo, movilidad y continuidad operativa.
              </p>
              
              <ul className="block-features-list">
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Movilidad limpia:</strong> Energía silenciosa y transportable.
                  </div>
                </li>
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Respaldo instantáneo:</strong> Respaldo ante interrupciones o ubicaciones remotas.
                  </div>
                </li>
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Dimensionamiento técnico:</strong> Configuración según consumo, autonomía y condiciones de uso.
                  </div>
                </li>
              </ul>

              <div className="block-cta-row">
                <a 
                  href="#/energia"
                  className="btn btn-secondary-accent amber"
                >
                  Explorar Energía EcoFlow
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            <div className="solution-block-media">
              <div className="media-card-frame energy-showcase-frame">
                <img 
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422192/Ecoflow_PowerBankMagnetic_pucvzv.png" 
                  alt="Soluciones de Energía y Almacenamiento EcoFlow" 
                  className="block-media-img contain-img"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
                <div className="media-caption">
                  <span>Soluciones EcoFlow para autonomía energética en campo y emergencias</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BLOCK 3: Servicios TI (Empresa) */}
        <div className="solution-block-item" id="servicios-ti">
          <div className="solution-block-grid">
            
            <div className="solution-block-info">
              <span className="block-eyebrow violet">EMPRESA · SERVICIOS TI</span>
              <h3 className="block-title">Conecta, protege y sostiene la infraestructura que mueve tu empresa.</h3>
              <p className="block-description">
                Redes, soporte tecnológico, videovigilancia y continuidad implementados con documentación y acompañamiento técnico local.
              </p>
              
              <ul className="block-features-list">
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Control de red:</strong> Visibilidad sobre la infraestructura crítica.
                  </div>
                </li>
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Soporte oportuno:</strong> Respuesta técnica ante fallas e incidencias.
                  </div>
                </li>
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Protección integral:</strong> Seguridad y continuidad para equipos e información.
                  </div>
                </li>
              </ul>

              <div className="block-cta-row">
                <a 
                  href="#/servicios-ti"
                  className="btn btn-secondary-accent violet"
                >
                  Explorar Servicios TI
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            <div className="solution-block-media">
              <div className="media-card-frame ti-showcase-frame">
                <img 
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1784917692/pexels-kindelmedia-8982662_lsubce.jpg" 
                  alt="Infraestructura de Servicios TI Corporativos" 
                  className="block-media-img"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
                <div className="media-caption">
                  <span>Infraestructura de red, servidores y seguridad de alta disponibilidad</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
