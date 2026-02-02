import { useLanguage } from '../context/LanguageContext';
import { Droplets, Scissors, Sparkles, Heart } from 'lucide-react';

const serviceIcons = [Droplets, Scissors, Sparkles, Heart];
const serviceImages = [
  'https://images.unsplash.com/photo-1597603413826-cd1c06b05222?w=400&q=80',
  'https://images.unsplash.com/photo-1601428317080-25b86da29a02?w=400&q=80',
  'https://images.unsplash.com/photo-1662124778157-235dd9f10a44?w=400&q=80',
  'https://images.unsplash.com/photo-1597595735781-6a57fb8e3e3d?w=400&q=80'
];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-wide uppercase text-[#8D6E63] mb-4 block">
            {t.nav.about === 'About' ? 'What we offer' : 'Ce que nous offrons'}
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#3E2723] font-['Montserrat']"
            data-testid="services-title"
          >
            {t.services.title}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-[#8D6E63]/10 hover:border-[#8D6E63]/30 group"
                data-testid={`service-card-${index}`}
              >
                {/* Image */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 -mx-2 -mt-2">
                  <img
                    src={serviceImages[index]}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-[#FFCCBC] flex items-center justify-center mb-4 group-hover:bg-[#8D6E63] transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#3E2723] group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-[#3E2723] font-['Montserrat'] mb-2">
                  {service.name}
                </h3>
                <p className="text-[#5D4037] leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
