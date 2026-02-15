import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Toaster } from 'sonner';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FDFBF7]">
        <Toaster 
          position="top-center" 
          richColors 
          toastOptions={{
            style: {
              fontFamily: 'Open Sans, sans-serif',
            },
          }}
        />
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Gallery />
          <Reviews />
          <BookingForm />
          <CTA />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
