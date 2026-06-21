import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogCard({ blog, onOpenBlog }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="glass-card flex flex-col h-full rounded-2xl overflow-hidden border border-accent/15 bg-surface/30 hover:bg-surface/50 hover:border-accent/30 group"
    >
      {/* Blog Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={blog.image || "https://images.unsplash.com/photo-1516116211223-5c359a36298a?w=500&auto=format&fit=crop&q=60"}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1625] via-[#1A1625]/20 to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-textSecondary mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-accent" /> {blog.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-accent" /> {blog.readTime}
          </span>
        </div>

        <h4 className="font-outfit text-lg font-bold text-white tracking-tight group-hover:text-accent transition-colors line-clamp-2">
          {blog.title}
        </h4>
        <p className="mt-2 text-sm text-textSecondary leading-relaxed line-clamp-3 flex-grow">
          {blog.summary}
        </p>

        {/* Read More button */}
        <div className="mt-5 pt-4 border-t border-accent/10">
          <button
            onClick={() => onOpenBlog(blog)}
            className="inline-flex items-center gap-1.5 font-outfit text-xs font-semibold uppercase tracking-wider text-accent group-hover:text-white transition-colors"
          >
            Read Full Post <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
