import React from 'react';
import { assets } from '../data/assets';

export default function TrustStrip() {
  return (
    <section className="trust-strip-section">
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
