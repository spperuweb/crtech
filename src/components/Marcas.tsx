import { Shield, Zap } from 'lucide-react';

export default function Marcas() {
  return (
    <section className="py-12 bg-[var(--color-bg-deep)] border-y border-[var(--color-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Caption */}
        <span className="text-[11px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] uppercase mb-8 text-center">
          Marcas que representamos y comercializamos en Perú
        </span>

        {/* Logo Bar */}
        <div className="fade-up flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-4xl">
          
          {/* SwellPro Logo */}
          <a
            href="https://swellpro.pe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 bg-[var(--color-bg-card)]/40 border border-[var(--color-border)] rounded-full hover:border-[var(--color-accent-blue)]/50 transition-colors duration-300 group cursor-pointer"
          >
            <Shield className="w-5 h-5 text-[var(--color-accent-blue)] group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-lg text-[var(--color-text-primary)] leading-none">
                SwellPro
              </span>
              <span className="text-[9px] font-bold text-[var(--color-accent-blue)] uppercase tracking-wider mt-0.5">
                Representante Oficial Perú
              </span>
            </div>
          </a>

          {/* EcoFlow Logo */}
          <div className="flex items-center gap-3 px-5 py-3 bg-[var(--color-bg-card)]/40 border border-[var(--color-border)] rounded-full hover:border-[var(--color-accent-green)]/50 transition-colors duration-300 group cursor-pointer">
            <Zap className="w-5 h-5 text-[var(--color-accent-green)] group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-lg text-[var(--color-text-primary)] leading-none">
                EcoFlow
              </span>
              <span className="text-[9px] font-bold text-[var(--color-accent-green)] uppercase tracking-wider mt-0.5">
                Distribuidor Autorizado
              </span>
            </div>
          </div>

          {/* Future brands placeholder */}
          <div className="flex items-center justify-center px-6 py-3 border border-dashed border-[rgba(0,131,253,0.15)] rounded-full">
            <span className="text-xs text-[var(--color-text-muted)] italic font-medium">
              + Más marcas próximamente
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
