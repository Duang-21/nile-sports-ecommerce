import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquarePlus, UserCheck, CheckCircle2, ChevronRight, CornerDownRight } from 'lucide-react';
import { Review } from '../types';
import { initialReviews } from '../data';

interface ReviewsSectionProps {
  onRefreshReviewCount: (count: number) => void;
}

export default function ReviewsSection({ onRefreshReviewCount }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>('');
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  // Load reviews from localStorage or fallback to standard ones
  useEffect(() => {
    const cached = localStorage.getItem('nsw_customer_reviews');
    if (cached) {
      try {
        const loaded: Review[] = JSON.parse(cached);
        setReviews(loaded);
        onRefreshReviewCount(loaded.length);
      } catch (err) {
        setReviews(initialReviews);
        onRefreshReviewCount(initialReviews.length);
      }
    } else {
      setReviews(initialReviews);
      onRefreshReviewCount(initialReviews.length);
    }
  }, []);

  const handleRatingClick = (r: number) => {
    setRating(r);
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !text.trim() || !location.trim()) {
      alert('Please fill in check fields to write an evaluation.');
      return;
    }

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      author: fullName,
      rating,
      text,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verified: true,
      avatar: fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      location: location
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem('nsw_customer_reviews', JSON.stringify(updated));
    onRefreshReviewCount(updated.length);

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setIsFormOpen(false);
      // Reset form variables
      setFullName('');
      setLocation('');
      setRating(5);
      setText('');
    }, 1500);
  };

  return (
    <section 
      id="reviews"
      className="bg-[#0A0A0A] py-24 px-6 md:px-12 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-blue-500 font-bold block mb-3">
              04 // VERIFIED TESTIMONIALS
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl text-zinc-100 font-black uppercase tracking-tighter">
              Customer Experiences
            </h2>
          </div>
          
          <button
            onClick={() => setIsFormOpen(prev => !prev)}
            className="inline-flex items-center gap-2 bg-[#0A0A0A] hover:bg-white border border-white/25 hover:border-white text-zinc-100 hover:text-zinc-950 px-6 py-4 rounded-none font-sans text-xs uppercase tracking-widest font-black cursor-pointer transition-all self-start md:self-auto"
            id="toggle-review-form-btn"
          >
            <MessageSquarePlus className="w-4 h-4 text-blue-500" />
            <span>{isFormOpen ? 'Collapse form' : 'Share Experience'}</span>
          </button>
        </div>

        {/* Expandable Form Sheet Panel */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="overflow-hidden mb-12"
              id="new-review-form-container"
            >
              <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-8 rounded-none max-w-2xl text-left">
                <h3 className="font-sans text-lg text-zinc-205 font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
                  <CornerDownRight className="w-4 h-4 text-blue-500" />
                  <span>Submit Verified Active Feedback</span>
                </h3>

                {success ? (
                  <div className="text-center py-8 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <p className="font-sans text-sm font-semibold text-zinc-200">Review Submitted Successfully!</p>
                    <p className="font-sans text-xs text-zinc-400">Thank you for sharing your experience with Nile Sports Wear.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Eleanor Vance" 
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-none px-4 py-3 text-xs font-sans text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5">
                          Postal Residence / City
                        </label>
                        <input 
                          type="text" 
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="New York, NY" 
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-none px-4 py-3 text-xs font-sans text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                        />
                      </div>
                    </div>

                    {/* Star Rating Inputs */}
                    <div>
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
                        Product Rating
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingClick(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 cursor-pointer transition-transform duration-200 hover:scale-110"
                          >
                            <Star 
                              className={`w-5 h-5 transition-colors ${
                                star <= (hoverRating || rating) 
                                  ? 'fill-blue-500 text-blue-500' 
                                  : 'text-zinc-800'
                              }`} 
                            />
                          </button>
                        ))}
                        <span className="font-mono text-xs text-zinc-400 ml-2 font-bold">
                          {rating} / 5 Stars
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5">
                        Testimonial Experience
                      </label>
                      <textarea 
                        rows={3}
                        required
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Detail how the active garments perform during exercises or write about fabric finishes..." 
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-none px-4 py-3 text-xs font-sans text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <button
                      type="submit"
                      className="py-4 px-8 bg-[#0A0A0A] border border-white/20 hover:border-white hover:bg-white hover:text-black text-white font-sans font-black text-xs uppercase tracking-widest rounded-none transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Post Verified review</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Customer Reviews GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, index) => (
            <motion.div 
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-none p-6 text-left flex flex-col justify-between group hover:border-white transition-all duration-305"
            >
              <div>
                {/* Rating layout */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-blue-500 text-blue-500' : 'text-zinc-800'
                      }`} 
                    />
                  ))}
                </div>

                <p className="font-sans text-xs text-zinc-350 leading-relaxed italic mb-6 font-light">
                  "{rev.text}"
                </p>
              </div>

              {/* Verified Author tag */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-none bg-zinc-950 border border-white/10 text-[10px] font-mono font-bold text-zinc-300 flex items-center justify-center">
                    {rev.avatar || 'CS'}
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold uppercase text-zinc-200 leading-none">{rev.author}</h4>
                    <span className="font-sans text-[10px] text-zinc-500 mt-1 block leading-none font-light">{rev.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold select-none group-hover:text-blue-500 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 group-hover:text-blue-500" />
                  <span>Verified</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
