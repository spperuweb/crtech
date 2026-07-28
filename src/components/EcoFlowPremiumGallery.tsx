import React, { useState, useEffect, useCallback, useRef } from 'react';
import { assets } from '../data/assets';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Zap,
  Filter,
  Home,
  Building2,
  Compass,
  Truck,
  Sun
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  eyebrow: string;
  category: string;
  filters: string[];
  image: string;
  description: string;
  relatedProduct: string;
  objectPosition?: string;
  featured?: boolean;
}

export default function EcoFlowPremiumGallery() {
  const [activeFilter, setActiveFilter] = useState<string>('Todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filterTrackRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 1. Colección limpia de 12 elementos basada en los datos reales de assets.ecoFlow
  const galleryItems: GalleryItem[] = [
    {
      id: 'solar-field-gen',
      title: 'Generación solar en campo',
      eyebrow: 'ENERGÍA SOLAR',
      category: 'Solar',
      filters: ['Todos', 'Campo', 'Solar'],
      image: assets.ecoFlow.solarPanelOperation,
      description: 'Paneles fotovoltaicos portátiles y rígidos desplegados en terreno para captura constante de energía solar en áreas remotas.',
      relatedProduct: 'Paneles Solares EcoFlow 400W / 220W Bifacial',
      objectPosition: 'center 40%',
      featured: true,
    },
    {
      id: 'delta-pro-crit',
      title: 'Respaldo para operaciones críticas',
      eyebrow: 'ALMACENAMIENTO',
      category: 'Almacenamiento',
      filters: ['Todos', 'Empresa', 'Campo'],
      image: assets.ecoFlow.deltaPro,
      description: 'Estación de energía LFP de alta capacidad para garantizar la continuidad operativa en infraestructura sensible e industrial.',
      relatedProduct: 'EcoFlow DELTA Pro',
      objectPosition: 'center',
    },
    {
      id: 'drones-inspection',
      title: 'Carga para drones y equipos técnicos',
      eyebrow: 'OPERACIÓN DE CAMPO',
      category: 'Campo',
      filters: ['Todos', 'Empresa', 'Campo'],
      image: assets.ecoFlow.b2bDrones,
      description: 'Suministro eléctrico ininterrumpido en sitio para baterías de drones de mapeo, topografía e inspección técnica.',
      relatedProduct: 'EcoFlow DELTA Pro + Solar Kit',
      objectPosition: 'center',
    },
    {
      id: 'mining-construction',
      title: 'Energía para construcción y minería',
      eyebrow: 'INDUSTRIA',
      category: 'Empresa',
      filters: ['Todos', 'Empresa', 'Campo'],
      image: assets.ecoFlow.b2bMiningConstruction,
      description: 'Alimentación ruda libre de emisiones y ruido para herramientas eléctricas, iluminación y campamentos de obra.',
      relatedProduct: 'EcoFlow DELTA Pro & Extra Batteries',
      objectPosition: 'center',
    },
    {
      id: 'audiovisual-production',
      title: 'Producción audiovisual fuera del estudio',
      eyebrow: 'CREADORES',
      category: 'Movilidad',
      filters: ['Todos', 'Empresa', 'Movilidad'],
      image: assets.ecoFlow.b2bAudiovisual,
      description: 'Suministro silencioso de onda senoidal pura para equipos de iluminación LED, cámaras y monitores de rodaje en locación.',
      relatedProduct: 'EcoFlow DELTA 2 Max',
      objectPosition: 'center',
    },
    {
      id: 'gastronomy-mobile',
      title: 'Continuidad para gastronomía móvil',
      eyebrow: 'NEGOCIOS',
      category: 'Empresa',
      filters: ['Todos', 'Empresa', 'Movilidad'],
      image: assets.ecoFlow.b2bGastronomy,
      description: 'Respaldo eléctrico para congeladoras, cajas registradoras POS e iluminación en foodtrucks y módulos itinerantes.',
      relatedProduct: 'EcoFlow DELTA Pro',
      objectPosition: 'center',
    },
    {
      id: 'entertainment-events',
      title: 'Eventos y activaciones sin red disponible',
      eyebrow: 'ENTRETENIMIENTO',
      category: 'Empresa',
      filters: ['Todos', 'Empresa', 'Hogar'],
      image: assets.ecoFlow.b2bEvents,
      description: 'Energía confiable sin variaciones de voltaje para consolas de sonido, pantallas gigantes y activaciones de marca.',
      relatedProduct: 'EcoFlow DELTA',
      objectPosition: 'center',
    },
    {
      id: 'powerstream-urban',
      title: 'Autoconsumo solar para espacios urbanos',
      eyebrow: 'HOGAR',
      category: 'Solar',
      filters: ['Todos', 'Hogar', 'Solar'],
      image: assets.ecoFlow.powerStream,
      description: 'Microinversor residencial para balcones y terrazas que inyecta energía solar limpia directamente a la red del hogar.',
      relatedProduct: 'Kit Solar EcoFlow PowerStream',
      objectPosition: 'center',
    },
    {
      id: 'wave-ac-climate',
      title: 'Climatización para espacios móviles',
      eyebrow: 'MOVILIDAD',
      category: 'Movilidad',
      filters: ['Todos', 'Movilidad', 'Campo'],
      image: assets.ecoFlow.airConditionerWave,
      description: 'Aire acondicionado y calefacción portátil de respuesta veloz para carpas, vans y oficinas de campo.',
      relatedProduct: 'EcoFlow Wave 2',
      objectPosition: 'center',
    },
    {
      id: 'river2-compact-power',
      title: 'Energía portátil para lo esencial',
      eyebrow: 'SERIE RIVER',
      category: 'Hogar',
      filters: ['Todos', 'Hogar', 'Movilidad'],
      image: assets.ecoFlow.river2,
      description: 'Estación ultra compacta con recarga rápida X-Stream en 60 minutos para laptops, routers y respaldos de emergencia.',
      relatedProduct: 'EcoFlow RIVER 2',
      objectPosition: 'center',
    },
    {
      id: 'solar-hat-wearable',
      title: 'Energía solar que se lleva puesta',
      eyebrow: 'INNOVACIÓN',
      category: 'Solar',
      filters: ['Todos', 'Movilidad', 'Solar'],
      image: assets.ecoFlow.solarHat,
      description: 'Sombrero fotovoltaico flexible de 360° para recargar dispositivos personales mientras caminas al aire libre.',
      relatedProduct: 'Sombrero Solar EcoFlow',
      objectPosition: 'center',
    },
    {
      id: 'magnetic-powerbank-travel',
      title: 'Carga compacta para cada trayecto',
      eyebrow: 'MOVILIDAD',
      category: 'Movilidad',
      filters: ['Todos', 'Movilidad', 'Hogar'],
      image: assets.ecoFlow.powerBankMagnetic,
      description: 'Power Bank magnético de diseño ultradelgado para mantener cargados tus dispositivos móviles durante traslados.',
      relatedProduct: 'Power Bank Magnético EcoFlow',
      objectPosition: 'center',
    },
  ];

  // Filtros disponibles
  const filters = [
    { id: 'Todos', label: 'Todos', icon: Sparkles },
    { id: 'Hogar', label: 'Hogar', icon: Home },
    { id: 'Empresa', label: 'Empresa', icon: Building2 },
    { id: 'Campo', label: 'Campo', icon: Compass },
    { id: 'Movilidad', label: 'Movilidad', icon: Truck },
    { id: 'Solar', label: 'Solar', icon: Sun },
  ];

  // Elementos filtrados
  const filteredItems = activeFilter === 'Todos'
    ? galleryItems
    : galleryItems.filter((item) => item.filters.includes(activeFilter));

  // Navegación en Lightbox
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleNextLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % filteredItems.length));
  }, [lightboxIndex, filteredItems.length]);

  const handlePrevLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [lightboxIndex, filteredItems.length]);

  // Manejo de teclado (Esc, ArrowLeft, ArrowRight) y bloqueo de scroll
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextLightbox();
      if (e.key === 'ArrowLeft') handlePrevLightbox();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Foco inicial al abrir modal
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, handleCloseLightbox, handleNextLightbox, handlePrevLightbox]);

  // Generar URL de WhatsApp contextual
  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const getWhatsAppUrl = (title: string, product: string) => {
    const text = `Hola CR Tech, estuve revisando la galería EcoFlow y quisiera consultar la configuración para "${title}" (Producto relacionado: ${product}).`;
    return `https://wa.me/51991664146?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      className="ecoflow-editorial-section py-16 md:py-24 bg-slate-50 border-t border-b border-slate-200/80"
      id="galeria-editorial"
      aria-labelledby="gallery-editorial-heading"
    >
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. ENCABEZADO EDITORIAL LIMPIO Y RIGUROSO */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-200/80 px-3.5 py-1 rounded-full inline-block mb-3">
            ECOSISTEMA ECOFLOW
          </span>
          <h2
            id="gallery-editorial-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight"
          >
            Energía que se adapta al terreno.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Del respaldo de un hogar a una operación en campo: explora cómo las soluciones EcoFlow mantienen equipos, espacios y negocios en movimiento.
          </p>
          <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Selecciona una aplicación para verla en detalle.
          </p>
        </div>

        {/* 2. NAVEGACIÓN POR FILTROS */}
        <div className="flex justify-center mb-10 md:mb-12">
          <div
            ref={filterTrackRef}
            className="editorial-filter-track flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full px-2 py-1"
            role="tablist"
            aria-label="Filtros de la galería EcoFlow"
          >
            {filters.map((f) => {
              const IconComp = f.icon;
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="gallery-mosaic-grid"
                  onClick={() => setActiveFilter(f.id)}
                  className={`editorial-filter-btn flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md border border-slate-800'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{f.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. MOSAICO EDITORIAL (CSS GRID 12 COLUMNAS) */}
        <div
          id="gallery-mosaic-grid"
          role="region"
          aria-live="polite"
          className={
            activeFilter === 'Todos'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6'
          }
        >
          {filteredItems.map((item, idx) => {
            // Mapeo especial de columnas cuando el filtro es "Todos" para ritmo editorial
            let gridColClass = 'lg:col-span-4';
            let aspectClass = 'aspect-[16/11]';

            if (activeFilter === 'Todos') {
              if (idx === 0) {
                gridColClass = 'lg:col-span-8 lg:row-span-2';
                aspectClass = 'aspect-[16/10] md:aspect-auto h-full min-h-[360px] lg:min-h-[480px]';
              } else if (idx === 1) {
                gridColClass = 'lg:col-span-4';
                aspectClass = 'aspect-[16/11]';
              } else if (idx === 6 || idx === 7) {
                gridColClass = 'lg:col-span-6';
                aspectClass = 'aspect-[16/10]';
              }
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleOpenLightbox(idx)}
                aria-label={`Ver detalles de ${item.title}`}
                className={`editorial-card group relative w-full overflow-hidden text-left cursor-pointer rounded-2xl bg-slate-950 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 flex flex-col ${gridColClass}`}
              >
                {/* Visual Container */}
                <div className={`relative w-full overflow-hidden bg-slate-950 ${aspectClass}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: item.objectPosition || 'center' }}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Gradient Overlay solo en el tercio inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                  {/* Badge Eyebrow Top Left */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-slate-900/80 text-sky-300 border border-sky-400/20 backdrop-blur-sm shadow-sm">
                      {item.eyebrow}
                    </span>
                  </div>

                  {/* Zoom Indicator Top Right */}
                  <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-slate-900/70 border border-white/20 text-white flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:bg-sky-600 transition-all duration-200 backdrop-blur-sm">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Texto sobre la imagen (Tercio inferior) */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 flex flex-col justify-end">
                    <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider mb-1">
                      {item.relatedProduct}
                    </span>
                    <h3 className="text-white font-extrabold text-base md:text-lg lg:text-xl leading-tight line-clamp-2 group-hover:text-sky-200 transition-colors">
                      {item.title}
                    </h3>
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                      <span>Ver aplicación en detalle</span>
                      <ChevronRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* 4. LIGHTBOX ACCESIBLE Y EDITORIAL */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Detalle: ${currentLightboxItem.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={handleCloseLightbox}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Lightbox */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400">
                <span className="text-sky-400 uppercase">{currentLightboxItem.eyebrow}</span>
                <span>•</span>
                <span>{lightboxIndex + 1} / {filteredItems.length}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Botones de navegación interna */}
                <button
                  type="button"
                  onClick={handlePrevLightbox}
                  aria-label="Anterior aplicación"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextLightbox}
                  aria-label="Siguiente aplicación"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-800 mx-1" />
                {/* Botón Cerrar */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseLightbox}
                  aria-label="Cerrar vista ampliada"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contenido Modal */}
            <div className="overflow-y-auto p-5 sm:p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
                
                {/* Imagen Ampliada */}
                <div className="lg:col-span-7 bg-slate-950 rounded-xl overflow-hidden border border-slate-900 shadow-md aspect-[4/3] flex items-center justify-center relative">
                  <img
                    src={currentLightboxItem.image}
                    alt={currentLightboxItem.title}
                    style={{ objectPosition: currentLightboxItem.objectPosition || 'center' }}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-sky-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-sky-400/20">
                    {currentLightboxItem.category}
                  </span>
                </div>

                {/* Detalles y CTA */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
                  <div className="space-y-3">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600">
                      {currentLightboxItem.eyebrow}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                      {currentLightboxItem.title}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      {currentLightboxItem.description}
                    </p>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 mt-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Equipo recomendado
                      </span>
                      <div className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                        <Zap className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>{currentLightboxItem.relatedProduct}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Contextual a WhatsApp */}
                  <div className="pt-2">
                    <a
                      href={getWhatsAppUrl(currentLightboxItem.title, currentLightboxItem.relatedProduct)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm md:text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Consultar esta configuración</span>
                      <ExternalLink className="w-4 h-4 opacity-70" />
                    </a>
                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      Soporte y asesoría técnica oficial por CR Technologies & Services.
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
