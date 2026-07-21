import React, { useState } from 'react';
import { assets } from '../data/assets';

type BranchKey = 'drones' | 'energia' | 'it';

interface BranchData {
  id: BranchKey;
  tag: string;
  name: string;
  phrase: string;
  color: string;
  bgColor: string;
  accentClass: string;
}

export default function Hero() {
  const [selectedBranch, setSelectedBranch] = useState<BranchKey>('drones');

  const branches: Record<BranchKey, BranchData> = {
    drones: {
      id: 'drones',
      tag: 'Aire',
      name: 'Drones Profesionales',
      phrase: 'Sistemas aéreos no tripulados para inspección y logística.',
      color: '#48BFEA', // Cian
      bgColor: 'rgba(72, 191, 234, 0.08)',
      accentClass: 'accent-cyan'
    },
    energia: {
      id: 'energia',
      tag: 'Campo',
      name: 'Energía Portátil',
      phrase: 'Soluciones de carga autónoma y respaldo crítico.',
      color: '#F4A825', // Ámbar
      bgColor: 'rgba(244, 168, 37, 0.08)',
      accentClass: 'accent-amber'
    },
    it: {
      id: 'it',
      tag: 'Empresa',
      name: 'Servicios TI',
      phrase: 'Infraestructura digital y soporte para despliegues.',
      color: '#7067E8', // Violeta
      bgColor: 'rgba(112, 103, 232, 0.08)',
      accentClass: 'accent-violet'
    }
  };

  const handleBranchSelect = (key: BranchKey) => {
    setSelectedBranch(key);
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid">
        
        {/* Left Side: Copy and CTAs */}
        <div className="hero-copy">
          <span className="hero-badge">
            Soluciones tecnológicas para operaciones reales
          </span>
          <h1 className="hero-title">
            Elige la tecnología que tu operación necesita.
          </h1>
          <p className="hero-description">
            Drones profesionales, energía autónoma y servicios TI integrados con asesoría, implementación y soporte local en Perú.
          </p>
          
          <div className="hero-actions">
            <a 
              href={assets.contact.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              Solicitar asesoría
            </a>
            <a 
              href="#soluciones" 
              className="btn btn-secondary"
            >
              Explorar soluciones
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Editorial Visual with Premium Open Layout */}
        <div className="hero-editorial-right" id="hero-interactive-zone">
          
          {/* Branch routes / path diagram */}
          <div className="branches-interactive-network">
            <svg 
              className="branches-editorial-svg" 
              viewBox="0 0 500 130" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Central Core representing CR Tech at (250, 115) */}
              <circle cx="250" cy="115" r="4" fill="#168BFF" />
              <circle cx="250" cy="115" r="10" stroke="#168BFF" strokeWidth="0.75" strokeOpacity="0.4" fill="none" />
              
              {/* Connective Paths */}
              {/* Path 1: To Drones (Aire) on the Left (70, 30) */}
              <path 
                d="M 250 115 C 170 115, 95 85, 70 30" 
                stroke={selectedBranch === 'drones' ? '#48BFEA' : '#E2E8F0'} 
                strokeWidth={selectedBranch === 'drones' ? '2.5' : '1'} 
                style={{ transition: 'all 0.3s ease' }}
              />
              <circle cx="70" cy="30" r="4" fill={selectedBranch === 'drones' ? '#48BFEA' : '#CBD5E1'} style={{ transition: 'all 0.3s ease' }} />
              
              {/* Path 2: To Energía (Campo) in the Center (250, 20) */}
              <path 
                d="M 250 115 L 250 20" 
                stroke={selectedBranch === 'energia' ? '#F4A825' : '#E2E8F0'} 
                strokeWidth={selectedBranch === 'energia' ? '2.5' : '1'} 
                style={{ transition: 'all 0.3s ease' }}
              />
              <circle cx="250" cy="20" r="4" fill={selectedBranch === 'energia' ? '#F4A825' : '#CBD5E1'} style={{ transition: 'all 0.3s ease' }} />
              
              {/* Path 3: To Servicios TI (Empresa) on the Right (430, 30) */}
              <path 
                d="M 250 115 C 330 115, 405 85, 430 30" 
                stroke={selectedBranch === 'it' ? '#7067E8' : '#E2E8F0'} 
                strokeWidth={selectedBranch === 'it' ? '2.5' : '1'} 
                style={{ transition: 'all 0.3s ease' }}
              />
              <circle cx="430" cy="30" r="4" fill={selectedBranch === 'it' ? '#7067E8' : '#CBD5E1'} style={{ transition: 'all 0.3s ease' }} />
            </svg>

            {/* Fully keyboard-accessible branch selector buttons positioned at the endpoints of the SVG */}
            <div className="branch-label-buttons" role="tablist" aria-label="Seleccionar rama de negocio">
              <button
                onClick={() => handleBranchSelect('drones')}
                className={`branch-editorial-btn btn-drones ${selectedBranch === 'drones' ? 'active' : ''}`}
                role="tab"
                aria-selected={selectedBranch === 'drones'}
                aria-controls="hero-interactive-zone"
                type="button"
                style={{ left: '14%', top: '15%', transform: 'translate(-50%, -50%)' }}
              >
                <span className="branch-btn-dot" style={{ backgroundColor: '#48BFEA' }}></span>
                <div className="branch-btn-text">
                  <span className="branch-btn-tag">Aire</span>
                  <span className="branch-btn-name">Drones</span>
                </div>
              </button>

              <button
                onClick={() => handleBranchSelect('energia')}
                className={`branch-editorial-btn btn-energia ${selectedBranch === 'energia' ? 'active' : ''}`}
                role="tab"
                aria-selected={selectedBranch === 'energia'}
                aria-controls="hero-interactive-zone"
                type="button"
                style={{ left: '50%', top: '2%', transform: 'translate(-50%, -50%)' }}
              >
                <span className="branch-btn-dot" style={{ backgroundColor: '#F4A825' }}></span>
                <div className="branch-btn-text">
                  <span className="branch-btn-tag">Campo</span>
                  <span className="branch-btn-name">Energía</span>
                </div>
              </button>

              <button
                onClick={() => handleBranchSelect('it')}
                className={`branch-editorial-btn btn-it ${selectedBranch === 'it' ? 'active' : ''}`}
                role="tab"
                aria-selected={selectedBranch === 'it'}
                aria-controls="hero-interactive-zone"
                type="button"
                style={{ left: '86%', top: '15%', transform: 'translate(-50%, -50%)' }}
              >
                <span className="branch-btn-dot" style={{ backgroundColor: '#7067E8' }}></span>
                <div className="branch-btn-text">
                  <span className="branch-btn-tag">Empresa</span>
                  <span className="branch-btn-name">Servicios TI</span>
                </div>
              </button>
            </div>
          </div>

          {/* Dynamic Image / Content Viewer with elegant mask (no card) */}
          <div className="hero-editorial-image-frame">
            {selectedBranch === 'drones' && (
              <img 
                src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto,w_1600,c_limit/v1779933439/fd3-image-06_qz20uf.jpg" 
                alt="Dron profesional SwellPro sobrevolando el mar" 
                className="editorial-display-img object-cover animate-fade-in"
                fetchPriority="high"
              />
            )}

            {selectedBranch === 'energia' && (
              <div className="editorial-product-display animate-fade-in">
                <img 
                  src={assets.ecoFlow.deltaPro} 
                  alt="Estación de energía EcoFlow Delta Pro" 
                  className="editorial-display-img object-contain animate-fade-in"
                  fetchPriority="high"
                />
              </div>
            )}

            {selectedBranch === 'it' && (
              <div className="editorial-it-display animate-fade-in">
                <svg viewBox="0 0 400 160" fill="none" className="it-minimal-svg" aria-hidden="true">
                  <path d="M40 80 Q 200 10, 360 80" stroke="#7067E8" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                  <path d="M40 80 H 360" stroke="#7067E8" strokeWidth="1" opacity="0.5" />
                  <circle cx="40" cy="80" r="5" fill="#7067E8" />
                  <circle cx="200" cy="80" r="7" fill="#168BFF" />
                  <circle cx="360" cy="80" r="5" fill="#7067E8" />
                  
                  <text x="40" y="115" fill="#07152C" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-headings)">Infraestructura</text>
                  <text x="200" y="115" fill="#07152C" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-headings)">Soporte TI</text>
                  <text x="360" y="115" fill="#07152C" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-headings)">Seguridad</text>
                </svg>
              </div>
            )}
          </div>

          {/* Underlay Info Caption - Editorial Layout */}
          <div className="hero-editorial-caption">
            <span className="caption-tag" style={{ color: branches[selectedBranch].color }}>
              {branches[selectedBranch].tag} — {branches[selectedBranch].name}
            </span>
            <p className="caption-text">{branches[selectedBranch].phrase}</p>
          </div>

        </div>

      </div>
    </section>
  );
}
