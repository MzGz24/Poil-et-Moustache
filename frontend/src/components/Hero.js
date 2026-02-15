import { useLanguage } from '../context/LanguageContext';
import { Calendar, Phone } from 'lucide-react';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1611173622933-91942d394b04?w=1920&q=80"
          alt="Happy pet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/95 via-[#FDFBF7]/80 to-[#FDFBF7]/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3E2723] font-['Montserrat'] leading-tight mb-6 animate-fade-in-up"
            data-testid="hero-headline"
          >
            {t.hero.headline}
          </h1>
          
          <p 
            className="text-lg md:text-xl text-[#5D4037] mb-8 animate-fade-in-up animation-delay-100"
            data-testid="hero-subheadline"
          >
            {t.hero.subheadline}
          </p>

          <a
            href="tel:8194391999"
            className="inline-flex items-center gap-3 bg-[#E91E63] text-white hover:bg-[#C2185B] rounded-full px-8 py-4 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 animate-fade-in-up animation-delay-200"
            data-testid="hero-cta-button"
          >
            <Phone className="w-5 h-5" />
            {t.hero.cta}
          </a>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FDFBF7] to-transparent z-10"></div>
    </section>
  );
}
