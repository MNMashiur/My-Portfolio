import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            onFinish?.();
          }, 400);

          return 100;
        }

        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1A1625]"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Glowing concentric rotating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-28 w-28 rounded-full border-2 border-t-primary border-r-transparent border-b-secondary border-l-transparent"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute h-20 w-20 rounded-full border border-t-accent border-r-transparent border-b-primary border-l-transparent"
        />

        <div className="absolute flex flex-col items-center">
          <span className="font-outfit text-xl font-bold tracking-widest text-white text-glow">
            {Math.min(progress, 100)}%
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-col items-center"
      >
        <h2 className="font-outfit text-lg font-medium tracking-[0.2em] text-[#AC87C5] uppercase">
          Initializing Portfolio
        </h2>

        <span className="mt-2 animate-pulse font-sans text-xs tracking-wider text-textSecondary">
          Setting up design environment...
        </span>
      </motion.div>
    </motion.div>
  );
}