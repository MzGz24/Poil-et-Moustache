import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1611173622933-91942d394b04?w=800&q=80',
    alt: 'Happy Pomeranian in towel'
  },
  {
    src: 'https://images.unsplash.com/photo-1597603413826-cd1c06b05222?w=800&q=80',
    alt: 'Dog getting a bath'
  },
  {
    src: 'https://images.unsplash.com/photo-1662124778157-235dd9f10a44?w=800&q=80',
    alt: 'Dog grooming'
  },
  {
    src: 'https://images.unsplash.com/photo-1601428317080-25b86da29a02?w=800&q=80',
    alt: 'Dog paw care'
  },
  {
    src: 'https://images.unsplash.com/photo-1597595735781-6a57fb8e3e3d?w=800&q=80',
    alt: 'Professionally groomed dog'
  }
];

export function Gallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-wide uppercase text-[#8D6E63] mb-4 block">
            {t.nav.about === 'About' ? 'Our work' : 'Notre travail'}
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#3E2723] font-['Montserrat']"
            data-testid="gallery-title"
          >
            {t.gallery.title}
          </h2>
        </div>

        {/* Gallery Grid - Bento Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Large featured image */}
          <div 
            className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage(galleryImages[0])}
            data-testid="gallery-image-0"
          >
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[#3E2723]/0 group-hover:bg-[#3E2723]/20 transition-colors duration-300"></div>
          </div>

          {/* Other images */}
          {galleryImages.slice(1).map((image, index) => (
            <div
              key={index + 1}
              className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-square"
              onClick={() => setSelectedImage(image)}
              data-testid={`gallery-image-${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#3E2723]/0 group-hover:bg-[#3E2723]/20 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-[#3E2723] border-none p-0 overflow-hidden">
          <DialogTitle className="sr-only">Gallery Image</DialogTitle>
          <DialogDescription className="sr-only">Full size gallery image</DialogDescription>
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.src.replace('w=800', 'w=1200')}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                data-testid="gallery-lightbox-close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
