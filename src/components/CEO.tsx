import { ReactNode } from 'react';
import { 
  Lock, 
  BarChart4, 
  Activity, 
  ShieldCheck, 
  FileText, 
  RefreshCw, 
  Check, 
  Award 
} from 'lucide-react';
import { ceoSpecialtiesData, CEOSpecialtyItem } from '../data/siteData';

const SPEC_ICONS: Record<string, ReactNode> = {
  'esp-1': <Lock size={16} className="text-[var(--color-accent-blue)]" />,
  'esp-2': <BarChart4 size={16} className="text-[var(--color-accent-blue)]" />,
  'esp-3': <Activity size={16} className="text-[var(--color-accent-blue)]" />,
  'esp-4': <ShieldCheck size={16} className="text-[var(--color-accent-blue)]" />,
  'esp-5': <FileText size={16} className="text-[var(--color-accent-blue)]" />,
  'esp-6': <RefreshCw size={16} className="text-[var(--color-accent-blue)]" />
};

export default function CEO() {
  const handleScrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="ceo" 
      className="py-24 relative overflow-hidden bg-[var(--color-bg-section)]"
    >
      {/* Dynamic light glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(0,92,230,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Elegant Professional Photo Placeholder */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center fade-up">
            <div className="relative">
              {/* Outer decorative glowing ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] rounded-full blur-2xl opacity-15 animate-pulse" />
              
              {/* Profile Image Frame */}
              <div className="relative w-72 h-72 rounded-full p-[3px] bg-gradient-to-tr from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] shadow-[0_15px_40px_rgba(0,92,230,0.1)] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white overflow-hidden relative">
                  <img
                    src="https://res.cloudinary.com/drvejtepq/image/upload/v1782397237/CarlosRivera_CRTech_FotoCEO_is07qk.png"
                    alt="Carlos Rivera - CEO & Fundador"
                    className="w-full h-full object-cover relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Floating Pill Badge */}
              <div className="absolute bottom-4 right-4 bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-full shadow-md z-20">
                CEO & Fundador
              </div>
            </div>
          </div>

          {/* Right Column: Bio Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left fade-up delay-1">
            <span className="text-[var(--color-accent-blue)] text-xs font-bold uppercase tracking-[0.15em] mb-3">
              Liderazgo
            </span>
            <h2 className="font-display font-extrabold text-4xl text-[var(--color-text-primary)] tracking-tight mb-2">
              Carlos Rivera
            </h2>
            <h3 className="font-sans font-medium text-lg text-[var(--color-accent-blue)] mb-6">
              Gerente General · CR Technologies & Services
            </h3>

            <p className="text-[var(--color-text-secondary)] font-sans text-base leading-relaxed mb-8">
              Profesional con MBA y especialización en Gestión TI, con más de una década de experiencia gestionando infraestructura tecnológica y proyectos de alta disponibilidad para el sector financiero, público y privado en el Perú. Fundó CR Technologies con la clara visión de llevar tecnología especializada de primer nivel a empresas y operaciones exigentes en todo el país.
            </p>

            {/* Specialties Grid (3x2) */}
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest block mb-4">
              Áreas de Especialización
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {ceoSpecialtiesData.map((spec) => (
                <div
                  key={spec.id}
                  className="flex items-center gap-2.5 p-3 bg-white border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent-blue)]/30 transition-colors shadow-sm"
                >
                  <div className="p-1.5 bg-[var(--color-accent-blue)]/10 border border-[var(--color-accent-blue)]/20 rounded-lg">
                    {SPEC_ICONS[spec.id]}
                  </div>
                  <span className="text-xs font-medium text-[var(--color-text-primary)]">
                    {spec.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Institutional Affiliations */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="bg-white border border-[var(--color-border)] shadow-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-[var(--color-text-secondary)]">
                <Award size={14} className="text-[var(--color-accent-blue)]" />
                <span>Cámara de Comercio (Afiliado Activo)</span>
              </div>
              <div className="bg-white border border-[var(--color-border)] shadow-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-[var(--color-text-secondary)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent-green)]"></span>
                </span>
                <span>Representante Oficial SwellPro</span>
              </div>
            </div>

            {/* CTA project link */}
            <div className="border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                ¿Tienes un proyecto tecnológico en mente?
              </span>
              <button
                onClick={handleScrollToContact}
                className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center bg-white border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-deep)] font-bold text-sm py-3.5 px-6 rounded-xl transition-all duration-300 shadow-sm"
              >
                Hablar con Carlos
              </button>
            </div>

          </div>

        </div>

      </div>
      <style>{`
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
