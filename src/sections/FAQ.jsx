import  { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { faqData } from '../data/faq';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative bg-[#1A1625] py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Frequently Asked Questions" subtitle="Got Questions?" />

        <div className="flex flex-col gap-4 mt-8">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl overflow-hidden border border-accent/10 bg-surface/30 hover:border-accent/20 transition-colors"
              >
                {/* Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-outfit text-sm md:text-base font-bold text-white tracking-tight"
                >
                  <span>{faq.question}</span>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface/50 border border-accent/10 text-accent">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {/* Answer accordion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="p-5 border-t border-accent/5 font-sans text-xs md:text-sm text-textSecondary leading-relaxed bg-[#241B35]/25">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
