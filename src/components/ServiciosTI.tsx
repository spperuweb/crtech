import { useEffect, useRef, ReactNode } from 'react';
import { itServicesData, ITServiceItem } from '../data/siteData';
import { 
  LifeBuoy, 
  Server, 
  Cpu, 
  Eye, 
  ShieldAlert, 
  GitMerge, 
  ChevronRight 
} from 'lucide-react';

const SERVICE_ICONS: Record<string, ReactNode> = {
  'ti-1': <LifeBuoy className="w-7 h-7 text-[var(--color-accent-blue)]" />,
  'ti-2': <Server className="w-7 h-7 text-[var(--color-accent-blue)]" />,
  'ti-3': <Cpu className="w-7 h-7 text-[var(--color-accent-blue)]" />,
  'ti-4': <Eye className="w-7 h-7 text-[var(--color-accent-blue)]" />,
  'ti-5': <ShieldAlert className="w-7 h-7 text-[var(--color-accent-blue)]" />,
  'ti-6': <GitMerge className="w-7 h-7 text-[var(--color-accent-blue)]" />,
};

export default function ServiciosTI() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speedMultiplier = useRef<number>(1.0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    // Node blueprint class
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slow movement
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = 3 + Math.random() * 3;
      }

      update() {
        // Multiply velocity by speedMultiplier which changes on hover
        this.x += this.vx * speedMultiplier.current;
        this.y += this.vy * speedMultiplier.current;

        // Bounce boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 92, 230, 0.15)'; // blue opacity
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const nodes: Node[] = [];
    const nodeCount = Math.min(60, Math.floor(width / 20));
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }

    // Resize Handler
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes with proximity lines
      const maxDistance = 140;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.update();
        n1.draw();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.08;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 92, 230, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      id="servicios"
      ref={containerRef}
      onMouseEnter={() => { speedMultiplier.current = 2.0; }}
      onMouseLeave={() => { speedMultiplier.current = 1.0; }}
      className="py-24 bg-[var(--color-bg-section)] relative overflow-hidden"
    >
      {/* Network Nodes Canvas Backdrop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Division Landing Banner: Official Separation to Servicios TI */}
        <div className="mb-20 fade-up bg-slate-950 rounded-3xl overflow-hidden shadow-xl border border-slate-900 text-left relative">
          {/* Tech background overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,195,254,0.15),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Vertical Landing Intro */}
            <div className="lg:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white relative z-10">
              <span className="text-[#00c3fe] text-xs font-bold uppercase tracking-[0.25em] mb-3 inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00c3fe]" />
                LÍNEA DE NEGOCIO 03
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
                Servicios TI <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#00c3fe] to-[#005CE6] bg-clip-text text-transparent">
                  Enterprise Tech
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Infraestructura TI, ciberseguridad avanzada, videovigilancia inteligente y automatización para empresas. Garantizamos continuidad operativa con ingenieros certificados y soporte local in situ.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-semibold text-slate-200">
                  🛡️ Ciberseguridad & Auditoría
                </span>
                <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-semibold text-slate-200">
                  🌐 Redes & Conectividad IP
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 items-center">
                <a
                  href="servicios-ti.html"
                  className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-[#00c3fe] to-[#005CE6] hover:shadow-[0_10px_30px_rgba(0,195,254,0.3)] hover:scale-[1.03] active:scale-95 text-white font-extrabold text-sm py-4 px-8 rounded-xl transition-all duration-300 shadow-md group"
                >
                  Ver Catálogo de Servicios TI
                  <span className="text-white group-hover:translate-x-0.5 transition-transform font-mono">→</span>
                </a>
              </div>
            </div>

            {/* Right Column: CR Tech Services Square Logo as Supporting Image */}
            <div className="lg:col-span-6 h-64 lg:h-[400px] w-full bg-[#0d1527] flex items-center justify-center relative overflow-hidden p-8 border-l border-slate-900">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#020813] to-[#111e3b] opacity-90 pointer-events-none" />
              {/* Glowing decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00c3fe]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#005CE6]/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 flex flex-col items-center gap-4 max-w-xs text-center">
                <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
                  <img
                    src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782426594/CR_Tech_Sevices_Logo_powukx.png"
                    alt="CR Tech Services Logo"
                    className="w-32 h-32 object-contain rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white">Soporte Corporativo</h4>
                  <p className="text-xs text-slate-400 mt-1">Soluciones administradas de TI & consultoría experta</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="fade-up flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-accent-blue)] text-xs font-bold uppercase tracking-[0.15em] mb-3">
            Enterprise Tech
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)] tracking-tight mb-4">
            Servicios tecnológicos de alto nivel para tu organización.
          </h2>
          <p className="text-[var(--color-text-secondary)] font-sans text-base mb-6">
            Desde la infraestructura hasta la consultoría estratégica, cubrimos todo el stack tecnológico de tu empresa con soluciones robustas y soporte local en Lima, Perú.
          </p>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('contacto');
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
            }}
            className="cursor-pointer inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-accent-blue)] hover:text-[#005ce6] transition-colors group"
          >
            Explorar Catálogo de Servicios TI <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* 2x3 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {itServicesData.map((service, index) => {
            const delayClass = `delay-${index % 3}`;
            return (
              <div
                key={service.id}
                className="fade-up delay-0 bg-white border border-[var(--color-border)] rounded-2xl p-8 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,92,230,0.02)] transition-all duration-300 hover:border-[var(--color-accent-blue)]/30 hover:shadow-[0_10px_30px_rgba(0,92,230,0.06)] hover:translate-y-[-4px] cursor-pointer group"
              >
                <div>
                  {/* Icon & Label Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-[var(--color-accent-blue)]/10 border border-[var(--color-accent-blue)]/20 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                      {SERVICE_ICONS[service.id]}
                    </div>
                    <span className="text-[10px] font-bold text-[var(--color-accent-blue)] bg-[var(--color-accent-blue)]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="font-display font-semibold text-lg text-[var(--color-text-primary)] mb-3 tracking-tight group-hover:text-[var(--color-accent-blue)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Subtle link indicator */}
                <span className="text-xs font-semibold text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-blue)] transition-colors flex items-center gap-1 mt-2">
                  Ver detalles <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            );
          })}
        </div>

        {/* CTA Global block at the bottom of Section 5 */}
        <div className="fade-up bg-white border border-[var(--color-border)] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto shadow-md">
          <div className="text-center md:text-left">
            <span className="text-[var(--color-accent-blue)] font-bold text-xs uppercase tracking-widest block mb-1">
              ¿Necesitas una consultoría TI?
            </span>
            <h4 className="font-display font-bold text-xl md:text-2xl text-[var(--color-text-primary)] mb-2">
              Evaluamos tu infraestructura sin costo inicial.
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-xl">
              Agenda una sesión con nuestro equipo técnico en Lima o de forma remota para diagnosticar el estado de tus sistemas y redes.
            </p>
          </div>
          <button
            onClick={handleScrollToContact}
            className="cursor-pointer bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] text-white font-bold text-sm py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,92,230,0.2)] hover:translate-y-[-2px] whitespace-nowrap"
          >
            Agendar evaluación técnica
          </button>
        </div>

      </div>
    </section>
  );
}
