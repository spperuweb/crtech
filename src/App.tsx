import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import SolutionsOverview from './components/SolutionsOverview';
import MethodSection from './components/MethodSection';
import CEOSection from './components/CEOSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
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
