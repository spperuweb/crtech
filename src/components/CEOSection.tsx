import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';

gsap.registerPlugin(ScrollTrigger);

export default function CEOSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
            <div className="ceo-image-wrapper">
              <img 
                src={assets.company.ceoCarlosRivera} 
                alt="Carlos Rivera, CEO de CR Technologies & Services" 
                className="ceo-photo"
                loading="lazy"
                decoding="async"
                width="500"
                height="600"
              />
              <div className="ceo-caption-overlay">
                <span className="ceo-name">Carlos Rivera</span>
                <span className="ceo-role">Gerente General - CR Tech</span>
              </div>
            </div>
          </div>

          {/* Narrative Side */}
          <div className="ceo-content-side">
            <span className="ceo-tag">Sobre Nosotros</span>
            <h2 className="ceo-section-title">
              Un aliado tecnológico, <span className="highlight-text">no solo un proveedor.</span>
            </h2>
            <p className="ceo-paragraph">
              CR Tech acompaña a empresas, instituciones y equipos operativos desde la selección de la solución hasta su implementación y soporte técnico especializado.
            </p>

            <div className="ceo-pillars-grid">
              
              <div className="pillar-item">
                <div className="pillar-header">
                  <div className="pillar-icon-dot"></div>
                  <h4 className="pillar-title">Cercanía y Acompañamiento</h4>
                </div>
                <p className="pillar-desc">
                  Trabajamos al lado de tu equipo en el campo o la oficina, asegurando que cada sistema funcione exactamente como se requiere.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-header">
                  <div className="pillar-icon-dot"></div>
                  <h4 className="pillar-title">Criterio Técnico Aplicado</h4>
                </div>
                <p className="pillar-desc">
                  No vendemos catálogos cerrados; evaluamos variables operacionales, geografía, clima y presupuesto para proponer soluciones viables.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-header">
                  <div className="pillar-icon-dot"></div>
                  <h4 className="pillar-title">Ejecución Profesional</h4>
                </div>
                <p className="pillar-desc">
                  Garantizamos rigurosidad técnica en la instalación, capacitación del personal y provisión continua de repuestos y soporte técnico local.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
