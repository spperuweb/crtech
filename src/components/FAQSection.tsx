import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Qué hace CR Technologies & Services?',
    answer: 'CR Technologies & Services integra tecnología operativa en Perú mediante la distribución oficial de drones impermeables SwellPro, soluciones de energía portátil y solar EcoFlow, y servicios de infraestructura TI corporativa. Acompañamos a empresas y profesionales desde el diagnóstico técnico hasta la implementación, capacitación y soporte local postventa.'
  },
  {
    id: 'faq-2',
    question: '¿Qué soluciones ofrece CR Tech en Perú?',
    answer: 'Ofrecemos tres líneas principales de tecnología operativa: drones profesionales SwellPro para entornos exigentes (acuáticos, pesca, inspección y rescate), estaciones portátiles y paneles solares EcoFlow para respaldo energético comercial e industrial, e infraestructura TI que incluye cableado estructurado, fibra óptica, redes Wi-Fi empresariales, videovigilancia y soporte técnico.'
  },
  {
    id: 'faq-3',
    question: '¿Cómo solicitar una evaluación técnica?',
    answer: 'Puedes solicitar una evaluación técnica contactándonos directamente a través de nuestro botón oficial de WhatsApp o formulario de contacto. Un especialista técnico analizará los requerimientos específicos de tu empresa o proyecto para proponer la solución más eficiente, sin compromiso de compra.'
  },
  {
    id: 'faq-4',
    question: '¿Qué tipo de garantía y soporte técnico local ofrecen en Perú?',
    answer: 'Ofrecemos respaldo directo con repuestos, diagnóstico local, mantenimiento preventivo y acompañamiento técnico. Al ser representantes e integradores en Perú, no dependes de trámites externos para resolver imprevistos.'
  },
  {
    id: 'faq-5',
    question: '¿Atienden requerimientos fuera de Lima o en zonas de difícil acceso?',
    answer: 'Sí. Nos desplazamos y diseñamos la arquitectura pensando en condiciones de campo, clima exigente, costa, sierra y ubicaciones remotas.'
  },
  {
    id: 'faq-6',
    question: '¿Pueden evaluar infraestructura TI existente antes de proponer cambios?',
    answer: 'Sí. Realizamos diagnósticos sobre redes, cableado, servidores y videovigilancia existentes para identificar puntos de falla y proponer mejoras por fases sin interrumpir la operación.'
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const sectionRef = useRef<HTMLElement>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReduced) return;

      gsap.fromTo(
        '.faq-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.faq-accordion-item',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-list-wrapper',
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      <div className="faq-container">
        {/* Section Header */}
        <div className="faq-header">
          <span className="faq-eyebrow">ANTES DE TOMAR UNA DECISIÓN</span>
          <h2 className="faq-title">
            Respuestas claras para evaluar<br />
            <span className="highlight-text">la solución correcta.</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="faq-list-wrapper">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id} 
                className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={`chevron-icon ${isOpen ? 'rotate' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className={`faq-answer-collapse ${isOpen ? 'expanded' : ''}`}
                >
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
