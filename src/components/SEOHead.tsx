import React, { useEffect } from 'react';
import {
  getSeoEnv,
  COMPANY_INFO,
  ROUTES_METADATA,
  FAQ_DATA
} from '../config/seo.config';
import { RouteKey } from '../utils/navigation';

interface SEOHeadProps {
  currentRoute: RouteKey;
}

export default function SEOHead({ currentRoute }: SEOHeadProps) {
  useEffect(() => {
    const { isIndexable } = getSeoEnv();
    const routeMeta = ROUTES_METADATA[currentRoute] || ROUTES_METADATA.home;

    // 1. Production Canonical URL (always uses https://crtech.pe)
    const prodCanonicalUrl = `${COMPANY_INFO.prodUrl}${routeMeta.cleanPath}`;

    // Update Document Title
    document.title = routeMeta.title;

    // Helper to set or create a <meta> tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set or create a <link> tag
    const setLinkTag = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (hreflang) element.setAttribute('hreflang', hreflang);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // General Meta Tags
    setMetaTag('name', 'description', routeMeta.description);
    setMetaTag('name', 'author', COMPANY_INFO.legalName);
    setMetaTag('name', 'theme-color', '#07162f');

    // Robots & Googlebot Control
    if (isIndexable) {
      setMetaTag('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
      setMetaTag('name', 'googlebot', 'index,follow,max-image-preview:large');
    } else {
      setMetaTag('name', 'robots', 'noindex,nofollow,noarchive');
      setMetaTag('name', 'googlebot', 'noindex,nofollow,noarchive');
    }

    // Canonical & Hreflang Tags
    setLinkTag('canonical', prodCanonicalUrl);
    setLinkTag('alternate', prodCanonicalUrl, 'es-PE');
    setLinkTag('alternate', prodCanonicalUrl, 'x-default');

    // Open Graph Tags
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:locale', 'es_PE');
    setMetaTag('property', 'og:site_name', COMPANY_INFO.commercialName);
    setMetaTag('property', 'og:title', routeMeta.ogTitle);
    setMetaTag('property', 'og:description', routeMeta.ogDescription);
    setMetaTag('property', 'og:url', prodCanonicalUrl);
    setMetaTag('property', 'og:image', COMPANY_INFO.ogImageUrl);
    setMetaTag('property', 'og:image:secure_url', COMPANY_INFO.ogImageUrl);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:type', 'image/jpeg');
    setMetaTag('property', 'og:image:alt', COMPANY_INFO.ogImageAlt);

    // Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', routeMeta.ogTitle);
    setMetaTag('name', 'twitter:description', routeMeta.ogDescription);
    setMetaTag('name', 'twitter:image', COMPANY_INFO.ogImageUrl);

    // 2. Build JSON-LD Structured Data
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${COMPANY_INFO.prodUrl}/#organization`,
      name: COMPANY_INFO.commercialName,
      legalName: COMPANY_INFO.legalName,
      url: COMPANY_INFO.prodUrl,
      logo: COMPANY_INFO.logoUrl,
      image: COMPANY_INFO.ogImageUrl,
      telephone: COMPANY_INFO.phone,
      taxID: COMPANY_INFO.ruc,
      areaServed: {
        '@type': 'AdministrativeArea',
        name: COMPANY_INFO.country
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: COMPANY_INFO.city,
        addressCountry: COMPANY_INFO.countryCode
      },
      knowsAbout: COMPANY_INFO.knowsAbout
    };

    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${COMPANY_INFO.prodUrl}/#website`,
      url: COMPANY_INFO.prodUrl,
      name: COMPANY_INFO.commercialName,
      publisher: {
        '@id': `${COMPANY_INFO.prodUrl}/#organization`
      },
      inLanguage: 'es-PE'
    };

    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${prodCanonicalUrl}#webpage`,
      url: prodCanonicalUrl,
      name: routeMeta.title,
      description: routeMeta.description,
      isPartOf: {
        '@id': `${COMPANY_INFO.prodUrl}/#website`
      },
      inLanguage: 'es-PE'
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: currentRoute === 'home'
        ? [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: COMPANY_INFO.prodUrl
            }
          ]
        : [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: COMPANY_INFO.prodUrl
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: routeMeta.title.split('|')[0].trim(),
              item: prodCanonicalUrl
            }
          ]
    };

    const jsonLdGraph: any[] = [organizationSchema, websiteSchema, webPageSchema, breadcrumbSchema];

    // Service Schema for sub-landings
    if (currentRoute !== 'home' && routeMeta.serviceType) {
      const serviceSchema: any = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${prodCanonicalUrl}#service`,
        name: routeMeta.title.split('|')[0].trim(),
        serviceType: routeMeta.serviceType,
        provider: {
          '@id': `${COMPANY_INFO.prodUrl}/#organization`
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: COMPANY_INFO.country
        },
        url: prodCanonicalUrl
      };

      if (routeMeta.brand) {
        serviceSchema.brand = {
          '@type': 'Brand',
          name: routeMeta.brand
        };
      }

      jsonLdGraph.push(serviceSchema);
    }

    // FAQPage Schema
    const faqs = FAQ_DATA[currentRoute];
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a
          }
        }))
      };
      jsonLdGraph.push(faqSchema);
    }

    // Inject JSON-LD script into head
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify({ '@graph': jsonLdGraph }, null, 2);

  }, [currentRoute]);

  return null;
}
