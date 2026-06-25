import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = ['hero', 'pilares', 'drones', 'energia', 'servicios', 'ceo', 'contacto'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Inicio', target: 'hero' },
    { name: 'Soluciones', target: 'pilares' },
    { name: 'Drones', target: 'drones' },
    { name: 'Energía', target: 'energia' },
    { name: 'Servicios TI', target: 'servicios' },
    { name: 'CEO', target: 'ceo' },
    { name: 'Contacto', target: 'contacto' }
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'glassmorphism border-b border-[rgba(0,131,253,0.15)] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo Section */}
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src={
              isScrolled
                ? 'https://res.cloudinary.com/drvejtepq/image/upload/v1782419695/CRTech_LogoHorizontal_BackLight_leqyyi.png'
                : 'https://res.cloudinary.com/drvejtepq/image/upload/v1782420769/CRTech_LogoHorizontal_FondoDark_zcezvt.png'
            }
            alt="CR Technologies Logo"
            className="h-10 md:h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.target;
            const linkColorClass = isScrolled
              ? isActive
                ? 'text-[var(--color-accent-blue)] font-bold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              : isActive
                ? 'text-[#00c3fe] font-bold'
                : 'text-slate-200 hover:text-white';

            return (
              <button
                key={link.target}
                onClick={() => handleScrollTo(link.target)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer relative py-1.5 ${linkColorClass}`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${
                    isScrolled ? 'bg-[var(--color-accent-blue)]' : 'bg-[#00c3fe]'
                  } ${isActive ? 'w-full' : 'w-0'}`}
                />
              </button>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <button
            onClick={() => handleScrollTo('contacto')}
            className={`cursor-pointer font-semibold text-sm py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
              isScrolled
                ? 'bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] text-white hover:shadow-[0_8px_20px_rgba(0,92,230,0.2)]'
                : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm'
            }`}
          >
            Cotizar solución
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-1 transition-colors cursor-pointer ${
            isScrolled
              ? 'text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)]'
              : 'text-white hover:text-[#00c3fe]'
          }`}
          aria-label="Abrir menú"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-[var(--color-bg-section)] border-b border-[var(--color-border)] ${
          isOpen ? 'max-height-screen opacity-100 py-6 px-6' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: isOpen ? '400px' : '0px' }}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleScrollTo(link.target)}
              className={`text-left text-base font-medium py-2 border-b border-[var(--color-border)] transition-colors ${
                activeSection === link.target
                  ? 'text-[var(--color-accent-blue)] pl-2 border-l-2 border-l-[var(--color-accent-blue)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleScrollTo('contacto')}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] text-white font-bold py-3 px-6 rounded-xl mt-4"
          >
            Cotizar solución <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}
