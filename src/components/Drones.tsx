import { Shield, Check, ExternalLink } from 'lucide-react';
import { droneServicesData } from '../data/siteData';

export default function Drones() {
  return (
    <section id="drones" className="py-24 bg-[var(--color-bg-deep)] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,131,253,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,131,253,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Decorative Blur Ambient Circles */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(0,131,253,0.1)_0%,rgba(0,0,0,0)_75%)] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(0,195,254,0.08)_0%,rgba(0,0,0,0)_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="fade-up flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[var(--color-accent-blue)] text-xs font-bold uppercase tracking-[0.15em] mb-3 block">
              Línea Aérea
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)] tracking-tight mb-4">
              Drones profesionales y tecnología aérea
            </h2>
            <p className="text-[var(--color-text-secondary)] font-sans text-base max-w-2xl">
              Distribuidor y representante oficial SwellPro en Perú. Venta especializada de drones impermeables para pesca, salvamento, industria y operaciones de campo.
            </p>
          </div>

          {/* SwellPro Official Seal Link */}
          <a
            href="https://swellpro.pe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[var(--color-border)] rounded-xl shadow-sm transition-all duration-300 hover:scale-105"
          >
            <Shield className="text-[var(--color-accent-blue)] w-5 h-5" />
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold">Distribuidor Oficial</div>
              <div className="text-xs font-bold text-[var(--color-text-primary)] flex items-center gap-1">
                swellpro.pe <ExternalLink size={10} className="text-[var(--color-accent-blue)]" />
              </div>
            </div>
          </a>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Visual Blueprint Animation */}
          <div className="fade-up relative bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm overflow-hidden aspect-video md:aspect-[4/3] flex flex-col justify-between">
            {/* HUD Status Bar (Top) */}
            <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-text-muted)] z-10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-blue)] animate-ping"></span>
                <span>SYSTEM ACTIVE // TELEMETRY LINK</span>
              </div>
              <div>LAT: -11.9890 | LON: -77.0243</div>
            </div>

            {/* Central Animated Blueprint Graphic Container */}
            <div className="relative flex-1 w-full flex items-center justify-center py-6">
              {/* Drone SVG Blueprint outline */}
              <svg 
                className="w-4/5 h-4/5 text-[var(--color-accent-blue)] opacity-60"
                viewBox="0 0 200 150" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
              >
                {/* Tech Radar Rings */}
                <circle cx="100" cy="75" r="50" stroke="rgba(0,92,230,0.06)" strokeDasharray="3 3" />
                <circle cx="100" cy="75" r="30" stroke="rgba(0,92,230,0.1)" />
                <circle cx="100" cy="75" r="15" stroke="rgba(0,92,230,0.15)" strokeDasharray="1 3" />

                {/* Drone Core Crosshairs */}
                <line x1="100" y1="15" x2="100" y2="135" stroke="rgba(0,92,230,0.06)" strokeDasharray="4 4" />
                <line x1="20" y1="75" x2="180" y2="75" stroke="rgba(0,92,230,0.06)" strokeDasharray="4 4" />

                {/* Drone Body (SwellPro style Quadcopter) */}
                {/* Center shell */}
                <rect x="85" y="60" width="30" height="30" rx="6" strokeWidth="1.5" />
                <circle cx="100" cy="75" r="6" strokeWidth="1.5" />
                
                {/* Left/Right/Top/Bottom arms */}
                {/* Top-Left arm */}
                <path d="M85,60 L45,30" strokeWidth="1.5" />
                <circle cx="45" cy="30" r="8" strokeWidth="1" />
                <line x1="35" y1="30" x2="55" y2="30" strokeWidth="2" /> {/* Rotor blade */}

                {/* Top-Right arm */}
                <path d="M115,60 L155,30" strokeWidth="1.5" />
                <circle cx="155" cy="30" r="8" strokeWidth="1" />
                <line x1="145" y1="30" x2="165" y2="30" strokeWidth="2" /> {/* Rotor blade */}

                {/* Bottom-Left arm */}
                <path d="M85,90 L45,120" strokeWidth="1.5" />
                <circle cx="45" cy="120" r="8" strokeWidth="1" />
                <line x1="35" y1="120" x2="55" y2="120" strokeWidth="2" /> {/* Rotor blade */}

                {/* Bottom-Right arm */}
                <path d="M115,90 L155,120" strokeWidth="1.5" />
                <circle cx="155" cy="120" r="8" strokeWidth="1" />
                <line x1="145" y1="120" x2="165" y2="120" strokeWidth="2" /> {/* Rotor blade */}

                {/* Landing skids */}
                <path d="M75,90 L75,105 L125,105 L125,90" strokeWidth="1.2" />
                <line x1="65" y1="110" x2="135" y2="110" strokeWidth="1.5" strokeLinecap="round" />

                {/* Payload hook/gimbal representation */}
                <circle cx="100" cy="115" r="4" fill="rgba(0,92,230,0.2)" />
                <line x1="100" y1="90" x2="100" y2="111" strokeWidth="1.2" />
              </svg>

              {/* Vertical scanning scan line overlay */}
              <div 
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent-blue)] to-transparent opacity-80"
                style={{
                  animation: 'scan-motion 4s linear infinite',
                  boxShadow: '0 0 15px var(--color-accent-blue)'
                }}
              />
              <style>{`
                @keyframes scan-motion {
                  0% { top: 5%; }
                  50% { top: 95%; }
                  100% { top: 5%; }
                }
              `}</style>
            </div>

            {/* HUD Status Bar (Bottom) */}
            <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-text-muted)] z-10 pt-4 border-t border-[var(--color-border)]">
              <div>HD LINK: STABLE // FPS: 60</div>
              <div className="text-[var(--color-accent-blue)] font-bold">SYS STATUS: ONLINE (100%)</div>
            </div>
          </div>

          {/* Right Column: Services List */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {droneServicesData.map((service, idx) => (
                <div 
                  key={idx} 
                  className={`fade-up delay-${idx} flex items-start gap-4 pb-5 ${
                    idx !== droneServicesData.length - 1 ? 'border-b border-[var(--color-border)]' : ''
                  }`}
                >
                  <div className="p-1.5 bg-[var(--color-accent-blue)]/10 border border-[var(--color-accent-blue)]/20 rounded-lg text-[var(--color-accent-blue)] mt-0.5">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
                      {service.title}
                    </h4>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA External Link Button */}
            <div className="mt-10 fade-up delay-5">
              <a
                href="https://swellpro.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] bg-white border border-[var(--color-border)] hover:bg-[var(--color-bg-deep)] py-3 px-6 rounded-xl transition-all duration-300 shadow-sm group"
              >
                Visitar SwellPro Perú
                <ExternalLink size={14} className="text-[var(--color-accent-blue)] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
