import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      label: t.contact.address,
      value: t.contact.addressValue,
      href: 'https://maps.google.com/?q=842+boul.+Maloney+Est,+local+4,+Gatineau,+QC,+Canada'
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: '819 439-1999',
      href: 'tel:8194391999'
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: 'poiletmoustachep@gmail.com',
      href: 'mailto:poiletmoustachep@gmail.com'
    },
    {
      icon: Clock,
      label: t.contact.hours,
      value: t.contact.hoursValue,
      href: null
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-wide uppercase text-[#8D6E63] mb-4 block">
            {t.nav.about === 'About' ? 'Get in touch' : 'Entrer en contact'}
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#3E2723] font-['Montserrat']"
            data-testid="contact-title"
          >
            {t.contact.title}
          </h2>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            const Wrapper = item.href ? 'a' : 'div';
            
            return (
              <Wrapper
                key={index}
                href={item.href}
                target={item.href?.startsWith('http') ? '_blank' : undefined}
                rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#8D6E63]/10 text-center ${
                  item.href ? 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-[#8D6E63]/30 cursor-pointer' : ''
                } transition-all duration-300`}
                data-testid={`contact-info-${index}`}
              >
                <div className="w-14 h-14 rounded-full bg-[#F8BBD9] flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#3E2723]" />
                </div>
                <h3 className="text-sm font-medium text-[#8D6E63] uppercase tracking-wide mb-2">
                  {item.label}
                </h3>
                <p className="text-[#3E2723] font-medium">
                  {item.value}
                </p>
              </Wrapper>
            );
          })}
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#8D6E63]/10 h-[300px] md:h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.123456789!2d-75.65!3d45.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI4JzEyLjAiTiA3NcKwMzknMDAuMCJX!5e0!3m2!1sen!2sca!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location map"
            className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
