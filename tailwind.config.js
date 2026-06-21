// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#756AB6",
        secondary: "#AC87C5",
        accent: "#E0AED0",
        background: "#1A1625",
        surface: "#241B35",
        highlight: "#FFE5E5",
        textPrimary: "#FFFFFF",
        textSecondary: "#CFCFCF",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        glow: "0 0 15px rgba(224, 174, 208, 0.3)",
        soft: "0 10px 30px -10px rgba(26, 22, 37, 0.7)",
      }
    },
  },
  plugins: [],
}
