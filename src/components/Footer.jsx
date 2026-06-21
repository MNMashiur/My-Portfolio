import  { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Instagram, Facebook  } from 'lucide-react';
import { SOCIAL_LINKS } from '../utils/constants';
import VisitorCounter from './VisitorCounter';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative border-t border-accent/10 bg-[#1A1625] pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-12 border-b border-accent/5">
          {/* Quick Info & Socials */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-outfit text-lg font-bold text-white tracking-tight">
              Mashiur<span className="text-accent"> Rahaman</span>
            </h4>
            <p className="mt-2 text-xs text-textSecondary max-w-xs leading-relaxed">
              Final-year Software Engineering student specializing in Web Development, Android Applications, Blockchain Systems, and Software Quality Assurance. Let’s build secure and impactful solutions together.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.X}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="text-textSecondary hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h5 className="font-outfit text-xs font-bold uppercase tracking-wider text-accent">Quick Links</h5>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-center">
              <a href="#about" className="text-xs text-textSecondary hover:text-white transition-colors">About</a>
              <a href="#skills" className="text-xs text-textSecondary hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="text-xs text-textSecondary hover:text-white transition-colors">Projects</a>
              <a href="#experience" className="text-xs text-textSecondary hover:text-white transition-colors">Experience</a>
              <a href="#education" className="text-xs text-textSecondary hover:text-white transition-colors">Education</a>
              <a href="#contact" className="text-xs text-textSecondary hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Visitor Counter */}
          <div className="flex flex-col items-center md:items-end">
            <VisitorCounter />
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <p className="text-xs text-textSecondary">
            &copy; {new Date().getFullYear()} Mashiur Rahaman. All rights reserved. Made with ❤️.
          </p>
          <a
            href="/admin"
            className="text-[10px] uppercase font-semibold tracking-widest text-accent hover:text-white transition-colors"
          >
            Admin Panel
          </a>
        </div>
      </div>

      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-xl bg-primary border border-accent/20 text-white shadow-lg transition-transform hover:-translate-y-1 hover:bg-primary/80"
          aria-label="Back to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
}
