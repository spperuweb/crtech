import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import SolutionsOverview from './components/SolutionsOverview';
import MethodSection from './components/MethodSection';
import CEOSection from './components/CEOSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import DronesLanding from './components/DronesLanding';
import EcoFlowLanding from './components/EcoFlowLanding';

type RouteType = 'home' | 'drones' | 'energia' | 'servicios-ti';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteType>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/drones')) return 'drones';
    if (hash.startsWith('#/energia')) return 'energia';
    if (hash.startsWith('#/servicios-ti')) return 'servicios-ti';
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      let route: RouteType = 'home';
      if (hash.startsWith('#/drones')) route = 'drones';
      else if (hash.startsWith('#/energia')) route = 'energia';
      else if (hash.startsWith('#/servicios-ti')) route = 'servicios-ti';
      
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentRoute === 'drones') {
    return <DronesLanding />;
  }

  if (currentRoute === 'energia') {
    return <EcoFlowLanding />;
  }

  return (
    <div className="app-wrapper">
      <Header />
      <main id="main-content-flow">
        <Hero />
        <TrustStrip />
        <SolutionsOverview />
        <MethodSection />
        <CEOSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
