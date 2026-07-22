import React, { useState, useEffect } from 'react';
import { assets } from '../data/assets';

// Types for Diagnostic Data
interface QuestionOption {
  id: string;
  label: string;
}

interface Question {
  id: 'necesidad' | 'entorno' | 'estado';
  title: string;
  options: QuestionOption[];
}

const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 'necesidad',
    title: '¿Qué situación necesitas revisar?',
    options: [
      { id: 'red_inestable', label: 'La red o conexión es inestable.' },
      { id: 'equipos_fallas', label: 'Los equipos presentan fallas recurrentes.' },
      { id: 'videovigilancia', label: 'Necesito implementar o mejorar videovigilancia.' },
      { id: 'respaldos', label: 'Me preocupan respaldos y continuidad.' },
      { id: 'toda_infra', label: 'Necesito evaluar toda la infraestructura.' },
      { id: 'sin_identificar', label: 'Todavía no identifico la causa.' }
    ]
  },
  {
    id: 'entorno',
    title: '¿En qué entorno se encuentra la infraestructura?',
    options: [
      { id: 'oficina', label: 'Oficina o pequeño negocio.' },
      { id: 'local_comercial', label: 'Local comercial.' },
      { id: 'almacen_taller', label: 'Almacén, taller o instalación operativa.' },
      { id: 'institucion', label: 'Institución educativa o administrativa.' },
      { id: 'varias_sedes', label: 'Varias sedes.' },
      { id: 'otro_entorno', label: 'Otro entorno.' }
    ]
  },
  {
    id: 'estado',
    title: '¿Cuál describe mejor la situación?',
    options: [
      { id: 'planificando', label: 'Estoy planificando un proyecto.' },
      { id: 'problemas_recurrentes', label: 'Existen problemas recurrentes.' },
      { id: 'actualizar', label: 'Necesito actualizar una instalación existente.' },
      { id: 'incidencia_activa', label: 'Hay una incidencia activa.' },
      { id: 'mantenimiento_prev', label: 'Necesito mantenimiento preventivo.' },
      { id: 'definiendo_alcance', label: 'Todavía estoy definiendo el alcance.' }
    ]
  }
];

interface DiagnosticResult {
  areaSugerida: string;
  motivo: string;
  preparar: string[];
}

export default function ServiciosTILanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>('Redes e infraestructura');

  // Diagnostic state
  const [diagStep, setDiagStep] = useState<number>(1); // 1, 2, 3 or 4 (result)
  const [diagAnswers, setDiagAnswers] = useState<{
    necesidad: string;
    entorno: string;
    estado: string;
  }>({
    necesidad: '',
    entorno: '',
    estado: ''
  });

  // FAQ state (accordion)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    // SEO setup for Servicios TI sublanding page
    document.title = 'Servicios TI, Redes y Videovigilancia en Perú | CR Tech';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Infraestructura de redes, soporte TI, videovigilancia y soluciones de continuidad para empresas e instituciones con atención técnica local de CR Technologies & Services.'
      );
    }
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // WhatsApp link construction for quick direct contact selector
  const buildWhatsappUrl = (area: string) => {
    const text = `Hola CR Tech, quiero solicitar una evaluación de Servicios TI.\n\nÁrea de interés: ${area}\n\nNecesito orientación para definir el alcance del proyecto.`;
    return `https://wa.me/51991664146?text=${encodeURIComponent(text)}`;
  };

  const defaultWhatsappUrl = 'https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20quiero%20evaluar%20la%20infraestructura%20TI%20de%20mi%20empresa.';

  // Diagnostic logic calculate recommendation
  const calculateResult = (): DiagnosticResult => {
    const { necesidad, entorno, estado } = diagAnswers;

    // Rule 1: Evaluación Integral
    if (
      necesidad === 'Necesito evaluar toda la infraestructura.' ||
      necesidad === 'Todavía no identifico la causa.' ||
      entorno === 'Varias sedes.' ||
      estado === 'Todavía estoy definiendo el alcance.'
    ) {
      return {
        areaSugerida: 'Evaluación Integral de Infraestructura',
        motivo: 'Tu situación involucra diferentes capas de la operación (o requiere priorización). Una evaluación integral permitirá distinguir qué parte corresponde a conectividad, equipos, seguridad o continuidad.',
        preparar: [
          'Cantidad aproximada de usuarios y estaciones.',
          'Número de sedes o espacios involucrados.',
          'Descripción general de los problemas o metas.',
          'Equipos existentes (routers, servidores, cámaras).',
          'Horarios u momentos en que ocurren interrupciones.'
        ]
      };
    }

    // Rule 2: Redes e Infraestructura
    if (necesidad === 'La red o conexión es inestable.' || estado === 'Estoy planificando un proyecto.') {
      return {
        areaSugerida: 'Redes e Infraestructura',
        motivo: 'Conviene comenzar con una evaluación de redes e infraestructura para revisar distribución física, cableado, enlaces, equipos de comunicación y puntos críticos de estabilidad.',
        preparar: [
          'Cantidad de dispositivos o usuarios conectados.',
          'Distribución del espacio (oficinas, almacén, niveles).',
          'Proveedor actual de internet y ancho de banda.',
          'Planos o croquis del área (si están disponibles).'
        ]
      };
    }

    // Rule 3: Soporte TI
    if (
      necesidad === 'Los equipos presentan fallas recurrentes.' ||
      estado === 'Necesito mantenimiento preventivo.' ||
      estado === 'Hay una incidencia activa.'
    ) {
      return {
        areaSugerida: 'Soporte TI y Mantenimiento',
        motivo: 'Conviene comenzar con un diagnóstico de soporte TI para identificar la causa raíz de las fallas, definir prioridades de intervención y establecer acciones de mantenimiento.',
        preparar: [
          'Cantidad y tipo de equipos afectados (laptops, PCs, servidores).',
          'Síntomas o fallas principales observadas.',
          'Antigüedad aproximada de los equipos.',
          'Averías o reemplazos previos realizados.'
        ]
      };
    }

    // Rule 4: Videovigilancia y Seguridad
    if (necesidad === 'Necesito implementar o mejorar videovigilancia.') {
      return {
        areaSugerida: 'Videovigilancia y Seguridad',
        motivo: 'Conviene comenzar con una evaluación de videovigilancia para revisar puntos de cobertura, ángulos de visión, cableado/red de transmisión, monitoreo y capacidad de almacenamiento.',
        preparar: [
          'Zonas prioritarias a monitorear (accesos, almacenes, exterior).',
          'Cámaras existentes (si aplica) y grabador (NVR/DVR).',
          'Requerimientos de acceso remoto o centro de control.',
          'Días de almacenamiento deseados.'
        ]
      };
    }

    // Rule 5: Continuidad y Respaldos
    if (necesidad === 'Me preocupan respaldos y continuidad.') {
      return {
        areaSugerida: 'Continuidad y Respaldos',
        motivo: 'Conviene comenzar identificando configuraciones, copias de seguridad existentes y dependencias críticas para definir un alcance de continuidad operativa.',
        preparar: [
          'Sistemas o archivos indispensables para operar.',
          'Métodos de respaldo actuales (si existen).',
          'Puntos de falla conocidos en la conectividad.',
          'Acceso a contraseñas y documentación de red.'
        ]
      };
    }

    // Default Fallback
    return {
      areaSugerida: 'Redes e Infraestructura',
      motivo: 'Conviene comenzar con una revisión de la infraestructura base para asegurar la conectividad y disponibilidad de tus operaciones.',
      preparar: [
        'Cantidad aproximada de usuarios.',
        'Número de sedes o espacios.',
        'Descripción del problema o requerimiento.'
      ]
    };
  };

  const buildDiagnosticWhatsappUrl = () => {
    const result = calculateResult();
    const text = `Hola CR Tech, completé el diagnóstico orientativo de Servicios TI.

Necesidad principal: ${diagAnswers.necesidad || 'No especificado'}
Tipo de entorno: ${diagAnswers.entorno || 'No especificado'}
Estado actual: ${diagAnswers.estado || 'No especificado'}
Área sugerida para comenzar: ${result.areaSugerida}

Quiero validar el alcance con un especialista.`;

    return `https://wa.me/51991664146?text=${encodeURIComponent(text)}`;
  };

  const handleOptionSelect = (questionId: 'necesidad' | 'entorno' | 'estado', optionLabel: string) => {
    setDiagAnswers(prev => ({ ...prev, [questionId]: optionLabel }));
    if (diagStep < 3) {
      setDiagStep(prev => prev + 1);
    } else {
      setDiagStep(4); // Move to result
    }
  };

  const handleResetDiagnostic = () => {
    setDiagStep(1);
    setDiagAnswers({ necesidad: '', entorno: '', estado: '' });
  };

  const areaOptions = [
    {
      id: 'redes',
      label: 'Redes e infraestructura',
      description: 'Cableado estructurado, conectividad, fibra óptica, enlaces inalámbricos y routers/firewalls.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="area-icon">
          <rect x="2" y="2" width="6" height="6" rx="1" />
          <rect x="16" y="2" width="6" height="6" rx="1" />
          <rect x="9" y="16" width="6" height="6" rx="1" />
          <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
          <path d="M12 13v3" />
        </svg>
      )
    },
    {
      id: 'soporte',
      label: 'Soporte TI',
      description: 'Mantenimiento preventivo, correctivo, diagnóstico técnico y asistencia para estaciones de trabajo.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="area-icon">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      id: 'videovigilancia',
      label: 'Videovigilancia',
      description: 'Cámaras de seguridad, monitoreo centralizado, almacenamiento y control de acceso.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="area-icon">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      )
    },
    {
      id: 'continuidad',
      label: 'Continuidad y respaldos',
      description: 'Copias de seguridad, redundancia de red, revisión de puntos críticos y documentación.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="area-icon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      )
    }
  ];

  const faqItems = [
    {
      q: '¿Pueden revisar una infraestructura que ya está instalada?',
      a: 'Sí. La evaluación inicial permite identificar el estado de la instalación existente y definir qué elementos pueden conservarse, reorganizarse o actualizarse.'
    },
    {
      q: '¿El servicio puede ser remoto o presencial?',
      a: 'Depende del diagnóstico, la ubicación y el tipo de incidencia. Algunas revisiones pueden comenzar de forma remota y otras requieren una visita técnica.'
    },
    {
      q: '¿CR Tech suministra también los equipos?',
      a: 'El alcance puede incluir suministro, configuración e instalación de equipos, según las necesidades y la propuesta aprobada.'
    },
    {
      q: '¿Trabajan redes y videovigilancia dentro del mismo proyecto?',
      a: 'Sí, cuando el alcance lo requiere pueden evaluarse como partes relacionadas de la infraestructura.'
    },
    {
      q: '¿Realizan mantenimiento preventivo?',
      a: 'Puede definirse un alcance de mantenimiento según los equipos, la infraestructura y la frecuencia acordada.'
    },
    {
      q: '¿Qué información se necesita para cotizar?',
      a: 'Conviene conocer la ubicación, cantidad de usuarios, espacios involucrados, equipos existentes y objetivo del proyecto. Una evaluación permite precisar el alcance.'
    }
  ];

  return (
    <div className="servicios-ti-wrapper">
      {/* 1. HEADER SUBLANDING SERVICIOS TI */}
      <header className="servicios-ti-header sticky-header">
        <div className="header-container">
          <div className="brand-ident-group">
            <a href="#" className="header-logo" onClick={closeMenu}>
              <img 
                src={assets.logos.lightBack} 
                alt="CR Technologies & Services" 
                className="header-logo-img"
                width="200"
                height="40"
              />
            </a>
            <span className="sublanding-badge">SERVICIOS TI E INFRAESTRUCTURA</span>
          </div>

          <nav className="desktop-nav" aria-label="Navegación Servicios TI">
            <a href="#diagnostico" onClick={(e) => scrollToSection(e, 'diagnostico')} className="nav-link">Diagnóstico</a>
            <a href="#infraestructura" onClick={(e) => scrollToSection(e, 'infraestructura')} className="nav-link">Infraestructura</a>
            <a href="#soporte" onClick={(e) => scrollToSection(e, 'soporte')} className="nav-link">Soporte</a>
            <a href="#escenarios" onClick={(e) => scrollToSection(e, 'escenarios')} className="nav-link">Escenarios</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="nav-link">FAQ</a>
            <a href="#" className="nav-link nav-link-return">← Volver a CRTech</a>
          </nav>

          <div className="header-cta-wrapper">
            <a 
              href={defaultWhatsappUrl} 
              className="btn btn-primary header-cta-btn"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Solicitar evaluación
            </a>
          </div>

          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú de navegación"
            type="button"
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-nav" aria-label="Navegación móvil Servicios TI">
            <a href="#diagnostico" onClick={(e) => scrollToSection(e, 'diagnostico')} className="mobile-nav-link">Diagnóstico</a>
            <a href="#infraestructura" onClick={(e) => scrollToSection(e, 'infraestructura')} className="mobile-nav-link">Infraestructura</a>
            <a href="#soporte" onClick={(e) => scrollToSection(e, 'soporte')} className="mobile-nav-link">Soporte</a>
            <a href="#escenarios" onClick={(e) => scrollToSection(e, 'escenarios')} className="mobile-nav-link">Escenarios</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="mobile-nav-link">FAQ</a>
            <a href="#" onClick={closeMenu} className="mobile-nav-link">← Volver a CRTech Principal</a>
            <a 
              href={defaultWhatsappUrl} 
              className="btn btn-primary mobile-cta-btn"
              target="_blank" 
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Solicitar evaluación
            </a>
          </nav>
        </div>
      </header>

      <main id="servicios-ti-main">
        {/* 2. HERO SECTION */}
        <section className="ti-hero-section">
          <div className="section-container ti-hero-grid">
            <div className="ti-hero-content-col">
              <div className="hero-eyebrow-badge">SERVICIOS TI · INFRAESTRUCTURA Y SOPORTE</div>
              <h1 className="ti-hero-title">
                Tecnología que permanece disponible cuando tu operación no puede detenerse.
              </h1>
              <p className="ti-hero-desc">
                Diseñamos e implementamos redes, soporte tecnológico, videovigilancia y soluciones de continuidad para empresas e instituciones, con acompañamiento técnico local.
              </p>

              <div className="ti-hero-ctas">
                <a 
                  href="#diagnostico" 
                  onClick={(e) => scrollToSection(e, 'diagnostico')} 
                  className="btn btn-primary"
                >
                  Evaluar mi infraestructura
                </a>
                <a 
                  href="#infraestructura" 
                  onClick={(e) => scrollToSection(e, 'infraestructura')} 
                  className="btn btn-secondary"
                >
                  Explorar soluciones
                </a>
              </div>

              <div className="ti-hero-trust-highlights">
                <div className="highlight-item">
                  <span className="check-dot"></span>
                  <span>Diagnóstico técnico</span>
                </div>
                <div className="highlight-item">
                  <span className="check-dot"></span>
                  <span>Implementación documentada</span>
                </div>
                <div className="highlight-item">
                  <span className="check-dot"></span>
                  <span>Soporte y mantenimiento local</span>
                </div>
              </div>
            </div>

            {/* Topología SVG Operativa */}
            <div className="ti-hero-visual-col">
              <div className="topology-card-wrapper">
                <div className="topology-card-header">
                  <span className="topology-card-title">TOPOLOGÍA OPERATIVA DE INFRAESTRUCTURA</span>
                  <span className="topology-status-pill"><span className="status-dot-active"></span> SISTEMA ACTIVO</span>
                </div>

                <div className="topology-svg-container">
                  <svg 
                    className="topology-svg" 
                    viewBox="0 0 600 380" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Grid background lines */}
                    <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="2 2" />
                    </pattern>
                    <rect width="600" height="380" fill="url(#grid-pattern)" opacity="0.6" />

                    {/* Connecting paths */}
                    <path d="M 110 90 Q 220 90 300 190" stroke="#0284C7" strokeWidth="2.5" fill="none" strokeDasharray="4 2" />
                    <path d="M 490 90 Q 380 90 300 190" stroke="#7C3AED" strokeWidth="2.5" fill="none" />
                    <path d="M 110 290 Q 220 290 300 190" stroke="#0284C7" strokeWidth="2.5" fill="none" />
                    <path d="M 490 290 Q 380 290 300 190" stroke="#10B981" strokeWidth="2.5" fill="none" />

                    {/* Alert / Failover line */}
                    <path d="M 300 190 L 300 330" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />

                    {/* Central Node: OPERACIÓN */}
                    <g transform="translate(300, 190)">
                      <circle r="48" fill="#06142D" />
                      <circle r="42" fill="#0B192C" stroke="#0284C7" strokeWidth="2" />
                      <circle r="6" fill="#10B981" cy="-22" />
                      <text x="0" y="2" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" letterSpacing="0.05em">OPERACIÓN</text>
                      <text x="0" y="16" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="600">CENTRAL</text>
                    </g>

                    {/* Node 1: RED & CONECTIVIDAD */}
                    <g transform="translate(110, 90)">
                      <rect x="-60" y="-28" width="120" height="56" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" filter="drop-shadow(0 4px 12px rgba(2,132,199,0.08))" />
                      <circle cx="-38" cy="0" r="12" fill="#F0F9FF" />
                      <path d="M -42 -4 L -34 4 M -42 4 L -34 -4" stroke="#0284C7" strokeWidth="2" />
                      <text x="10" y="-4" textAnchor="middle" fill="#06142D" fontSize="11" fontWeight="800">RED & ENLACES</text>
                      <text x="10" y="10" textAnchor="middle" fill="#0284C7" fontSize="9" fontWeight="700">Conectividad</text>
                    </g>

                    {/* Node 2: EQUIPOS & USUARIOS */}
                    <g transform="translate(490, 90)">
                      <rect x="-60" y="-28" width="120" height="56" rx="10" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" filter="drop-shadow(0 4px 12px rgba(124,58,237,0.08))" />
                      <text x="0" y="-4" textAnchor="middle" fill="#06142D" fontSize="11" fontWeight="800">EQUIPOS TI</text>
                      <text x="0" y="10" textAnchor="middle" fill="#7C3AED" fontSize="9" fontWeight="700">Estaciones</text>
                    </g>

                    {/* Node 3: SOPORTE TÉCNICO */}
                    <g transform="translate(110, 290)">
                      <rect x="-60" y="-28" width="120" height="56" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" filter="drop-shadow(0 4px 12px rgba(2,132,199,0.08))" />
                      <text x="0" y="-4" textAnchor="middle" fill="#06142D" fontSize="11" fontWeight="800">SOPORTE</text>
                      <text x="0" y="10" textAnchor="middle" fill="#0284C7" fontSize="9" fontWeight="700">Mantenimiento</text>
                    </g>

                    {/* Node 4: VIDEOVIGILANCIA */}
                    <g transform="translate(490, 290)">
                      <rect x="-60" y="-28" width="120" height="56" rx="10" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" filter="drop-shadow(0 4px 12px rgba(16,185,129,0.08))" />
                      <text x="0" y="-4" textAnchor="middle" fill="#06142D" fontSize="11" fontWeight="800">SEGURIDAD</text>
                      <text x="0" y="10" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="700">Monitoreo</text>
                    </g>

                    {/* Respaldo */}
                    <g transform="translate(300, 335)">
                      <rect x="-70" y="-14" width="140" height="28" rx="14" fill="#FEF2F2" stroke="#FECDD3" strokeWidth="1" />
                      <circle cx="-52" cy="0" r="4" fill="#EF4444" />
                      <text x="6" y="4" textAnchor="middle" fill="#991B1B" fontSize="9" fontWeight="700">RESPALDO & RESPUESTA</text>
                    </g>
                  </svg>
                </div>

                <div className="topology-card-footer">
                  <div className="legend-item"><span className="legend-dot dot-blue"></span> Red & Datos</div>
                  <div className="legend-item"><span className="legend-dot dot-violet"></span> Equipos</div>
                  <div className="legend-item"><span className="legend-dot dot-green"></span> Seguridad</div>
                  <div className="legend-item"><span className="legend-dot dot-red"></span> Redundancia</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FRANJA DE CONFIANZA */}
        <section className="ti-trust-strip">
          <div className="section-container">
            <div className="ti-trust-grid">
              <div className="ti-trust-card">
                <div className="trust-card-number">01</div>
                <div className="trust-card-body">
                  <h3 className="trust-card-title">Diagnóstico a medida</h3>
                  <p className="trust-card-desc">Evaluación precisa según las necesidades reales de la operación.</p>
                </div>
              </div>

              <div className="ti-trust-card">
                <div className="trust-card-number">02</div>
                <div className="trust-card-body">
                  <h3 className="trust-card-title">Implementación documentada</h3>
                  <p className="trust-card-desc">Configuración clara, ordenada y totalmente accesible para el cliente.</p>
                </div>
              </div>

              <div className="ti-trust-card">
                <div className="trust-card-number">03</div>
                <div className="trust-card-body">
                  <h3 className="trust-card-title">Acompañamiento local</h3>
                  <p className="trust-card-desc">Atención técnica y soporte presencial/remoto de cercanía en Perú.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PROBLEMA OPERATIVO - LÍNEA OPERATIVA CONECTADA */}
        <section className="ti-problem-section">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">LA INFRAESTRUCTURA FUNCIONA COMO UN SISTEMA</span>
              <h2 className="section-title">Una falla aislada puede detener mucho más que un equipo.</h2>
              <p className="section-desc max-w-3xl">
                Conectividad inestable, equipos sin mantenimiento, puntos ciegos de seguridad o configuraciones sin respaldo pueden afectar toda la operación. Por eso evaluamos la infraestructura como un conjunto conectado.
              </p>
            </div>

            {/* Línea Operativa Conectada (Conectividad -> Equipos -> Seguridad -> Continuidad) */}
            <div className="connected-operativa-line">
              <div className="operativa-item">
                <div className="operativa-node-header">
                  <span className="operativa-badge badge-blue">01</span>
                  <h3 className="operativa-item-title">Conectividad</h3>
                </div>
                <p className="operativa-item-desc">Enlaces, conmutación y tráfico de datos continuo entre áreas y sedes.</p>
              </div>

              <div className="operativa-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="operativa-item">
                <div className="operativa-node-header">
                  <span className="operativa-badge badge-violet">02</span>
                  <h3 className="operativa-item-title">Equipos</h3>
                </div>
                <p className="operativa-item-desc">Estaciones de trabajo y dispositivos configurados en estado óptimo.</p>
              </div>

              <div className="operativa-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="operativa-item">
                <div className="operativa-node-header">
                  <span className="operativa-badge badge-green">03</span>
                  <h3 className="operativa-item-title">Seguridad</h3>
                </div>
                <p className="operativa-item-desc">Protección física, videovigilancia y resguardo perimetral de accesos.</p>
              </div>

              <div className="operativa-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="operativa-item">
                <div className="operativa-node-header">
                  <span className="operativa-badge badge-amber">04</span>
                  <h3 className="operativa-item-title">Continuidad</h3>
                </div>
                <p className="operativa-item-desc">Respaldos estructurados y pronta recuperación ante incidencias.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. DIAGNÓSTICO INTERACTIVO (NUEVA SECCIÓN FASE 7B) */}
        <section className="ti-diagnostico-section" id="diagnostico">
          <div className="section-container">
            <div className="diagnostico-wrapper">
              <div className="section-header center">
                <span className="section-eyebrow">DIAGNÓSTICO ORIENTATIVO</span>
                <h2 className="section-title">Identifica dónde puede comenzar la evaluación.</h2>
                <p className="section-desc max-w-2xl">
                  Responde tres preguntas sobre la situación actual de tu operación. La orientación final será validada por un especialista de CR Tech.
                </p>
              </div>

              <div className="diagnostico-interactive-card">
                {/* Header bar showing step progress */}
                <div className="diag-progress-bar">
                  <div className="diag-step-indicator">
                    {diagStep <= 3 ? (
                      <span>PASO <strong>{diagStep}</strong> DE <strong>3</strong></span>
                    ) : (
                      <span className="text-success font-bold">ORIENTACIÓN SUGERIDA</span>
                    )}
                  </div>
                  <div className="diag-track">
                    <div 
                      className="diag-fill" 
                      style={{ width: `${diagStep === 4 ? 100 : (diagStep / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* STEPS 1 - 3 */}
                {diagStep <= 3 && (
                  <fieldset className="diag-fieldset">
                    <legend className="diag-question-title">
                      {DIAGNOSTIC_QUESTIONS[diagStep - 1].title}
                    </legend>

                    <div className="diag-options-grid">
                      {DIAGNOSTIC_QUESTIONS[diagStep - 1].options.map((opt) => {
                        const currentQId = DIAGNOSTIC_QUESTIONS[diagStep - 1].id;
                        const isSelected = diagAnswers[currentQId] === opt.label;

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            className={`diag-option-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect(currentQId, opt.label)}
                          >
                            <span className="diag-radio-circle"></span>
                            <span className="diag-option-text">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="diag-nav-actions">
                      {diagStep > 1 && (
                        <button 
                          type="button" 
                          className="btn btn-secondary btn-sm"
                          onClick={() => setDiagStep(prev => prev - 1)}
                        >
                          ← Paso anterior
                        </button>
                      )}
                    </div>
                  </fieldset>
                )}

                {/* STEP 4: RESULT SCREEN */}
                {diagStep === 4 && (
                  <div className="diag-result-container" aria-live="polite">
                    <div className="result-header">
                      <span className="result-badge-tag">ÁREA RECOMENDADA PARA COMENZAR</span>
                      <h3 className="result-area-title">{calculateResult().areaSugerida}</h3>
                      <p className="result-motivo">{calculateResult().motivo}</p>
                    </div>

                    <div className="result-prepare-box">
                      <h4 className="prepare-box-title">Información útil para preparar la evaluación:</h4>
                      <ul className="prepare-items-list">
                        {calculateResult().preparar.map((item, idx) => (
                          <li key={idx}><span className="prep-bullet">•</span> {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="result-actions-bar">
                      <a 
                        href={buildDiagnosticWhatsappUrl()} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary btn-lg"
                      >
                        Solicitar evaluación por WhatsApp
                      </a>

                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={handleResetDiagnostic}
                      >
                        Cambiar respuestas
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 6. REDES E INFRAESTRUCTURA */}
        <section className="ti-solution-section" id="infraestructura">
          <div className="section-container">
            <div className="ti-two-col-grid">
              <div className="ti-col-info">
                <span className="section-eyebrow">CONECTIVIDAD</span>
                <h2 className="section-title">Una red diseñada para el entorno real de tu empresa.</h2>
                <p className="section-desc">
                  Diseñamos e implementamos infraestructura de red considerando distribución física, cantidad de usuarios, equipos conectados, estabilidad y posibilidades de crecimiento.
                </p>

                <ul className="ti-services-list">
                  <li><span className="check-bullet">✓</span> Diseño de redes corporativas e institucionales.</li>
                  <li><span className="check-bullet">✓</span> Cableado estructurado ordenado y certificado.</li>
                  <li><span className="check-bullet">✓</span> Enlaces de fibra óptica para comunicación interna.</li>
                  <li><span className="check-bullet">✓</span> Sistemas inalámbricos de alta densidad.</li>
                  <li><span className="check-bullet">✓</span> Configuración de routers, switches y firewalls.</li>
                  <li><span className="check-bullet">✓</span> Organización y documentación técnica de la infraestructura.</li>
                </ul>

                <a 
                  href={buildWhatsappUrl('Redes e infraestructura')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  Consultar proyecto de infraestructura
                </a>
              </div>

              <div className="ti-col-diagram">
                <div className="diagram-card">
                  <div className="diagram-header">
                    <span className="diagram-title">ARQUITECTURA DE RED DE DATOS</span>
                  </div>
                  <div className="arch-diagram-flow">
                    <div className="arch-step">
                      <div className="arch-step-badge">1</div>
                      <div className="arch-step-label">Internet / Enlace Exterior</div>
                    </div>
                    <div className="arch-arrow">↓</div>
                    <div className="arch-step highlighted-step">
                      <div className="arch-step-badge">2</div>
                      <div className="arch-step-label">Seguridad Perimetral & Firewall</div>
                    </div>
                    <div className="arch-arrow">↓</div>
                    <div className="arch-step">
                      <div className="arch-step-badge">3</div>
                      <div className="arch-step-label">Red Principal / Switches Core</div>
                    </div>
                    <div className="arch-arrow">↓</div>
                    <div className="arch-step">
                      <div className="arch-step-badge">4</div>
                      <div className="arch-step-label">Usuarios, Estaciones & Servidores</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. SOPORTE TI CONTINUO */}
        <section className="ti-solution-section bg-alt" id="soporte">
          <div className="section-container">
            <div className="section-header">
              <span className="section-eyebrow">OPERACIÓN</span>
              <h2 className="section-title">Soporte técnico que atiende la causa, no solamente el síntoma.</h2>
              <p className="section-desc max-w-3xl">
                Realizamos diagnóstico, mantenimiento y asistencia para reducir interrupciones y mantener los equipos de trabajo en condiciones operativas.
              </p>
            </div>

            <div className="ti-two-col-grid">
              <div className="ti-col-info">
                <h3 className="col-subheading">ÁMBITOS DE ATENCIÓN TÉCNICA</h3>
                <ul className="ti-services-list">
                  <li><span className="check-bullet">✓</span> Diagnóstico técnico de hardware y software.</li>
                  <li><span className="check-bullet">✓</span> Mantenimiento preventivo programado.</li>
                  <li><span className="check-bullet">✓</span> Mantenimiento correctivo ante emergencias.</li>
                  <li><span className="check-bullet">✓</span> Asistencia técnica remota oportuna.</li>
                  <li><span className="check-bullet">✓</span> Atención presencial según evaluación del caso.</li>
                  <li><span className="check-bullet">✓</span> Orientación para actualización o reemplazo de componentes.</li>
                </ul>

                <a 
                  href={buildWhatsappUrl('Soporte TI')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  Solicitar evaluación de soporte
                </a>
              </div>

              {/* Recorrido de Soporte 01 - 04 */}
              <div className="ti-col-process">
                <div className="process-timeline">
                  <div className="process-step-item">
                    <div className="step-num">01</div>
                    <div className="step-content">
                      <h4 className="step-title">Detección</h4>
                      <p className="step-desc">Identificación de anomalías, fallas de rendimiento o interrupciones reportadas.</p>
                    </div>
                  </div>

                  <div className="process-step-item">
                    <div className="step-num">02</div>
                    <div className="step-content">
                      <h4 className="step-title">Diagnóstico</h4>
                      <p className="step-desc">Evaluación técnica para determinar la causa raíz en hardware o configuración.</p>
                    </div>
                  </div>

                  <div className="process-step-item">
                    <div className="step-num">03</div>
                    <div className="step-content">
                      <h4 className="step-title">Intervención</h4>
                      <p className="step-desc">Aplicación del mantenimiento correctivo o preventivo según protocolo técnico.</p>
                    </div>
                  </div>

                  <div className="process-step-item">
                    <div className="step-num">04</div>
                    <div className="step-content">
                      <h4 className="step-title">Seguimiento</h4>
                      <p className="step-desc">Verificación de estabilidad operativa y registro en la bitácora de soporte.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. VIDEOVIGILANCIA Y SEGURIDAD */}
        <section className="ti-solution-section" id="seguridad">
          <div className="section-container">
            <div className="ti-two-col-grid">
              <div className="ti-col-info">
                <span className="section-eyebrow">VISIBILIDAD Y CONTROL</span>
                <h2 className="section-title">Seguridad tecnológica integrada a la infraestructura.</h2>
                <p className="section-desc">
                  Implementamos sistemas de videovigilancia y monitoreo considerando cobertura, acceso, almacenamiento y continuidad de la operación.
                </p>

                <ul className="ti-services-list">
                  <li><span className="check-bullet">✓</span> Evaluación de puntos de cobertura y ángulos ciegos.</li>
                  <li><span className="check-bullet">✓</span> Instalación de cámaras de seguridad IP y HD.</li>
                  <li><span className="check-bullet">✓</span> Monitoreo centralizado en centro de control o recepción.</li>
                  <li><span className="check-bullet">✓</span> Configuración de acceso remoto seguro para gestión.</li>
                  <li><span className="check-bullet">✓</span> Almacenamiento local o en nube según el proyecto.</li>
                  <li><span className="check-bullet">✓</span> Integración limpia con la red existente.</li>
                </ul>

                <a 
                  href={buildWhatsappUrl('Videovigilancia')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  Evaluar proyecto de videovigilancia
                </a>
              </div>

              <div className="ti-col-diagram">
                <div className="security-scheme-card">
                  <h3 className="scheme-title">FLUJO DE SEGURIDAD ELECTRÓNICA</h3>
                  <div className="scheme-grid">
                    <div className="scheme-box">
                      <span className="scheme-badge">1</span>
                      <strong>Captura</strong>
                      <span>Cámaras IP / Sensores</span>
                    </div>
                    <div className="scheme-arrow">→</div>
                    <div className="scheme-box">
                      <span className="scheme-badge">2</span>
                      <strong>Transmisión</strong>
                      <span>Red Dedicada / VLAN</span>
                    </div>
                    <div className="scheme-arrow">→</div>
                    <div className="scheme-box">
                      <span className="scheme-badge">3</span>
                      <strong>Monitoreo</strong>
                      <span>Central de Control</span>
                    </div>
                    <div className="scheme-arrow">→</div>
                    <div className="scheme-box">
                      <span className="scheme-badge">4</span>
                      <strong>Almacenamiento</strong>
                      <span>NVR / Resguardo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. CONTINUIDAD Y RESPALDO */}
        <section className="ti-solution-section bg-alt" id="continuidad">
          <div className="section-container">
            <div className="ti-two-col-grid">
              <div className="ti-col-info">
                <span className="section-eyebrow">DISPONIBILIDAD</span>
                <h2 className="section-title">Preparar la infraestructura antes de que ocurra una interrupción.</h2>
                <p className="section-desc">
                  Revisamos configuraciones, conectividad, respaldos y puntos críticos para reducir dependencias y facilitar la recuperación de la operación.
                </p>

                <ul className="ti-services-list">
                  <li><span className="check-bullet">✓</span> Revisión detallada de puntos críticos de falla.</li>
                  <li><span className="check-bullet">✓</span> Configuración de respaldos automáticos programados.</li>
                  <li><span className="check-bullet">✓</span> Copias de seguridad locales y remotas según alcance.</li>
                  <li><span className="check-bullet">✓</span> Redundancia de conectividad para evitar cortes de red.</li>
                  <li><span className="check-bullet">✓</span> Documentación de accesos, contraseñas y topología.</li>
                  <li><span className="check-bullet">✓</span> Recomendaciones técnicas de actualización preventiva.</li>
                </ul>

                <a 
                  href={buildWhatsappUrl('Continuidad y respaldos')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  Consultar plan de continuidad
                </a>
              </div>

              <div className="ti-col-diagram">
                <div className="redundancy-card">
                  <h3 className="redundancy-title">DIAGRAMA DE REDUNDANCIA Y RESPALDO</h3>
                  <div className="redundancy-diagram-wrap">
                    <div className="node-main">
                      <span className="node-label">Ruta Principal de Datos</span>
                    </div>
                    <div className="bifurcation-container">
                      <div className="path-active">
                        <span className="path-tag tag-blue">Ruta A (Enlace Primario)</span>
                      </div>
                      <div className="path-backup">
                        <span className="path-tag tag-green">Ruta B (Conexión de Respaldo)</span>
                      </div>
                    </div>
                    <div className="node-reconnect">
                      <span className="node-label">Operación Continua</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. MAPA DE SOLUCIONES (CAPAS CONCÉNTRICAS) */}
        <section className="ti-solutions-map-section" id="soluciones">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">UNA ARQUITECTURA, DIFERENTES CAPAS</span>
              <h2 className="section-title">Conectamos infraestructura, soporte y seguridad alrededor de la operación.</h2>
              <p className="section-desc max-w-3xl">
                Un modelo integrado donde cada área fortalece la disponibilidad global del sistema.
              </p>
            </div>

            <div className="layered-map-container">
              <div className="layer-ring ring-outer">
                <span className="layer-tag tag-outer">CAPA 4: CONTINUIDAD Y RESPALDO</span>
                <div className="layer-ring ring-mid-2">
                  <span className="layer-tag tag-mid-2">CAPA 3: VIDEOVIGILANCIA Y CONTROL</span>
                  <div className="layer-ring ring-mid-1">
                    <span className="layer-tag tag-mid-1">CAPA 2: SOPORTE TI Y MANTENIMIENTO</span>
                    <div className="layer-ring ring-inner">
                      <span className="layer-tag tag-inner">CAPA 1: REDES E INFRAESTRUCTURA</span>
                      <div className="core-operacion-center">
                        <strong>OPERACIÓN DE LA EMPRESA</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. ESCENARIOS FRECUENTES (NUEVA SECCIÓN FASE 7B) */}
        <section className="ti-escenarios-section" id="escenarios">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">ESCENARIOS FRECUENTES</span>
              <h2 className="section-title">Situaciones que conviene evaluar antes de que afecten la operación.</h2>
            </div>

            <div className="escenarios-editorial-grid">
              <div className="escenario-cell">
                <span className="cell-num">01</span>
                <h3 className="cell-title">Conectividad irregular</h3>
                <p className="cell-desc">Usuarios, dispositivos o espacios que pierden acceso o presentan una conexión inestable.</p>
              </div>

              <div className="escenario-cell">
                <span className="cell-num">02</span>
                <h3 className="cell-title">Equipos con incidencias recurrentes</h3>
                <p className="cell-desc">Fallas que se repiten y requieren revisar mantenimiento, configuración o necesidad de actualización.</p>
              </div>

              <div className="escenario-cell">
                <span className="cell-num">03</span>
                <h3 className="cell-title">Cobertura de seguridad incompleta</h3>
                <p className="cell-desc">Zonas sin visibilidad suficiente o sistemas de cámaras que necesitan reorganización.</p>
              </div>

              <div className="escenario-cell">
                <span className="cell-num">04</span>
                <h3 className="cell-title">Información y configuraciones sin respaldo claro</h3>
                <p className="cell-desc">Dependencia de equipos, accesos o archivos que no cuentan con un procedimiento documentado de recuperación.</p>
              </div>
            </div>

            <div className="escenarios-cta-wrap center">
              <a 
                href={defaultWhatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                Conversar sobre mi situación
              </a>
            </div>
          </div>
        </section>

        {/* 12. MÉTODO DE TRABAJO */}
        <section className="ti-method-section" id="metodo">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">NUESTRO MÉTODO</span>
              <h2 className="section-title">Implementación técnica con un proceso claro.</h2>
            </div>

            <div className="method-connected-line">
              <div className="method-step-block">
                <div className="method-step-head">
                  <span className="method-badge">01</span>
                  <h3 className="method-title">Diagnóstico</h3>
                </div>
                <p className="method-desc">Revisamos necesidades, entorno, usuarios, equipos y puntos críticos de la infraestructura existente.</p>
              </div>

              <div className="method-step-block">
                <div className="method-step-head">
                  <span className="method-badge">02</span>
                  <h3 className="method-title">Diseño</h3>
                </div>
                <p className="method-desc">Definimos la arquitectura, especificaciones de componentes y el alcance adecuado para la empresa.</p>
              </div>

              <div className="method-step-block">
                <div className="method-step-head">
                  <span className="method-badge">03</span>
                  <h3 className="method-title">Implementación</h3>
                </div>
                <p className="method-desc">Instalamos, configuramos, realizamos pruebas de esfuerzo y documentamos la solución entregada.</p>
              </div>

              <div className="method-step-block">
                <div className="method-step-head">
                  <span className="method-badge">04</span>
                  <h3 className="method-title">Soporte</h3>
                </div>
                <p className="method-desc">Realizamos mantenimiento preventivo y brindamos acompañamiento técnico continuo según el contrato.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 13. FAQ (NUEVA SECCIÓN FASE 7B) */}
        <section className="ti-faq-section" id="faq">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">PREGUNTAS FRECUENTES</span>
              <h2 className="section-title">Preguntas antes de solicitar una evaluación.</h2>
            </div>

            <div className="faq-accordion-list max-w-3xl">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="faq-item-card">
                    <button
                      type="button"
                      className="faq-trigger-btn"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-ans-${idx}`}
                    >
                      <span className="faq-question-text">{item.q}</span>
                      <span className={`faq-icon-plus ${isOpen ? 'open' : ''}`}>+</span>
                    </button>
                    {isOpen && (
                      <div id={`faq-ans-${idx}`} className="faq-answer-panel">
                        <p className="faq-answer-text">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 14. SELECTOR COMPACTO DE CONTACTO DIRECTO */}
        <section className="ti-asesoria-section" id="asesoria">
          <div className="section-container">
            <div className="asesoria-card-container">
              <div className="section-header center">
                <span className="section-eyebrow">CONTACTO DIRECTO</span>
                <h2 className="section-title">Consulta directa por área de interés</h2>
                <p className="section-desc">
                  Si ya sabes qué solución necesitas, selecciona el área y comunícate directamente con nuestro equipo.
                </p>
              </div>

              {/* 4 Selectable Area Options */}
              <div className="area-selector-grid">
                {areaOptions.map((opt) => {
                  const isSelected = selectedArea === opt.label;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`area-option-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedArea(opt.label)}
                      aria-pressed={isSelected}
                    >
                      <div className="area-card-header">
                        <div className="area-icon-wrap">{opt.icon}</div>
                        <div className="area-radio-dot"></div>
                      </div>
                      <h3 className="area-card-title">{opt.label}</h3>
                      <p className="area-card-desc">{opt.description}</p>
                    </button>
                  );
                })}
              </div>

              <div className="asesoria-action-bar">
                <div className="selected-area-summary">
                  <span>Área seleccionada: <strong>{selectedArea}</strong></span>
                </div>
                <a 
                  href={buildWhatsappUrl(selectedArea)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary btn-lg"
                >
                  Hablar con un especialista
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 15. CTA FINAL */}
        <section className="ti-final-cta-section">
          <div className="section-container center-content">
            <h2 className="final-cta-title">Una operación conectada necesita una infraestructura que pueda sostenerla.</h2>
            <p className="final-cta-desc">
              Conversemos sobre los usuarios, equipos, espacios y procesos que necesitas mantener activos.
            </p>
            <div className="final-cta-btn-wrap">
              <a 
                href={buildWhatsappUrl(selectedArea)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-lg"
              >
                Solicitar evaluación técnica
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 16. FOOTER REORGANIZADO EN 4 COLUMNAS */}
      <footer className="site-footer" id="main-footer">
        <div className="footer-container">
          <div className="footer-brand-column">
            <img 
              src={assets.logos.alternative} 
              alt="CR Tech Services Logo" 
              className="footer-logo-img"
              loading="lazy"
              width="180"
              height="40"
            />
            <p className="footer-brand-desc">
              Soluciones de infraestructura TI, redes corporativas, soporte técnico, videovigilancia y continuidad para empresas e instituciones en Perú.
            </p>
            <div className="footer-legal-details">
              <span className="legal-item"><strong>Razón Social:</strong> CR Technologies & Services E.I.R.L.</span>
              <span className="legal-item"><strong>RUC:</strong> 20615939791</span>
              <span className="legal-item"><strong>Sede:</strong> Lima, Perú</span>
            </div>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-title">Soluciones TI</h4>
            <ul className="footer-links-list">
              <li><a href="#infraestructura" onClick={(e) => scrollToSection(e, 'infraestructura')}>Redes e Infraestructura</a></li>
              <li><a href="#soporte" onClick={(e) => scrollToSection(e, 'soporte')}>Soporte TI Continuo</a></li>
              <li><a href="#seguridad" onClick={(e) => scrollToSection(e, 'seguridad')}>Videovigilancia</a></li>
              <li><a href="#continuidad" onClick={(e) => scrollToSection(e, 'continuidad')}>Continuidad & Respaldos</a></li>
            </ul>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-title">Verticales CR Tech</h4>
            <ul className="footer-links-list">
              <li><a href="#/drones">Drones Profesionales</a></li>
              <li><a href="#/energia">Energía Portátil EcoFlow</a></li>
              <li><a href="#/servicios-ti">Servicios TI & Redes</a></li>
              <li><a href="#">CRTech Principal</a></li>
            </ul>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-title">Contacto Directo</h4>
            <ul className="footer-links-list contact-list">
              <li>
                <a 
                  href={defaultWhatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-contact-link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="footer-icon">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  +51 991 664 146
                </a>
              </li>
              <li>
                <span className="footer-schedule">
                  Evaluaciones e implementación para empresas en todo el Perú.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-sub-bar">
          <div className="footer-sub-bar-container">
            <p className="copyright-text">
              © {new Date().getFullYear()} CR Technologies & Services E.I.R.L. Todos los derechos reservados.
            </p>
            <div className="tech-meta-row">
              <span>Infraestructura, Redes & Servicios TI • Soluciones Aplicadas en el Perú</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
