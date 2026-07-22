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

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'drones'>(() => {
    return window.location.hash.startsWith('#/drones') ? 'drones' : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const isDrones = window.location.hash.startsWith('#/drones');
      setCurrentRoute(isDrones ? 'drones' : 'home');
      if (isDrones) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentRoute === 'drones') {
    return <DronesLanding />;
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
