/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pilares from './components/Pilares';
import Drones from './components/Drones';
import Marcas from './components/Marcas';
import Energia from './components/Energia';
import ServiciosTI from './components/ServiciosTI';
import Respaldo from './components/Respaldo';
import CEO from './components/CEO';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  useEffect(() => {
    // base intersection observer pattern for scroll reveal transitions
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    // Cleanup observer on unmount
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] overflow-x-hidden selection:bg-[var(--color-accent-blue)]/10 selection:text-[var(--color-accent-blue)]">
      {/* SECCIÓN 0 — NAVBAR */}
      <Navbar />

      <main>
        {/* SECCIÓN 1 — HERO */}
        <Hero />

        {/* SECCIÓN 2 — TRES PILARES */}
        <Pilares />

        {/* SECCIÓN 3 — DRONES PROFESIONALES */}
        <Drones />

        {/* SECCIÓN 4 — ENERGÍA PORTÁTIL */}
        <Energia />

        {/* SECCIÓN 5 — SERVICIOS TI ESPECIALIZADOS */}
        <ServiciosTI />

        {/* SECCIÓN 6 — MARCAS REPRESENTADAS */}
        <Marcas />

        {/* SECCIÓN 7 — CONFIANZA Y RESPALDO INSTITUCIONAL */}
        <Respaldo />

        {/* SECCIÓN 8 — PERFIL CEO */}
        <CEO />

        {/* SECCIÓN 9 — CONTACTO / CTA GLOBAL */}
        <Contacto />
      </main>

      {/* SECCIÓN 10 — FOOTER */}
      <Footer />

      {/* Floating WhatsApp Chat & Support widget with synthesized pop sound */}
      <WhatsAppWidget />
    </div>
  );
}
