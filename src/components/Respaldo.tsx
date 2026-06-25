import { ShieldCheck, CheckCircle } from 'lucide-react';

export default function Respaldo() {
  const credentials = [
    'Empresa Registrada · Perú',
    'Representante Oficial SwellPro',
    'Empresa B2B y B2C',
    'Soporte Técnico Certificado',
    'Consultoría TI Especializada',
    'Lima · Chancay · Perú'
  ];

  return (
    <section className="py-24 bg-[var(--color-bg-section)] relative overflow-hidden border-t border-[var(--color-border)]">
      {/* Decorative vector layout */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,131,253,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="fade-up flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-accent-cyan)] text-xs font-bold uppercase tracking-[0.15em] mb-3">
            Respaldo Institucional
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)] tracking-tight">
            Empresa formal, trayectoria comprobada.
          </h2>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Chamber of Commerce */}
          <div className="fade-up bg-gradient-to-br from-[var(--color-bg-card)] to-[#00051E] border-l-4 border-l-[var(--color-accent-blue)] border border-[rgba(0,131,253,0.15)] rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row gap-6 hover:shadow-[0_0_40px_rgba(0,131,253,0.15)] transition-all duration-300 group glow-card">
            <div className="p-4 bg-[var(--color-accent-blue)]/10 border border-[var(--color-accent-blue)]/20 rounded-2xl h-fit w-fit group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-10 h-10 text-[var(--color-accent-blue)]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[var(--color-accent-blue)] uppercase tracking-wider block mb-1">
                Garantía y Formalidad
              </span>
              <h3 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-4 tracking-tight">
                Cámara de Comercio de Chancay
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                <strong className="text-[var(--color-text-primary)]">CR Technologies & Services</strong> es empresa afiliada activa a la Cámara de Comercio de Chancay, garantizando formalidad legal, respaldo empresarial y un servicio transparente y ético en todos nuestros canales.
              </p>
            </div>
          </div>

          {/* Right Column: Badges Grid */}
          <div className="fade-up delay-1">
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest block mb-6">
              Certificaciones y Capacidades
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.map((cred, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-5 py-4 bg-[rgba(0,131,253,0.04)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-border-glow)] transition-all duration-300"
                >
                  <CheckCircle className="w-5 h-5 text-[var(--color-accent-green)] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {cred}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
