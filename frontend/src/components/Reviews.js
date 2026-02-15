import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { Star, Quote, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogTrigger } from '../components/ui/dialog';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const defaultReviews = [
  {
    id: '1',
    name: 'Marie-Claude L.',
    pet_name: 'Bella',
    pet_type: 'dog',
    rating: 5,
    comment_fr: 'Service exceptionnel! Bella est toujours magnifique après sa visite. Valérie est très douce avec les animaux.',
    comment_en: 'Exceptional service! Bella always looks beautiful after her visit. Valérie is very gentle with animals.',
    created_at: '2024-11-15'
  },
  {
    id: '2',
    name: 'Jean-Pierre M.',
    pet_name: 'Max',
    pet_type: 'dog',
    rating: 5,
    comment_fr: 'Mon chien Max adore aller chez Poil et Moustache. Personnel attentionné et résultat impeccable!',
    comment_en: 'My dog Max loves going to Poil et Moustache. Caring staff and impeccable results!',
    created_at: '2024-10-28'
  },
  {
    id: '3',
    name: 'Sophie B.',
    pet_name: 'Minou',
    pet_type: 'cat',
    rating: 5,
    comment_fr: 'Enfin un salon qui sait comment traiter les chats! Minou revient toujours calme et bien toiletté.',
    comment_en: 'Finally a salon that knows how to handle cats! Minou always comes back calm and well groomed.',
    created_at: '2024-10-12'
  }
];

export function Reviews() {
  const { t, language } = useLanguage();
  const [reviews, setReviews] = useState(defaultReviews);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    pet_name: '',
    pet_type: 'dog',
    rating: 5,
    comment: ''
  });

  const texts = {
    fr: {
      title: 'Ce que nos clients disent',
      subtitle: 'Témoignages',
      addReview: 'Laisser un avis',
      dialogTitle: 'Partagez votre expérience',
      name: 'Votre nom',
      petName: 'Nom de votre animal',
      petType: 'Type d\'animal',
      dog: 'Chien',
      cat: 'Chat',
      other: 'Autre',
      rating: 'Note',
      comment: 'Votre commentaire',
      submit: 'Envoyer',
      success: 'Merci pour votre avis!',
      error: 'Une erreur s\'est produite.'
    },
    en: {
      title: 'What our clients say',
      subtitle: 'Testimonials',
      addReview: 'Leave a review',
      dialogTitle: 'Share your experience',
      name: 'Your name',
      petName: 'Your pet\'s name',
      petType: 'Pet type',
      dog: 'Dog',
      cat: 'Cat',
      other: 'Other',
      rating: 'Rating',
      comment: 'Your comment',
      submit: 'Submit',
      success: 'Thank you for your review!',
      error: 'An error occurred.'
    }
  };

  const txt = texts[language];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API}/reviews`);
      if (response.data.length > 0) {
        setReviews([...response.data, ...defaultReviews]);
      }
    } catch (error) {
      console.log('Using default reviews');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reviewData = {
        ...formData,
        comment_fr: language === 'fr' ? formData.comment : '',
        comment_en: language === 'en' ? formData.comment : ''
      };

      await axios.post(`${API}/reviews`, reviewData);
      toast.success(txt.success);
      setIsDialogOpen(false);
      setFormData({ name: '', pet_name: '', pet_type: 'dog', rating: 5, comment: '' });
      fetchReviews();
    } catch (error) {
      toast.error(txt.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-wide uppercase text-[#8D6E63] mb-4 block">
            {txt.subtitle}
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#3E2723] font-['Montserrat'] mb-6"
            data-testid="reviews-title"
          >
            {txt.title}
          </h2>
          
          {/* Add Review Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button
                className="inline-flex items-center gap-2 bg-[#F8BBD9] text-[#3E2723] hover:bg-[#E91E63] hover:text-white rounded-full px-6 py-3 font-semibold transition-all duration-300"
                data-testid="add-review-button"
              >
                <Star className="w-5 h-5" />
                {txt.addReview}
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#3E2723] font-['Montserrat']">
                  {txt.dialogTitle}
                </DialogTitle>
                <DialogDescription className="text-[#5D4037]">
                  {language === 'fr' ? 'Votre avis compte pour nous!' : 'Your feedback matters to us!'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-[#3E2723] mb-1 block">{txt.name} *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="border-[#8D6E63]/20 focus:border-[#8D6E63]"
                    data-testid="review-name-input"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#3E2723] mb-1 block">{txt.petName} *</label>
                    <Input
                      value={formData.pet_name}
                      onChange={(e) => setFormData({ ...formData, pet_name: e.target.value })}
                      required
                      className="border-[#8D6E63]/20 focus:border-[#8D6E63]"
                      data-testid="review-petname-input"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#3E2723] mb-1 block">{txt.petType}</label>
                    <select
                      value={formData.pet_type}
                      onChange={(e) => setFormData({ ...formData, pet_type: e.target.value })}
                      className="w-full rounded-lg border border-[#8D6E63]/20 bg-white px-3 py-2 text-[#3E2723] focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20"
                      data-testid="review-pettype-select"
                    >
                      <option value="dog">{txt.dog}</option>
                      <option value="cat">{txt.cat}</option>
                      <option value="other">{txt.other}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3E2723] mb-1 block">{txt.rating}</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                        data-testid={`review-star-${star}`}
                      >
                        <Star
                          className={`w-8 h-8 ${star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3E2723] mb-1 block">{txt.comment} *</label>
                  <Textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    required
                    rows={3}
                    className="border-[#8D6E63]/20 focus:border-[#8D6E63] resize-none"
                    data-testid="review-comment-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#8D6E63] text-white hover:bg-[#795548] rounded-full px-6 py-3 font-semibold transition-all duration-300 disabled:opacity-50"
                  data-testid="review-submit-button"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {txt.submit}
                    </>
                  )}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review, index) => (
            <div
              key={review.id || index}
              className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#8D6E63]/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
              data-testid={`review-card-${index}`}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-[#F8BBD9] mb-4" />
              
              {/* Comment */}
              <p className="text-[#5D4037] leading-relaxed mb-4">
                "{language === 'fr' ? (review.comment_fr || review.comment_en) : (review.comment_en || review.comment_fr)}"
              </p>
              
              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {renderStars(review.rating)}
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#8D6E63]/10">
                <div className="w-10 h-10 rounded-full bg-[#F8BBD9] flex items-center justify-center text-[#3E2723] font-semibold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#3E2723]">{review.name}</p>
                  <p className="text-sm text-[#8D6E63]">
                    {review.pet_type === 'dog' ? '🐕' : review.pet_type === 'cat' ? '🐱' : '🐾'} {review.pet_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
