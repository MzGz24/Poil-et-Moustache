import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'reviews', label: language === 'fr' ? 'Avis' : 'Reviews' },
    { id: 'booking', label: t.nav.booking },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-[#8D6E63]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 group"
            data-testid="header-logo"
          >
            <span className="text-xl md:text-2xl font-bold text-[#3E2723] font-['Montserrat'] group-hover:text-[#8D6E63] transition-colors">
              Poil et Moustache +
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[#5D4037] hover:text-[#8D6E63] font-medium transition-colors duration-200"
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#8D6E63] text-[#8D6E63] hover:bg-[#8D6E63] hover:text-white transition-all duration-300 font-semibold"
              data-testid="language-toggle"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#3E2723] hover:text-[#8D6E63] transition-colors"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#8D6E63]/10 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-3 px-4 text-[#5D4037] hover:text-[#8D6E63] hover:bg-[#8D6E63]/5 rounded-lg font-medium transition-all duration-200"
                  data-testid={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
