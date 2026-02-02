import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  fr: {
    nav: {
      about: 'À Propos',
      services: 'Services',
      gallery: 'Galerie',
      booking: 'Réservation',
      contact: 'Contact'
    },
    hero: {
      headline: 'Un service de toilettage attentionné pour le bien-être de vos animaux',
      subheadline: '842 boul. Maloney Est, local 4, Gatineau | 819 439-1999',
      cta: 'Prendre rendez-vous'
    },
    about: {
      title: 'À Propos de Nous',
      content: 'Poil et Moustache +, dirigé par Valérie Trépanier, offre un toilettage attentionné pour vos animaux avec amour et professionnalisme. Notre équipe dévouée s\'assure que chaque visite soit une expérience agréable pour votre compagnon à quatre pattes.'
    },
    services: {
      title: 'Nos Services',
      items: [
        { name: 'Bain et coupe', description: 'Nettoyage complet et coupe soignée pour garder votre animal propre et élégant.' },
        { name: 'Coupe des griffes', description: 'Entretien des griffes pour le confort et la santé de votre animal.' },
        { name: 'Toilettage complet', description: 'Service complet incluant bain, coupe, brossage et finition professionnelle.' },
        { name: 'Soins spéciaux', description: 'Traitements adaptés aux besoins particuliers de votre animal.' }
      ]
    },
    gallery: {
      title: 'Notre Galerie'
    },
    booking: {
      title: 'Réserver un Rendez-vous',
      name: 'Votre nom',
      phone: 'Téléphone',
      email: 'Courriel',
      petName: 'Nom de l\'animal',
      petType: 'Type d\'animal',
      petTypes: { dog: 'Chien', cat: 'Chat', other: 'Autre' },
      service: 'Service souhaité',
      services: ['Bain et coupe', 'Coupe des griffes', 'Toilettage complet', 'Soins spéciaux'],
      date: 'Date souhaitée',
      time: 'Heure souhaitée',
      notes: 'Notes additionnelles',
      submit: 'Envoyer la demande',
      success: 'Votre demande a été envoyée avec succès! Nous vous contacterons bientôt.',
      error: 'Une erreur s\'est produite. Veuillez réessayer.'
    },
    contact: {
      title: 'Contactez-nous',
      address: 'Adresse',
      addressValue: '842 boul. Maloney Est, local 4, Gatineau, QC, Canada',
      phone: 'Téléphone',
      email: 'Courriel',
      hours: 'Heures d\'ouverture',
      hoursValue: 'Lundi - Samedi: 9h - 17h'
    },
    cta: {
      headline: 'Offrez à votre animal le toilettage qu\'il mérite!',
      subheadline: 'Prenez rendez-vous dès aujourd\'hui.',
      button: 'Prendre rendez-vous'
    },
    footer: {
      followUs: 'Suivez-nous',
      rights: '© 2024 Poil et Moustache +. Tous droits réservés.'
    }
  },
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      gallery: 'Gallery',
      booking: 'Booking',
      contact: 'Contact'
    },
    hero: {
      headline: 'Caring grooming services for your pets\' well-being',
      subheadline: '842 Maloney Blvd East, Suite 4, Gatineau | 819 439-1999',
      cta: 'Book an Appointment'
    },
    about: {
      title: 'About Us',
      content: 'Poil et Moustache +, run by Valérie Trépanier, provides caring grooming for your pets with love and professionalism. Our dedicated team ensures every visit is a pleasant experience for your four-legged companion.'
    },
    services: {
      title: 'Our Services',
      items: [
        { name: 'Bath & Haircut', description: 'Complete cleaning and careful cut to keep your pet clean and elegant.' },
        { name: 'Nail Trimming', description: 'Nail care for your pet\'s comfort and health.' },
        { name: 'Full Grooming', description: 'Complete service including bath, cut, brushing and professional finishing.' },
        { name: 'Special Care', description: 'Treatments adapted to your pet\'s special needs.' }
      ]
    },
    gallery: {
      title: 'Our Gallery'
    },
    booking: {
      title: 'Book an Appointment',
      name: 'Your name',
      phone: 'Phone',
      email: 'Email',
      petName: 'Pet name',
      petType: 'Pet type',
      petTypes: { dog: 'Dog', cat: 'Cat', other: 'Other' },
      service: 'Desired service',
      services: ['Bath & Haircut', 'Nail Trimming', 'Full Grooming', 'Special Care'],
      date: 'Preferred date',
      time: 'Preferred time',
      notes: 'Additional notes',
      submit: 'Send request',
      success: 'Your request has been sent successfully! We will contact you soon.',
      error: 'An error occurred. Please try again.'
    },
    contact: {
      title: 'Contact Us',
      address: 'Address',
      addressValue: '842 Maloney Blvd East, Suite 4, Gatineau, QC, Canada',
      phone: 'Phone',
      email: 'Email',
      hours: 'Opening Hours',
      hoursValue: 'Monday - Saturday: 9am - 5pm'
    },
    cta: {
      headline: 'Give your pet the grooming they deserve!',
      subheadline: 'Book your appointment today.',
      button: 'Book Now'
    },
    footer: {
      followUs: 'Follow Us',
      rights: '© 2024 Poil et Moustache +. All rights reserved.'
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'fr';
    }
    return 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
