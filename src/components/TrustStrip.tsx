import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';

gsap.registerPlugin(ScrollTrigger);

export default function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.fromTo(
          ['.trust-strip-title', '.trust-logo-item'],
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
        '.trust-strip-title',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      ).fromTo(
        '.trust-logo-item',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.08 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="trust-strip-section" ref={sectionRef}>
      <div className="trust-strip-container">
        <h3 className="trust-strip-title">Representación oficial y respaldo local</h3>
        
        <div className="trust-logos-grid">
          {/* Logo 1: SwellPro Perú */}
          <div className="trust-logo-item">
            <div className="trust-logo-wrapper">
              <img 
                src={assets.logos.swellProPeru} 
                alt="Logo SwellPro Perú" 
                className="trust-logo-img"
                loading="lazy"
                decoding="async"
                width="160"
                height="48"
              />
            </div>
            <div className="trust-logo-meta">
              <span className="trust-badge-label">SwellPro Perú</span>
              <span className="trust-badge-status">Representante oficial en Perú</span>
            </div>
          </div>

          <div className="trust-divider" aria-hidden="true"></div>

          {/* Logo 2: EcoFlow */}
          <div className="trust-logo-item">
            <div className="trust-logo-wrapper text-logo-wrapper">
              <span className="ecoflow-text-brand">EcoFlow</span>
            </div>
            <div className="trust-logo-meta">
              <span className="trust-badge-label">EcoFlow</span>
              <span className="trust-badge-status">Representante oficial en Perú</span>
            </div>
          </div>

          <div className="trust-divider" aria-hidden="true"></div>

          {/* Logo 3: Cámara de Comercio de Chancay */}
          <div className="trust-logo-item">
            <div className="trust-logo-wrapper">
              <img 
                src={assets.logos.camaraChancay} 
                alt="Logo Cámara de Comercio de Chancay" 
                className="trust-logo-img"
                loading="lazy"
                decoding="async"
                width="160"
                height="48"
              />
            </div>
            <div className="trust-logo-meta">
              <span className="trust-badge-label">Cámara de Comercio Chancay</span>
              <span className="trust-badge-status">Aliado institucional</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
