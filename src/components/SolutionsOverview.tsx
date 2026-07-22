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
        gsap.set(['.drone-flight-path', '.energy-flow-path', '.ti-main-path', '.ti-path-subtle-1', '.ti-path-subtle-2'], { strokeDashoffset: 0, opacity: 1 });
        gsap.set(['.drone-path-dot', '.energy-node-solar', '.energy-node-delta', '.ti-node-group'], { opacity: 1, scale: 1 });
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
          )
          .fromTo(
            '#drones .drone-flight-path',
            { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.3 },
            { strokeDashoffset: 0, opacity: 1, duration: 0.85, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            '#drones .drone-path-dot',
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out', transformOrigin: 'center center' },
            '-=0.2'
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
          )
          .fromTo(
            '#energia .energy-flow-path',
            { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.2 },
            { strokeDashoffset: 0, opacity: 0.95, duration: 0.85, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            '#energia .energy-node-solar, #energia .energy-node-delta',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out', stagger: 0.1, transformOrigin: 'center center' },
            '-=0.2'
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
          )
          .fromTo(
            '#servicios-ti .ti-main-path',
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            ['#servicios-ti .ti-path-subtle-1', '#servicios-ti .ti-path-subtle-2'],
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
            '<0.1'
          )
          .fromTo(
            '#servicios-ti .ti-node-group',
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08, transformOrigin: 'center center' },
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
          )
          .fromTo(
            '#drones .drone-flight-path',
            { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.2 },
            { strokeDashoffset: 0, opacity: 0.85, duration: 0.8, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo(
            '#drones .drone-path-dot',
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out', transformOrigin: 'center center' },
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
          )
          .fromTo(
            '#energia .energy-flow-path',
            { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.2 },
            { strokeDashoffset: 0, opacity: 0.85, duration: 0.8, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo(
            '#energia .energy-node-solar, #energia .energy-node-delta',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out', stagger: 0.1, transformOrigin: 'center center' },
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
          )
          .fromTo(
            '#servicios-ti .ti-main-path',
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo(
            ['#servicios-ti .ti-path-subtle-1', '#servicios-ti .ti-path-subtle-2'],
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
            '<0.1'
          )
          .fromTo(
            '#servicios-ti .ti-node-group',
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08, transformOrigin: 'center center' },
            '-=0.3'
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="solutions-section" id="soluciones" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">
          Una operación no necesita más tecnología. <span className="highlight-text">Necesita la tecnología correcta.</span>
        </h2>
      </div>

      <div className="solutions-blocks-container">
        
        {/* BLOCK 1: Drones Profesionales (Aire) */}
        <div className="solution-block-item" id="drones">
          <div className="solution-block-grid">
            
            <div className="solution-block-info">
              <span className="block-tag tag-cyan">Aire</span>
              <h3 className="block-title">Drones Profesionales</h3>
              <p className="block-description">
                Tecnología aérea robusta para inspección, seguridad, pesca, rescate y operaciones exigentes en mar y tierra peruana.
              </p>
              
              <ul className="block-features-list">
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Representación oficial:</strong> Acceso directo a equipos originales con garantía de fábrica SwellPro.
                  </div>
                </li>
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Capacitación especializada:</strong> Entrenamiento práctico y técnico para pilotos y equipos de campo.
                  </div>
                </li>
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Soporte técnico local:</strong> Servicio local para diagnósticos rápidos, mantenimiento y calibraciones.
                  </div>
                </li>
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Repuestos críticos:</strong> Stock local de partes y accesorios para garantizar continuidad de vuelos.
                  </div>
                </li>
              </ul>

              <div className="block-cta-row">
                <a 
                  href="#/drones" 
                  className="btn btn-secondary-accent cyan"
                >
                  Explorar Drones SwellPro Perú
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
                  src={assets.drones.inAction} 
                  alt="Dron profesional SwellPro en acción sobrevolando el mar" 
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
                  <span>Dron SwellPro FD3 en operación de monitoreo real</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BLOCK 2: Energía Portátil (Campo) */}
        <div className="solution-block-item alt-bg" id="energia">
          <div className="solution-block-grid reverse">
            
            <div className="solution-block-info">
              <span className="block-tag tag-amber">Campo</span>
              <h3 className="block-title">Energía Portátil</h3>
              <p className="block-description">
                Sistemas de energía autónoma EcoFlow y paneles solares para mantener operaciones críticas activas en cualquier ubicación.
              </p>
              
              <ul className="block-features-list">
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Trabajo de campo autónomo:</strong> Energía limpia, silenciosa y constante para laboratorios remotos y herramientas.
                  </div>
                </li>
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Respaldo crítico inmediato:</strong> Sistemas inteligentes que reaccionan instantáneamente ante cortes de suministro.
                  </div>
                </li>
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Hub de carga de campo:</strong> Estación centralizada de alta velocidad para drones, radios y ordenadores de campo.
                  </div>
                </li>
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Despliegue ágil:</strong> Soluciones compactas adaptables a vehículos todoterreno y campamentos móviles.
                  </div>
                </li>
              </ul>

              <div className="block-cta-row">
                <a 
                  href="https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20conocer%20las%20soluciones%20de%20energia%20EcoFlow%20para%20mi%20operacion."
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary-accent amber"
                >
                  Conocer soluciones de energía
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="solution-block-media">
              <div className="ecoflow-composition-wrapper">
                <div className="ecoflow-glow-bg" aria-hidden="true"></div>
                <svg 
                  viewBox="0 0 500 400" 
                  fill="none" 
                  className="ecoflow-overlay-svg" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="amberFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#D97706" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                  <path 
                    className="energy-flow-path"
                    d="M 120 110 C 200 85, 250 150, 310 230" 
                    stroke="url(#amberFlowGrad)" 
                    strokeWidth="2" 
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                    pathLength="1"
                  />
                  <circle className="energy-node-solar" cx="120" cy="110" r="4.5" fill="#F59E0B" />
                  <circle className="energy-node-delta" cx="310" cy="230" r="5" fill="#D97706" />
                </svg>
                <div className="ecoflow-support-product">
                  <img 
                    src={assets.ecoFlow.solarPanel} 
                    alt="EcoFlow paneles solares plegables" 
                    className="ecoflow-img-solar"
                    loading="lazy"
                    decoding="async"
                    width="450"
                    height="300"
                  />
                </div>
                <div className="ecoflow-main-product">
                  <img 
                    src={assets.ecoFlow.deltaPro} 
                    alt="EcoFlow Delta Pro estación de energía portátil" 
                    className="ecoflow-img-delta"
                    loading="lazy"
                    decoding="async"
                    width="500"
                    height="400"
                  />
                </div>
                <div className="ecoflow-caption">
                  Estación EcoFlow Delta Pro integrada con paneles solares de alta eficiencia
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BLOCK 3: Servicios TI (Empresa) */}
        <div className="solution-block-item" id="servicios-ti">
          <div className="solution-block-grid">
            
            <div className="solution-block-info">
              <span className="block-tag tag-violet">Empresa</span>
              <h3 className="block-title">Servicios TI</h3>
              <p className="block-description">
                Infraestructura de red, conectividad segura y soporte tecnológico continuo para blindar las operaciones de tu negocio.
              </p>
              
              <ul className="block-features-list">
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Redes e Infraestructura:</strong> Cableado estructurado, enlaces inalámbricos estables y fibra óptica.
                  </div>
                </li>
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Soporte operativo continuo:</strong> Asistencia especializada y mantenimiento de sistemas para evitar caídas.
                  </div>
                </li>
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Seguridad perimetral:</strong> Firewalls, routers de nivel empresarial y protección de datos críticos.
                  </div>
                </li>
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Videovigilancia inteligente:</strong> Sistemas CCTV con almacenamiento seguro y monitoreo centralizado.
                  </div>
                </li>
              </ul>

              <div className="block-cta-row">
                <a 
                  href="https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20conocer%20los%20servicios%20TI%20y%20redes%20para%20mi%20empresa."
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary-accent violet"
                >
                  Conocer servicios TI
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="solution-block-media">
              <div className="media-card-frame abstract-media-card">
                <div className="it-connectivity-diagram">
                  <svg viewBox="0 0 500 280" fill="none" className="connectivity-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#168BFF" stopOpacity="0.95" />
                        <stop offset="50%" stopColor="#7067E8" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.95" />
                      </linearGradient>
                    </defs>

                    {/* Secondary/Subtle backup & continuity lines (Continuidad y Respaldo) */}
                    <path 
                      className="ti-path-subtle-1"
                      d="M 50 130 C 120 70, 180 50, 250 60" 
                      stroke="#7067E8" 
                      strokeWidth="1.5" 
                      strokeDasharray="3 4"
                      opacity="0.3"
                      pathLength="1"
                    />
                    <path 
                      className="ti-path-subtle-2"
                      d="M 250 60 C 310 130, 390 230, 450 200" 
                      stroke="#10B981" 
                      strokeWidth="1.5" 
                      strokeDasharray="3 4"
                      opacity="0.3"
                      pathLength="1"
                    />

                    {/* Connecting main path */}
                    <path 
                      className="ti-main-path"
                      d="M 50 130 C 150 130, 150 60, 250 60 C 350 60, 350 200, 450 200" 
                      stroke="url(#lineGrad)" 
                      strokeWidth="3.5" 
                      strokeLinecap="round"
                      pathLength="1"
                    />

                    {/* Nodes */}
                    {/* Node 1: Infraestructura */}
                    <g className="ti-node-group">
                      <circle cx="50" cy="130" r="7" fill="#168BFF" />
                      <circle cx="50" cy="130" r="18" stroke="#168BFF" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
                      <text x="50" y="172" fill="#07152C" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="var(--font-headings)">Infraestructura</text>
                      <text x="50" y="192" fill="#5F6D80" fontSize="12" fontWeight="500" textAnchor="middle" fontFamily="var(--font-headings)">Redes y Conectividad</text>
                    </g>

                    {/* Node 2: Soporte */}
                    <g className="ti-node-group">
                      <circle cx="250" cy="60" r="7" fill="#7067E8" />
                      <circle cx="250" cy="60" r="18" stroke="#7067E8" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
                      <text x="250" y="102" fill="#07152C" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="var(--font-headings)">Soporte TI</text>
                      <text x="250" y="122" fill="#5F6D80" fontSize="12" fontWeight="500" textAnchor="middle" fontFamily="var(--font-headings)">Continuidad</text>
                    </g>

                    {/* Node 3: Seguridad */}
                    <g className="ti-node-group">
                      <circle cx="450" cy="200" r="7" fill="#10B981" />
                      <circle cx="450" cy="200" r="18" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
                      <text x="450" y="242" fill="#07152C" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="var(--font-headings)">Seguridad</text>
                      <text x="450" y="262" fill="#5F6D80" fontSize="12" fontWeight="500" textAnchor="middle" fontFamily="var(--font-headings)">Videovigilancia</text>
                    </g>
                  </svg>
                </div>
                <div className="media-caption">
                  <span>Plataforma operativa de red integrada de alta disponibilidad</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
