export interface RouteMetaData {
  path: string;
  cleanPath: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h1Text: string;
  introText: string;
  serviceType?: string;
  brand?: string;
}

export const COMPANY_INFO = {
  commercialName: 'CR Technologies & Services',
  legalName: 'CR TECHNOLOGIES & SERVICES E.I.R.L.',
  ruc: '20615939791',
  phone: '+51 991 664 146',
  city: 'Lima',
  country: 'Perú',
  countryCode: 'PE',
  prodUrl: 'https://crtech.pe',
  logoUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782420769/CRTech_LogoHorizontal_FondoDark_zcezvt.png',
  ogImageUrl: 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1785511514/CRTECH_OG_SEO_DRONES_ENERGIA_SERVICIOSTI_LQ-03_upmbkl.jpg',
  ogImageAlt: 'CR Technologies & Services: drones profesionales, energía EcoFlow y servicios TI en Perú',
  knowsAbout: [
    'drones profesionales',
    'sistemas aéreos no tripulados',
    'energía portátil',
    'generación solar',
    'infraestructura TI',
    'redes',
    'videovigilancia',
    'soporte tecnológico'
  ]
};

// Config parameters dynamically derived from Vite env vars or safe defaults
export const getSeoEnv = () => {
  const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://spperuweb.github.io/crtech').replace(/\/$/, '');
  const basePath = import.meta.env.VITE_BASE_PATH || '/crtech/';
  const isIndexable = import.meta.env.VITE_INDEXABLE === 'true';
  const environment = import.meta.env.VITE_ENVIRONMENT || 'preview';

  return { siteUrl, basePath, isIndexable, environment };
};

export const ROUTES_METADATA: Record<string, RouteMetaData> = {
  home: {
    path: '/',
    cleanPath: '/',
    title: 'CR Technologies & Services | Tecnología Operativa en Perú',
    description: 'Drones profesionales, energía portátil EcoFlow y servicios TI para empresas y operaciones en Perú, con asesoría, implementación y soporte local.',
    ogTitle: 'CR Technologies & Services | Tecnología que mantiene tu operación en movimiento',
    ogDescription: 'Integramos drones profesionales, energía portátil y servicios TI para mantener activas las operaciones en Perú.',
    h1Text: 'Tecnología Operativa que mantiene tu empresa en movimiento',
    introText: 'CR Technologies & Services integra soluciones avanzadas en drones profesionales SwellPro, estaciones de energía portátil EcoFlow e infraestructura TI en Perú. Brindamos evaluación técnica, implementación certificada y soporte local para asegurar la continuidad de tus operaciones.'
  },
  drones: {
    path: '/drones/',
    cleanPath: '/drones/',
    title: 'Drones Profesionales SwellPro en Perú | CR Tech',
    description: 'Drones impermeables SwellPro para inspección, monitoreo, pesca, rescate y trabajo de campo, con capacitación, repuestos y soporte en Perú.',
    ogTitle: 'Drones Profesionales SwellPro en Perú',
    ogDescription: 'Tecnología aérea para operaciones exigentes, con representación, capacitación, repuestos y soporte técnico local.',
    h1Text: 'Drones Profesionales SwellPro en Perú',
    introText: 'CR Technologies & Services es representante oficial de SwellPro Perú. Suministramos drones marinos e impermeables para pesca, rescate, inspección e investigación en agua y campo, respaldados con capacitación, repuestos y servicio técnico especializado en Perú.',
    serviceType: 'Drones profesionales, capacitación y soporte técnico',
    brand: 'SwellPro'
  },
  energia: {
    path: '/energia/',
    cleanPath: '/energia/',
    title: 'EcoFlow Perú: Energía Portátil y Respaldo | CR Tech',
    description: 'Soluciones EcoFlow de energía portátil, respaldo y generación solar para hogares, empresas y trabajo de campo, con asesoría técnica en Perú.',
    ogTitle: 'EcoFlow Perú | Energía lista para responder',
    ogDescription: 'Estaciones portátiles, paneles solares y respaldo energético dimensionados para tu operación.',
    h1Text: 'EcoFlow Perú: Soluciones de Energía Portátil y Respaldo',
    introText: 'CR Technologies & Services integra estaciones de energía portátil, paneles solares y respaldos industriales EcoFlow Perú. Dimensionamos e implementamos soluciones energéticas limpias e ininterrumpidas para empresas, comercios y trabajo remoto en campo.',
    serviceType: 'Soluciones de energía portátil, respaldo y generación solar',
    brand: 'EcoFlow'
  },
  'servicios-ti': {
    path: '/serviciosti/',
    cleanPath: '/serviciosti/',
    title: 'Servicios TI e Infraestructura para Empresas | CR Tech',
    description: 'Redes, fibra óptica, soporte TI, videovigilancia y continuidad operativa para empresas en Perú, con implementación y acompañamiento técnico.',
    ogTitle: 'Servicios TI e Infraestructura para Empresas',
    ogDescription: 'Tecnología, conectividad, soporte y seguridad para operaciones que no pueden detenerse.',
    h1Text: 'Servicios TI e Infraestructura para Empresas en Perú',
    introText: 'CR Technologies & Services ofrece servicios TI e infraestructura tecnológica para empresas en Perú. Diseñamos e implementamos redes de fibra óptica, cableado estructurado, Wi-Fi 6 corporativo, videovigilancia y planes de continuidad operativa con soporte técnico local.',
    serviceType: 'Servicios TI, infraestructura, conectividad, soporte y videovigilancia'
  }
};

// FAQ dataset for schema generation & matching
export const FAQ_DATA = {
  home: [
    {
      q: '¿Qué hace CR Technologies & Services?',
      a: 'CR Technologies & Services integra tecnología operativa en Perú mediante la distribución oficial de drones impermeables SwellPro, soluciones de energía portátil y solar EcoFlow, y servicios de infraestructura TI corporativa. Acompañamos a empresas y profesionales desde el diagnóstico técnico hasta la implementación, capacitación y soporte local postventa.'
    },
    {
      q: '¿Qué soluciones ofrece CR Tech en Perú?',
      a: 'Ofrecemos tres líneas principales de tecnología operativa: drones profesionales SwellPro para entornos exigentes (acuáticos, pesca, inspección y rescate), estaciones portátiles y paneles solares EcoFlow para respaldo energético comercial e industrial, e infraestructura TI que incluye cableado estructurado, fibra óptica, redes Wi-Fi empresariales, videovigilancia y soporte técnico.'
    },
    {
      q: '¿Cómo solicitar una evaluación técnica?',
      a: 'Puedes solicitar una evaluación técnica contactándonos directamente a través de nuestro botón oficial de WhatsApp o formulario de contacto. Un especialista técnico analizará los requerimientos específicos de tu empresa o proyecto para proponer la solución más eficiente, sin compromiso de compra.'
    }
  ],
  drones: [
    {
      q: '¿CR Tech representa a SwellPro en Perú?',
      a: 'Sí, CR Technologies & Services es representante oficial de SwellPro en el Perú. Garantizamos equipos 100% originales, garantía directa de fábrica, soporte técnico local capacitado, stock permanente de repuestos y accesorios originales para todos los modelos de drones marinos e impermeables.'
    },
    {
      q: '¿Para qué operaciones se utilizan los drones SwellPro?',
      a: 'Los drones SwellPro están diseñados para operaciones en entornos extremos donde la humedad o el agua inhabilitan drones convencionales. Se utilizan principalmente en pesca deportiva y comercial, búsqueda y rescate marítimo, inspección de infraestructura acuícola e industrial, monitoreo ambiental en costa, sierra y selva, y respuesta ante emergencias.'
    },
    {
      q: '¿Los drones incluyen capacitación y soporte?',
      a: 'Sí, todas nuestras entregas de equipos SwellPro incluyen una sesión de capacitación operativa presencial o virtual enfocada en el ensamblaje, calibración, técnicas de vuelo seguro, mantenimiento preventivo y protocolos de emergencia para asegurar la máxima durabilidad del equipo.'
    },
    {
      q: '¿Existen repuestos y servicio técnico en Perú?',
      a: 'Sí, disponemos de un centro de servicio técnico especializado y stock de repuestos originales en Lima. Realizamos diagnósticos, mantenimientos preventivos, reparaciones y actualizaciones de firmware para que tu dron permanezca operativo sin demoras por envíos internacionales.'
    }
  ],
  energia: [
    {
      q: '¿Qué solución EcoFlow necesito?',
      a: 'La solución ideal depende del consumo total en vatios (W) de tus equipos y las horas de respaldo requeridas. Desde estaciones compactas serie RIVER para trabajo de campo ligero hasta la serie DELTA para respaldo empresarial o industrial, analizamos tu perfil de carga para recomendar la capacidad exacta.'
    },
    {
      q: '¿EcoFlow sirve como respaldo para una empresa?',
      a: 'Sí, las estaciones EcoFlow funcionan como sistemas de alimentación ininterrumpida (EPS/UPS) con tiempos de conmutación ultrarrápidos (menores a 30 ms). Ante un corte eléctrico, mantienen operando servidores, sistemas de seguridad, computadoras y equipos críticos sin interrupciones.'
    },
    {
      q: '¿Se pueden recargar las estaciones EcoFlow con paneles solares?',
      a: 'Sí, las estaciones de energía EcoFlow cuentan con controladores de carga MPPT integrados de alta eficiencia que permiten recargarlas mediante paneles solares portátiles o rígidos, logrando autonomía energética continua en campo o ante emergencias.'
    },
    {
      q: '¿CR Tech ayuda a calcular la capacidad necesaria?',
      a: 'Sí, nuestro equipo de ingenieros y técnicos te asesora gratuitamente calculando el consumo energético de tus equipos y recomendando la combinación óptima de estación EcoFlow y paneles solares según tus horas de autonomía objetivo.'
    }
  ],
  'servicios-ti': [
    {
      q: '¿Qué servicios TI ofrece CR Tech?',
      a: 'CR Tech brinda servicios integrales de infraestructura TI para empresas: diseño e instalación de cableado estructurado Cat6A/7, enlaces de fibra óptica, redes Wi-Fi 6 empresariales, sistemas de videovigilancia IP (CCTV), ordenamiento de gabinetes/racks, respaldo de energía y soporte técnico presencial y remoto.'
    },
    {
      q: '¿La evaluación inicial tiene costo?',
      a: 'No, la primera evaluación y levantamiento técnico de información para proyectos corporativos dentro de Lima o vía remota es gratuita. Analizamos el estado de tu red e infraestructura actual para entregarte una propuesta clara y cotización detallada.'
    },
    {
      q: '¿El soporte puede ser remoto y presencial?',
      a: 'Sí, ofrecemos modalidades de soporte técnico remoto inmediato para incidencias de software y red, así como atención presencial en sitio para mantenimientos físicos, emergencias de infraestructura o instalación de nuevos equipos.'
    },
    {
      q: '¿CR Tech implementa redes, fibra y videovigilancia?',
      a: 'Sí, ejecutamos proyectos llave en mano de conectividad y seguridad electrónica, incluyendo tendido de fibra dedicada, certificación de puntos de red, montaje de cámaras de seguridad IP y configuración de equipos activos como switches y routers empresariales.'
    }
  ]
};
