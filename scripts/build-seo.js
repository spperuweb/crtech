import fs from 'fs';
import path from 'path';

// Load environment variables if available
const siteUrl = (process.env.VITE_SITE_URL || 'https://crtech.pe').replace(/\/$/, '');
const basePath = process.env.VITE_BASE_PATH || '/';
const isIndexable = process.env.VITE_INDEXABLE !== 'false';
const environment = process.env.VITE_ENVIRONMENT || 'production';

const prodUrl = 'https://crtech.pe';
const logoUrl = 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1782420769/CRTech_LogoHorizontal_FondoDark_zcezvt.png';
const ogImageUrl = 'https://res.cloudinary.com/drvejtepq/image/upload/f_auto,q_auto/v1785511514/CRTECH_OG_SEO_DRONES_ENERGIA_SERVICIOSTI_LQ-03_upmbkl.jpg';
const ogImageAlt = 'CR Technologies & Services: drones profesionales, energía EcoFlow y servicios TI en Perú';

const COMPANY_INFO = {
  commercialName: 'CR Technologies & Services',
  legalName: 'CR TECHNOLOGIES & SERVICES E.I.R.L.',
  ruc: '20615939791',
  phone: '+51 991 664 146',
  city: 'Lima',
  country: 'Perú',
  countryCode: 'PE',
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

const ROUTES_METADATA = {
  home: {
    cleanPath: '/',
    outDir: 'dist',
    title: 'CR Technologies & Services | Tecnología Operativa en Perú',
    description: 'Drones profesionales, energía portátil EcoFlow y servicios TI para empresas y operaciones en Perú, con asesoría, implementación y soporte local.',
    ogTitle: 'CR Technologies & Services | Tecnología que mantiene tu operación en movimiento',
    ogDescription: 'Integramos drones profesionales, energía portátil y servicios TI para mantener activas las operaciones en Perú.'
  },
  drones: {
    cleanPath: '/drones/',
    outDir: 'dist/drones',
    title: 'Drones Profesionales SwellPro en Perú | CR Tech',
    description: 'Drones impermeables SwellPro para inspección, monitoreo, pesca, rescate y trabajo de campo, con capacitación, repuestos y soporte en Perú.',
    ogTitle: 'Drones Profesionales SwellPro en Perú',
    ogDescription: 'Tecnología aérea para operaciones exigentes, con representación, capacitación, repuestos y soporte técnico local.',
    serviceType: 'Drones profesionales, capacitación y soporte técnico',
    brand: 'SwellPro'
  },
  energia: {
    cleanPath: '/energia/',
    outDir: 'dist/energia',
    title: 'EcoFlow Perú: Energía Portátil y Respaldo | CR Tech',
    description: 'Soluciones EcoFlow de energía portátil, respaldo y generación solar para hogares, empresas y trabajo de campo, con asesoría técnica en Perú.',
    ogTitle: 'EcoFlow Perú | Energía lista para responder',
    ogDescription: 'Estaciones portátiles, paneles solares y respaldo energético dimensionados para tu operación.',
    serviceType: 'Soluciones de energía portátil, respaldo y generación solar',
    brand: 'EcoFlow'
  },
  'servicios-ti': {
    cleanPath: '/serviciosti/',
    outDir: 'dist/serviciosti',
    title: 'Servicios TI e Infraestructura para Empresas | CR Tech',
    description: 'Redes, fibra óptica, soporte TI, videovigilancia y continuidad operativa para empresas en Perú, con implementación y acompañamiento técnico.',
    ogTitle: 'Servicios TI e Infraestructura para Empresas',
    ogDescription: 'Tecnología, conectividad, soporte y seguridad para operaciones que no pueden detenerse.',
    serviceType: 'Servicios TI, infraestructura, conectividad, soporte y videovigilancia'
  }
};

const FAQ_DATA = {
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

async function generateStaticFiles() {
  const rootDist = path.resolve(process.cwd(), 'dist');
  const templatePath = path.join(rootDist, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html does not exist. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');

  console.log(`[SEO Build] Environment: ${environment}`);
  console.log(`[SEO Build] Indexable: ${isIndexable}`);
  console.log(`[SEO Build] Site URL: ${siteUrl}`);
  console.log(`[SEO Build] Base Path: ${basePath}`);

  // Process each route and write index.html in corresponding output folder
  for (const [routeKey, meta] of Object.entries(ROUTES_METADATA)) {
    const prodCanonicalUrl = `${prodUrl}${meta.cleanPath}`;
    const targetDir = path.resolve(process.cwd(), meta.outDir);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const robotsContent = isIndexable
      ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
      : 'noindex,nofollow,noarchive';

    const googlebotContent = isIndexable
      ? 'index,follow,max-image-preview:large'
      : 'noindex,nofollow,noarchive';

    // Build JSON-LD Graph for this route
    const jsonLdGraph = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${prodUrl}/#organization`,
        name: COMPANY_INFO.commercialName,
        legalName: COMPANY_INFO.legalName,
        url: prodUrl,
        logo: logoUrl,
        image: ogImageUrl,
        telephone: COMPANY_INFO.phone,
        taxID: COMPANY_INFO.ruc,
        areaServed: { '@type': 'AdministrativeArea', name: COMPANY_INFO.country },
        address: { '@type': 'PostalAddress', addressLocality: COMPANY_INFO.city, addressCountry: COMPANY_INFO.countryCode },
        knowsAbout: COMPANY_INFO.knowsAbout
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${prodUrl}/#website`,
        url: prodUrl,
        name: COMPANY_INFO.commercialName,
        publisher: { '@id': `${prodUrl}/#organization` },
        inLanguage: 'es-PE'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${prodCanonicalUrl}#webpage`,
        url: prodCanonicalUrl,
        name: meta.title,
        description: meta.description,
        isPartOf: { '@id': `${prodUrl}/#website` },
        inLanguage: 'es-PE'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: routeKey === 'home'
          ? [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: prodUrl }]
          : [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: prodUrl },
              { '@type': 'ListItem', position: 2, name: meta.title.split('|')[0].trim(), item: prodCanonicalUrl }
            ]
      }
    ];

    if (routeKey !== 'home' && meta.serviceType) {
      const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${prodCanonicalUrl}#service`,
        name: meta.title.split('|')[0].trim(),
        serviceType: meta.serviceType,
        provider: { '@id': `${prodUrl}/#organization` },
        areaServed: { '@type': 'AdministrativeArea', name: COMPANY_INFO.country },
        url: prodCanonicalUrl
      };
      if (meta.brand) {
        serviceSchema.brand = { '@type': 'Brand', name: meta.brand };
      }
      jsonLdGraph.push(serviceSchema);
    }

    const faqs = FAQ_DATA[routeKey];
    if (faqs && faqs.length > 0) {
      jsonLdGraph.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      });
    }

    const headTags = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta name="author" content="${COMPANY_INFO.legalName}" />
    <meta name="theme-color" content="#07162f" />
    <meta name="robots" content="${robotsContent}" />
    <meta name="googlebot" content="${googlebotContent}" />
    <link rel="canonical" href="${prodCanonicalUrl}" />
    <link rel="alternate" hreflang="es-PE" href="${prodCanonicalUrl}" />
    <link rel="alternate" hreflang="x-default" href="${prodCanonicalUrl}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_PE" />
    <meta property="og:site_name" content="${COMPANY_INFO.commercialName}" />
    <meta property="og:title" content="${meta.ogTitle}" />
    <meta property="og:description" content="${meta.ogDescription}" />
    <meta property="og:url" content="${prodCanonicalUrl}" />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta property="og:image:secure_url" content="${ogImageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="${ogImageAlt}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.ogTitle}" />
    <meta name="twitter:description" content="${meta.ogDescription}" />
    <meta name="twitter:image" content="${ogImageUrl}" />

    <!-- Structured Data -->
    <script type="application/ld+json">
${JSON.stringify({ '@graph': jsonLdGraph }, null, 2)}
    </script>
    `;

    // Replace <title> and existing meta tags in <head>
    let pageHtml = baseHtml;
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, '');
    pageHtml = pageHtml.replace(/<meta name="description"[\s\S]*?>/i, '');
    pageHtml = pageHtml.replace(/<meta property="og:title"[\s\S]*?>/i, '');
    pageHtml = pageHtml.replace(/<meta property="og:description"[\s\S]*?>/i, '');
    pageHtml = pageHtml.replace(/<meta property="og:image"[\s\S]*?>/i, '');

    pageHtml = pageHtml.replace('</head>', `${headTags}\n</head>`);

    const outFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(outFile, pageHtml, 'utf-8');
    console.log(`[SEO Build] Rendered: ${outFile}`);
  }

  // Generate 404.html for GitHub Pages fallback
  const fourOhFourHtml = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Página no encontrada | CR Technologies & Services</title>
    <meta name="robots" content="noindex,nofollow,noarchive" />
    <style>
      body { font-family: system-ui, -apple-system, sans-serif; background: #07162f; color: #ffffff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
      .container { max-width: 480px; padding: 32px; }
      h1 { font-size: 32px; margin-bottom: 12px; color: #0083fd; }
      p { color: #94a3b8; font-size: 16px; margin-bottom: 24px; }
      a { display: inline-block; background: #0083fd; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; }
    </style>
    <script>
      (function() {
        var path = window.location.pathname;
        var base = "${basePath.endsWith('/') ? basePath.slice(0, -1) : basePath}";
        if (path.indexOf(base) === 0) {
          var rel = path.substring(base.length);
          if (rel === '/drones' || rel === '/drones/') { window.location.replace(base + '/drones/'); return; }
          if (rel === '/energia' || rel === '/energia/') { window.location.replace(base + '/energia/'); return; }
          if (rel === '/serviciosti' || rel === '/serviciosti/' || rel === '/servicios-ti') { window.location.replace(base + '/serviciosti/'); return; }
        }
      })();
    </script>
  </head>
  <body>
    <div class="container">
      <h1>404</h1>
      <p>La página que buscas no existe o ha sido movida.</p>
      <a href="${basePath}">Volver al inicio</a>
    </div>
  </body>
</html>`;

  fs.writeFileSync(path.join(rootDist, '404.html'), fourOhFourHtml, 'utf-8');
  console.log(`[SEO Build] Rendered: ${path.join(rootDist, '404.html')}`);

  // Generate CNAME for GitHub Pages custom domain
  if (siteUrl.includes('crtech.pe')) {
    fs.writeFileSync(path.join(rootDist, 'CNAME'), 'crtech.pe\n', 'utf-8');
    console.log(`[SEO Build] Generated: ${path.join(rootDist, 'CNAME')}`);
  }

  // Generate robots.txt
  let robotsTxtContent = '';
  if (isIndexable) {
    robotsTxtContent = `User-agent: *\nAllow: /\n\nSitemap: ${prodUrl}/sitemap.xml\n`;
  } else {
    robotsTxtContent = `User-agent: *\nAllow: /\n`;
  }

  fs.writeFileSync(path.join(rootDist, 'robots.txt'), robotsTxtContent, 'utf-8');
  console.log(`[SEO Build] Generated: ${path.join(rootDist, 'robots.txt')}`);

  // Generate sitemap.xml
  if (isIndexable) {
    const today = new Date().toISOString().split('T')[0];
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${prodUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${prodUrl}/drones/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${prodUrl}/energia/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${prodUrl}/serviciosti/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    fs.writeFileSync(path.join(rootDist, 'sitemap.xml'), sitemapXml, 'utf-8');
    console.log(`[SEO Build] Generated: ${path.join(rootDist, 'sitemap.xml')}`);
  } else {
    // If preview, ensure no production sitemap is published in preview build
    const sitemapFile = path.join(rootDist, 'sitemap.xml');
    if (fs.existsSync(sitemapFile)) {
      fs.unlinkSync(sitemapFile);
    }
  }

  console.log('[SEO Build] Static SEO Generation Completed Successfully!');
}

generateStaticFiles().catch((err) => {
  console.error('[SEO Build Error]', err);
  process.exit(1);
});
