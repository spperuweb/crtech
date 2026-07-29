import React, { useState, useEffect, useRef } from 'react';

export type GalleryCategory = 'Todos' | 'Empresa' | 'Campo' | 'Hogar' | 'Movilidad';

export interface EditorialGalleryItem {
  id: number;
  title: string;
  description: string;
  categories: GalleryCategory[];
  url: string;
  alt: string;
  primaryCategoryLabel: string;
}

const galleryData: EditorialGalleryItem[] = [
  {
    id: 1,
    title: 'Energía solar que acompaña la operación',
    description: 'Generación portátil para extender jornadas y sostener equipos fuera de la red.',
    categories: ['Todos', 'Campo', 'Empresa'],
    primaryCategoryLabel: 'Campo & Empresa',
    url: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422204/Ecoflow_paneles_solares_e4mpcp.png',
    alt: 'Sistema EcoFlow con paneles solares funcionando en una operación de campo',
  },
  {
    id: 2,
    title: 'Respaldo para jornadas de alta demanda',
    description: 'Una referencia visual de autonomía para operaciones que no pueden detenerse.',
    categories: ['Todos', 'Empresa'],
    primaryCategoryLabel: 'Empresa',
    url: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422177/Ecoflow_delta_PRO_g9xhmt.png',
    alt: 'Estación EcoFlow Delta Pro para respaldo de alta potencia empresarial',
  },
  {
    id: 3,
    title: 'Continuidad energética en campo',
    description: 'Energía móvil para herramientas, comunicaciones y equipos en entornos exigentes.',
    categories: ['Todos', 'Campo', 'Empresa'],
    primaryCategoryLabel: 'Construcción & Minería',
    url: 'https://ecoflowstore.pe/wp-content/uploads/2026/07/EcoFlow-Landing-B2B_Construccion-y-Mineria-1.webp',
    alt: 'Batería EcoFlow utilizada en trabajos de construcción y minería',
  },
  {
    id: 4,
    title: 'Energía disponible para operaciones aéreas',
    description: 'Carga y respaldo para extender el trabajo de drones y equipos auxiliares.',
    categories: ['Todos', 'Campo', 'Empresa'],
    primaryCategoryLabel: 'Operaciones Drones',
    url: 'https://ecoflowstore.pe/wp-content/uploads/2026/07/EcoFlow-Landing-B2B_Drones-Empresariales-1.webp',
    alt: 'Estación EcoFlow cargando baterías de drones en campo',
  },
  {
    id: 5,
    title: 'Producción sin depender del enchufe',
    description: 'Respaldo móvil para cámaras, iluminación, monitores y estaciones de trabajo.',
    categories: ['Todos', 'Campo', 'Empresa'],
    primaryCategoryLabel: 'Producción Audiovisual',
    url: 'https://ecoflowstore.pe/wp-content/uploads/2026/07/EcoFlow-Landing-B2B_Audiovisual-1.webp',
    alt: 'Energía EcoFlow para equipos de filmación y producción audiovisual',
  },
  {
    id: 6,
    title: 'Negocios móviles que siguen atendiendo',
    description: 'Energía para refrigeración, preparación y atención fuera de un local fijo.',
    categories: ['Todos', 'Empresa', 'Movilidad'],
    primaryCategoryLabel: 'Gastronomía Móvil',
    url: 'https://ecoflowstore.pe/wp-content/uploads/2026/07/EcoFlow-Landing-B2B_Gastronomia-1.webp',
    alt: 'EcoFlow suministrando energía a negocio gastronómico móvil',
  },
  {
    id: 7,
    title: 'Potencia para eventos y activaciones',
    description: 'Una referencia para sostener sonido, iluminación y producción temporal.',
    categories: ['Todos', 'Empresa', 'Movilidad'],
    primaryCategoryLabel: 'Eventos & Entretenimiento',
    url: 'https://ecoflowstore.pe/wp-content/uploads/2026/07/EcoFlow-Landing-B2B_Industria-entretenimiento-1.webp',
    alt: 'Equipos de audio e iluminación alimentados por EcoFlow en evento',
  },
  {
    id: 8,
    title: 'Autoconsumo para espacios urbanos',
    description: 'Una solución visual para integrar generación y consumo energético en departamentos.',
    categories: ['Todos', 'Hogar'],
    primaryCategoryLabel: 'Autoconsumo Hogar',
    url: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422178/Ecoflow_POWERSTREAM_Kit_solar_para_balcones__mihh2z.png',
    alt: 'Kit solar EcoFlow PowerStream instalado en hogar urbano',
  },
  {
    id: 9,
    title: 'Energía que viaja con el equipo',
    description: 'Formato compacto para viajes, trabajo móvil, conectividad y actividades al aire libre.',
    categories: ['Todos', 'Movilidad', 'Campo'],
    primaryCategoryLabel: 'Movilidad & Trabajo',
    url: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422175/Ecoflow_river_oybgke.png',
    alt: 'Batería portátil EcoFlow River en actividades de movilidad',
  },
  {
    id: 10,
    title: 'Climatización donde la operación ocurre',
    description: 'Confort portátil para campamentos, espacios temporales y jornadas fuera de oficina.',
    categories: ['Todos', 'Campo', 'Movilidad', 'Hogar'],
    primaryCategoryLabel: 'Climatización Portátil',
    url: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782422174/Ecoflow_aire_acondicionado_portatil_ltjrpz.png',
    alt: 'Aire acondicionado portátil EcoFlow Wave para climatización',
  },
];

const categoriesList: GalleryCategory[] = ['Todos', 'Empresa', 'Campo', 'Hogar', 'Movilidad'];

export default function EcoFlowEditorialGallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('Todos');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const triggerButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems = galleryData.filter(item => item.categories.includes(activeFilter));

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const closeLightbox = () => {
    const prevIndex = selectedItemIndex;
    setSelectedItemIndex(null);
    if (prevIndex !== null && triggerButtonRefs.current[prevIndex]) {
      triggerButtonRefs.current[prevIndex]?.focus();
    }
  };

  const nextLightboxItem = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
    }
  };

  const prevLightboxItem = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard controls & body lock for lightbox
  useEffect(() => {
    if (selectedItemIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextLightboxItem();
      } else if (e.key === 'ArrowLeft') {
        prevLightboxItem();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItemIndex, filteredItems.length]);

  const currentItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  return (
    <section className="ecoflow-editorial-gallery" id="galeria-ecoflow">
      <div className="ecoflow-gallery-container">
        
        {/* Editorial Section Header */}
        <div className="ecoflow-gallery-header">
          <div className="ecoflow-gallery-eyebrow-badge">
            <span className="eyebrow-dot"></span>
            <span>ECOSISTEMA ECOFLOW</span>
          </div>

          <h2 className="ecoflow-gallery-title">
            Energía que se adapta al terreno.
          </h2>

          <p className="ecoflow-gallery-desc">
            Del respaldo de un hogar a una operación en campo: descubre cómo las soluciones EcoFlow mantienen equipos, espacios y negocios en movimiento.
          </p>

          <p className="ecoflow-gallery-microcopy">
            Explora cada escenario y encuentra una referencia para tu operación.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="ecoflow-gallery-filter-bar" role="tablist" aria-label="Filtros de escenarios EcoFlow">
          {categoriesList.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                className={`ecoflow-filter-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(category);
                  setSelectedItemIndex(null);
                }}
                aria-pressed={isActive}
                role="tab"
                aria-selected={isActive}
              >
                <span>{category}</span>
                {isActive && <span className="active-indicator" />}
              </button>
            );
          })}
        </div>

        {/* Editorial Image Grid / Mosaic */}
        <div className={`ecoflow-gallery-grid ${activeFilter !== 'Todos' ? 'filtered-mode' : ''}`}>
          {filteredItems.map((item, index) => {
            const isProtagonista = activeFilter === 'Todos' && item.id === 1;
            const isError = imageErrors[item.id];

            return (
              <button
                key={item.id}
                ref={(el) => { triggerButtonRefs.current[index] = el; }}
                type="button"
                className={`ecoflow-gallery-card item-id-${item.id} ${isProtagonista ? 'card-protagonista' : ''}`}
                onClick={() => openLightbox(index)}
                aria-label={`Ver detalle de: ${item.title}`}
              >
                <div className="card-image-wrap">
                  {!isError ? (
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="card-img"
                      loading={isProtagonista ? 'eager' : 'lazy'}
                      decoding="async"
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <div className="card-img-fallback">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="fallback-icon">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      <span>{item.title}</span>
                    </div>
                  )}
                  
                  {/* Subtle Gradient & Information Overlay */}
                  <div className="card-overlay" />

                  {/* Top Badge */}
                  <div className="card-badge-top">
                    <span>{item.primaryCategoryLabel}</span>
                  </div>

                  {/* Content Container */}
                  <div className="card-content-bottom">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.description}</p>
                    <div className="card-expand-indicator">
                      <span>Ver escenario</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="expand-svg">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Gallery Closing Section */}
        <div className="ecoflow-gallery-footer-cta">
          <p className="gallery-footer-text">¿Reconoces un escenario parecido al tuyo?</p>
          <a
            href="https://wa.me/51991664146?text=Hola%20CR%20Tech%2C%20vi%20la%20galer%C3%ADa%20de%20aplicaciones%20EcoFlow%20y%20quisiera%20evaluar%20una%20soluci%C3%B3n%20para%20mantener%20activa%20mi%20operaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            className="ecoflow-gallery-sub-cta"
          >
            <span>Cuéntanos qué necesitas mantener activo</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-arrow-icon">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

      </div>

      {/* Accessible Modal Lightbox / Visor */}
      {selectedItemIndex !== null && currentItem && (
        <div
          className="ecoflow-gallery-modal-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ecoflow-lightbox-title"
        >
          <div
            className="ecoflow-gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="modal-header-bar">
              <div className="modal-counter">
                <span className="counter-badge">{selectedItemIndex + 1} / {filteredItems.length}</span>
                <span className="category-tag">{currentItem.primaryCategoryLabel}</span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className="modal-close-btn"
                onClick={closeLightbox}
                aria-label="Cerrar visor de imagen"
                title="Cerrar (Esc)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="close-icon">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Main Stage with Nav Buttons */}
            <div className="modal-stage">
              <button
                type="button"
                className="modal-nav-btn prev-btn"
                onClick={prevLightboxItem}
                aria-label="Escenario anterior"
                title="Anterior (Flecha izquierda)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <div className="modal-image-wrap">
                {!imageErrors[currentItem.id] ? (
                  <img
                    src={currentItem.url}
                    alt={currentItem.alt}
                    className="modal-expanded-img"
                    onError={() => handleImageError(currentItem.id)}
                  />
                ) : (
                  <div className="modal-img-fallback">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>{currentItem.title}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="modal-nav-btn next-btn"
                onClick={nextLightboxItem}
                aria-label="Siguiente escenario"
                title="Siguiente (Flecha derecha)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Modal Footer Info & Contextual WhatsApp Action */}
            <div className="modal-info-footer">
              <div className="modal-text-group">
                <h3 id="ecoflow-lightbox-title" className="modal-item-title">{currentItem.title}</h3>
                <p className="modal-item-desc">{currentItem.description}</p>
              </div>

              <a
                href={`https://wa.me/51991664146?text=${encodeURIComponent(
                  `Hola CR Tech, vi el escenario “${currentItem.title}” en la galería EcoFlow y quisiera evaluar una solución similar para mi operación.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-whatsapp-cta"
              >
                <span>Consultar una solución similar</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="wa-icon">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.233-1.237a9.96 9.96 0 004.779 1.221h.004c5.505 0 9.988-4.478 9.989-9.985A9.982 9.982 0 0012.012 2zm5.789 14.51c-.244.688-1.428 1.31-1.977 1.385-.503.07-1.157.102-3.69-.942-3.238-1.335-5.323-4.636-5.485-4.851-.161-.215-1.306-1.74-1.306-3.318 0-1.579.822-2.355 1.116-2.678.293-.323.639-.403.852-.403.214 0 .428.003.615.013.197.01.461-.075.722.553.268.644.912 2.226.992 2.388.08.161.133.35.027.564-.107.215-.16.35-.32.537-.161.188-.338.42-.482.564-.16.16-.327.335-.141.654.187.319.828 1.368 1.777 2.213 1.22 1.087 2.248 1.425 2.568 1.586.32.161.508.134.695-.08.188-.215.803-.938 1.018-1.26.214-.322.428-.268.722-.161.294.107 1.875.884 2.196 1.045.32.161.535.241.615.375.08.134.08.778-.164 1.466z"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
