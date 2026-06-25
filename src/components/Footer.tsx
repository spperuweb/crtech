import { Shield, ExternalLink, Linkedin, Globe, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-[var(--color-border)] pt-16 pb-8 relative overflow-hidden">
      {/* Subtle bottom glows */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(circle,rgba(0,92,230,0.03)_0%,rgba(0,0,0,0)_80%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* COL 1: Brand & Logo */}
          <div className="flex flex-col text-left">
            <div className="flex items-center mb-4">
              <img
                src="https://res.cloudinary.com/drvejtepq/image/upload/v1782419695/CRTech_LogoHorizontal_BackLight_leqyyi.png"
                alt="CR Technologies Logo"
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4 max-w-xs">
              Soluciones tecnológicas especializadas para operaciones en campo, energía autónoma y servicios TI de nivel corporativo en Perú.
            </p>
          </div>

          {/* COL 2: Business Verticals */}
          <div className="flex flex-col text-left">
            <h4 className="font-display font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-widest mb-4">
              Líneas de Negocio
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-semibold text-[var(--color-text-secondary)]">
              <button onClick={() => handleScrollTo('drones')} className="hover:text-[var(--color-accent-blue)] text-left cursor-pointer transition-colors">
                Drones Profesionales
              </button>
              <button onClick={() => handleScrollTo('energia')} className="hover:text-[var(--color-accent-blue)] text-left cursor-pointer transition-colors">
                Energía Portátil
              </button>
              <button onClick={() => handleScrollTo('servicios')} className="hover:text-[var(--color-accent-blue)] text-left cursor-pointer transition-colors">
                Servicios TI Corporativos
              </button>
              <a 
                href="https://swellpro.pe" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[var(--color-accent-blue)] flex items-center gap-1 transition-colors"
              >
                SwellPro Perú <ExternalLink size={10} className="text-[var(--color-accent-blue)]" />
              </a>
            </div>
          </div>

          {/* COL 3: Company Links */}
          <div className="flex flex-col text-left">
            <h4 className="font-display font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-widest mb-4">
              Empresa
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-semibold text-[var(--color-text-secondary)]">
              <button onClick={() => handleScrollTo('pilares')} className="hover:text-[var(--color-accent-blue)] text-left cursor-pointer transition-colors">
                Sobre CR Technologies
              </button>
              <button onClick={() => handleScrollTo('ceo')} className="hover:text-[var(--color-accent-blue)] text-left cursor-pointer transition-colors">
                Perfil CEO
              </button>
              <button onClick={() => handleScrollTo('ceo')} className="hover:text-[var(--color-accent-blue)] text-left cursor-pointer transition-colors">
                Afiliaciones & Respaldo
              </button>
              <button onClick={() => handleScrollTo('contacto')} className="hover:text-[var(--color-accent-blue)] text-left cursor-pointer transition-colors">
                Contacto / Cotizaciones
              </button>
            </div>
          </div>

          {/* COL 4: Contacts & Socials */}
          <div className="flex flex-col text-left">
            <h4 className="font-display font-bold text-sm text-[var(--color-text-primary)] uppercase tracking-widest mb-4">
              Contacto
            </h4>
            <div className="flex flex-col gap-3.5 text-xs font-semibold text-[var(--color-text-secondary)] mb-6">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[var(--color-accent-blue)] mt-0.5" />
                <span>Lima & Chancay, Perú</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[var(--color-accent-blue)]" />
                <a href="mailto:contacto@crtech.pe" className="hover:text-[var(--color-accent-blue)]">contacto@crtech.pe</a>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-[var(--color-accent-blue)]" />
                <a href="https://crtech.pe" className="hover:text-[var(--color-accent-blue)]">crtech.pe</a>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white border border-[var(--color-border)] hover:border-[var(--color-accent-blue)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] rounded-lg transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="https://swellpro.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white border border-[var(--color-border)] hover:border-[var(--color-accent-blue)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] rounded-lg transition-colors cursor-pointer"
                aria-label="SwellPro"
              >
                <Shield size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar separator */}
        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold text-[var(--color-text-muted)] font-sans">
          <span>
            © 2026 CR Technologies & Services. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-4">
            <a href="https://swellpro.pe" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-secondary)]">
              swellpro.pe
            </a>
            <span>·</span>
            <span className="cursor-pointer hover:text-[var(--color-text-secondary)]">
              Política de Privacidad
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
