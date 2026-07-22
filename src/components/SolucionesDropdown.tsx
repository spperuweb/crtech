import React, { useState, useRef, useEffect } from 'react';

interface SolucionesDropdownProps {
  currentRoute?: 'home' | 'drones' | 'energia' | 'servicios-ti';
}

export default function SolucionesDropdown({ currentRoute }: SolucionesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const solutions = [
    {
      title: 'Drones Profesionales',
      subtitle: 'SwellPro Perú',
      href: '#/drones',
      key: 'drones',
    },
    {
      title: 'Energía EcoFlow',
      subtitle: 'Sistemas Portátiles & Solar',
      href: '#/energia',
      key: 'energia',
    },
    {
      title: 'Servicios TI',
      subtitle: 'Infraestructura & Redes',
      href: '#/servicios-ti',
      key: 'servicios-ti',
    },
  ];

  return (
    <div 
      className="soluciones-dropdown-container" 
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={`soluciones-dropdown-trigger nav-link ${isOpen ? 'open' : ''} ${currentRoute && currentRoute !== 'home' ? 'has-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Soluciones CRTech menú desplegable"
      >
        <span>Soluciones CRTech</span>
        <svg 
          className={`dropdown-chevron ${isOpen ? 'rotate' : ''}`} 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {isOpen && (
        <div className="soluciones-dropdown-menu" role="menu" aria-orientation="vertical">
          {solutions.map((sol) => {
            const isActive = currentRoute === sol.key;
            return (
              <a
                key={sol.key}
                href={sol.href}
                className={`soluciones-dropdown-item ${isActive ? 'active' : ''}`}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <div className="item-content">
                  <span className="item-title">{sol.title}</span>
                  <span className="item-sub">{sol.subtitle}</span>
                </div>
                {isActive && <span className="item-active-dot" title="Página actual"></span>}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
