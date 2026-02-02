import { useLanguage } from '../context/LanguageContext';
import { Heart } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1597603413826-cd1c06b05222?w=800&q=80"
                alt="Pet grooming salon"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#8D6E63] text-white p-4 rounded-2xl shadow-lg hidden md:flex items-center gap-2">
              <Heart className="w-6 h-6 fill-current" />
              <span className="font-semibold">Avec amour</span>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <span className="text-sm font-medium tracking-wide uppercase text-[#8D6E63] mb-4 block">
              Poil et Moustache +
            </span>
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#3E2723] font-['Montserrat'] mb-6"
              data-testid="about-title"
            >
              {t.about.title}
            </h2>
            <p 
              className="text-lg text-[#5D4037] leading-relaxed mb-8"
              data-testid="about-content"
            >
              {t.about.content}
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { fr: 'Professionnalisme', en: 'Professional' },
                { fr: 'Amour des animaux', en: 'Pet lovers' },
                { fr: 'Expérience', en: 'Experience' },
                { fr: 'Soins personnalisés', en: 'Personalized care' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 text-[#5D4037]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#8D6E63]"></div>
                  <span className="font-medium">{t.nav.about === 'About' ? item.en : item.fr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
