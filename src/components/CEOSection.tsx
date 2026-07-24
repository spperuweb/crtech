import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CEOSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const whatsappUrl = `https://wa.me/51991664146?text=${encodeURIComponent(
    'Hola Carlos, quisiera recibir asesoría para identificar la solución tecnológica adecuada para mi operación.'
  )}`;

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.fromTo(
          ['.ceo-photo', '.ceo-executive-badge', '.ceo-content-side'],
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
        '.ceo-photo-916',
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' }
      )
        .fromTo(
          '.ceo-executive-badge-916',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
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
          
          {/* Executive Photo & Framed Badge (9:16 Light Background) */}
          <div className="ceo-media-side">
            <figure className="ceo-figure-premium">
              <div className="ceo-image-wrapper-framed-916">
                
                {/* Photo 9:16 */}
                <img 
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782397237/CarlosRivera_CRTech_FotoCEO_is07qk.png" 
                  alt="Carlos Rivera, CEO y Gerente General de CR Technologies & Services" 
                  className="ceo-photo-916"
                  loading="lazy"
                  decoding="async"
                  width="450"
                  height="800"
                />

                {/* High Contrast Executive Overlay Card */}
                <figcaption className="ceo-executive-badge-916">
                  <div className="badge-header-row">
                    <span className="badge-role-tag">
                      <span className="badge-live-dot"></span>
                      CEO & FOUNDER
                    </span>
                    <span className="badge-exp-tag">+15 AÑOS DE EXPERIENCIA</span>
                  </div>

                  <div className="badge-main-info">
                    <h3 className="ceo-name-headline">Carlos Rivera</h3>
                    <p className="ceo-title-sub">Gerente General · CR Technologies & Services</p>
                  </div>

                  <p className="ceo-quote-text">
                    "Garantizar continuidad operativa exige entender la realidad del terreno antes de recomendar cualquier tecnología."
                  </p>
                </figcaption>

              </div>
            </figure>
          </div>

          {/* Narrative Side */}
          <div className="ceo-content-side">
            <span className="ceo-tag">LIDERAZGO TÉCNICO Y ACOMPAÑAMIENTO LOCAL</span>
            <h2 className="ceo-section-title">
              Antes de recomendar un equipo,<br />
              <span className="highlight-text">entendemos qué debe seguir funcionando.</span>
            </h2>
            <p className="ceo-paragraph">
              Bajo la dirección técnica de Carlos Rivera, CRTech acompaña a empresas, instituciones y equipos operativos en todo el Perú. Evaluamos la geografía, el nivel de riesgo y la infraestructura real para desplegar soluciones de máxima confiabilidad.
            </p>

            <div className="ceo-pillars-grid">
              
              <div className="pillar-item">
                <div className="pillar-header">
                  <div className="pillar-icon-dot"></div>
                  <h4 className="pillar-title">Diagnóstico sin improvisación</h4>
                </div>
                <p className="pillar-desc">
                  Análisis técnico exhaustivo de necesidades y riesgos antes de cualquier propuesta comercial.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-header">
                  <div className="pillar-icon-dot"></div>
                  <h4 className="pillar-title">Arquitectura a medida</h4>
                </div>
                <p className="pillar-desc">
                  Integración estratégica de drones impermeables SwellPro, energía EcoFlow y sistemas de red TI.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-header">
                  <div className="pillar-icon-dot"></div>
                  <h4 className="pillar-title">Garantía y soporte local</h4>
                </div>
                <p className="pillar-desc">
                  Capacitación en campo, laboratorio técnico local en Perú y stock permanente de repuestos originales.
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
                <svg viewBox="0 0 24 24" fill="currentColor" className="btn-wa-icon" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2a10 10 0 0 0-8.52 15.242L2 22l4.896-1.442A10 10 0 1 0 12 2zm0 18a7.95 7.95 0 0 1-4.068-1.121l-.292-.174-2.898.853.868-2.825-.191-.301A7.953 7.953 0 1 1 12 20z" />
                </svg>
                Conversar con Carlos Rivera
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

