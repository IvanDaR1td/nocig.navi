const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"Share Tech Mono"', '"Fira Code"', 'monospace'],
        title: ['"Orbitron"', 'sans-serif'],
        handwriting: ['"Dudu Calligraphy"', 'cursive'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        neon: '0 0 10px var(--color-primary), 0 0 20px var(--color-primary)',
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        blink: {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0' },
        },
        glitchTop: {
          '0%': { clip: 'rect(0, 9999px, 0, 0)' },
          '10%': { clip: 'rect(10px, 9999px, 15px, 0)' },
          '20%': { clip: 'rect(5px, 9999px, 10px, 0)' },
          '30%': { clip: 'rect(20px, 9999px, 25px, 0)' },
          '40%, 100%': { clip: 'rect(0, 9999px, 0, 0)' },
        },
        glitchBottom: {
          '0%': { clip: 'rect(0, 9999px, 0, 0)' },
          '10%': { clip: 'rect(30px, 9999px, 35px, 0)' },
          '20%': { clip: 'rect(25px, 9999px, 30px, 0)' },
          '30%': { clip: 'rect(35px, 9999px, 40px, 0)' },
          '40%, 100%': { clip: 'rect(0, 9999px, 0, 0)' },
        },
      },
      animation: {
        blink: 'blink 1s infinite',
        glitchTop: 'glitchTop 2s infinite linear alternate-reverse',
        glitchBottom: 'glitchBottom 2s infinite linear alternate-reverse',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.grain-overlay': {
          position: 'fixed',
          inset: '0',
          zIndex: '-1',
          pointerEvents: 'none',
          opacity: '0.08',
          backgroundImage: 'repeating-radial-gradient(circle, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 100%)',
          backgroundSize: '2px 2px',
          mixBlendMode: 'overlay',
        },
      });
    }),
  ],
};
