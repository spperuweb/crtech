import React from 'react';
import { assets } from '../data/assets';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const whatsappUrl = `https://wa.me/51991664146?text=${encodeURIComponent(
    'Hola, quisiera recibir asesoría para identificar la solución tecnológica adecuada para mi operación.'
  )}`;

  return (
    <footer className="site-footer" id="main-footer">
      <div className="footer-container">
        
        {/* Company Identity Block */}
        <div className="footer-brand-column">
          <a href="#/" aria-label="CR Technologies & Services inicio">
            <img 
              src={assets.logos.darkBack} 
              alt="CR Technologies & Services" 
              className="footer-logo-img"
              loading="lazy"
              decoding="async"
              width="220"
              height="44"
            />
          </a>
          <p className="footer-brand-desc">
            Drones profesionales, energía autónoma y servicios TI integrados con diagnóstico, implementación y soporte local en Perú.
          </p>
          
          <div className="footer-legal-details">
            <span className="legal-item"><strong>Razón Social:</strong> CR Technologies & Services E.I.R.L.</span>
            <span className="legal-item"><strong>RUC:</strong> 20615939791</span>
            <span className="legal-item"><strong>Sede:</strong> Lima, Perú</span>
          </div>
        </div>

        {/* Navigation Map Column */}
        <div className="footer-nav-column">
          <h4 className="footer-title">Soluciones</h4>
          <ul className="footer-links-list">
            <li><a href="#/drones">Drones Profesionales</a></li>
            <li><a href="#/energia">Energía EcoFlow</a></li>
            <li><a href="#/servicios-ti">Servicios TI</a></li>
          </ul>
        </div>

        {/* Company Links Column */}
        <div className="footer-nav-column">
          <h4 className="footer-title">Compañía</h4>
          <ul className="footer-links-list">
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#metodo">Cómo trabajamos</a></li>
            <li><a href="#evidencia">Operaciones reales</a></li>
            <li><a href="#faq">Preguntas frecuentes</a></li>
            <li>
              <a 
                href={assets.contact.swellProWebsite} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                SwellPro Perú
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Support Column */}
        <div className="footer-nav-column">
          <h4 className="footer-title">Contacto Directo</h4>
          <ul className="footer-links-list contact-list">
            <li>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-contact-link"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="footer-icon">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                {assets.contact.whatsappNumber}
              </a>
            </li>
            <li>
              <span className="footer-schedule">
                Atención especializada para operaciones en todo el territorio peruano.
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Sub-Footer Meta */}
      <div className="footer-sub-bar">
        <div className="footer-sub-bar-container">
          <p className="copyright-text">
            © {currentYear} CR Technologies & Services E.I.R.L. Todos los derechos reservados.
          </p>
          <div className="tech-meta-row">
            <span>Representación Oficial SwellPro & EcoFlow • Soluciones Tecnológicas en Perú</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
