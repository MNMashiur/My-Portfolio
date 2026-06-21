import 'react';
import { Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="glass-card flex flex-col h-full rounded-2xl p-6 md:p-8 border border-accent/15 bg-surface/30 relative">
      <div className="absolute top-6 right-6 text-accent/25">
        <Quote className="h-10 w-10 rotate-180" />
      </div>
      
      <p className="font-sans text-textSecondary italic leading-relaxed text-sm md:text-base flex-grow z-10">
        "{testimonial.text}"
      </p>

      <div className="mt-6 flex items-center gap-4 border-t border-accent/10 pt-4 z-10">
        <img
          src={testimonial.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60"}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full object-cover border-2 border-secondary"
          loading="lazy"
        />
        <div>
          <h5 className="font-outfit text-sm font-bold text-white tracking-tight">{testimonial.name}</h5>
          <p className="text-xs text-textSecondary">{testimonial.role}</p>
          <span className="font-outfit text-[10px] font-semibold text-accent uppercase tracking-wider mt-0.5 block">
            {testimonial.company}
          </span>
        </div>
      </div>
    </div>
  );
}
