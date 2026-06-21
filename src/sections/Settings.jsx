import  { useState } from 'react';
import { Settings as SettingsIcon, X, Check, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ACCENT_COLORS, FONT_OPTIONS } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';

export default function Settings() {
  const { settings, updateSetting, resetSettings } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-[99]">
      {/* Floating Gear Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface/80 border border-accent/20 text-accent shadow-lg transition-transform hover:rotate-45 hover:bg-surface"
        aria-label="Theme Settings"
      >
        <SettingsIcon className="h-5 w-5" />
      </button>

      {/* Drawer settings panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop cover click to close */}
            <div
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-12 left-0 z-50 w-72 rounded-2xl border border-accent/20 bg-[#241B35]/95 backdrop-blur-lg p-5 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-accent/10 pb-3 mb-4">
                <h4 className="font-outfit text-sm font-bold text-white tracking-tight uppercase flex items-center gap-1.5">
                  <SettingsIcon className="h-4 w-4" /> Preferences
                </h4>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-textSecondary hover:text-white"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-4">
                {/* Accent Color Swatch */}
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-textSecondary mb-2">Accent Color</label>
                  <div className="flex flex-wrap gap-2.5">
                    {ACCENT_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => updateSetting('accentColor', color.value)}
                        className="relative h-6 w-6 rounded-full border border-black/20"
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {settings.accentColor === color.value && (
                          <span className="absolute inset-0 flex items-center justify-center text-[#1A1625]">
                            <Check className="h-3.5 w-3.5 stroke-[3px]" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Selector */}
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-textSecondary mb-2">Typography</label>
                  <div className="grid grid-cols-2 gap-2">
                    {FONT_OPTIONS.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => updateSetting('font', f.value)}
                        className={`rounded-lg py-1.5 text-xs font-semibold font-outfit border tracking-tight ${
                          settings.font === f.value
                            ? 'border-accent bg-primary/20 text-white'
                            : 'border-accent/10 bg-surface/50 text-textSecondary hover:border-accent/20 hover:text-white'
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animation Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-textSecondary">Enable Animations</span>
                  <button
                    onClick={() => updateSetting('animations', !settings.animations)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      settings.animations ? 'bg-accent' : 'bg-[#2E2442]'
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      settings.animations ? 'translate-x-4.5' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Particle Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-textSecondary">Background Particles</span>
                  <button
                    onClick={() => updateSetting('particles', !settings.particles)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      settings.particles ? 'bg-accent' : 'bg-[#2E2442]'
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      settings.particles ? 'translate-x-4.5' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Reset button */}
                <button
                  onClick={resetSettings}
                  className="mt-2 border border-accent/10 bg-surface hover:bg-primary/20 rounded-xl py-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-textSecondary hover:text-white transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset Preferences
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
