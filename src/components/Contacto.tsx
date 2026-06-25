import React, { useState } from 'react';
import { Mail, MapPin, Globe, Check, MessageSquare, ArrowRight, User, Building, ExternalLink } from 'lucide-react';

const playPopSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
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

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');

  const motivos = [
    'Cotización inmediata de drones profesionales',
    'Sistemas de energía autónoma EcoFlow',
    'Consultoría y servicios TI corporativos',
    'Soporte técnico certificado y directo',
    'Soluciones para proyectos en Chancay'
  ];

  const handleWhatsAppRedirect = (line: 'drones' | 'energia' | 'ti' | 'general') => {
    playPopSound();
    
    let lineName = '';
    let extraText = '';
    
    if (line === 'drones') {
      lineName = 'Drones Profesionales SwellPro';
      extraText = 'Me interesa recibir asesoría y cotizar equipos de drones impermeables para operaciones en campo.';
    } else if (line === 'energia') {
      lineName = 'Energía Portátil EcoFlow';
      extraText = 'Me interesa cotizar estaciones de energía, generadores solares o paneles EcoFlow.';
    } else if (line === 'ti') {
      lineName = 'Servicios TI & Ciberseguridad';
      extraText = 'Deseo solicitar información o agendar una consultoría sobre soporte informático, redes o ciberseguridad corporativa.';
    } else {
      lineName = 'Consulta General';
      extraText = 'Quisiera realizar una consulta general sobre sus soluciones corporativas.';
    }

    const namePart = nombre.trim() ? `Mi nombre es *${nombre.trim()}*` : 'Hola';
    const companyPart = empresa.trim() ? ` de la empresa *${empresa.trim()}*` : '';
    
    const message = `${namePart}${companyPart}. Contacto por la línea de *${lineName}*. ${extraText}`;
    
    const url = `https://wa.me/51991664146?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="py-24 bg-[var(--color-bg-deep)] relative overflow-hidden">
      {/* Subtle background tech grid layout */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,131,253,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,131,253,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Text & Contact Info */}
          <div className="lg:col-span-5 text-left fade-up">
            <span className="text-[var(--color-accent-blue)] text-xs font-bold uppercase tracking-[0.15em] mb-3 block">
              Contacto Directo
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--color-text-primary)] tracking-tight leading-tight mb-8">
              ¿Listo para potenciar tu operación con tecnología de primer nivel?
            </h2>

            {/* List of Motives */}
            <ul className="space-y-4 mb-10">
              {motivos.map((motivo, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="p-0.5 bg-[var(--color-accent-blue)]/10 border border-[var(--color-accent-blue)]/20 rounded-full text-[var(--color-accent-blue)] mt-0.5">
                    <Check size={12} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-[var(--color-text-secondary)] font-medium">
                    {motivo}
                  </span>
                </li>
              ))}
            </ul>

            {/* Contact Info cards mini */}
            <div className="space-y-3 mb-10">
              <div className="flex items-center gap-3 p-3.5 bg-white border border-[var(--color-border)] rounded-xl shadow-sm">
                <MapPin size={16} className="text-[var(--color-accent-blue)] flex-shrink-0" />
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">Lima & Chancay, Perú</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-white border border-[var(--color-border)] rounded-xl shadow-sm">
                <Mail size={16} className="text-[var(--color-accent-blue)] flex-shrink-0" />
                <a href="mailto:contacto@crtech.pe" className="text-sm font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] transition-colors">
                  contacto@crtech.pe
                </a>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-white border border-[var(--color-border)] rounded-xl shadow-sm">
                <Globe size={16} className="text-[var(--color-accent-blue)] flex-shrink-0" />
                <a href="https://crtech.pe" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] transition-colors flex items-center gap-1">
                  crtech.pe <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Response speed indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-border)] rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-green)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent-green)]"></span>
              </span>
              <span className="text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-wider">
                Respuesta inmediata vía WhatsApp
              </span>
            </div>
          </div>

          {/* Right Column: WhatsApp Interactive Hub */}
          <div className="lg:col-span-7 fade-up delay-1 w-full">
            <div className="bg-white border border-[var(--color-border)] p-8 md:p-10 rounded-2xl shadow-sm">
              
              <div className="text-center sm:text-left mb-8">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-accent-green)] uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] animate-pulse" />
                  Centro de Cotizaciones WhatsApp
                </div>
                <h3 className="font-display font-extrabold text-2xl text-[var(--color-text-primary)]">
                  Cotiza tu solución en un solo clic
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1.5 leading-relaxed">
                  Personaliza tu mensaje con tus datos (opcional) y selecciona la línea de negocio para ser atendido de forma directa por un especialista corporativo.
                </p>
              </div>

              {/* Optional Fields to personalize */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col text-left">
                  <label htmlFor="nombre-contacto" className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                    <User size={12} /> Tu Nombre (Opcional)
                  </label>
                  <input
                    type="text"
                    id="nombre-contacto"
                    placeholder="Ej. Ing. Carlos Rivera"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="bg-slate-50 focus:bg-white border border-[var(--color-border)] focus:border-[var(--color-accent-blue)] focus:shadow-[0_4px_12px_rgba(0,92,230,0.05)] rounded-xl py-3 px-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col text-left">
                  <label htmlFor="empresa-contacto" className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                    <Building size={12} /> Empresa / Institución (Opcional)
                  </label>
                  <input
                    type="text"
                    id="empresa-contacto"
                    placeholder="Ej. Operaciones Chancay S.A.C."
                    value={empresa}
                    onChange={(e) => setFormDataCompany(e)}
                    className="bg-slate-50 focus:bg-white border border-[var(--color-border)] focus:border-[var(--color-accent-blue)] focus:shadow-[0_4px_12px_rgba(0,92,230,0.05)] rounded-xl py-3 px-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Beautiful custom-tailored buttons for each segment */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block text-left mb-2">
                  Selecciona tu línea de interés:
                </span>
                
                {/* LINE 1: DRONES SWELLPRO */}
                <button
                  onClick={() => handleWhatsAppRedirect('drones')}
                  onMouseEnter={() => playPopSound()}
                  className="w-full text-left bg-gradient-to-r from-slate-50 to-white hover:from-[rgba(0,131,253,0.02)] hover:to-[rgba(0,131,253,0.05)] border border-[var(--color-border)] hover:border-[var(--color-accent-blue)] p-4 rounded-xl transition-all duration-300 flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[var(--color-text-primary)] flex items-center gap-1.5">
                        Línea Drones SwellPro
                        <span className="text-[9px] font-mono bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] px-2 py-0.5 rounded-full font-bold">Oficial</span>
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                        Modelos industriales, cámaras multiespectrales, boyas de liberación e impermeabilidad certificada IP67.
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-blue)] group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                </button>

                {/* LINE 2: ECOFLOW PORTABLE ENERGY */}
                <button
                  onClick={() => handleWhatsAppRedirect('energia')}
                  onMouseEnter={() => playPopSound()}
                  className="w-full text-left bg-gradient-to-r from-slate-50 to-white hover:from-[rgba(0,168,112,0.02)] hover:to-[rgba(0,168,112,0.05)] border border-[var(--color-border)] hover:border-[var(--color-accent-green)] p-4 rounded-xl transition-all duration-300 flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)] rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[var(--color-text-primary)] flex items-center gap-1.5">
                        Línea Energía EcoFlow
                        <span className="text-[9px] font-mono bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)] px-2 py-0.5 rounded-full font-bold">Premium</span>
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                        Estaciones Delta y River, paneles solares portátiles de alta eficiencia y sistemas de respaldo energético de campo.
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-green)] group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                </button>

                {/* LINE 3: CORPORATE IT SERVICES */}
                <button
                  onClick={() => handleWhatsAppRedirect('ti')}
                  onMouseEnter={() => playPopSound()}
                  className="w-full text-left bg-gradient-to-r from-slate-50 to-white hover:from-[rgba(0,195,254,0.02)] hover:to-[rgba(0,195,254,0.05)] border border-[var(--color-border)] hover:border-[var(--color-accent-cyan)] p-4 rounded-xl transition-all duration-300 flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[var(--color-text-primary)] flex items-center gap-1.5">
                        Línea Servicios TI & Ciberseguridad
                        <span className="text-[9px] font-mono bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] px-2 py-0.5 rounded-full font-bold">Corporativo</span>
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                        Soporte técnico, administración de servidores, seguridad informática, redes y consultorías para empresas en expansión.
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-cyan)] group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                </button>

                {/* OPTION 4: CONSULTA GENERAL */}
                <button
                  onClick={() => handleWhatsAppRedirect('general')}
                  onMouseEnter={() => playPopSound()}
                  className="w-full text-center border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 py-3 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 transition-all cursor-pointer"
                >
                  ¿Tienes otra consulta? Haz un clic aquí para hablar directamente en WhatsApp
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );

  function setFormDataCompany(e: React.ChangeEvent<HTMLInputElement>) {
    setEmpresa(e.target.value);
  }
}
