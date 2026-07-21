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
        
        {/* BLOCK 1: Drones Profesionales */}
        <div className="solution-block-item" id="drones">
          <div className="solution-block-grid">
            
            <div className="solution-block-info">
              <span className="block-tag tag-cyan">Aire</span>
              <h3 className="block-title">Drones Profesionales</h3>
              <p className="block-description">
                Tecnología aérea para inspección, seguridad, monitoreo, pesca, rescate y operaciones de campo.
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
                    <strong>Capacitación:</strong> Entrenamiento práctico y técnico para pilotos y equipos de campo.
                  </div>
                </li>
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Soporte local:</strong> Servicio técnico calificado para diagnósticos, mantenimiento y calibraciones.
                  </div>
                </li>
                <li>
                  <span className="feature-icon cian">✓</span>
                  <div>
                    <strong>Repuestos:</strong> Stock de partes críticas y accesorios para minimizar tiempos de inactividad.
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
              <div className="media-card-frame cyan-border">
                <img 
                  src={assets.drones.inAction} 
                  alt="Dron profesional SwellPro sobrevolando el océano para operaciones de pesca y rescate" 
                  className="block-media-img"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
                <div className="media-caption">
                  <span>Operación de monitoreo aéreo real</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BLOCK 2: Energía Portátil */}
        <div className="solution-block-item alt-bg" id="energia">
          <div className="solution-block-grid reverse">
            
            <div className="solution-block-info">
              <span className="block-tag tag-amber">Campo</span>
              <h3 className="block-title">Energía Portátil</h3>
              <p className="block-description">
                Estaciones EcoFlow y generación solar para mantener equipos y operaciones activas donde la red no está disponible.
              </p>
              
              <ul className="block-features-list">
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Trabajo de campo:</strong> Energía limpia y silenciosa para alimentar herramientas y laboratorios remotos.
                  </div>
                </li>
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Respaldo crítico:</strong> Sistemas autónomos que reaccionan de inmediato ante cortes de suministro.
                  </div>
                </li>
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Carga de equipos:</strong> Hub de carga rápida para drones, baterías, radios y computadoras.
                  </div>
                </li>
                <li>
                  <span className="feature-icon amber">✓</span>
                  <div>
                    <strong>Operaciones móviles:</strong> Soluciones compactas adaptables a vehículos y campamentos temporales.
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
                <div className="media-card-frame amber-border primary-frame">
                  <img 
                    src={assets.ecoFlow.deltaPro} 
                    alt="EcoFlow Delta Pro unidad de energía portátil de alta capacidad" 
                    className="block-media-img object-contain"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="280"
                  />
                  <div className="media-caption">
                    <span>Estación de energía EcoFlow Delta Pro</span>
                  </div>
                </div>
                
                <div className="media-card-frame secondary-frame">
                  <img 
                    src={assets.ecoFlow.solarPanel} 
                    alt="EcoFlow panel solar portátil plegable" 
                    className="block-media-img object-contain"
                    loading="lazy"
                    decoding="async"
                    width="280"
                    height="180"
                  />
                  <div className="media-caption">
                    <span>Carga Solar limpia</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BLOCK 3: Servicios TI */}
        <div className="solution-block-item" id="servicios-ti">
          <div className="solution-block-grid">
            
            <div className="solution-block-info">
              <span className="block-tag tag-violet">Empresa</span>
              <h3 className="block-title">Servicios TI</h3>
              <p className="block-description">
                Infraestructura, conectividad, soporte y seguridad tecnológica para sostener la operación de empresas e instituciones.
              </p>
              
              <ul className="block-features-list">
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Redes:</strong> Diseño, cableado estructurado, enlaces de fibra y sistemas inalámbricos estables.
                  </div>
                </li>
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Soporte TI:</strong> Mantenimiento preventivo, correctivo y asistencia remota para equipos de cómputo.
                  </div>
                </li>
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Videovigilancia:</strong> Cámaras de seguridad con monitoreo centralizado y almacenamiento local/nube.
                  </div>
                </li>
                <li>
                  <span className="feature-icon violet">✓</span>
                  <div>
                    <strong>Respaldo y Conectividad:</strong> Soluciones de backup y configuración de routers y firewalls corporativos.
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
              <div className="media-card-frame violet-border abstract-media-card">
                {/* Custom modern server cluster line art */}
                <div className="server-line-art-container">
                  <svg viewBox="0 0 300 220" fill="none" className="server-svg" aria-hidden="true">
                    {/* Server Rack 1 */}
                    <rect x="50" y="30" width="200" height="44" rx="4" fill="#061329" stroke="#7067E8" strokeWidth="1.5" />
                    <line x1="70" y1="52" x2="150" y2="52" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
                    <circle cx="210" cy="52" r="3" fill="#10B981" />
                    <circle cx="225" cy="52" r="3" fill="#7067E8" />
                    
                    {/* Server Rack 2 */}
                    <rect x="50" y="88" width="200" height="44" rx="4" fill="#061329" stroke="#7067E8" strokeWidth="1.5" />
                    <line x1="70" y1="110" x2="130" y2="110" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
                    <circle cx="210" cy="110" r="3" fill="#10B981" />
                    <circle cx="225" cy="110" r="3" fill="#7067E8" />

                    {/* Server Rack 3 */}
                    <rect x="50" y="146" width="200" height="44" rx="4" fill="#061329" stroke="#7067E8" strokeWidth="1.5" />
                    <line x1="70" y1="168" x2="160" y2="168" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
                    <circle cx="210" cy="168" r="3" fill="#10B981" />
                    <circle cx="225" cy="168" r="3" fill="#7067E8" />
                    
                    {/* Decorative networking nodes */}
                    <path d="M40 52 L 20 110 L 40 168" stroke="#7067E8" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
                    <circle cx="20" cy="110" r="4" fill="#7067E8" />
                  </svg>
                </div>
                <div className="media-caption">
                  <span>Infraestructura digital y redes estables</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
