import { useLanguage } from '../context/LanguageContext';
import { Calendar } from 'lucide-react';

export function CTA() {
  const { t } = useLanguage();

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#3E2723] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#8D6E63]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8D6E63]/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-['Montserrat'] mb-6"
          data-testid="cta-headline"
        >
          {t.cta.headline}
        </h2>
        <p 
          className="text-lg md:text-xl text-[#FFCCBC] mb-10"
          data-testid="cta-subheadline"
        >
          {t.cta.subheadline}
        </p>
        <button
          onClick={scrollToBooking}
          className="inline-flex items-center gap-3 bg-[#FFCCBC] text-[#3E2723] hover:bg-white rounded-full px-10 py-4 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          data-testid="cta-button"
        >
          <Calendar className="w-5 h-5" />
          {t.cta.button}
        </button>
      </div>
    </section>
  );
}
