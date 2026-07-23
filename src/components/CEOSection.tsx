import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';

gsap.registerPlugin(ScrollTrigger);

export default function CEOSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const whatsappUrl = `https://wa.me/51991664146?text=${encodeURIComponent(
    'Hola, quisiera recibir asesoría para identificar la solución tecnológica adecuada para mi operación.'
  )}`;

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.fromTo(
          ['.ceo-photo', '.ceo-caption-overlay', '.ceo-content-side'],
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
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      tl.fromTo(
        '.ceo-photo',
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' }
      )
        .fromTo(
          '.ceo-caption-overlay',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
          '-=0.25'
        )
        .fromTo(
          ['.ceo-tag', '.ceo-section-title', '.ceo-paragraph'],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.08 },
          '-=0.3'
        )
        .fromTo(
          '.pillar-item',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.07 },
          '-=0.2'
        )
        .fromTo(
          '.ceo-cta-row',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
          '-=0.15'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ceo-section" id="nosotros" ref={sectionRef}>
      <div className="ceo-container">
        <div className="ceo-grid">
          
          {/* Photo Side */}
          <div className="ceo-media-side">
            <figure className="ceo-figure">
              <div className="ceo-image-wrapper">
                <img 
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782397237/CarlosRivera_CRTech_FotoCEO_is07qk.png" 
                  alt="Carlos Rivera, Gerente General de CR Technologies & Services" 
                  className="ceo-photo"
                  loading="lazy"
                  decoding="async"
                  width="500"
                  height="600"
                />
                <figcaption className="ceo-caption-overlay">
                  <span className="ceo-name">Carlos Rivera</span>
                  <span className="ceo-role">Gerente General · CR Technologies & Services</span>
                </figcaption>
              </div>
            </figure>
          </div>

          {/* Narrative Side */}
          <div className="ceo-content-side">
            <span className="ceo-tag">CRITERIO TÉCNICO Y ACOMPAÑAMIENTO LOCAL</span>
            <h2 className="ceo-section-title">
              Antes de recomendar un equipo,<br />
              <span className="highlight-text">entendemos qué debe seguir funcionando.</span>
            </h2>
            <p className="ceo-paragraph">
              CRTech acompaña a empresas, instituciones y equipos operativos desde la evaluación de la necesidad hasta la puesta en marcha y el soporte. Cada recomendación considera el entorno, la geografía, el nivel de riesgo y la realidad de la operación.
            </p>

            <div className="ceo-pillars-grid">
              
              <div className="pillar-item">
                <div className="pillar-header">
                  <div className="pillar-icon-dot"></div>
                  <h4 className="pillar-title">Escucha y diagnóstico</h4>
                </div>
                <p className="pillar-desc">
                  Escucha activa y diagnóstico previo a la cotización formal.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-header">
                  <div className="pillar-icon-dot"></div>
                  <h4 className="pillar-title">Selección contextual</h4>
                </div>
                <p className="pillar-desc">
                  Selección técnica según el entorno real de trabajo.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-header">
                  <div className="pillar-icon-dot"></div>
                  <h4 className="pillar-title">Respaldo continuo</h4>
                </div>
                <p className="pillar-desc">
                  Implementación, capacitación y respaldo local en Perú.
                </p>
              </div>

            </div>

            <div className="ceo-cta-row">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary ceo-discrete-btn"
              >
                Conversar con el equipo CRTech
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
