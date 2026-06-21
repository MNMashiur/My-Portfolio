import  { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalScale, fadeIn } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';

export default function Modal({ isOpen, onClose, title, children }) {
  const { settings } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const modalRoot = document.body;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="absolute inset-0 bg-[#1A1625]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            variants={settings.animations ? modalScale : {}}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#241B35] border border-accent/20 shadow-2xl p-6 md:p-8 no-scrollbar"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b border-accent/10 pb-4">
              <h3 className="font-outfit text-2xl font-bold text-white tracking-tight">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface hover:bg-primary/20 text-textSecondary hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="text-textSecondary">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, modalRoot);
}
