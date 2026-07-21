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

        {/* Right Side: Interactive Editorial Visual */}
        <div className="hero-interactive" id="hero-interactive-zone">
          
          {/* Branch routes / path diagram */}
          <div className="routes-diagram-wrapper">
            <svg 
              className="routes-svg" 
              viewBox="0 0 400 220" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Central Core representing CR Tech */}
              <circle cx="200" cy="180" r="14" fill="#168BFF" fillOpacity="0.15" />
              <circle cx="200" cy="180" r="6" fill="#168BFF" />
              
              {/* Connective Paths */}
              {/* Path 1: To Drones (Aire) on the Left */}
              <path 
                d="M190 170 C 130 150, 80 120, 70 80" 
                stroke={selectedBranch === 'drones' ? '#48BFEA' : '#DCE6EF'} 
                strokeWidth={selectedBranch === 'drones' ? '3' : '1.5'} 
                strokeDasharray={selectedBranch === 'drones' ? '0' : '4 4'}
                style={{ transition: 'all 0.3s ease' }}
              />
              {/* Path 2: To Energía (Campo) in the Center */}
              <path 
                d="M200 166 L 200 90" 
                stroke={selectedBranch === 'energia' ? '#F4A825' : '#DCE6EF'} 
                strokeWidth={selectedBranch === 'energia' ? '3' : '1.5'}
                strokeDasharray={selectedBranch === 'energia' ? '0' : '4 4'}
                style={{ transition: 'all 0.3s ease' }}
              />
              {/* Path 3: To Servicios TI (Empresa) on the Right */}
              <path 
                d="M210 170 C 270 150, 320 120, 330 80" 
                stroke={selectedBranch === 'it' ? '#7067E8' : '#DCE6EF'} 
                strokeWidth={selectedBranch === 'it' ? '3' : '1.5'}
                strokeDasharray={selectedBranch === 'it' ? '0' : '4 4'}
                style={{ transition: 'all 0.3s ease' }}
              />

              {/* Destination Nodes */}
              {/* Node Left: Aire (Drones) */}
              <circle 
                cx="70" 
                cy="80" 
                r="8" 
                fill={selectedBranch === 'drones' ? '#48BFEA' : '#FFFFFF'} 
                stroke="#48BFEA" 
                strokeWidth="2" 
              />
              {/* Node Center: Campo (Energía) */}
              <circle 
                cx="200" 
                cy="90" 
                r="8" 
                fill={selectedBranch === 'energia' ? '#F4A825' : '#FFFFFF'} 
                stroke="#F4A825" 
                strokeWidth="2" 
              />
              {/* Node Right: Empresa (Servicios TI) */}
              <circle 
                cx="330" 
                cy="80" 
                r="8" 
                fill={selectedBranch === 'it' ? '#7067E8' : '#FFFFFF'} 
                stroke="#7067E8" 
                strokeWidth="2" 
              />
            </svg>
          </div>

          {/* Dynamic Image / Content Viewer with distinct editorial styles */}
          <div className="editorial-view-container">
            {selectedBranch === 'drones' && (
              <div className="editorial-wrapper drones-editorial-wrapper">
                <div className="diagonal-image-frame">
                  <img 
                    src={assets.drones.productHorizontal} 
                    alt="Dron profesional de SwellPro" 
                    className="editorial-img object-cover"
                    fetchPriority="high"
                  />
                </div>
              </div>
            )}

            {selectedBranch === 'energia' && (
              <div className="editorial-wrapper energia-editorial-wrapper">
                <div className="clean-product-frame">
                  <img 
                    src={assets.ecoFlow.deltaPro} 
                    alt="EcoFlow Delta Pro Portable Power Station" 
                    className="editorial-img object-contain"
                    fetchPriority="high"
                  />
                </div>
              </div>
            )}

            {selectedBranch === 'it' && (
              <div className="editorial-wrapper it-editorial-wrapper">
                <div className="abstract-it-shape">
                  <svg viewBox="0 0 200 200" className="it-vector-art" aria-hidden="true">
                    <defs>
                      <linearGradient id="violet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7067E8" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#7067E8" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M20,100 Q50,30 100,100 T180,100" 
                      fill="none" 
                      stroke="#7067E8" 
                      strokeWidth="3" 
                    />
                    <path 
                      d="M20,130 Q70,70 120,130 T180,130" 
                      fill="none" 
                      stroke="#7067E8" 
                      strokeWidth="1.5" 
                      strokeOpacity="0.5" 
                    />
                    <circle cx="100" cy="100" r="40" fill="url(#violet-grad)" />
                    <rect x="85" y="85" width="30" height="30" rx="6" fill="#7067E8" />
                    <circle cx="100" cy="100" r="4" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Fully keyboard-accessible branch selector */}
          <div className="branch-selector-panel" role="tablist" aria-label="Seleccionar rama de negocio">
            <button
              onClick={() => handleBranchSelect('drones')}
              className={`branch-select-tab ${selectedBranch === 'drones' ? 'active accent-cyan' : ''}`}
              role="tab"
              aria-selected={selectedBranch === 'drones'}
              aria-controls="hero-interactive-zone"
              type="button"
            >
              <div className="tab-indicator-dot" style={{ backgroundColor: '#48BFEA' }}></div>
              <div className="tab-header-meta">
                <span className="tab-tag">Aire</span>
                <span className="tab-name">Drones</span>
              </div>
              <span className="tab-desc">SwellPro Perú</span>
            </button>

            <button
              onClick={() => handleBranchSelect('energia')}
              className={`branch-select-tab ${selectedBranch === 'energia' ? 'active accent-amber' : ''}`}
              role="tab"
              aria-selected={selectedBranch === 'energia'}
              aria-controls="hero-interactive-zone"
              type="button"
            >
              <div className="tab-indicator-dot" style={{ backgroundColor: '#F4A825' }}></div>
              <div className="tab-header-meta">
                <span className="tab-tag">Campo</span>
                <span className="tab-name">Energía</span>
              </div>
              <span className="tab-desc">EcoFlow</span>
            </button>

            <button
              onClick={() => handleBranchSelect('it')}
              className={`branch-select-tab ${selectedBranch === 'it' ? 'active accent-violet' : ''}`}
              role="tab"
              aria-selected={selectedBranch === 'it'}
              aria-controls="hero-interactive-zone"
              type="button"
            >
              <div className="tab-indicator-dot" style={{ backgroundColor: '#7067E8' }}></div>
              <div className="tab-header-meta">
                <span className="tab-tag">Empresa</span>
                <span className="tab-name">Servicios TI</span>
              </div>
              <span className="tab-desc">Soporte y Redes</span>
            </button>
          </div>

          {/* Underlay Info Box */}
          <div className="interactive-info-panel" style={{ borderLeftColor: branches[selectedBranch].color }}>
            <span className="interactive-panel-tag" style={{ color: branches[selectedBranch].color, backgroundColor: branches[selectedBranch].bgColor }}>
              {branches[selectedBranch].tag}
            </span>
            <h4 className="interactive-panel-name">{branches[selectedBranch].name}</h4>
            <p className="interactive-panel-phrase">{branches[selectedBranch].phrase}</p>
          </div>

        </div>

      </div>
    </section>
  );
}
