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
          <div className="lg:col-span-5 fade-up relative bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm overflow-hidden aspect-[4/5] h-[500px] sm:h-[550px] md:h-[600px] lg:h-[580px] flex flex-col justify-between group w-full max-w-md mx-auto">
            {/* HUD Status Bar (Top) */}
            <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-text-muted)] z-10 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-blue)] animate-ping"></span>
                <span>TECNOLOGÍA MARINA // DRONES SWELLPRO</span>
              </div>
              <div>IP67 WATERPROOF</div>
            </div>

            {/* Real Product Photo with Premium Tech Frame */}
            <div className="relative flex-1 w-full h-full overflow-hidden rounded-xl bg-slate-900">
              <img
                src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1779816468/SwellPro-Fisherman-MAX-Heavy-LiftFishing-Drone-01_400x_obdrsp.webp"
                alt="SwellPro Fisherman MAX Drone"
                className="absolute inset-0 w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              
              {/* Semi-transparent tech badge over image */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg text-[9px] font-mono text-[#00c3fe] font-bold tracking-widest uppercase text-center">
                Fisherman MAX · Resistente al Agua y Arena
              </div>
            </div>

            {/* HUD Status Bar (Bottom) */}
            <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-text-muted)] z-10 pt-4 border-t border-[var(--color-border)] mt-4">
              <div>SOPORTE LOCAL EN PERÚ</div>
              <div className="text-[var(--color-accent-blue)] font-bold">LIMA, PERÚ</div>
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
