import React from 'react';
import { assets } from '../data/assets';

export default function CEOSection() {
  return (
    <section className="ceo-section" id="nosotros">
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
