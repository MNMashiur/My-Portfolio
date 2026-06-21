import  { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import SectionTitle from '../components/SectionTitle';
import BlogCard from '../components/BlogCard';
import Modal from '../components/Modal';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, BookOpen } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';

export default function Blog() {
  const { blogs } = usePortfolio();
  const { settings } = useTheme();
  const [activeBlog, setActiveBlog] = useState(null);

  return (
    <section id="blog" className="relative bg-[#1A1625] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Research & Learning" subtitle="Coming Soon" />

        {blogs.length === 0 ? (
          <div className="glass-card max-w-md mx-auto rounded-2xl p-8 text-center border border-accent/15 bg-surface/30">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-accent mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h4 className="font-outfit text-lg font-bold text-white mb-2">No Articles Published Yet</h4>
            <p className="text-xs text-textSecondary leading-relaxed font-sans">
              I write about blockchain architectures, decentralized systems, software testing strategies, and modern AI/ML applications. More research articles and technical write-ups are coming soon.
            </p>
          </div>
        ) : (
          <motion.div
            variants={settings.animations ? staggerContainer : {}}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((blog) => (
              <motion.div key={blog.id} variants={fadeInUp}>
                <BlogCard blog={blog} onOpenBlog={setActiveBlog} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Blog Details Modal */}
      <Modal
        isOpen={!!activeBlog}
        onClose={() => setActiveBlog(null)}
        title={activeBlog?.title || ''}
      >
        {activeBlog && (
          <div className="flex flex-col gap-6 font-sans">
            {/* Meta Header */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-textSecondary border-b border-accent/5 pb-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="h-4 w-4 text-accent" /> {activeBlog.date}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="h-4 w-4 text-accent" /> {activeBlog.readTime}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <User className="h-4 w-4 text-accent" /> By {activeBlog.author}
              </span>
            </div>

            {/* Banner Image */}
            <div className="rounded-2xl overflow-hidden max-h-[350px]">
              <img
                src={activeBlog.image}
                alt={activeBlog.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Summary */}
            <div className="rounded-xl bg-[#2E2442]/30 border border-accent/10 p-5 italic text-sm text-white">
              {activeBlog.summary}
            </div>

            {/* Content Body */}
            <div className="text-textSecondary leading-relaxed text-sm md:text-base whitespace-pre-wrap flex flex-col gap-4">
              {activeBlog.content}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
