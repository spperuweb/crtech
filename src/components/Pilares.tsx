import { ReactNode } from 'react';
import { pilaresData, PilarItem } from '../data/siteData';

// Custom high-quality geometric inline SVG icons
const PILAR_ICONS: Record<PilarItem['iconName'], ReactNode> = {
  drone: (
    <svg className="w-10 h-10 text-[#0083fd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12,7 16,9.5 16,14.5 12,17 8,14.5 8,9.5" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <line x1="8" y1="9.5" x2="3" y2="5" />
      <line x1="16" y1="9.5" x2="21" y2="5" />
      <line x1="8" y1="14.5" x2="3" y2="19" />
      <line x1="16" y1="14.5" x2="21" y2="19" />
      <ellipse cx="3" cy="5" rx="2.5" ry="0.8" stroke="currentColor" />
      <ellipse cx="21" cy="5" rx="2.5" ry="0.8" stroke="currentColor" />
      <ellipse cx="3" cy="19" rx="2.5" ry="0.8" stroke="currentColor" />
      <ellipse cx="21" cy="19" rx="2.5" ry="0.8" stroke="currentColor" />
      <path d="M10,17.5 L12,19.5 L14,17.5" />
    </svg>
  ),
  battery: (
    <svg className="w-10 h-10 text-[#00a870]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="6" width="14" height="14" rx="2" />
      <path d="M9,6 V4 H15 V6" />
      <line x1="8" y1="10" x2="16" y2="10" strokeDasharray="1 1" />
      <line x1="8" y1="13" x2="16" y2="13" strokeDasharray="1 1" />
      <path d="M11.5,8.5 L9.5,13 H13.5 L11.5,17.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="16.5" r="1" fill="currentColor" />
      <circle cx="16.5" cy="16.5" r="1" fill="currentColor" />
    </svg>
  ),
  network: (
    <svg className="w-10 h-10 text-[#00c3fe]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="5" r="3" />
      <circle cx="5" cy="12" r="3" />
      <circle cx="19" cy="12" r="3" />
      <circle cx="12" cy="19" r="3" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
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

const PILAR_LOGOS: Record<string, string> = {
  'pilar-drones': 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1779807248/SwellProPeru_logo-01-01_pub6gp.png',
  'pilar-energia': 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422215/ecoflow_logonegro_fondotransparente_kfn0f6.png',
  'pilar-servicios': 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782426594/CR_Tech_Sevices_Logo_powukx.png'
};

const PILAR_COLOR_THEMES: Record<string, { border: string; bg: string; text: string; shadow: string; labelBg: string }> = {
  'pilar-drones': {
    border: 'border-t-[#0083fd]',
    bg: 'bg-[#0083fd]/5',
    text: 'text-[#0083fd]',
    shadow: 'hover:shadow-[0_25px_50px_rgba(0,131,253,0.12)]',
    labelBg: 'bg-[#0083fd]/10 text-[#0083fd]'
  },
  'pilar-energia': {
    border: 'border-t-[#00a870]',
    bg: 'bg-[#00a870]/5',
    text: 'text-[#00a870]',
    shadow: 'hover:shadow-[0_25px_50px_rgba(0,168,112,0.12)]',
    labelBg: 'bg-[#00a870]/10 text-[#00a870]'
  },
  'pilar-servicios': {
    border: 'border-t-[#00c3fe]',
    bg: 'bg-[#00c3fe]/5',
    text: 'text-[#00c3fe]',
    shadow: 'hover:shadow-[0_25px_50px_rgba(0,195,254,0.12)]',
    labelBg: 'bg-[#00c3fe]/10 text-[#00c3fe]'
  }
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
    <section id="pilares" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[var(--color-bg-deep)] to-transparent opacity-80 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(0,131,253,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,195,254,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="fade-up flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-accent-blue)] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Nuestra Especialidad
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--color-text-primary)] tracking-tight mb-4">
            Tres Verticales de Tecnología Crítica
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0083fd] to-[#00c3fe] mb-6 rounded-full" />
          <p className="text-[var(--color-text-secondary)] font-sans text-base leading-relaxed">
            Representación oficial de marcas líderes globales, integrando drones industriales de alta resistencia, energía solar modular y soporte TI de nivel corporativo.
          </p>
        </div>

        {/* Pillars Grid - Striking Premium design with logos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pilaresData.map((pilar, index) => {
            const delayClass = `delay-${index}`;
            const theme = PILAR_COLOR_THEMES[pilar.id] || PILAR_COLOR_THEMES['pilar-drones'];
            const logoUrl = PILAR_LOGOS[pilar.id];
            const isCircularLogo = pilar.id === 'pilar-drones';

            return (
              <div
                key={pilar.id}
                className={`fade-up ${delayClass} bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 hover:translate-y-[-8px] hover:border-slate-300 ${theme.shadow} cursor-pointer group relative overflow-hidden`}
                style={{ borderTopWidth: '5px', borderTopColor: pilar.id === 'pilar-drones' ? '#0083fd' : pilar.id === 'pilar-energia' ? '#00a870' : '#00c3fe' }}
                onClick={() => handleScrollTo(pilar.link)}
              >
                {/* Subtle internal background lighting */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div>
                  {/* Toprow: Icon and Label Badge */}
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      {PILAR_ICONS[pilar.iconName]}
                    </div>
                    <span className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full ${theme.labelBg}`}>
                      {pilar.tag}
                    </span>
                  </div>

                  {/* Brand Representative Logo inside card */}
                  {logoUrl && (
                    <div className="mb-6 relative z-10 w-full">
                      {pilar.id === 'pilar-drones' && (
                        <div className="flex items-center gap-4 bg-slate-50/70 p-3 rounded-2xl border border-slate-100/80">
                          <div className="h-14 w-14 rounded-full bg-white shadow-sm border border-slate-100 p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img
                              src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1779807248/SwellProPeru_logo-01-01_pub6gp.png"
                              alt="Logo SwellPro"
                              className="h-full w-full object-contain rounded-full"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Canal Oficial</span>
                            <span className="text-xs font-extrabold text-[var(--color-text-primary)]">SwellPro Perú</span>
                          </div>
                        </div>
                      )}
                      
                      {pilar.id === 'pilar-energia' && (
                        <div className="flex items-center bg-slate-50/70 p-3 rounded-2xl border border-slate-100/80 w-full">
                          <div className="h-14 w-full bg-white shadow-sm border border-slate-100 px-4 rounded-xl flex items-center justify-center overflow-hidden">
                            <img
                              src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422215/ecoflow_logonegro_fondotransparente_kfn0f6.png"
                              alt="Logo EcoFlow"
                              className="h-6 w-auto object-contain max-w-[150px]"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      )}

                      {pilar.id === 'pilar-servicios' && (
                        <div className="flex items-center gap-4 bg-slate-50/70 p-3 rounded-2xl border border-slate-100/80">
                          <div className="h-14 w-14 bg-white shadow-sm border border-slate-100 rounded-xl p-1.5 flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img
                              src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782426594/CR_Tech_Sevices_Logo_powukx.png"
                              alt="Logo CR Tech"
                              className="h-full w-full object-contain rounded-lg"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Infraestructura</span>
                            <span className="text-xs font-extrabold text-[var(--color-text-primary)]">CR Tech Services</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Title and Description */}
                  <h3 className="font-display font-extrabold text-xl text-[var(--color-text-primary)] mb-4 tracking-tight group-hover:text-[var(--color-accent-blue)] transition-colors relative z-10">
                    {pilar.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-8 relative z-10">
                    {pilar.description}
                  </p>
                </div>

                {/* Bottom CTA Action Link */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between relative z-10">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-accent-blue)] transition-colors">
                    {pilar.ctaText} 
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[var(--color-accent-blue)] group-hover:text-white transition-all duration-300">
                    <span className="font-mono text-base font-bold leading-none transform group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
