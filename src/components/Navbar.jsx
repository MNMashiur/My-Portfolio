import  { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Certs', id: 'certifications' },
  { label: 'GitHub', id: 'github' },
  { label: 'Blog', id: 'blog' },
  { label: 'Reviews', id: 'testimonials' },
  { label: 'Awards', id: 'achievements' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sectionIds = NAV_ITEMS.map((item) => item.id);
  const activeId = useScrollSpy(sectionIds, 120);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1A1625]/80 border-b border-accent/10 py-3 backdrop-blur-md shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="flex items-center gap-2 font-outfit text-xl font-bold tracking-tight text-white group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-accent group-hover:bg-primary transition-colors">
              <Terminal className="h-4.5 w-4.5 text-glow" />
            </div>
            <span>
              Mashiur<span className="text-accent"> Rahaman</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`relative px-3 py-1.5 font-outfit text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  activeId === item.id ? 'text-white' : 'text-textSecondary hover:text-white'
                }`}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Hamburger Menu Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface/50 border border-accent/15 text-textSecondary hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-accent/10 bg-[#241B35]/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-3">
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`flex py-2.5 px-4 font-outfit text-sm font-bold uppercase tracking-wider rounded-xl transition-colors ${
                    activeId === item.id
                      ? 'bg-primary/20 text-accent border-l-4 border-accent'
                      : 'text-textSecondary hover:bg-surface/50 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
