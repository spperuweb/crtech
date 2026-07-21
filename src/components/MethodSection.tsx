import React from 'react';

export default function MethodSection() {
  const steps = [
    {
      num: '01',
      title: 'Diagnóstico',
      desc: 'Analizamos los requerimientos del entorno real, las condiciones del terreno y los objetivos operativos de tu equipo.'
    },
    {
      num: '02',
      title: 'Selección',
      desc: 'Filtramos la tecnología óptima: drones idóneos, potencia energética necesaria o arquitectura de red correcta.'
    },
    {
      num: '03',
      title: 'Implementación',
      desc: 'Realizamos pruebas de campo, configuraciones personalizadas y capacitación técnica para asegurar la operatividad.'
    },
    {
      num: '04',
      title: 'Soporte',
      desc: 'Acompañamiento continuo con mantenimiento local rápido, stock de repuestos y criterio técnico especializado.'
    }
  ];

  return (
    <section className="method-section" id="metodo">
      <div className="section-container">
        
        <div className="section-header-centered">
          <span className="section-subtitle">Nuestro Proceso</span>
          <h2 className="section-title">
            Tecnología bien elegida. <span className="highlight-text">Correctamente implementada.</span>
          </h2>
        </div>

        <div className="steps-flow-container">
          {/* Connector line for desktop */}
          <div className="flow-connector-line" aria-hidden="true"></div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card" key={step.num}>
                <div className="step-num-badge">
                  <span className="step-num">{step.num}</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.desc}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="mobile-step-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
