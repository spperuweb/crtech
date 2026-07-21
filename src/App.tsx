import React from 'react';

export default function App() {
  return (
    <div className="app-container" id="app-root">
      {/* Header / Navigation Bar */}
      <nav className="nav-bar" id="logo-sec">
        <img 
          id="cr-tech-logo"
          src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782426594/CR_Tech_Sevices_Logo_powukx.png" 
          alt="CR Tech Logo" 
          className="logo-img"
        />
        <div className="construction-indicator">
          <span className="pulse-dot"></span>
          <span className="badge" id="construction-badge">Nueva plataforma en construcción</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content" id="info-content">
        <div className="phase-badge">
          FASE 0 : Estructura Base
        </div>
        <h1 className="title" id="main-title">CR Technologies & Services</h1>
        <p className="description" id="main-desc">
          Tecnología aérea, energía autónoma y servicios TI para operaciones reales.
        </p>
        
        {/* Button Wrapper */}
        <div className="cta-wrapper">
          <button className="cta-button" id="status-btn" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Base operativa lista
          </button>
        </div>
      </main>

      {/* Footer Branches Block */}
      <div className="branches-container" id="branches-block">
        <h2 className="branches-title" id="branches-header">Nuestras especialidades</h2>
        <div className="branches-grid" id="branches-lst">
          
          {/* Branch 1: Drones profesionales */}
          <div className="branch-card" id="branch-drones">
            <div className="branch-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div className="branch-info">
              <span className="branch-name">Drones profesionales</span>
              <span className="branch-desc">Sistemas aéreos no tripulados para inspección y logística.</span>
            </div>
          </div>

          {/* Branch 2: Energía portátil */}
          <div className="branch-card" id="branch-energy">
            <div className="branch-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="16" height="12" rx="2" ry="2" />
                <line x1="6" y1="11" x2="10" y2="15" />
                <line x1="10" y1="11" x2="6" y2="15" />
                <line x1="22" y1="11" x2="22" y2="15" />
              </svg>
            </div>
            <div className="branch-info">
              <span className="branch-name">Energía portátil</span>
              <span className="branch-desc">Soluciones de carga autónoma y respaldo energético crítico.</span>
            </div>
          </div>

          {/* Branch 3: Servicios TI */}
          <div className="branch-card" id="branch-it">
            <div className="branch-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div className="branch-info">
              <span className="branch-name">Servicios TI</span>
              <span className="branch-desc">Infraestructura digital y soporte para despliegues técnicos.</span>
            </div>
          </div>

        </div>
      </div>

      {/* Technical Status Sub-Footer */}
      <footer className="tech-sub-footer">
        <span>Vite + React + TypeScript</span>
        <span>Build Status: Stable</span>
        <span>CR Tech v0.1.0</span>
      </footer>
    </div>
  );
}
