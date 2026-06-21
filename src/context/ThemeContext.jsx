/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const DEFAULT_SETTINGS = {
  darkMode: true,
  accentColor: '#AC87C5',
  font: 'Inter',
  animations: true,
  particles: true,
};

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem('portfolio_theme_settings', JSON.stringify(settings));

    const root = document.documentElement;

    // Remove all previous font classes
    root.classList.remove(
      'theme-font-inter',
      'theme-font-outfit',
      'theme-font-poppins',
      'theme-font-roboto',
      'theme-font-space'
    );

    // Apply selected font dynamically
    const fontClass = `theme-font-${settings.font.toLowerCase().replace(/\s+/g, '-')}`;
    root.classList.add(fontClass);

    // Apply actual font family
document.body.style.fontFamily = `'${settings.font}', sans-serif`;
root.style.fontFamily = `'${settings.font}', sans-serif`;
    // Set dynamic accent color
    root.style.setProperty('--color-accent-dynamic', settings.accentColor);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <ThemeContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};