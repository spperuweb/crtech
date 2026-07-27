import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Layers, 
  Wrench, 
  Zap, 
  Sun, 
  Activity, 
  Server, 
  ShieldCheck, 
  Cpu, 
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

interface SolucionesDropdownProps {
  currentRoute?: 'home' | 'drones' | 'energia' | 'servicios-ti';
}

export default function SolucionesDropdown({ currentRoute }: SolucionesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 220);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const whatsappExpertUrl = `https://wa.me/51991664146?text=${encodeURIComponent(
    'Hola, quisiera asesoría técnica especializada con un ingeniero de CR Tech.'
  )}`;

  return (
    <div 
      className="soluciones-dropdown-container" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Pill Button (Vercel Style) */}
      <button
        type="button"
        className={`soluciones-trigger-pill ${isOpen ? 'active-open' : ''} ${currentRoute && currentRoute !== 'home' ? 'has-active-route' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Soluciones CRTech menú desplegable"
      >
        <span className="trigger-text">Soluciones CRTech</span>
        {isOpen ? (
          <ChevronUp className="trigger-chevron" size={14} aria-hidden="true" />
        ) : (
          <ChevronDown className="trigger-chevron" size={14} aria-hidden="true" />
        )}
      </button>

      {/* Vercel-Style 3-Column Mega Menu Panel */}
      {isOpen && (
        <div 
          className="soluciones-mega-menu" 
          role="menu" 
          aria-label="Catálogo de Soluciones CRTech"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mega-menu-grid">
            
            {/* Column 1: Drones & Robótica */}
            <div className="mega-menu-col">
              <div className="mega-col-header">
                <span className="col-header-dot dot-cyan"></span>
                <span className="col-header-title">Drones & Robótica</span>
              </div>
              <div className="mega-col-items">
                <a 
                  href="#/drones" 
                  className={`mega-item-card ${currentRoute === 'drones' ? 'active-page' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mega-item-icon-box box-cyan">
                    <Bot size={18} />
                  </div>
                  <div className="mega-item-info">
                    <div className="item-title-row">
                      <span className="mega-item-title">Drones Marinos SwellPro</span>
                      {currentRoute === 'drones' && <span className="current-badge">Actual</span>}
                    </div>
                    <span className="mega-item-desc">Plataformas impermeables para agua, rescate y pesca.</span>
                  </div>
                </a>

                <a 
                  href="#/drones" 
                  className="mega-item-card"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mega-item-icon-box box-slate">
                    <Layers size={18} />
                  </div>
                  <div className="mega-item-info">
                    <span className="mega-item-title">Cargas Útiles & Cámaras 4K</span>
                    <span className="mega-item-desc">Liberación de carga, visión nocturna y sonares.</span>
                  </div>
                </a>

                <a 
                  href="#/drones" 
                  className="mega-item-card"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mega-item-icon-box box-slate">
                    <Wrench size={18} />
                  </div>
                  <div className="mega-item-info">
                    <span className="mega-item-title">Soporte & Repuestos Perú</span>
                    <span className="mega-item-desc">Mantenimiento preventivo y repuestos originales.</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Column 2: Energía & Respaldo */}
            <div className="mega-menu-col">
              <div className="mega-col-header">
                <span className="col-header-dot dot-amber"></span>
                <span className="col-header-title">Energía & Respaldo</span>
              </div>
              <div className="mega-col-items">
                <a 
                  href="#/energia" 
                  className={`mega-item-card ${currentRoute === 'energia' ? 'active-page' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mega-item-icon-box box-amber">
                    <Zap size={18} />
                  </div>
                  <div className="mega-item-info">
                    <div className="item-title-row">
                      <span className="mega-item-title">Estaciones EcoFlow LFP</span>
                      {currentRoute === 'energia' && <span className="current-badge">Actual</span>}
                    </div>
                    <span className="mega-item-desc">Baterías portátiles River, DELTA 2 y DELTA Pro.</span>
                  </div>
                </a>

                <a 
                  href="#/energia" 
                  className="mega-item-card"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mega-item-icon-box box-slate">
                    <Sun size={18} />
                  </div>
                  <div className="mega-item-info">
                    <span className="mega-item-title">Paneles Solares & ATS</span>
                    <span className="mega-item-desc">Paneles portátiles, rígidos y transferencias automáticas.</span>
                  </div>
                </a>

                <a 
                  href="#/energia#selector-ecoflow" 
                  className="mega-item-card"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mega-item-icon-box box-slate">
                    <Activity size={18} />
                  </div>
                  <div className="mega-item-info">
                    <span className="mega-item-title">Calculador de Consumo</span>
                    <span className="mega-item-desc">Dimensiona tus equipos y respaldo recomendado.</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Column 3: Servicios TI & Infraestructura */}
            <div className="mega-menu-col">
              <div className="mega-col-header">
                <span className="col-header-dot dot-blue"></span>
                <span className="col-header-title">Servicios TI & Redes</span>
              </div>
              <div className="mega-col-items">
                <a 
                  href="#/servicios-ti" 
                  className={`mega-item-card ${currentRoute === 'servicios-ti' ? 'active-page' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mega-item-icon-box box-blue">
                    <Server size={18} />
                  </div>
                  <div className="mega-item-info">
                    <div className="item-title-row">
                      <span className="mega-item-title">Redes & Conectividad</span>
                      {currentRoute === 'servicios-ti' && <span className="current-badge">Actual</span>}
                    </div>
                    <span className="mega-item-desc">Cableado estructurado, Wi-Fi 6 e ingeniería.</span>
                  </div>
                </a>

                <a 
                  href="#/servicios-ti" 
                  className="mega-item-card"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mega-item-icon-box box-slate">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="mega-item-info">
                    <span className="mega-item-title">CCTV IP & Seguridad</span>
                    <span className="mega-item-desc">Videovigilancia inteligente y control de accesos.</span>
                  </div>
                </a>

                <a 
                  href="#/servicios-ti#diagnostico" 
                  className="mega-item-card"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mega-item-icon-box box-slate">
                    <Cpu size={18} />
                  </div>
                  <div className="mega-item-info">
                    <span className="mega-item-title">Diagnóstico TI Operativo</span>
                    <span className="mega-item-desc">Evaluación rápida de continuidad e infraestructura.</span>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* Mega Menu Footer Banner */}
          <div className="mega-menu-footer-bar">
            <div className="footer-bar-content">
              <span className="footer-bar-lightdot"></span>
              <span className="footer-bar-text">¿Necesitas una solución técnica integrada para tu operación en Perú?</span>
            </div>
            <a 
              href={whatsappExpertUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-bar-btn"
              onClick={() => setIsOpen(false)}
            >
              <span>Consultar Ingeniero</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

