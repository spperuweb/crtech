import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      num: '01',
      title: 'Diagnóstico operativo',
      desc: 'Escuchamos el objetivo, revisamos el entorno y detectamos las variables que pueden afectar la continuidad.',
      deliverable: 'Necesidad y riesgo definidos.'
    },
    {
      num: '02',
      title: 'Selección y arquitectura',
      desc: 'Comparamos capacidades, autonomía, infraestructura y condiciones de uso para diseñar la configuración correcta.',
      deliverable: 'Solución técnica recomendada.'
    },
    {
      num: '03',
      title: 'Implementación',
      desc: 'Configuramos, probamos, documentamos y capacitamos al equipo responsable.',
      deliverable: 'Sistema preparado para operar.'
    },
    {
      num: '04',
      title: 'Soporte local',
      desc: 'Acompañamos la operación con mantenimiento, repuestos, diagnóstico y criterio técnico.',
      deliverable: 'Continuidad y respuesta.'
    }
  ];

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.fromTo(
          ['.section-header-centered', '.step-card'],
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

      const mm = gsap.matchMedia();

      // Desktop & Tablet (>= 768px)
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        tl.fromTo(
          ['.section-subtitle', '.method-section-title'],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }
        )
          .fromTo(
            '.flow-connector-line',
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.6, ease: 'power3.out' },
            '-=0.2'
          )
          .fromTo(
            '.step-card',
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 },
            '-=0.4'
          );
      });

      // Mobile (< 768px)
      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        tl.fromTo(
          ['.section-subtitle', '.method-section-title'],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }
        ).fromTo(
          '.step-card',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.08 },
          '-=0.2'
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="method-section" id="metodo" ref={sectionRef}>
      <div className="section-container">
        
        <div className="section-header-centered">
          <span className="section-subtitle">MÉTODO CRTECH</span>
          <h2 className="method-section-title">
            Del diagnóstico al soporte,<br className="hidden md:inline" />{' '}
            <span className="highlight-text">sin dejar la operación a la improvisación.</span>
          </h2>
        </div>

        <div className="steps-flow-container">
          {/* Connector line for desktop */}
          <div className="flow-connector-line" aria-hidden="true"></div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card" key={step.num}>
                <div className="step-num-badge">
                  <span className="step-num">{step.num}</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.desc}</p>
                  <div className="step-deliverable-badge">
                    <span className="deliverable-label">Entregable:</span> {step.deliverable}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="mobile-step-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
