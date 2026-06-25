import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        width = canvas.width = newWidth;
        height = canvas.height = newHeight;
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Grid Animation Variables
    let offset = 0;
    const speed = 0.3; // slower, softer parallax speed
    const cols = 26; // number of vertical line paths
    const cellHeight = 40; // distance between horizontal lines

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Light theme colors
      const lineColor = 'rgba(0, 92, 230, 0.04)';
      const nodeColor = '#0099FF'; // --color-accent-cyan

      // Perspective origin (focal point) at the top center
      const horizonY = height * 0.25;
      const vanishingX = width * 0.4; // shift slightly to the left column focus

      // Draw horizontal lines moving forward (increasing offset)
      offset += speed;
      if (offset >= cellHeight) {
        offset = 0;
      }

      // Draw horizontal lines in perspective
      const linesCount = 20;
      for (let i = 0; i < linesCount; i++) {
        // Calculate raw y position with offset
        const rawY = i * cellHeight + offset;
        
        // Map to perspective curve (more compressed near the horizon)
        const progress = rawY / (linesCount * cellHeight);
        const perspectiveY = horizonY + (height - horizonY) * Math.pow(progress, 2.5);

        if (perspectiveY < horizonY || perspectiveY > height) continue;

        // Draw line across the screen
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1 + progress * 1.0;
        ctx.moveTo(0, perspectiveY);
        ctx.lineTo(width, perspectiveY);
        ctx.stroke();
      }

      // Draw vertical perspective lines
      for (let i = -cols / 2; i <= cols / 2; i++) {
        const startX = vanishingX + i * (width / cols) * 2;
        
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.moveTo(vanishingX + (i * 8), horizonY);
        ctx.lineTo(startX, height);
        ctx.stroke();
      }

      // Draw pulsar nodes at intersections
      for (let i = 0; i < linesCount; i++) {
        const rawY = i * cellHeight + offset;
        const progress = rawY / (linesCount * cellHeight);
        const perspectiveY = horizonY + (height - horizonY) * Math.pow(progress, 2.5);

        if (perspectiveY < horizonY || perspectiveY > height) continue;

        const pulse = 0.3 + Math.sin(Date.now() * 0.002 + i) * 0.2;

        for (let j = -cols / 2; j <= cols / 2; j += 2) {
          const startX = vanishingX + j * (width / cols) * 2;
          const endX = vanishingX + (j * 8);
          
          const t = (perspectiveY - horizonY) / (height - horizonY);
          const intersectX = endX + (startX - endX) * t;

          if (intersectX >= 0 && intersectX <= width) {
            ctx.beginPath();
            ctx.fillStyle = nodeColor;
            ctx.globalAlpha = pulse * progress * 0.7; // fade out near horizon
            ctx.arc(intersectX, perspectiveY, 1.2 + progress * 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('pilares');
    if (nextSection) {
      const offset = 80;
      const elementPosition = nextSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleContactScroll = () => {
    const element = document.getElementById('contacto');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      id="hero"
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex items-center justify-start overflow-hidden pt-28 md:pt-32"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782425784/hf_20260625_220316_cd499d2c-bf24-455a-931d-2cc34badf3fc_wq74et.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30"
      />

      {/* Elegant overlay to guarantee text legibility while exposing the beautiful image on the right */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00051e] via-[#00051e]/90 to-[#00051e]/70 md:bg-gradient-to-r md:from-[#00051e] md:via-[#00051e]/85 md:to-transparent z-0" />

      {/* Decorative ambient soft blue glow */}
      <div className="absolute top-1/4 left-1/4 w-[60%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(0,131,253,0.15)_0%,rgba(0,0,0,0)_75%)] pointer-events-none z-0" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full py-12 md:py-16">
        <div className="max-w-3xl flex flex-col items-start text-left">
          
          {/* Badge Pill */}
          <div className="fade-up visible inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-md shadow-lg badge-official">
            <span className="relative flex h-2 w-2">
              <span className="dot-online absolute inline-flex h-full w-full rounded-full bg-[#00c3fe] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c3fe]"></span>
            </span>
            <span className="text-[#e9ebef] font-bold text-[10px] sm:text-xs tracking-wider uppercase font-sans">
              Afiliado a la Cámara de Comercio, Industrias y Turismos del Megapuerto de Chancay
            </span>
          </div>

          {/* Headline */}
          <h1 className="fade-up visible font-display font-extrabold text-white text-4xl sm:text-5xl md:text-6xl leading-[1.12] tracking-tight mb-6">
            Soluciones tecnológicas{' '}
            <span className="bg-gradient-to-r from-[#00c3fe] via-[#0083fd] to-[#00a870] bg-clip-text text-transparent">
              especializadas
            </span>{' '}
            para operación en campo.
          </h1>

          {/* Subtitle */}
          <p className="fade-up visible delay-1 text-[#e9ebef]/90 font-sans text-base sm:text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Drones profesionales impermeables, estaciones de energía autónomas y soporte tecnológico de alta precisión para misiones críticas en Perú.
          </p>

          {/* Double CTA */}
          <div className="fade-up visible delay-2 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <button
              onClick={() => handleScrollDown()}
              className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0083fd] to-[#00c3fe] text-white font-bold text-sm py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,131,253,0.3)] hover:translate-y-[-2px]"
            >
              Ver soluciones <ArrowRight size={16} />
            </button>
            <button
              onClick={() => handleContactScroll()}
              className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center bg-white/5 border border-white/20 text-white hover:bg-white/10 font-bold text-sm py-4 px-8 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              Contactar asesor
            </button>
          </div>

          {/* Stats row embedded */}
          <div className="fade-up visible delay-3 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 w-full max-w-lg">
            <div>
              <div className="font-display font-extrabold text-2xl md:text-3xl text-[#00c3fe]">3 Líneas</div>
              <div className="text-[10px] font-bold text-[#e9ebef]/60 uppercase tracking-wider mt-1">Especializadas</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl md:text-3xl text-[#00a870]">+10 Años</div>
              <div className="text-[10px] font-bold text-[#e9ebef]/60 uppercase tracking-wider mt-1">De Trayectoria</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl md:text-3xl text-white">Nacional</div>
              <div className="text-[10px] font-bold text-[#e9ebef]/60 uppercase tracking-wider mt-1">Soporte Local</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
