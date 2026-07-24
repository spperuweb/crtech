import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EvidenceVideo {
  id: string;
  vertical: 'drones';
  title: string;
  caption: string;
  videoUrl: string;
  posterUrl: string;
  badge: string;
  link: string;
}

interface EvidenceImage {
  id: string;
  vertical: 'energia' | 'it';
  title: string;
  caption: string;
  imageUrl: string;
  badge: string;
  badgeClass: 'amber' | 'violet';
  link: string;
  linkText: string;
}

const EVIDENCE_VIDEOS: EvidenceVideo[] = [
  {
    id: 'video-1',
    vertical: 'drones',
    title: 'Ensamble y Despliegue en Zona Costera',
    caption: 'Preparación rápida, calibración y armado del dron SwellPro sobre orilla rocosa para operaciones marítimas de alta resistencia a la intemperie.',
    videoUrl: 'https://res.cloudinary.com/drvejtepq/video/upload/v1779941029/swellpro-peru-en-accion-04_tksmyf.mp4',
    posterUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto,w_1000,c_fill,g_auto/v1779929015/swellpro-peru-dron_jhkqhb.jpg',
    badge: 'DRONES · ENSAMBLE Y DESPLIEGUE',
    link: '#/drones'
  },
  {
    id: 'video-2',
    vertical: 'drones',
    title: 'Operación en Embarcación y Pesca Marina',
    caption: 'Operación del dron SwellPro 100% impermeabilizado directamente desde cubierta en alta mar, apoyando maniobras de pesca e inspección.',
    videoUrl: 'https://res.cloudinary.com/drvejtepq/video/upload/v1779941031/swellpro-peru-en-capturas-10_ef6sck.mp4',
    posterUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto,w_1000,c_fill,g_auto/v1779929016/swellpro-peru-capturas-02_usflmo.jpg',
    badge: 'DRONES · OPERACIÓN EN EMBARCACIÓN',
    link: '#/drones'
  },
  {
    id: 'video-3',
    vertical: 'drones',
    title: 'Mecanismo Payload y Carga Útil Efectiva',
    caption: 'Resultados reales de suelta de cebo y entrega de carga con soltador mecánico de precisión para pesca marina a larga distancia.',
    videoUrl: 'https://res.cloudinary.com/drvejtepq/video/upload/v1779941037/swellpro-peru-captura-11_qivbja.mp4',
    posterUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto,w_1000,c_fill,g_auto/v1779929016/swellpro-peru-capturas-08_iiawap.jpg',
    badge: 'DRONES · MECANISMO PAYLOAD',
    link: '#/drones'
  }
];

const ENERGIA_IMAGES: EvidenceImage[] = [
  {
    id: 'e-1',
    vertical: 'energia',
    title: 'Climatización Portátil EcoFlow Wave',
    caption: 'Climatización inteligente de alto rendimiento para módulos de control, tiendas de campaña técnica y vehículos operativos.',
    imageUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422174/Ecoflow_aire_acondicionado_portatil_ltjrpz.png',
    badge: 'ENERGÍA · ECOFLOW WAVE',
    badgeClass: 'amber',
    link: '#/energia',
    linkText: 'Explorar Energía'
  },
  {
    id: 'e-2',
    vertical: 'energia',
    title: 'Sombrero Solar Fotovoltaico Wearable',
    caption: 'Equipamiento personal con celdas solares integradas para la recarga directa de smartphones, GPS y radiofrecuencias.',
    imageUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422173/Ecoflow_sombrero_solarpng_hobdm2.png',
    badge: 'ENERGÍA · CELDAS WEARABLE',
    badgeClass: 'amber',
    link: '#/energia',
    linkText: 'Explorar Energía'
  },
  {
    id: 'e-3',
    vertical: 'energia',
    title: 'PowerBanks Magnéticos EcoFlow RAPID',
    caption: 'Sistemas de energía portátiles con acople magnético y carga ultrarrápida para mantener conectadas brigadas y dispositivos.',
    imageUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422192/Ecoflow_PowerBankMagnetic_pucvzv.png',
    badge: 'ENERGÍA · CORTEX MAGNETIC',
    badgeClass: 'amber',
    link: '#/energia',
    linkText: 'Explorar Energía'
  }
];

const IT_IMAGES: EvidenceImage[] = [
  {
    id: 'it-1',
    vertical: 'it',
    title: 'Infraestructura de Cableado y Servidores',
    caption: 'Montaje de racks de datos, enrutadores de alta velocidad y cableado estructurado para comunicaciones industriales.',
    imageUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1784918192/pexels-soc-nang-d-ng-2150345854-36779651_ay2yx9.jpg',
    badge: 'SERVICIOS TI · CABLEADO & RACKS',
    badgeClass: 'violet',
    link: '#/servicios-ti',
    linkText: 'Explorar Servicios TI'
  },
  {
    id: 'it-2',
    vertical: 'it',
    title: 'Centro de Monitoreo y Mesa de Ayuda TI',
    caption: 'Gestión proactiva de redes, supervisión de servidores en tiempo real y soporte técnico especializado 24/7.',
    imageUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1784920788/hf_20260724_191443_973adb77-071d-45e3-8643-9a34cb117243_tcsope.png',
    badge: 'SERVICIOS TI · MONITOREO 24/7',
    badgeClass: 'violet',
    link: '#/servicios-ti',
    linkText: 'Explorar Servicios TI'
  },
  {
    id: 'it-3',
    vertical: 'it',
    title: 'Seguridad Electrónica y Control CCTV',
    caption: 'Centros de control perimetral con cámaras térmicas e IP, analítica de video e integración con alertas en tiempo real.',
    imageUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1784921014/hf_20260724_192136_07043d3f-3ce7-41c1-86e2-e606358a9682_ssbnic.png',
    badge: 'SERVICIOS TI · VIDEOVIGILANCIA',
    badgeClass: 'violet',
    link: '#/servicios-ti',
    linkText: 'Explorar Servicios TI'
  }
];

export default function RealEvidenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'drones' | 'energia' | 'it'>('all');

  // Video playback coordination: pause other videos when one plays
  const handlePlay = (playedIndex: number) => {
    videoRefs.current.forEach((videoEl, idx) => {
      if (videoEl && idx !== playedIndex && !videoEl.paused) {
        videoEl.pause();
      }
    });
  };

  // Pause videos when section scrolls out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            videoRefs.current.forEach((videoEl) => {
              if (videoEl && !videoEl.paused) {
                videoEl.pause();
              }
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // GSAP animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReduced) return;

      gsap.fromTo(
        '.evidence-header-content',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        '.evidence-grid-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.evidence-content-block',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const showVideos = activeTab === 'all' || activeTab === 'drones';
  const showEnergy = activeTab === 'all' || activeTab === 'energia';
  const showTI = activeTab === 'all' || activeTab === 'it';

  return (
    <section className="evidence-section" id="evidencia" ref={sectionRef}>
      <div className="evidence-container">
        {/* Header */}
        <div className="evidence-header-content">
          <span className="evidence-eyebrow">TECNOLOGÍA EN OPERACIÓN</span>
          <h2 className="evidence-title">
            No solo la recomendamos.<br />
            <span className="highlight-text">La ponemos en campo.</span>
          </h2>
          <p className="evidence-description">
            Demostración técnica en condiciones reales: videos 9:16 de despliegues aéreos e infraestructura de energía y servicios TI en acción.
          </p>

          {/* Filter Bar */}
          <div className="evidence-filter-bar">
            <button
              onClick={() => setActiveTab('all')}
              className={`evidence-filter-btn ${activeTab === 'all' ? 'active' : ''}`}
            >
              Todas las Soluciones
            </button>
            <button
              onClick={() => setActiveTab('drones')}
              className={`evidence-filter-btn cyan ${activeTab === 'drones' ? 'active' : ''}`}
            >
              Drones (Videos 9:16)
            </button>
            <button
              onClick={() => setActiveTab('energia')}
              className={`evidence-filter-btn amber ${activeTab === 'energia' ? 'active' : ''}`}
            >
              Energía Portátil
            </button>
            <button
              onClick={() => setActiveTab('it')}
              className={`evidence-filter-btn violet ${activeTab === 'it' ? 'active' : ''}`}
            >
              Servicios TI
            </button>
          </div>
        </div>

        {/* Content Block */}
        <div className="evidence-content-block">
          
          {/* Sub-block 1: Videos 9:16 (Drones) */}
          {showVideos && (
            <div className="evidence-group-wrapper">
              <div className="group-header">
                <span className="group-badge cyan">DEMOSTRACIONES EN VIVO · FORMATO REELS 9:16</span>
                <h3 className="group-title">Sistemas Aéreos SwellPro en Acción</h3>
              </div>
              <div className="evidence-reels-grid">
                {EVIDENCE_VIDEOS.map((item, idx) => (
                  <div key={item.id} className="evidence-grid-card evidence-video-card-916">
                    <div className="video-wrapper-916">
                      <video
                        ref={(el) => { videoRefs.current[idx] = el; }}
                        src={item.videoUrl}
                        poster={item.posterUrl}
                        preload="metadata"
                        controls
                        muted
                        playsInline
                        onPlay={() => handlePlay(idx)}
                        className="evidence-video-player-916"
                      />
                      <div className="video-overlay-badge cyan">{item.badge}</div>
                    </div>
                    <div className="video-card-body-916">
                      <h4 className="video-card-title-916">{item.title}</h4>
                      <p className="video-card-caption-916">{item.caption}</p>
                      <a href={item.link} className="card-explore-link cyan">
                        <span>Explorar Drones</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="link-arrow">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-block 2: Energía Autónoma (EcoFlow) */}
          {showEnergy && (
            <div className="evidence-group-wrapper">
              <div className="group-header">
                <span className="group-badge amber">EQUIPAMIENTO DE ENERGÍA Y CLIMATIZACIÓN</span>
                <h3 className="group-title">Energía Portátil EcoFlow & Respaldo en Campo</h3>
              </div>
              <div className="evidence-equipment-grid">
                {ENERGIA_IMAGES.map(item => (
                  <div key={item.id} className="evidence-grid-card equipment-card">
                    <div className="equipment-image-frame">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="equipment-img"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className={`equipment-badge ${item.badgeClass}`}>{item.badge}</div>
                    </div>
                    <div className="equipment-card-body">
                      <h4 className="equipment-card-title">{item.title}</h4>
                      <p className="equipment-card-caption">{item.caption}</p>
                      <a href={item.link} className={`card-explore-link ${item.badgeClass}`}>
                        <span>{item.linkText}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="link-arrow">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-block 3: Servicios TI Corporativos */}
          {showTI && (
            <div className="evidence-group-wrapper">
              <div className="group-header">
                <span className="group-badge violet">INFRAESTRUCTURA Y CONECTIVIDAD CRÍTICA</span>
                <h3 className="group-title">Servicios TI, Redes y Videovigilancia</h3>
              </div>
              <div className="evidence-equipment-grid">
                {IT_IMAGES.map(item => (
                  <div key={item.id} className="evidence-grid-card equipment-card">
                    <div className="equipment-image-frame">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="equipment-img"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className={`equipment-badge ${item.badgeClass}`}>{item.badge}</div>
                    </div>
                    <div className="equipment-card-body">
                      <h4 className="equipment-card-title">{item.title}</h4>
                      <p className="equipment-card-caption">{item.caption}</p>
                      <a href={item.link} className={`card-explore-link ${item.badgeClass}`}>
                        <span>{item.linkText}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="link-arrow">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

