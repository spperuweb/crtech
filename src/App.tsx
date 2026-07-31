import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import SolutionsOverview from './components/SolutionsOverview';
import RealEvidenceSection from './components/RealEvidenceSection';
import MethodSection from './components/MethodSection';
import CEOSection from './components/CEOSection';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import DronesLanding from './components/DronesLanding';
import EcoFlowLanding from './components/EcoFlowLanding';
import ServiciosTILanding from './components/ServiciosTILanding';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import SEOHead from './components/SEOHead';
import { getCurrentRouteKey, handleLegacyHashRedirect, RouteKey } from './utils/navigation';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteKey>(() => {
    handleLegacyHashRedirect();
    return getCurrentRouteKey();
  });

  useEffect(() => {
    // Check legacy hash redirect on mount
    handleLegacyHashRedirect();

    const handleLocationChange = () => {
      const route = getCurrentRouteKey();
      setCurrentRoute(route);

      // Handle anchor scrolling if hash is present (e.g. #faq or #contacto)
      if (window.location.hash && !window.location.hash.startsWith('#/')) {
        const targetId = window.location.hash.substring(1);
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Global click interceptor for internal routing links without full page reload
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore external or mailto/tel links
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      // Handle section anchors on same page
      if (href.startsWith('#') && !href.startsWith('#/')) {
        return;
      }

      // Only intercept internal application routes
      e.preventDefault();
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <>
      <SEOHead currentRoute={currentRoute} />
      {currentRoute === 'drones' && <DronesLanding />}
      {currentRoute === 'energia' && <EcoFlowLanding />}
      {currentRoute === 'servicios-ti' && <ServiciosTILanding />}
      {currentRoute === 'home' && (
        <div className="app-wrapper">
          <Header currentRoute="home" />
          <main id="main-content-flow">
            <Hero />
            <TrustStrip />
            <SolutionsOverview />
            <RealEvidenceSection />
            <MethodSection />
            <CEOSection />
            <FAQSection />
            <FinalCTA />
          </main>
          <Footer />
        </div>
      )}
      <FloatingWhatsApp currentRoute={currentRoute} />
    </>
  );
}


