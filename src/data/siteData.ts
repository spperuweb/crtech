export interface PilarItem {
  id: string;
  iconName: 'drone' | 'battery' | 'network';
  colorClass: string;
  title: string;
  description: string;
  tag: string;
  ctaText: string;
  link: string;
}

export interface DroneServiceItem {
  title: string;
  description: string;
}

export interface EcoFlowProductItem {
  id: string;
  iconName: 'battery' | 'solar' | 'backpack';
  title: string;
  description: string;
}

export interface ITServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  tag: string;
}

export interface CEOSpecialtyItem {
  id: string;
  iconName: string;
  title: string;
}

export const pilaresData: PilarItem[] = [
  {
    id: 'pilar-drones',
    iconName: 'drone',
    colorClass: 'border-t-accent-blue hover:shadow-[0_0_40px_rgba(0,131,253,0.15)]',
    title: 'Tecnología Aérea',
    description: 'Drones profesionales SwellPro, accesorios, repuestos y soporte técnico local. Representantes oficiales para Perú.',
    tag: 'SwellPro Perú',
    ctaText: 'Explorar',
    link: '#drones'
  },
  {
    id: 'pilar-energia',
    iconName: 'battery',
    colorClass: 'border-t-accent-green hover:shadow-[0_0_40px_rgba(0,200,150,0.15)]',
    title: 'Energía Autónoma',
    description: 'Power stations y paneles solares EcoFlow para operaciones en campo, sin dependencia de red eléctrica.',
    tag: 'EcoFlow Partner',
    ctaText: 'Ver soluciones',
    link: '#energia'
  },
  {
    id: 'pilar-servicios',
    iconName: 'network',
    colorClass: 'border-t-accent-cyan hover:shadow-[0_0_40px_rgba(0,195,254,0.15)]',
    title: 'Servicios TI',
    description: 'Infraestructura, ciberseguridad, automatización y consultoría tecnológica para empresas.',
    tag: 'Enterprise',
    ctaText: 'Conocer más',
    link: '#servicios'
  }
];

export const droneServicesData: DroneServiceItem[] = [
  {
    title: 'Venta de drones profesionales SwellPro',
    description: 'Modelos avanzados estancos y robustos diseñados para soportar entornos marinos y condiciones extremas.'
  },
  {
    title: 'Drones especializados para pesca deportiva e industrial',
    description: 'Equipos con sistemas de liberación de carga útil para pesca y monitoreo de recursos marinos.'
  },
  {
    title: 'Accesorios, baterías y repuestos originales',
    description: 'Stock garantizado de hélices, baterías inteligentes, controles, cámaras gimbal y maletines de transporte.'
  },
  {
    title: 'Servicio técnico y mantenimiento certificado',
    description: 'Diagnóstico computarizado, calibración y reparaciones oficiales por técnicos capacitados por la marca.'
  },
  {
    title: 'Capacitación técnica y soporte local en Perú',
    description: 'Entrenamiento de vuelo en campo, inducción teórica de mantenimiento y asesoría posventa permanente.'
  }
];

export const ecoflowProductsData: EcoFlowProductItem[] = [
  {
    id: 'eco-1',
    iconName: 'battery',
    title: 'Power Stations',
    description: 'Desde 256Wh hasta soluciones modulares de varios kWh. Carga ultrarrápida patentada X-Stream, múltiples salidas AC/DC/USB.'
  },
  {
    id: 'eco-2',
    iconName: 'solar',
    title: 'Paneles Solares Portátiles',
    description: 'Plegables, resistentes al agua y con alta eficiencia de conversión. Compatibles con toda la línea EcoFlow y equipos externos.'
  },
  {
    id: 'eco-3',
    iconName: 'backpack',
    title: 'Soluciones para Campo',
    description: 'Estaciones de recarga móviles idóneas para flotas de drones, permitiendo vuelos continuos sin límites de infraestructura.'
  }
];

export const itServicesData: ITServiceItem[] = [
  {
    id: 'ti-1',
    iconName: 'support',
    title: 'Soporte Técnico Especializado',
    description: 'Mesa de ayuda, mantenimiento preventivo/correctivo y gestión de incidentes con tiempos de respuesta garantizados.',
    tag: 'Soporte'
  },
  {
    id: 'ti-2',
    iconName: 'infrastructure',
    title: 'Infraestructura TI y Redes',
    description: 'Diseño, implementación y administración de redes LAN/WAN, wireless y cableado estructurado empresarial.',
    tag: 'Redes'
  },
  {
    id: 'ti-3',
    iconName: 'integration',
    title: 'Implementación e Integración TI',
    description: 'Integración de sistemas heterogéneos, APIs y plataformas empresariales para operaciones unificadas.',
    tag: 'Integración'
  },
  {
    id: 'ti-4',
    iconName: 'cctv',
    title: 'Videovigilancia IP',
    description: 'Sistemas de circuito cerrado, analítica de video y monitoreo remoto para instalaciones empresariales.',
    tag: 'Seguridad'
  },
  {
    id: 'ti-5',
    iconName: 'security',
    title: 'Ciberseguridad y Seguridad de Info',
    description: 'Auditoría de seguridad, gestión de riesgos TI, continuidad del negocio y protección de activos digitales.',
    tag: 'Ciberseguridad'
  },
  {
    id: 'ti-6',
    iconName: 'automation',
    title: 'Automatización de Procesos',
    description: 'Identificación y automatización de flujos críticos para reducir costos operativos y errores humanos.',
    tag: 'Automatización'
  }
];

export const ceoSpecialtiesData: CEOSpecialtyItem[] = [
  { id: 'esp-1', iconName: 'shield', title: 'Ciberseguridad' },
  { id: 'esp-2', iconName: 'chart', title: 'Gestión de Riesgos TI' },
  { id: 'esp-3', iconName: 'activity', title: 'Monitoreo & Observ.' },
  { id: 'esp-4', iconName: 'lock', title: 'Seguridad de Información' },
  { id: 'esp-5', iconName: 'fileText', title: 'Auditoría TI' },
  { id: 'esp-6', iconName: 'refresh', title: 'Continuidad del Negocio' }
];
