import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { Calendar, Send, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export function BookingForm() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    petName: '',
    petType: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/bookings`, {
        ...formData,
        language
      });

      setIsSuccess(true);
      toast.success(t.booking.success);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          petName: '',
          petType: '',
          service: '',
          date: '',
          time: '',
          notes: ''
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(t.booking.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const petTypes = Object.entries(t.booking.petTypes);
  const services = t.booking.services;

  return (
    <section id="booking" className="py-20 md:py-28 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Info */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-medium tracking-wide uppercase text-[#8D6E63] mb-4 block">
              {language === 'fr' ? 'Réservation' : 'Booking'}
            </span>
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#3E2723] font-['Montserrat'] mb-6"
              data-testid="booking-title"
            >
              {t.booking.title}
            </h2>
            <p className="text-lg text-[#5D4037] mb-8">
              {language === 'fr' 
                ? 'Remplissez le formulaire ci-dessous et nous vous contacterons pour confirmer votre rendez-vous.'
                : 'Fill out the form below and we will contact you to confirm your appointment.'}
            </p>

            {/* Image */}
            <div className="hidden lg:block aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1597595735781-6a57fb8e3e3d?w=800&q=80"
                alt="Pet grooming"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#8D6E63]/10">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#3E2723] font-['Montserrat'] mb-4">
                  {language === 'fr' ? 'Merci!' : 'Thank you!'}
                </h3>
                <p className="text-[#5D4037]">{t.booking.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-[#3E2723] font-medium mb-2 block">
                      {t.booking.name} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border-[#8D6E63]/20 bg-white px-4 py-3 text-[#3E2723] focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20 transition-all"
                      data-testid="booking-name-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-[#3E2723] font-medium mb-2 block">
                      {t.booking.phone} *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border-[#8D6E63]/20 bg-white px-4 py-3 text-[#3E2723] focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20 transition-all"
                      data-testid="booking-phone-input"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#3E2723] font-medium mb-2 block">
                    {t.booking.email} *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-[#8D6E63]/20 bg-white px-4 py-3 text-[#3E2723] focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20 transition-all"
                    data-testid="booking-email-input"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petName" className="text-[#3E2723] font-medium mb-2 block">
                      {t.booking.petName} *
                    </Label>
                    <Input
                      id="petName"
                      name="petName"
                      value={formData.petName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border-[#8D6E63]/20 bg-white px-4 py-3 text-[#3E2723] focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20 transition-all"
                      data-testid="booking-petname-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="petType" className="text-[#3E2723] font-medium mb-2 block">
                      {t.booking.petType} *
                    </Label>
                    <Select 
                      value={formData.petType} 
                      onValueChange={(value) => handleSelectChange('petType', value)}
                      required
                    >
                      <SelectTrigger 
                        className="w-full rounded-lg border-[#8D6E63]/20 bg-white px-4 py-3 text-[#3E2723] focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20"
                        data-testid="booking-pettype-select"
                      >
                        <SelectValue placeholder={language === 'fr' ? 'Sélectionner' : 'Select'} />
                      </SelectTrigger>
                      <SelectContent>
                        {petTypes.map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="service" className="text-[#3E2723] font-medium mb-2 block">
                    {t.booking.service} *
                  </Label>
                  <Select 
                    value={formData.service} 
                    onValueChange={(value) => handleSelectChange('service', value)}
                    required
                  >
                    <SelectTrigger 
                      className="w-full rounded-lg border-[#8D6E63]/20 bg-white px-4 py-3 text-[#3E2723] focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20"
                      data-testid="booking-service-select"
                    >
                      <SelectValue placeholder={language === 'fr' ? 'Sélectionner' : 'Select'} />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service, index) => (
                        <SelectItem key={index} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-[#3E2723] font-medium mb-2 block">
                      {t.booking.date} *
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-lg border-[#8D6E63]/20 bg-white px-4 py-3 text-[#3E2723] focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20 transition-all"
                      data-testid="booking-date-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-[#3E2723] font-medium mb-2 block">
                      {t.booking.time} *
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border-[#8D6E63]/20 bg-white px-4 py-3 text-[#3E2723] focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20 transition-all"
                      data-testid="booking-time-input"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-[#3E2723] font-medium mb-2 block">
                    {t.booking.notes}
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-lg border-[#8D6E63]/20 bg-white px-4 py-3 text-[#3E2723] focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20 transition-all resize-none"
                    data-testid="booking-notes-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-[#E91E63] text-white hover:bg-[#C2185B] rounded-full px-8 py-4 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  data-testid="booking-submit-button"
                >
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.booking.submit}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
