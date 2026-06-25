import { useEffect, useRef, ReactNode } from 'react';
import { Battery, Sun, Zap } from 'lucide-react';
import { ecoflowProductsData, EcoFlowProductItem } from '../data/siteData';

// Icon mapper for products
const PRODUCT_ICONS: Record<EcoFlowProductItem['iconName'], ReactNode> = {
  battery: <Battery className="w-8 h-8 text-[var(--color-accent-green)]" />,
  solar: <Sun className="w-8 h-8 text-[var(--color-accent-green)]" />,
  backpack: <Zap className="w-8 h-8 text-[var(--color-accent-green)]" />
};

export default function Energia() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    canvas.height = 4; // 4px high as requested

    // Particle class
    class Particle {
      x: number;
      y: number;
      speed: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * 4;
        this.speed = 1 + Math.random() * 3; // variable speed
        this.size = 1 + Math.random() * 3;
      }

      update() {
        this.x += this.speed;
        if (this.x > width) {
          this.x = 0;
          this.y = Math.random() * 4;
          this.speed = 1 + Math.random() * 3;
        }
      }

      draw() {
        if (!ctx) return;
        // Map color according to X coordinate: Green -> Cyan -> Blue
        const progress = this.x / width;
        let color = '#00C896'; // Green
        if (progress > 0.33 && progress <= 0.66) {
          color = '#00C3FE'; // Cyan
        } else if (progress > 0.66) {
          color = '#0083FD'; // Blue
        }

        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    const particles: Particle[] = [];
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Resize handler
    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    };
    window.addEventListener('resize', handleResize);

    // Visibility observer to pause/play animation
    let isPlaying = true;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isPlaying = entry.isIntersecting;
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const loop = () => {
      if (isPlaying) {
        ctx.clearRect(0, 0, width, 4);
        particles.forEach((p) => {
          p.update();
          p.draw();
        });
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="energia" ref={containerRef} className="py-24 bg-[var(--color-bg-deep)] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,200,150,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Division Landing Banner: Official Separation from Drones */}
        <div className="mb-20 fade-up bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 text-left relative">
          {/* Subtle background tech line */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Vertical Landing Intro */}
            <div className="lg:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white relative z-10">
              <span className="text-[#00c896] text-xs font-bold uppercase tracking-[0.25em] mb-3 inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00c896]" />
                LÍNEA DE NEGOCIO 02
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
                EcoFlow <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#00c896] to-[#00c3fe] bg-clip-text text-transparent">
                  Energía Autónoma
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Ingresa al ecosistema de suministro inteligente y solar más avanzado de la industria. Diseñado para operaciones continuas en campamentos, ingeniería civil, telecomunicaciones y flotas críticas en todo el Perú.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-xs bg-white/10 border border-white/20 px-3 py-1.5 rounded-full font-semibold text-slate-200">
                  ⚡ Recarga X-Stream Ultrarrápida
                </span>
                <span className="text-xs bg-white/10 border border-white/20 px-3 py-1.5 rounded-full font-semibold text-slate-200">
                  ☀️ Tecnología Solar IP68
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 items-center">
                <a
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('contacto');
                    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                  }}
                  className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-[#00c896] to-[#00c3fe] hover:shadow-[0_10px_30px_rgba(0,200,150,0.3)] hover:scale-[1.03] active:scale-95 text-white font-extrabold text-sm py-4 px-8 rounded-xl transition-all duration-300 shadow-md group"
                >
                  Explorar Catálogo de Autonomía
                  <span className="text-white group-hover:translate-x-0.5 transition-transform font-mono">→</span>
                </a>
              </div>
            </div>

            {/* Right Column: Stunning Solar Panel Image */}
            <div className="lg:col-span-6 h-64 lg:h-[450px] w-full relative overflow-hidden">
              <img
                src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422176/Ecoflow_paneles_solares-2_nzvchw.png"
                alt="EcoFlow Paneles Solares y Equipamiento"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent lg:hidden" />
            </div>
          </div>
        </div>

        {/* BLOCK A: Storytelling Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 fade-up flex flex-col gap-6">
            <div>
              <span className="text-[var(--color-accent-green)] text-xs font-bold uppercase tracking-[0.15em] mb-3 block">
                Distribuidor Autorizado
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--color-text-primary)] tracking-tight leading-tight">
                Autonomía energética donde otros no llegan.
              </h2>
            </div>
            
            {/* Elegant transparent EcoFlow partner logo */}
            <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] w-full max-w-sm mt-2 hover:border-[#00c896]/30 transition-all duration-300 group">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-shrink-0 border-r border-slate-150 pr-4">
                Socio <br />Oficial
              </div>
              <img
                src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422215/ecoflow_logonegro_fondotransparente_kfn0f6.png"
                alt="EcoFlow Logo Autorizado"
                className="h-9 w-auto object-contain max-w-[180px] transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="lg:col-span-7 fade-up delay-1 text-[var(--color-text-secondary)] font-sans text-base space-y-6">
            <p>
              <strong className="text-[var(--color-text-primary)]">EcoFlow</strong> es una empresa líder global de energía portátil inteligente que redefine el suministro autónomo en más de 100 países. Sus sistemas avanzados ofrecen un suministro de energía constante, limpio e inmediato para condiciones extremas.
            </p>
            <p>
              Llevamos las estaciones de carga inteligente de alta velocidad (<em className="text-[var(--color-accent-green)] font-semibold">power stations</em>) y paneles solares EcoFlow a todo el Perú, habilitando operaciones logísticas, soporte minero de campo, transmisiones en directo, campamentos de ingeniería y flotas de drones sin dependencia de la red eléctrica convencional.
            </p>
          </div>
        </div>

        {/* DIVIDER: Energy Flow Canvas particle line */}
        <div className="w-full h-1 bg-[rgba(0,200,150,0.1)] rounded-full overflow-hidden mb-16 relative">
          <canvas ref={canvasRef} className="absolute left-0 top-0 w-full h-full" />
        </div>

        {/* BLOCK B: Products Grid (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ecoflowProductsData.map((prod, index) => (
            <div
              key={prod.id}
              className={`fade-up delay-${index} bg-white border border-[var(--color-border)] p-8 rounded-2xl flex flex-col justify-start border-l-4 border-l-[var(--color-accent-green)]/40 hover:border-l-[var(--color-accent-green)] hover:border-[var(--color-accent-green)]/30 hover:shadow-[0_12px_30px_rgba(0,168,112,0.06)] hover:translate-y-[-4px] transition-all duration-300 group cursor-pointer`}
            >
              <div className="p-3 bg-[var(--color-accent-green)]/10 border border-[var(--color-accent-green)]/20 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                {PRODUCT_ICONS[prod.iconName]}
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-3 tracking-tight">
                {prod.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {prod.description}
              </p>
            </div>
          ))}
        </div>

        {/* BLOCK C: Featured Models Visual Gallery */}
        <div className="mt-20 fade-up">
          <div className="text-center md:text-left mb-10">
            <span className="text-[var(--color-accent-green)] text-xs font-bold uppercase tracking-[0.15em] mb-2 block">
              Equipamiento Premium
            </span>
            <h3 className="font-display font-bold text-2xl text-[var(--color-text-primary)] tracking-tight">
              Modelos EcoFlow Destacados para Campo
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1.5 max-w-xl">
              Equipos de alta confiabilidad listos para integrarse a flotas de drones, estaciones de comando móvil y operaciones remotas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* ITEM 1: DELTA PRO */}
            <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] bg-slate-50 p-6 flex items-center justify-center relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422177/Ecoflow_delta_PRO_g9xhmt.png"
                  alt="EcoFlow DELTA Pro"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent pointer-events-none" />
              </div>
              <div className="p-5 text-left border-t border-slate-100">
                <span className="text-[9px] font-bold text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Industrial</span>
                <h4 className="font-display font-bold text-base text-[var(--color-text-primary)] mt-2">EcoFlow DELTA Pro</h4>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
                  Capacidad de 3.6kWh a 25kWh. Ideal para alimentar estaciones de comando y recarga continua de flotas.
                </p>
              </div>
            </div>

            {/* ITEM 2: PANELES SOLARES */}
            <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] bg-slate-50 p-6 flex items-center justify-center relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422204/Ecoflow_paneles_solares_e4mpcp.png"
                  alt="EcoFlow Paneles Solares"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent pointer-events-none" />
              </div>
              <div className="p-5 text-left border-t border-slate-100">
                <span className="text-[9px] font-bold text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Solar Autónomo</span>
                <h4 className="font-display font-bold text-base text-[var(--color-text-primary)] mt-2">Paneles Solares 400W</h4>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
                  Diseño plegable, impermeable (IP68) y alta eficiencia de conversión de hasta el 23% para campamentos.
                </p>
              </div>
            </div>

            {/* ITEM 3: RIVER 2 SERIES */}
            <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] bg-slate-50 p-6 flex items-center justify-center relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422174/Ecoflow_river2_scdu1t.png"
                  alt="EcoFlow RIVER 2"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent pointer-events-none" />
              </div>
              <div className="p-5 text-left border-t border-slate-100">
                <span className="text-[9px] font-bold text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Ultra-Portátil</span>
                <h4 className="font-display font-bold text-base text-[var(--color-text-primary)] mt-2">Serie RIVER 2 Pro</h4>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
                  Solo 7.8kg de peso. Carga de 0 a 100% en solo 70 minutos. Perfecta para movilidad táctica y drones ligeros.
                </p>
              </div>
            </div>

            {/* ITEM 4: DELTA SERIES */}
            <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] bg-slate-50 p-6 flex items-center justify-center relative overflow-hidden">
                <img
                  src="https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422172/Ecoflow_delta_e9avxh.png"
                  alt="EcoFlow DELTA 2"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent pointer-events-none" />
              </div>
              <div className="p-5 text-left border-t border-slate-100">
                <span className="text-[9px] font-bold text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Alta Capacidad</span>
                <h4 className="font-display font-bold text-base text-[var(--color-text-primary)] mt-2">Serie DELTA 2 Max</h4>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
                  Capacidad de 2kWh expandible. Excelente relación peso/potencia para soporte de campo continuo.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
