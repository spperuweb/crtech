import { ShieldCheck, CheckCircle } from 'lucide-react';

export default function Respaldo() {
  const credentials = [
    'Empresa Registrada · Perú',
    'Representante Oficial SwellPro',
    'Empresa B2B y B2C',
    'Soporte Técnico Certificado',
    'Consultoría TI Especializada',
    'Soporte Nacional · Lima'
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
          <div className="fade-up bg-white border-l-4 border-l-[var(--color-accent-blue)] border border-slate-200 rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row gap-6 hover:shadow-[0_15px_35px_rgba(0,92,230,0.08)] transition-all duration-300 group items-center sm:items-start">
            <div className="p-3 bg-white border border-slate-100 rounded-2xl h-32 w-32 md:h-36 md:w-36 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm overflow-hidden bg-gradient-to-br from-white to-slate-50">
              <img
                src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782397588/CamaradeComercioChancay_logo_t8pz0n.png"
                alt="Logo Cámara de Comercio"
                className="h-28 w-28 md:h-32 md:w-32 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[var(--color-accent-blue)] uppercase tracking-wider block mb-1">
                Garantía & Formalidad · Lima, Perú
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[var(--color-text-primary)] mb-4 tracking-tight">
                Cámara de Comercio
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                NUESTRO LÍDER Y FUNDADOR <strong className="text-[var(--color-text-primary)] font-bold">CARLOS RIVERA</strong> se encuentra registrado y afiliado de forma activa a la Cámara de Comercio, respaldando la formalidad jurídica y comercial de todas nuestras operaciones en Lima, Perú, con una gestión transparente, ética y segura.
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
