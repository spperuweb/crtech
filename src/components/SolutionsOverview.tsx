import React from 'react';
import { assets } from '../data/assets';

export default function SolutionsOverview() {
  return (
    <section className="solutions-section" id="soluciones">
      <div className="section-header">
        <h2 className="section-title">
          Una operación no necesita más tecnología. <span className="highlight-text">Necesita la tecnología correcta.</span>
        </h2>
      </div>

      <div className="solutions-blocks-container">
        
        {/* BLOCK 1: Drones Profesionales (Aire) */}
        <div className="solution-block-item" id="drones">
          <div className="solution-block-grid">
            
            <div className="solution-block-info">
              <span className="block-tag tag-cyan">Aire</span>
              <h3 className="block-title">Drones Profesionales</h3>
              <p className="block-description">
                Tecnología aérea robusta para inspección, seguridad, pesca, rescate y operaciones exigentes en mar y tierra peruana.
              </p>
              
              <ul className="block-features-list">
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Representación oficial:</strong> Acceso directo a equipos originales con garantía de fábrica SwellPro.
                  </div>
                </li>
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Capacitación especializada:</strong> Entrenamiento práctico y técnico para pilotos y equipos de campo.
                  </div>
                </li>
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Soporte técnico local:</strong> Servicio local para diagnósticos rápidos, mantenimiento y calibraciones.
                  </div>
                </li>
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Repuestos críticos:</strong> Stock local de partes y accesorios para garantizar continuidad de vuelos.
                  </div>
                </li>
              </ul>

              <div className="block-cta-row">
                <a 
                  href={assets.contact.swellProWebsite}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary-accent cyan"
                >
                  Ver modelos en SwellPro Perú
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            <div className="solution-block-media">
              <div className="media-card-frame">
                <img 
                  src={assets.drones.inAction} 
                  alt="Dron profesional SwellPro en acción sobrevolando el mar" 
                  className="block-media-img"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
                <div className="media-caption">
                  <span>Dron SwellPro FD3 en operación de monitoreo real</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BLOCK 2: Energía Portátil (Campo) */}
        <div className="solution-block-item alt-bg" id="energia">
          <div className="solution-block-grid reverse">
            
            <div className="solution-block-info">
              <span className="block-tag tag-amber">Campo</span>
              <h3 className="block-title">Energía Portátil</h3>
              <p className="block-description">
                Sistemas de energía autónoma EcoFlow y paneles solares para mantener operaciones críticas activas en cualquier ubicación.
              </p>
              
              <ul className="block-features-list">
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Trabajo de campo autónomo:</strong> Energía limpia, silenciosa y constante para laboratorios remotos y herramientas.
                  </div>
                </li>
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Respaldo crítico inmediato:</strong> Sistemas inteligentes que reaccionan instantáneamente ante cortes de suministro.
                  </div>
                </li>
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Hub de carga de campo:</strong> Estación centralizada de alta velocidad para drones, radios y ordenadores de campo.
                  </div>
                </li>
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Despliegue ágil:</strong> Soluciones compactas adaptables a vehículos todoterreno y campamentos móviles.
                  </div>
                </li>
              </ul>

              <div className="block-cta-row">
                <a 
                  href="https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20conocer%20las%20soluciones%20de%20energia%20EcoFlow%20para%20mi%20operacion."
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary-accent amber"
                >
                  Conocer soluciones de energía
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="solution-block-media">
              <div className="double-media-layout">
                <div className="media-card-frame primary-frame">
                  <div className="outdoor-simulated-bg">
                    <img 
                      src={assets.ecoFlow.deltaPro} 
                      alt="EcoFlow Delta Pro estación de energía portátil" 
                      className="block-media-img object-contain"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="280"
                    />
                  </div>
                  <div className="media-caption">
                    <span>EcoFlow Delta Pro en campamento de campo</span>
                  </div>
                </div>
                
                <div className="media-card-frame secondary-frame">
                  <div className="outdoor-simulated-bg">
                    <img 
                      src={assets.ecoFlow.solarPanel} 
                      alt="EcoFlow paneles solares plegables" 
                      className="block-media-img object-contain"
                      loading="lazy"
                      decoding="async"
                      width="280"
                      height="180"
                    />
                  </div>
                  <div className="media-caption">
                    <span>Panel Solar plegable en operación</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BLOCK 3: Servicios TI (Empresa) */}
        <div className="solution-block-item" id="servicios-ti">
          <div className="solution-block-grid">
            
            <div className="solution-block-info">
              <span className="block-tag tag-violet">Empresa</span>
              <h3 className="block-title">Servicios TI</h3>
              <p className="block-description">
                Infraestructura de red, conectividad segura y soporte tecnológico continuo para blindar las operaciones de tu negocio.
              </p>
              
              <ul className="block-features-list">
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Redes e Infraestructura:</strong> Cableado estructurado estructurado, enlaces inalámbricos estables y fibra óptica.
                  </div>
                </li>
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Soporte operativo continuo:</strong> Asistencia especializada y mantenimiento de sistemas para evitar caídas.
                  </div>
                </li>
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Seguridad perimetral:</strong> Firewalls, routers de nivel empresarial y protección de datos críticos.
                  </div>
                </li>
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Videovigilancia inteligente:</strong> Sistemas CCTV con almacenamiento seguro y monitoreo centralizado.
                  </div>
                </li>
              </ul>

              <div className="block-cta-row">
                <a 
                  href="https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20conocer%20los%20servicios%20TI%20y%20redes%20para%20mi%20empresa."
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary-accent violet"
                >
                  Conocer servicios TI
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="solution-block-media">
              <div className="media-card-frame abstract-media-card">
                <div className="it-connectivity-diagram">
                  <svg viewBox="0 0 500 240" fill="none" className="connectivity-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#168BFF" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#7067E8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* Connecting path */}
                    <path 
                      d="M 50 120 C 150 120, 150 60, 250 60 C 350 60, 350 180, 450 180" 
                      stroke="url(#lineGrad)" 
                      strokeWidth="2" 
                      strokeDasharray="4 4"
                      opacity="0.3"
                    />
                    <path 
                      d="M 50 120 C 150 120, 150 60, 250 60 C 350 60, 350 180, 450 180" 
                      stroke="url(#lineGrad)" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      opacity="0.7"
                    />

                    {/* Nodes */}
                    {/* Node 1: Infraestructura */}
                    <circle cx="50" cy="120" r="5" fill="#168BFF" />
                    <circle cx="50" cy="120" r="12" stroke="#168BFF" strokeWidth="1" strokeOpacity="0.3" fill="none" />
                    <text x="50" y="155" fill="#07152C" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="var(--font-headings)">Infraestructura</text>
                    <text x="50" y="172" fill="#5F6D80" fontSize="10" textAnchor="middle" fontFamily="var(--font-headings)">Redes y Conectividad</text>

                    {/* Node 2: Soporte */}
                    <circle cx="250" cy="60" r="5" fill="#7067E8" />
                    <circle cx="250" cy="60" r="12" stroke="#7067E8" strokeWidth="1" strokeOpacity="0.3" fill="none" />
                    <text x="250" y="95" fill="#07152C" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="var(--font-headings)">Soporte TI</text>
                    <text x="250" y="112" fill="#5F6D80" fontSize="10" textAnchor="middle" fontFamily="var(--font-headings)">Continuidad</text>

                    {/* Node 3: Seguridad */}
                    <circle cx="450" cy="180" r="5" fill="#10B981" />
                    <circle cx="450" cy="180" r="12" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" fill="none" />
                    <text x="450" y="215" fill="#07152C" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="var(--font-headings)">Seguridad</text>
                    <text x="450" y="232" fill="#5F6D80" fontSize="10" textAnchor="middle" fontFamily="var(--font-headings)">Videovigilancia</text>
                  </svg>
                </div>
                <div className="media-caption">
                  <span>Plataforma operativa sutil de red integrada</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
