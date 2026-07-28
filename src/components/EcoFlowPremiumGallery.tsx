import React, { useState } from 'react';
import { assets } from '../data/assets';
import {
  Sun,
  Zap,
  BatteryCharging,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Home,
  Building2,
  Compass,
  Truck,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  Cpu
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Generación' | 'Almacenamiento' | 'Operación';
  filters: ('Hogar' | 'Empresa' | 'Campo' | 'Movilidad' | 'Solar')[];
  image: string;
  application: string;
  relatedProduct: string;
  productImage: string;
  description: string;
  specs: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  series: 'RIVER' | 'DELTA' | 'PowerStream' | 'Wave' | 'Accesorios';
  capacityOrPower: string;
  tagline: string;
  image: string;
  idealFor: string;
  specs: string[];
  whatsappMsg: string;
}

export default function EcoFlowPremiumGallery() {
  const [activeFilter, setActiveFilter] = useState<string>('Todos');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImgErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  // 1. Tres Categorías Principales
  const categories = [
    {
      id: 'generacion',
      title: 'Generación Solar',
      badge: 'Energía Limpia',
      desc: 'Capta la energía del sol con paneles fotovoltaicos portátiles y rígidos de alta eficiencia (hasta 23%).',
      image: assets.ecoFlow.categoryGenerationCover,
      fallbackImage: assets.ecoFlow.solarPanelOperation,
      count: 'Paneles de 100W a 400W',
      color: 'amber',
    },
    {
      id: 'almacenamiento',
      title: 'Almacenamiento Inteligente',
      badge: 'Respaldo Sin Apagones',
      desc: 'Baterías de química LiFePO4 ultra seguras con más de 3,000 ciclos de vida útil y recarga X-Stream.',
      image: assets.ecoFlow.categoryStorageCover,
      fallbackImage: assets.ecoFlow.deltaPro,
      count: 'Capacidades de 256Wh a 25kWh',
      color: 'cyan',
    },
    {
      id: 'operacion',
      title: 'Operación & Combos B2B',
      badge: 'Sistemas Integrados',
      desc: 'Kits integrados para empresas, minería, audiovisual, eventos y soluciones de autoconsumo fotovoltaico.',
      image: assets.ecoFlow.categoryCombosCover,
      fallbackImage: assets.ecoFlow.powerStream,
      count: 'Sistemas Completo Panel + Estación',
      color: 'violet',
    },
  ];

  // 2. Galería Editorial (8 imágenes de aplicaciones reales)
  const editorialItems: GalleryItem[] = [
    {
      id: 'ed-1',
      title: 'Drones Empresariales e Inspección Técnica',
      category: 'Operación',
      filters: ['Empresa', 'Campo'],
      image: assets.ecoFlow.b2bDrones,
      application: 'Estación de recarga continua en campo para baterías de drones de mapeo, topografía e inspección industrial.',
      relatedProduct: 'EcoFlow DELTA Pro + Panel Solar 400W',
      productImage: assets.ecoFlow.deltaPro,
      description: 'Garantiza autonomía ilimitada durante jornadas de vuelo continuas en zonas rurales o mineras sin red eléctrica.',
      specs: ['Salida 3600W AC', 'Carga solar de hasta 1600W', 'Soporta múltiples cargadores de dron simultáneos'],
    },
    {
      id: 'ed-2',
      title: 'Construcción y Operaciones Mineras',
      category: 'Operación',
      filters: ['Empresa', 'Campo'],
      image: assets.ecoFlow.b2bMiningConstruction,
      application: 'Suministro eléctrico para taladros, esmeriles, torres de iluminación y campamentos de obra.',
      relatedProduct: 'EcoFlow DELTA Pro & Baterías Extra',
      productImage: assets.ecoFlow.deltaPro,
      description: 'Reemplaza generadores ruidosos a diésel eliminando costos de combustible y emitiendo cero humo tóxico.',
      specs: ['Arranque de alto pico X-Boost', 'Monitoreo remoto por App', 'Estructura robusta para uso rudo'],
    },
    {
      id: 'ed-3',
      title: 'Producción Audiovisual y Cine fuera de Estudio',
      category: 'Operación',
      filters: ['Empresa', 'Movilidad'],
      image: assets.ecoFlow.b2bAudiovisual,
      application: 'Alimentación silenciosa de luces LED, monitores de campo, cámaras y laptops de edición.',
      relatedProduct: 'EcoFlow DELTA 2 Max / DELTA',
      productImage: assets.ecoFlow.delta,
      description: 'Cero ruido de fondo para grabar audio limpio en locaciones remotas, playas o interiores exigentes.',
      specs: ['100% silenciosa en operación', 'Forma de onda senoidal pura', 'Puertos USB-C PD de 100W integrados'],
    },
    {
      id: 'ed-4',
      title: 'Gastronomía Móvil y Foodtrucks',
      category: 'Operación',
      filters: ['Empresa', 'Movilidad'],
      image: assets.ecoFlow.b2bGastronomy,
      application: 'Respaldo para congeladoras, licuadoras, cajas registradoras POS e iluminación comercial.',
      relatedProduct: 'EcoFlow DELTA Pro',
      productImage: assets.ecoFlow.deltaPro,
      description: 'Permite operar tu negocio gastronómico itinerante sin interrupciones ni molestias acústicas a los clientes.',
      specs: ['Soporta cargas inductivas de refrigeración', 'Conexión a paneles solares', 'Recarga veloz en enchufe comercial'],
    },
    {
      id: 'ed-5',
      title: 'Industria del Entretenimiento y Eventos',
      category: 'Operación',
      filters: ['Empresa', 'Hogar'],
      image: assets.ecoFlow.b2bEvents,
      application: 'Energía limpia para consolas de sonido, pantallas gigantes, DJs, bodas y activaciones de marca.',
      relatedProduct: 'EcoFlow DELTA / DELTA Pro',
      productImage: assets.ecoFlow.delta,
      description: 'Energía confiable sin fluctuaciones de voltaje que puedan dañar equipos de audio profesional sensibles.',
      specs: ['Protección BMS inteligente', 'Múltiples tomas tomacorriente AC', 'Transporte con ruedas integradas'],
    },
    {
      id: 'ed-6',
      title: 'PowerStream Kit Solar para Balcones y Departamentos',
      category: 'Generación',
      filters: ['Hogar', 'Solar'],
      image: assets.ecoFlow.powerStream,
      application: 'Sistema de microinversor para inyectar energía solar directamente a la red eléctrica de tu hogar.',
      relatedProduct: 'EcoFlow PowerStream & Kit Fotovoltaico',
      productImage: assets.ecoFlow.powerStream,
      description: 'Aprovecha el espacio de balcones o techos urbanos para reducir la facturación eléctrica mensual en departamentos.',
      specs: ['Instalación Plug & Play sin obras complexas', 'Inyección inteligente de excedentes', 'App para ver ahorro en Soles'],
    },
    {
      id: 'ed-7',
      title: 'Generación Solar Portátil en Operación de Campo',
      category: 'Generación',
      filters: ['Solar', 'Campo', 'Hogar'],
      image: assets.ecoFlow.solarPanelOperation,
      application: 'Despliegue rápido de paneles plegables IP68 para recargar baterías portátiles en expediciones.',
      relatedProduct: 'Familia de Paneles Solares EcoFlow',
      productImage: assets.ecoFlow.solarPanelsFamily,
      description: 'Mapea la radiación solar y recarga la estación mientras trabajas en climas extremos o de alta montaña.',
      specs: ['Protección impermeable IP68', 'Fundas que sirven como soporte de inclinación', 'Celdas monocristalinas de 23%'],
    },
    {
      id: 'ed-8',
      title: 'Climatización Portátil Wave en Campamentos y Vans',
      category: 'Almacenamiento',
      filters: ['Movilidad', 'Campo', 'Hogar'],
      image: assets.ecoFlow.airConditionerWave,
      application: 'Aire acondicionado y calefacción compacta para tiendas de campaña, motorhomes y oficinas móviles.',
      relatedProduct: 'EcoFlow Wave 2',
      productImage: assets.ecoFlow.airConditionerWave,
      description: 'Enfría ambientes en menos de 8 minutos con batería acoplable para noches confortables sin corriente.',
      specs: ['Capacidad de enfriamiento 5100 BTU', 'Sin instalación de drenaje compleja', 'Hasta 8h de uso continuo'],
    },
  ];

  // Filtros interactivos
  const filterOptions = ['Todos', 'Hogar', 'Empresa', 'Campo', 'Movilidad', 'Solar'] as const;

  const filteredItems = activeFilter === 'Todos'
    ? editorialItems
    : editorialItems.filter((item) => item.filters.includes(activeFilter as any));

  // 3. Carrusel de Productos
  const products: ProductItem[] = [
    {
      id: 'p-1',
      name: 'EcoFlow RIVER 2',
      series: 'RIVER',
      capacityOrPower: '256Wh / 300W',
      tagline: 'Ultraligera y lista para salir en 60 minutos.',
      image: assets.ecoFlow.river2,
      idealFor: 'Laptops, smartphones, drones, routers e iluminación de emergencia.',
      specs: ['Carga 0-100% en 60 min', 'Peso ligero 3.5 kg', '3000+ ciclos LiFePO4 (10 años uso)'],
      whatsappMsg: 'Hola CR Tech, deseo información sobre la batería portátil EcoFlow RIVER 2.',
    },
    {
      id: 'p-2',
      name: 'EcoFlow RIVER',
      series: 'RIVER',
      capacityOrPower: '288Wh (Expandible a 576Wh)',
      tagline: 'Energía versátil con diseño modular para viajes.',
      image: assets.ecoFlow.river,
      idealFor: 'Paseos de fin de semana, camping, fotógrafos y trabajo remoto.',
      specs: ['Diseño modular expandible', 'Tecnología X-Boost hasta 1800W', 'Control por App vía Bluetooth'],
      whatsappMsg: 'Hola CR Tech, deseo consultar disponibilidad y precio de EcoFlow RIVER.',
    },
    {
      id: 'p-3',
      name: 'EcoFlow DELTA',
      series: 'DELTA',
      capacityOrPower: '1260Wh / 1800W',
      tagline: 'El estándar de oro para respaldo del hogar u oficina.',
      image: assets.ecoFlow.delta,
      idealFor: 'Refrigeradoras, televisores, computadoras, herramientas y electrodomésticos.',
      specs: ['Carga 0-80% en 1 hora', '11 puertos de salida simultáneos', 'Potencia pico de 3300W'],
      whatsappMsg: 'Hola CR Tech, me interesa la estación de energía EcoFlow DELTA.',
    },
    {
      id: 'p-4',
      name: 'EcoFlow DELTA Pro',
      series: 'DELTA',
      capacityOrPower: '3600Wh / 3600W (Expandible a 25kWh)',
      tagline: 'Batería de grado industrial para empresas y respaldo total.',
      image: assets.ecoFlow.deltaPro,
      idealFor: 'Negocios, minería, eventos, foodtrucks y respaldo crítico sin apagones.',
      specs: ['Capacidad expandible masiva', 'Recarga ultrarrápida X-Stream y Solar 1600W', 'Integración a tablero eléctrico'],
      whatsappMsg: 'Hola CR Tech, necesito asesoría técnica para la EcoFlow DELTA Pro.',
    },
    {
      id: 'p-5',
      name: 'Kit Solar PowerStream',
      series: 'PowerStream',
      capacityOrPower: 'Microinversor 600W/800W',
      tagline: 'Kit fotovoltaico para balcones, departamentos y autoconsumo.',
      image: assets.ecoFlow.powerStream,
      idealFor: 'Ahorro directo en la factura eléctrica de casas y departamentos.',
      specs: ['Instalación Plug & Play sin obras', 'Inyección inteligente a la red', 'Compatible con todas las estaciones DELTA'],
      whatsappMsg: 'Hola CR Tech, quiero consultar sobre el Kit Solar PowerStream para mi hogar.',
    },
    {
      id: 'p-6',
      name: 'Aire Acondicionado Portátil Wave',
      series: 'Wave',
      capacityOrPower: '5100 BTU / 8 horas de uso',
      tagline: 'Climatización portátil de alto rendimiento para exteriores.',
      image: assets.ecoFlow.airConditionerWave,
      idealFor: 'Campamentos, vans, campers, carpas y oficinas de campo.',
      specs: ['Enfriamiento rápido en 8 minutos', 'Batería adicional de acople directo', 'Función de enfriamiento y calefacción'],
      whatsappMsg: 'Hola CR Tech, quisiera cotizar el aire acondicionado portátil EcoFlow Wave.',
    },
    {
      id: 'p-7',
      name: 'Power Bank Magnético EcoFlow',
      series: 'Accesorios',
      capacityOrPower: 'Capacidad ultra compacta',
      tagline: 'Carga inalámbrica magnética de viaje para smartphones.',
      image: assets.ecoFlow.powerBankMagnetic,
      idealFor: 'Movilidad diaria, vuelos, ejecutivos y carga de bolsillo.',
      specs: ['Alineación magnética MagSafe', 'Diseño ultra delgado y ligero', 'Carga rápida inalámbrica y cable USB-C'],
      whatsappMsg: 'Hola CR Tech, deseo consultar sobre el Power Bank Magnético EcoFlow.',
    },
    {
      id: 'p-8',
      name: 'Sombrero Solar EcoFlow',
      series: 'Accesorios',
      capacityOrPower: 'Celdas fotovoltaicas flexibles 360°',
      tagline: 'Innovación wearable para recargar dispositivos caminando al sol.',
      image: assets.ecoFlow.solarHat,
      idealFor: 'Excursionistas, trabajo en campo, eventos al aire libre y lifestyle.',
      specs: ['Celdas flexibles integradas', 'Puerto de salida USB-A / USB-C', 'Protección solar UV50+ e impermeable'],
      whatsappMsg: 'Hola CR Tech, deseo información sobre el Sombrero Solar EcoFlow.',
    },
    {
      id: 'p-9',
      name: 'Familia de Paneles Solares Portátiles',
      series: 'PowerStream',
      capacityOrPower: '100W, 160W, 220W Bifacial, 400W',
      tagline: 'Paneles solares plegables impermeables IP68.',
      image: assets.ecoFlow.solarPanelsFamily,
      idealFor: 'Emparejar con estaciones RIVER o DELTA para energía 100% solar.',
      specs: ['Alta eficiencia fotovoltaica 23%', 'Plegable con estuche-soporte', 'Resistencia total al agua y polvo IP68'],
      whatsappMsg: 'Hola CR Tech, deseo cotizar paneles solares portátiles EcoFlow.',
    },
  ];

  const handlePrevProduct = () => {
    setCarouselIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNextProduct = () => {
    setCarouselIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const getWhatsAppUrl = (msg: string) => {
    return `https://wa.me/51991664146?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="ecoflow-premium-gallery-section" id="galeria-energia">
      {/* 1. HERO SHOWN WITH FEATURED PRODUCT (Paneles + Delta Pro Combo) */}
      <div className="gallery-hero-banner">
        <div className="section-container">
          <div className="gallery-hero-grid">
            <div className="hero-banner-copy">
              <div className="hero-banner-badge">
                <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
                <span>Ecosistema de Energía Autónoma · CR Tech Perú</span>
              </div>
              <h2 className="hero-banner-title">
                Generación Solar y Almacenamiento <span className="highlight-gradient">de Máxima Potencia</span>
              </h2>
              <p className="hero-banner-desc">
                Explora el ecosistema EcoFlow completo: desde paneles fotovoltaicos hasta baterías de respaldo industrial para hogares, empresas y trabajo de campo.
              </p>
              <div className="hero-banner-stats">
                <div className="stat-pill">
                  <span className="stat-value">100%</span>
                  <span className="stat-label">Energía Limpia</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-value">3000+</span>
                  <span className="stat-label">Ciclos LFP</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-value">0 dB</span>
                  <span className="stat-label">Sin Humo ni Ruido</span>
                </div>
              </div>
            </div>

            {/* Imagen principal: Paneles Solares + Delta Pro */}
            <div className="hero-banner-visual">
              <div className="main-featured-combo-card">
                <div className="combo-card-tag">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>COMBO PRINCIPAL: GENERACIÓN + ALMACENAMIENTO</span>
                </div>
                <div className="combo-images-container">
                  <img
                    src={assets.ecoFlow.solarPanelOperation}
                    alt="Paneles solares EcoFlow en Operación"
                    className="combo-img-solar"
                    onError={() => handleImageError('solarPanelOperation')}
                  />
                  <div className="combo-plus-badge">+</div>
                  <img
                    src={assets.ecoFlow.deltaPro}
                    alt="EcoFlow Delta Pro Batería"
                    className="combo-img-delta"
                    onError={() => handleImageError('deltaPro')}
                  />
                </div>
                <div className="combo-card-caption">
                  <h3 className="combo-title">Paneles Solares 400W + EcoFlow DELTA Pro</h3>
                  <p className="combo-desc">
                    Captura la radiación solar y alimenta electrodomésticos, herramientas o tu hogar completo sin depender de la red pública.
                  </p>
                  <a
                    href={getWhatsAppUrl('Hola CR Tech, deseo cotizar el combo principal de Paneles Solares + EcoFlow DELTA Pro.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-cyan btn-sm w-full mt-3"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consultar configuración Combo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TRES CATEGORÍAS PRINCIPALES (Generación, Almacenamiento, Operación) */}
      <div className="categories-showcase-block py-12">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="section-eyebrow">ARQUITECTURA DEL SISTEMA</span>
            <h2 className="section-title text-2xl md:text-3xl font-extrabold text-slate-900">
              Tres Pilares de la Independencia Energética
            </h2>
            <p className="text-slate-600 mt-2">
              Cada elemento está diseñado para conectarse de forma sinérgica y ofrecerte energía ininterrumpida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className={`category-card border-${cat.color}`}>
                <div className="category-img-wrap">
                  <img
                    src={imgErrorMap[cat.id] ? cat.fallbackImage : cat.image}
                    alt={cat.title}
                    className="category-img"
                    onError={() => handleImageError(cat.id)}
                  />
                  <div className="category-overlay-gradient" />
                  <span className={`category-badge badge-${cat.color}`}>{cat.badge}</span>
                </div>
                <div className="category-content p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="category-card-title">{cat.title}</h3>
                    <Layers className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="category-card-desc">{cat.desc}</p>
                  <div className="category-card-footer mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">{cat.count}</span>
                    <a
                      href={getWhatsAppUrl(`Hola CR Tech, deseo asesoría sobre la línea de ${cat.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <span>Ver modelos</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. GALERÍA EDITORIAL DE APLICACIONES REALES (8 IMÁGENES + FILTROS) */}
      <div className="editorial-gallery-block py-12 bg-slate-900 text-white">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="section-eyebrow text-sky-400">GALERÍA EDITORIAL</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                Aplicaciones Reales en Perú
              </h2>
              <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl">
                Haz clic en cualquier imagen para abrir la ficha técnica, ver la aplicación específica, el producto relacionado y solicitar tu configuración personalizada.
              </p>
            </div>

            {/* Barra de Filtros */}
            <div className="gallery-filter-bar">
              <div className="filter-icon-label">
                <Filter className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Filtrar:</span>
              </div>
              <div className="filter-buttons-scroll">
                {filterOptions.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`filter-btn ${isActive ? 'active' : ''}`}
                    >
                      {filter === 'Hogar' && <Home className="w-3.5 h-3.5" />}
                      {filter === 'Empresa' && <Building2 className="w-3.5 h-3.5" />}
                      {filter === 'Campo' && <Compass className="w-3.5 h-3.5" />}
                      {filter === 'Movilidad' && <Truck className="w-3.5 h-3.5" />}
                      {filter === 'Solar' && <Sun className="w-3.5 h-3.5" />}
                      <span>{filter}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grid de Imágenes Editorial (8 tarjetas estructuradas en Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="editorial-card group cursor-pointer flex flex-col justify-between"
                onClick={() => setSelectedItem(item)}
              >
                <div>
                  {/* Top Image Container */}
                  <div className="editorial-img-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="editorial-img group-hover:scale-105 transition-transform duration-500"
                      onError={() => handleImageError(item.id)}
                    />
                    <div className="editorial-card-overlay" />
                    
                    <div className="editorial-top-tags">
                      <span className="editorial-cat-badge">{item.category}</span>
                    </div>

                    <div className="editorial-zoom-icon">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-4 md:p-5 flex flex-col gap-2.5">
                    <h4 className="editorial-card-title group-hover:text-sky-400 transition-colors">
                      {item.title}
                    </h4>

                    <p className="editorial-card-app-desc line-clamp-2">
                      {item.application}
                    </p>

                    {/* Related Product Tag */}
                    <div className="editorial-product-chip">
                      <Zap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{item.relatedProduct}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-4 pb-4 md:px-5 md:pb-5 pt-1 border-t border-slate-800/80 flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-sky-400 group-hover:underline flex items-center gap-1">
                    Ver configuración
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    CR Tech Perú
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. CARRUSEL DE PRODUCTOS (RIVER, DELTA, PowerStream, Wave y accesorios) */}
      <div className="products-carousel-block py-14 bg-slate-50 border-t border-b border-slate-200">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="section-eyebrow">CATÁLOGO TÉCNICO</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                Carrusel de Productos EcoFlow
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Conoce las características clave de cada familia de baterías y accesorios.
              </p>
            </div>

            {/* Controles del carrusel */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevProduct}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
                aria-label="Anterior producto"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-slate-500 px-2">
                {carouselIndex + 1} / {products.length}
              </span>
              <button
                type="button"
                onClick={handleNextProduct}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
                aria-label="Siguiente producto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tarjeta destacada del Carrusel Activo */}
          <div className="product-active-carousel-card bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Imagen del Producto */}
              <div className="lg:col-span-5 flex items-center justify-center bg-slate-50 rounded-xl p-6 relative group">
                <img
                  src={products[carouselIndex].image}
                  alt={products[carouselIndex].name}
                  className="max-h-72 object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={() => handleImageError(products[carouselIndex].id)}
                />
                <span className="absolute top-4 left-4 text-xs font-extrabold uppercase bg-sky-600 text-white px-3 py-1 rounded-full shadow-sm">
                  {products[carouselIndex].series}
                </span>
              </div>

              {/* Información del Producto */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                    <Zap className="w-4 h-4" />
                    <span>{products[carouselIndex].capacityOrPower}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {products[carouselIndex].name}
                  </h3>

                  <p className="text-sky-700 font-semibold text-sm mt-1">
                    {products[carouselIndex].tagline}
                  </p>

                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs md:text-sm text-amber-900 font-medium">
                    <strong>Ideal para:</strong> {products[carouselIndex].idealFor}
                  </div>

                  <div className="mt-5 space-y-2">
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Especificaciones destacadas:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {products[carouselIndex].specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Acciones */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
                  <a
                    href={getWhatsAppUrl(products[carouselIndex].whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consultar configuración por WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      // Buscar si coincide con alguna tarjeta editorial o abrir modal
                      const match = editorialItems.find(
                        (e) => e.relatedProduct.includes(products[carouselIndex].series) || e.title.includes(products[carouselIndex].name)
                      );
                      if (match) setSelectedItem(match);
                      else {
                        setSelectedItem({
                          id: products[carouselIndex].id,
                          title: products[carouselIndex].name,
                          category: 'Almacenamiento',
                          filters: ['Hogar', 'Empresa'],
                          image: products[carouselIndex].image,
                          application: products[carouselIndex].idealFor,
                          relatedProduct: products[carouselIndex].name,
                          productImage: products[carouselIndex].image,
                          description: products[carouselIndex].tagline,
                          specs: products[carouselIndex].specs,
                        });
                      }
                    }}
                    className="btn btn-secondary border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Ver Ficha Técnica Ampliada</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Miniaturas navegables */}
          <div className="flex items-center gap-3 overflow-x-auto py-4 mt-4 no-scrollbar">
            {products.map((prod, idx) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => setCarouselIndex(idx)}
                className={`product-thumb-btn ${idx === carouselIndex ? 'active' : ''}`}
              >
                <img src={prod.image} alt={prod.name} className="w-10 h-10 object-contain" />
                <span className="text-xs font-semibold whitespace-nowrap">{prod.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. MODAL INTERACTIVO AL SELECCIONAR UNA TARJETA */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors shadow-lg"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* Imagen Ampliada */}
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md aspect-video md:aspect-4/3 flex items-center justify-center p-2">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute top-3 left-3 bg-sky-600 text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                      {selectedItem.category}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs text-slate-600 font-medium">
                      Garantía Oficial EcoFlow Perú y Soporte Técnico Especializado por CR Tech.
                    </span>
                  </div>
                </div>

                {/* Detalles de Aplicación y Producto */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                      APLICACIÓN EN CAMPO / HOGAR
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <div className="p-4 bg-sky-50/80 border border-sky-100 rounded-xl space-y-2">
                    <h4 className="text-xs font-extrabold uppercase text-sky-900 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-sky-600" />
                      <span>Uso Recomendado</span>
                    </h4>
                    <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
                      {selectedItem.application}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <h4 className="text-xs font-extrabold uppercase text-slate-500">
                      Producto Relacionado
                    </h4>
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedItem.productImage}
                        alt={selectedItem.relatedProduct}
                        className="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-slate-200"
                      />
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm md:text-base">
                          {selectedItem.relatedProduct}
                        </h5>
                        <p className="text-xs text-slate-500">
                          {selectedItem.description}
                        </p>
                      </div>
                    </div>

                    {selectedItem.specs && (
                      <ul className="space-y-1.5 pt-2 border-t border-slate-200">
                        {selectedItem.specs.map((spec, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* CTA Principal */}
                  <div className="pt-2">
                    <a
                      href={getWhatsAppUrl(
                        `Hola CR Tech, estuve viendo la configuración para "${selectedItem.title}" (Producto: ${selectedItem.relatedProduct}). Quisiera recibir asesoría y cotización.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-cyan w-full py-3.5 text-base font-extrabold shadow-lg bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Consultar Configuración</span>
                      <ExternalLink className="w-4 h-4 opacity-70" />
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
