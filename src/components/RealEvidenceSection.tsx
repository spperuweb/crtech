import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EvidenceVideo {
  id: string;
  title: string;
  caption: string;
  videoUrl: string;
  posterUrl: string;
  badge: string;
}

const EVIDENCE_VIDEOS: EvidenceVideo[] = [
  {
    id: 'main-case',
    title: 'Operación Costera Completa',
    caption: 'Despliegue y vuelo de inspección sobre superficie marina en ambiente costero',
    videoUrl: 'https://res.cloudinary.com/drvejtepq/video/upload/v1779941029/swellpro-peru-en-accion-04_tksmyf.mp4',
    posterUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto,w_1000,c_fill,g_auto/v1779929015/swellpro-peru-dron_jhkqhb.jpg',
    badge: 'OPERACIÓN AÉREA EN VIVO'
  },
  {
    id: 'case-2',
    title: 'Aproximación e Inspección',
    caption: 'Registro y estabilidad visual en maniobras de aproximación técnica',
    videoUrl: 'https://res.cloudinary.com/drvejtepq/video/upload/v1779941031/swellpro-peru-en-capturas-10_ef6sck.mp4',
    posterUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto,w_1000,c_fill,g_auto/v1779929016/swellpro-peru-capturas-02_usflmo.jpg',
    badge: 'ESTABILIDAD Y PRECISIÓN'
  },
  {
    id: 'case-3',
    title: 'Mecanismo de Carga Útil',
    caption: 'Prueba del sistema de sujeción y liberación de carga útil en campo',
    videoUrl: 'https://res.cloudinary.com/drvejtepq/video/upload/v1779941037/swellpro-peru-captura-11_qivbja.mp4',
    posterUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto,w_1000,c_fill,g_auto/v1779929016/swellpro-peru-capturas-08_iiawap.jpg',
    badge: 'MECANISMO DE CARGA'
  }
];

export default function RealEvidenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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
        '.evidence-video-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.evidence-grid-layout',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
            Observa cómo responde la tecnología en condiciones reales de trabajo, agua, distancia y despliegue.
          </p>
        </div>

        {/* Video Grid */}
        <div className="evidence-grid-layout">
          {/* Main Video (Featured) */}
          <div className="evidence-video-card main-card">
            <div className="video-wrapper">
              <video
                ref={(el) => { videoRefs.current[0] = el; }}
                src={EVIDENCE_VIDEOS[0].videoUrl}
                poster={EVIDENCE_VIDEOS[0].posterUrl}
                preload="metadata"
                controls
                muted
                playsInline
                onPlay={() => handlePlay(0)}
                className="evidence-video-player"
              />
              <div className="video-overlay-badge">{EVIDENCE_VIDEOS[0].badge}</div>
            </div>
            <div className="video-card-body">
              <h3 className="video-card-title">{EVIDENCE_VIDEOS[0].title}</h3>
              <p className="video-card-caption">{EVIDENCE_VIDEOS[0].caption}</p>
            </div>
          </div>

          {/* Secondary Videos Side-by-Side */}
          <div className="evidence-secondary-group">
            {EVIDENCE_VIDEOS.slice(1).map((item, idx) => {
              const videoIndex = idx + 1;
              return (
                <div key={item.id} className="evidence-video-card secondary-card">
                  <div className="video-wrapper">
                    <video
                      ref={(el) => { videoRefs.current[videoIndex] = el; }}
                      src={item.videoUrl}
                      poster={item.posterUrl}
                      preload="metadata"
                      controls
                      muted
                      playsInline
                      onPlay={() => handlePlay(videoIndex)}
                      className="evidence-video-player"
                    />
                    <div className="video-overlay-badge">{item.badge}</div>
                  </div>
                  <div className="video-card-body">
                    <h3 className="video-card-title">{item.title}</h3>
                    <p className="video-card-caption">{item.caption}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
