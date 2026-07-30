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

type RouteType = 'home' | 'drones' | 'energia' | 'servicios-ti';

function getRouteFromLocation(): RouteType {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path.includes('/drones') || hash.includes('drones')) {
    return 'drones';
  }
  if (path.includes('/energia') || hash.includes('energia')) {
    return 'energia';
  }
  if (path.includes('servicio') || hash.includes('servicio')) {
    return 'servicios-ti';
  }
  return 'home';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteType>(getRouteFromLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      const route = getRouteFromLocation();
      setCurrentRoute(route);

      // Handle anchor scrolling if hash is present
      if (window.location.hash && window.location.hash.length > 1) {
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

  // Global click interceptor for internal routing links without page reload
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Only intercept internal application routes
      if (
        href.startsWith('/crtech') ||
        href.startsWith('/drones') ||
        href.startsWith('/energia') ||
        href.startsWith('/serviciosti') ||
        href.startsWith('/servicios-ti')
      ) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <>
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

