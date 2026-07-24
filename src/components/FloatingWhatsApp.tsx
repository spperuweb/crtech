import React from 'react';

interface FloatingWhatsAppProps {
  currentRoute: 'home' | 'drones' | 'energia' | 'servicios-ti';
}

const PHONE_NUMBER = '51991664146';

const ROUTE_MESSAGES: Record<FloatingWhatsAppProps['currentRoute'], string> = {
  home: 'Hola, quisiera recibir asesoría para identificar la solución tecnológica adecuada para mi operación.',
  drones: 'Hola, quisiera recibir asesoría sobre drones profesionales.',
  energia: 'Hola, quisiera dimensionar una solución EcoFlow para mi operación.',
  'servicios-ti': 'Hola, quisiera solicitar una evaluación de infraestructura y servicios TI.',
};

export default function FloatingWhatsApp({ currentRoute }: FloatingWhatsAppProps) {
  const message = ROUTE_MESSAGES[currentRoute] || ROUTE_MESSAGES.home;
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="floating-whatsapp-container">
      <span className="floating-whatsapp-tooltip">Asesoría Directa CRTech</span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Hablar por WhatsApp con un especialista de CRTech"
      >
        <svg
          className="floating-whatsapp-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 2a10 10 0 0 0-8.52 15.242L2 22l4.896-1.442A10 10 0 1 0 12 2zm0 18a7.95 7.95 0 0 1-4.068-1.121l-.292-.174-2.898.853.868-2.825-.191-.301A7.953 7.953 0 1 1 12 20z" />
        </svg>
        <span className="floating-whatsapp-label">WhatsApp</span>
      </a>
    </div>
  );
}

