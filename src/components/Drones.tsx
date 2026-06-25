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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Drone showcase with vertical 4:5 layout */}
          <div className="lg:col-span-5 fade-up relative bg-white border border-[var(--color-border)] rounded-3xl p-3 shadow-lg overflow-hidden aspect-[4/5] h-[550px] sm:h-[600px] lg:h-[620px] flex flex-col group w-full max-w-md mx-auto hover:shadow-[0_20px_40px_rgba(0,131,253,0.12)] transition-all duration-500">
            {/* Real Product Photo with Premium Tech Frame */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl bg-slate-900">
              <img
                src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1779816468/SwellPro-Fisherman-MAX-Heavy-LiftFishing-Drone-01_400x_obdrsp.webp"
                alt="SwellPro Fisherman MAX Drone"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />
              
              {/* HUD Overlay Top */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between font-mono text-[9px] text-slate-300 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-bold tracking-wider">SWELLPRO CANAL OFICIAL</span>
                </div>
                <span className="font-bold">IP67 WATERPROOF</span>
              </div>

              {/* HUD Overlay Bottom */}
              <div className="absolute bottom-4 inset-x-4 flex flex-col gap-2 z-10">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3.5 rounded-xl">
                  <div className="text-[10px] font-mono text-[#00c3fe] font-bold tracking-widest uppercase mb-1">
                    FISHERMAN MAX HEAVY LIFT
                  </div>
                  <div className="text-xs text-slate-200 leading-snug font-sans">
                    Resistente al agua de mar, viento extremo y arena. Capacitado para liberación de cargas pesadas y salvamento.
                  </div>
                </div>
                <div className="flex items-center justify-between font-mono text-[8px] text-slate-400 bg-black/40 backdrop-blur-md px-2 py-1.5 rounded-md border border-white/5">
                  <span>SOPORTE LOCAL EN PERÚ</span>
                  <span className="text-[var(--color-accent-blue)] font-bold">LIMA, PERÚ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Services List */}
          <div className="lg:col-span-7 flex flex-col justify-center">
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

            {/* CTA External Link Button (Striking Gradient) */}
            <div className="mt-10 fade-up delay-5">
              <a
                href="https://swellpro.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer inline-flex items-center gap-3 text-sm font-extrabold text-white bg-gradient-to-r from-[#0083fd] to-[#00c3fe] hover:shadow-[0_10px_30px_rgba(0,131,253,0.35)] hover:scale-[1.03] active:scale-95 py-4 px-8 rounded-xl transition-all duration-300 shadow-md group"
              >
                Explorar Catálogo SwellPro Perú
                <ExternalLink size={16} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
