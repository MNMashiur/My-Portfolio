import 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { settings, updateSetting } = useTheme();

  const handleToggle = () => {
    updateSetting('darkMode', !settings.darkMode);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-surface/50 backdrop-blur-md transition-colors hover:border-accent/40"
      aria-label="Toggle Theme"
    >
      <motion.div
        animate={{ rotate: settings.darkMode ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {settings.darkMode ? (
          <Moon className="h-5 w-5 text-accent" />
        ) : (
          <Sun className="h-5 w-5 text-[#facc15]" />
        )}
      </motion.div>
    </button>
  );
}
