import { ReactNode } from 'react';
import { pilaresData, PilarItem } from '../data/siteData';

// Custom high-quality geometric inline SVG icons
const PILAR_ICONS: Record<PilarItem['iconName'], ReactNode> = {
  drone: (
    <svg className="w-12 h-12 text-[var(--color-accent-blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Central Hexagon Body */}
      <polygon points="12,7 16,9.5 16,14.5 12,17 8,14.5 8,9.5" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      
      {/* Rotors arms & propeller lines */}
      <line x1="8" y1="9.5" x2="3" y2="5" />
      <line x1="16" y1="9.5" x2="21" y2="5" />
      <line x1="8" y1="14.5" x2="3" y2="19" />
      <line x1="16" y1="14.5" x2="21" y2="19" />
      
      {/* Propellers */}
      <ellipse cx="3" cy="5" rx="2.5" ry="0.8" stroke="currentColor" />
      <ellipse cx="21" cy="5" rx="2.5" ry="0.8" stroke="currentColor" />
      <ellipse cx="3" cy="19" rx="2.5" ry="0.8" stroke="currentColor" />
      <ellipse cx="21" cy="19" rx="2.5" ry="0.8" stroke="currentColor" />
      
      {/* Sensor/Camera module below */}
      <path d="M10,17.5 L12,19.5 L14,17.5" />
    </svg>
  ),
  battery: (
    <svg className="w-12 h-12 text-[var(--color-accent-green)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Power Station Outer Shell */}
      <rect x="5" y="6" width="14" height="14" rx="2" />
      {/* Top Handle */}
      <path d="M9,6 V4 H15 V6" />
      {/* Internal Batteries Stack */}
      <line x1="8" y1="10" x2="16" y2="10" strokeDasharray="1 1" />
      <line x1="8" y1="13" x2="16" y2="13" strokeDasharray="1 1" />
      {/* Energy bolt */}
      <path d="M11.5,8.5 L9.5,13 H13.5 L11.5,17.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Connectors */}
      <circle cx="7.5" cy="16.5" r="1" fill="currentColor" />
      <circle cx="16.5" cy="16.5" r="1" fill="currentColor" />
    </svg>
  ),
  network: (
    <svg className="w-12 h-12 text-[var(--color-accent-cyan)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Nodos interactivos */}
      <circle cx="12" cy="5" r="3" />
      <circle cx="5" cy="12" r="3" />
      <circle cx="19" cy="12" r="3" />
      <circle cx="12" cy="19" r="3" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      
      {/* Connecting Mesh lines */}
      <line x1="12" y1="8" x2="12" y2="10.5" />
      <line x1="12" y1="13.5" x2="12" y2="16" />
      <line x1="8" y1="12" x2="10.5" y2="12" />
      <line x1="13.5" y1="12" x2="16" y2="12" />
      
      <line x1="7.12" y1="7.12" x2="10.5" y2="10.5" strokeDasharray="2 2" />
      <line x1="16.88" y1="7.12" x2="13.5" y2="10.5" strokeDasharray="2 2" />
      <line x1="7.12" y1="16.88" x2="10.5" y2="13.5" strokeDasharray="2 2" />
      <line x1="16.88" y1="16.88" x2="13.5" y2="13.5" strokeDasharray="2 2" />
    </svg>
  )
};

export default function Pilares() {
  const handleScrollTo = (id: string) => {
    const targetId = id.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="pilares" className="py-24 bg-[var(--color-bg-section)] relative overflow-hidden">
      {/* Ambient background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(0,131,253,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,195,254,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="fade-up flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-accent-blue)] text-xs font-bold uppercase tracking-[0.15em] mb-3">
            Nuestro Enfoque
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)] tracking-tight mb-6">
            Tres verticales. Una sola empresa.
          </h2>
          <p className="text-[var(--color-text-secondary)] font-sans text-base leading-relaxed">
            Especialización profunda en cada área para entregar soluciones tecnológicas completas de alto desempeño para sectores exigentes en Perú.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pilaresData.map((pilar, index) => {
            const delayClass = `delay-${index}`;
            return (
              <div
                key={pilar.id}
                className={`fade-up ${delayClass} bg-white border border-[var(--color-border)] rounded-2xl p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,92,230,0.02)] transition-all duration-300 hover:translate-y-[-6px] hover:border-[var(--color-accent-blue)]/30 hover:shadow-[0_12px_30px_rgba(0,92,230,0.06)] cursor-pointer group`}
                style={{ borderTopWidth: '4px', borderTopColor: 'var(--color-accent-blue)' }}
                onClick={() => handleScrollTo(pilar.link)}
              >
                <div>
                  {/* Icon and Tag Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-4 bg-[var(--color-bg-deep)] border border-[var(--color-border)] rounded-xl group-hover:scale-110 transition-transform duration-300">
                      {PILAR_ICONS[pilar.iconName]}
                    </div>
                    <span className="text-[var(--color-text-secondary)] text-[10px] font-bold tracking-widest uppercase border border-[var(--color-border)] bg-[var(--color-bg-deep)] px-3 py-1 rounded-full">
                      {pilar.tag}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="font-display font-semibold text-xl text-[var(--color-text-primary)] mb-4 tracking-tight group-hover:text-[var(--color-accent-blue)] transition-colors">
                    {pilar.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-8">
                    {pilar.description}
                  </p>
                </div>

                {/* Bottom CTA Action Link */}
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent-blue)] group-hover:text-[var(--color-accent-blue)]/80 transition-colors">
                  {pilar.ctaText} <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
