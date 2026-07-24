import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MethodStep {
  num: string;
  phase: string;
  title: string;
  desc: string;
  deliverable: string;
  status: string;
  statusType: 'emerald' | 'cyan' | 'amber' | 'violet';
  nodeType: 'circle-emerald' | 'circle-cyan' | 'icon-amber' | 'icon-violet';
}

const STEPS: MethodStep[] = [
  {
    num: '01',
    phase: 'FASE 1 · DIAGNÓSTICO',
    title: 'Evaluación y Diagnóstico Operativo',
    desc: 'Escuchamos el objetivo del proyecto, evaluamos las condiciones reales del entorno en terreno y detectamos las variables críticas de riesgo que pueden comprometer la continuidad.',
    deliverable: 'Necesidad técnica y nivel de riesgo definidos.',
    status: 'Evaluación de Entorno',
    statusType: 'emerald',
    nodeType: 'circle-emerald',
  },
  {
    num: '02',
    phase: 'FASE 2 · INGENIERÍA',
    title: 'Selección y Arquitectura de Solución',
    desc: 'Comparamos capacidades, autonomía energética, cobertura de red y exigencias de trabajo para diseñar la configuración técnica exacta que mejor se adapte a tu operación.',
    deliverable: 'Propuesta y arquitectura técnica recomendada.',
    status: 'Diseño Personalizado',
    statusType: 'cyan',
    nodeType: 'circle-cyan',
  },
  {
    num: '03',
    phase: 'FASE 3 · DESPLIEGUE',
    title: 'Implementación, Pruebas y Capacitación',
    desc: 'Configuramos los equipos, ejecutamos pruebas funcionales en campo, entregamos documentación técnica detallada y capacitamos al equipo operativo responsable.',
    deliverable: 'Sistema listo y personal capacitado.',
    status: 'Ejecución en Terreno',
    statusType: 'amber',
    nodeType: 'icon-amber',
  },
  {
    num: '04',
    phase: 'FASE 4 · CONTINUIDAD',
    title: 'Soporte Local, Repuestos y Mantenimiento',
    desc: 'Acompañamos la operación con un amplio stock de repuestos originales en Perú, mantenimiento preventivo, diagnóstico técnico y respuesta rápida ante imprevistos.',
    deliverable: 'Continuidad operativa y respaldo activo.',
    status: 'Garantía CRTech',
    statusType: 'violet',
    nodeType: 'icon-violet',
  },
];

export default function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.fromTo(
          ['.method-header-centered', '.method-timeline-item'],
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.2,
            stagger: 0.08,
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

      // Desktop & Mobile ScrollTrigger animation
      mm.add('(min-width: 320px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        tl.fromTo(
          ['.method-eyebrow-badge', '.method-section-title-premium', '.method-section-desc'],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.1 }
        )
          .fromTo(
            '.method-timeline-line',
            { scaleY: 0, transformOrigin: 'top center' },
            { scaleY: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo(
            '.method-timeline-item',
            { opacity: 0, x: 24 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.12 },
            '-=0.6'
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="method-section-premium" id="metodo" ref={sectionRef}>
      <div className="method-section-container">
        
        {/* Centered Header */}
        <div className="method-header-centered">
          <span className="method-eyebrow-badge">MÉTODO DE TRABAJO CRTECH</span>
          <h2 className="method-section-title-premium">
            Del diagnóstico al soporte local,<br className="hidden md:inline" />{' '}
            <span className="highlight-cyan">sin dejar la operación a la improvisación.</span>
          </h2>
          <p className="method-section-desc">
            Un proceso de 4 fases estructurado para garantizar que cada dron, estación de energía o red TI entregue la máxima confiabilidad en campo.
          </p>
        </div>

        {/* Timeline Feed Container */}
        <div className="method-timeline-wrapper">
          {/* Continuous vertical timeline gradient line */}
          <div className="method-timeline-line" aria-hidden="true"></div>

          <div className="method-timeline-feed">
            {STEPS.map((step) => (
              <div className="method-timeline-item" key={step.num}>
                
                {/* Node Indicator */}
                <div className={`method-timeline-node node-${step.nodeType}`}>
                  {step.nodeType === 'circle-emerald' && (
                    <div className="node-ring emerald">
                      <div className="node-dot emerald" />
                    </div>
                  )}
                  {step.nodeType === 'circle-cyan' && (
                    <div className="node-ring cyan">
                      <div className="node-dot cyan" />
                    </div>
                  )}
                  {step.nodeType === 'icon-amber' && (
                    <div className="node-icon-wrap amber">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="node-svg">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </div>
                  )}
                  {step.nodeType === 'icon-violet' && (
                    <div className="node-icon-wrap violet">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="node-svg">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Timeline Premium Card */}
                <div className="method-activity-card">
                  <div className="card-top-header">
                    <div className="card-title-group">
                      <span className="step-num-prefix">{step.num}.</span>
                      <h3 className="method-card-title">{step.title}</h3>
                    </div>
                    <span className="card-phase-tag">{step.phase}</span>
                  </div>

                  <p className="method-card-desc">{step.desc}</p>

                  <div className="card-bottom-bar">
                    <span className={`status-pill ${step.statusType}`}>
                      <span className="status-dot"></span>
                      {step.status}
                    </span>

                    <div className="deliverable-chip">
                      <span className="chip-label">Entregable:</span>
                      <span className="chip-text">{step.deliverable}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

