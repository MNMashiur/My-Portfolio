import { useState, useEffect, useRef, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import SectionTitle from '../components/SectionTitle';
import TestimonialCard from '../components/TestimonialCard';
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Testimonials() {
  const { testimonials } = usePortfolio();
  const { settings } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayTimer = useRef(null);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();

    if (!settings.animations || testimonials.length <= 1) return;

    autoplayTimer.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  }, [settings.animations, testimonials.length, stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handlePrev = () => {
    stopAutoplay();
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    startAutoplay();
  };

  const handleNext = () => {
    stopAutoplay();
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    startAutoplay();
  };

  return (
    <section id="testimonials" className="relative bg-[#1A1625] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Peer Reviews" subtitle="What Others Say" />

        {testimonials.length === 0 ? (
          <div className="glass-card mx-auto max-w-md rounded-2xl border border-accent/15 bg-surface/30 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-accent">
              <MessageSquare className="h-6 w-6" />
            </div>

            <h4 className="font-outfit text-lg font-bold text-white mb-2">
              No Peer Feedback Yet
            </h4>

            <p className="text-xs text-textSecondary leading-relaxed">
              Feedback from teammates, classmates, and collaborators will appear here as I continue working on academic and personal projects.
            </p>

          </div>
        ) : (
          <div className="relative mx-auto flex max-w-3xl flex-col items-center">
            {/* Slider Container */}
            <div className="relative flex h-[320px] w-full items-center justify-center overflow-hidden md:h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-full px-2"
                >
                  <TestimonialCard
                    testimonial={testimonials[activeIndex]}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider controls */}
            <div className="mt-8 flex items-center gap-6">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/15 bg-surface/50 text-textSecondary transition-colors hover:text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      stopAutoplay();
                      setActiveIndex(idx);
                      startAutoplay();
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx
                      ? 'w-6 bg-accent'
                      : 'w-2.5 bg-accent/25'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/15 bg-surface/50 text-textSecondary transition-colors hover:text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}