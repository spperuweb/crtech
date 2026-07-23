import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.fromTo(
          '.final-cta-card',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.15,
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
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      tl.fromTo(
        '.final-cta-card',
        { opacity: 0, scale: 0.985 },
        { opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' }
      )
        .fromTo(
          ['.final-cta-eyebrow', '.final-cta-title', '.final-cta-text'],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 },
          '-=0.3'
        )
        .fromTo(
          '.btn-cta-highlight',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const whatsappUrl = `https://wa.me/51991664146?text=${encodeURIComponent(
    'Hola, quisiera recibir asesoría para identificar la solución tecnológica adecuada para mi operación.'
  )}`;

  return (
    <section className="final-cta-section dark-navy-cta" id="contacto" ref={sectionRef}>
      <div className="final-cta-card">
        {/* Abstract subtle background layout */}
        <div className="cta-shapes" aria-hidden="true">
          <div className="cta-glow-one"></div>
          <div className="cta-glow-two"></div>
        </div>

        <div className="final-cta-content">
          <span className="final-cta-eyebrow">CONVERSEMOS SOBRE TU OPERACIÓN</span>
          <h2 className="final-cta-title">
            Cuéntanos qué debe seguir funcionando.
          </h2>
          <p className="final-cta-text">
            Evaluaremos el entorno, el objetivo y las condiciones de trabajo para orientarte hacia una solución con criterio técnico y respaldo local.
          </p>
          
          <div className="final-cta-action-row">
            <a 
              href={whatsappUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-cta-highlight"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-icon">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Hablar con un especialista
            </a>
          </div>

          <div className="final-cta-microcopy">
            <span>Consulta directa por WhatsApp.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
