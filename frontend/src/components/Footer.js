import { useLanguage } from '../context/LanguageContext';
import { Facebook, Heart } from 'lucide-react';

export function Footer() {
  const { t, language } = useLanguage();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
    <footer className="bg-[#3E2723] text-[#FFCCBC]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Info */}
          <div>
            <h3 className="text-2xl font-bold text-white font-['Montserrat'] mb-4">
              Poil et Moustache +
            </h3>
            <p className="text-[#D7CCC8] mb-6 leading-relaxed">
              {t.nav.about === 'About' 
                ? 'Professional pet grooming services in Gatineau, QC. We treat your pets like family.'
                : 'Services de toilettage professionnel pour animaux à Gatineau, QC. Nous traitons vos animaux comme notre famille.'}
            </p>
            {/* Social */}
            <div>
              <span className="text-sm font-medium uppercase tracking-wide text-[#8D6E63] mb-3 block">
                {t.footer.followUs}
              </span>
              <a
                href="https://www.facebook.com/share/1GHgKQAyaJ/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#8D6E63]/20 hover:bg-[#8D6E63]/40 rounded-full px-5 py-3 transition-colors duration-300"
                data-testid="footer-facebook-link"
              >
                <Facebook className="w-5 h-5" />
                <span className="font-medium">Facebook</span>
                <span className="text-sm text-[#D7CCC8]">• 737 followers</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-white font-['Montserrat'] mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-[#D7CCC8] hover:text-white transition-colors duration-200"
                  data-testid={`footer-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white font-['Montserrat'] mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-[#D7CCC8]">
              <p>842 boul. Maloney Est, local 4</p>
              <p>Gatineau, QC, Canada</p>
              <p>
                <a href="tel:8194391999" className="hover:text-white transition-colors">
                  819 439-1999
                </a>
              </p>
              <p>
                <a href="mailto:poiletmoustachep@gmail.com" className="hover:text-white transition-colors">
                  poiletmoustachep@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#8D6E63]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#8D6E63]">
            <p>{t.footer.rights}</p>
            <p className="flex items-center gap-1">
              {t.nav.about === 'About' ? 'Made with' : 'Fait avec'}
              <Heart className="w-4 h-4 text-[#FFCCBC] fill-current" />
              {t.nav.about === 'About' ? 'for pets' : 'pour les animaux'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
