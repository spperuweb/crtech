import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, UserCheck, Clock } from 'lucide-react';

const playPopSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    // Classic bubble/pop synthesis: rapid frequency sweep and short decay
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.14);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (error) {
    console.warn('Audio play failed', error);
  }
};

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAttentionBubble, setShowAttentionBubble] = useState(false);
  const [userName, setUserName] = useState('');

  // Auto-show a sutil greeting bubble after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAttentionBubble(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    playPopSound();
    setIsOpen(!isOpen);
    setShowAttentionBubble(false);
  };

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    playPopSound();
    
    const baseMessage = userName.trim() 
      ? `Hola CR Technologies, mi nombre es ${userName.trim()}. Quisiera cotizar sus soluciones.`
      : 'Hola CR Technologies, quisiera recibir información sobre sus servicios tecnológicos.';
      
    const url = `https://wa.me/51991664146?text=${encodeURIComponent(baseMessage)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleQuickInquiry = (topic: string) => {
    playPopSound();
    let message = 'Hola CR Technologies. ';
    if (topic === 'drones') {
      message += 'Me interesa cotizar soluciones con Drones SwellPro profesionales.';
    } else if (topic === 'energia') {
      message += 'Quisiera recibir una cotización de estaciones de energía portátil EcoFlow.';
    } else {
      message += 'Deseo información sobre sus servicios de consultoría TI y ciberseguridad corporativa.';
    }
    
    const url = `https://wa.me/51991664146?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Speech Attention Bubble */}
      {showAttentionBubble && !isOpen && (
        <div className="bg-white text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-[0_10px_30px_rgba(0,0,0,0.1)] px-4 py-3 rounded-2xl mb-3 mr-1 animate-fade-in max-w-xs text-left relative flex flex-col gap-1">
          <button 
            onClick={() => setShowAttentionBubble(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X size={12} />
          </button>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--color-accent-blue)] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)] animate-ping" />
            Soporte En Línea
          </div>
          <p className="text-xs font-medium text-slate-700 leading-normal pr-3">
            ¿Buscas cotizar drones, energía EcoFlow o soporte TI? Escríbenos directamente por WhatsApp.
          </p>
          <div className="absolute right-5 -bottom-2 w-4 h-4 bg-white border-r border-b border-[var(--color-border)] rotate-45" />
        </div>
      )}

      {/* Elegant WhatsApp Chat Box */}
      {isOpen && (
        <div className="bg-white w-[340px] sm:w-[360px] rounded-3xl border border-[var(--color-border)] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden mb-4 animate-slide-up text-left">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] p-5 text-white relative">
            <button 
              onClick={handleToggle}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <img
                    src="https://res.cloudinary.com/drvejtepq/image/upload/v1782419700/favicon_xuwimd.png"
                    alt="CR Technologies"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[var(--color-accent-green)] border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm leading-tight">CR Technologies</h4>
                <p className="text-[10px] text-white/80 font-medium flex items-center gap-1 mt-0.5">
                  <Clock size={10} /> Respuesta inmediata · 51 991 664 146
                </p>
              </div>
            </div>
          </div>

          {/* Quick options panel */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mb-3">
              Selecciona una opción rápida:
            </span>
            <div className="space-y-2">
              <button
                onClick={() => handleQuickInquiry('drones')}
                className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200 hover:border-[var(--color-accent-blue)] py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 transition-all flex items-center justify-between cursor-pointer group"
              >
                <span>🚁 Cotizar Drones SwellPro</span>
                <span className="text-[10px] font-bold text-[var(--color-accent-blue)] group-hover:translate-x-0.5 transition-transform">WhatsApp →</span>
              </button>
              <button
                onClick={() => handleQuickInquiry('energia')}
                className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200 hover:border-[var(--color-accent-blue)] py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 transition-all flex items-center justify-between cursor-pointer group"
              >
                <span>🔋 Energía EcoFlow (Generadores/Paneles)</span>
                <span className="text-[10px] font-bold text-[var(--color-accent-blue)] group-hover:translate-x-0.5 transition-transform">WhatsApp →</span>
              </button>
              <button
                onClick={() => handleQuickInquiry('ti')}
                className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200 hover:border-[var(--color-accent-blue)] py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 transition-all flex items-center justify-between cursor-pointer group"
              >
                <span>💻 Servicios TI & Ciberseguridad</span>
                <span className="text-[10px] font-bold text-[var(--color-accent-blue)] group-hover:translate-x-0.5 transition-transform">WhatsApp →</span>
              </button>
            </div>
          </div>

          {/* Personalized Message Form */}
          <form onSubmit={handleStartChat} className="p-5 space-y-4">
            <div>
              <label className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest block mb-1.5">
                Tu Nombre (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej. Carlos Rivera"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[var(--color-accent-blue)] rounded-xl py-2 px-3 text-xs outline-none transition-colors"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[var(--color-accent-green)] hover:bg-[#009260] text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Send size={12} /> Iniciar Chat Personalizado
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={handleToggle}
        className="w-14 h-14 bg-gradient-to-tr from-[var(--color-accent-green)] to-[#20ba76] hover:from-[#1eb370] hover:to-[#00a870] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,168,112,0.3)] hover:shadow-[0_12px_35px_rgba(0,168,112,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer relative group"
        aria-label="Abrir chat de WhatsApp"
      >
        <svg className="w-7 h-7 fill-white transition-transform group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </span>
      </button>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
