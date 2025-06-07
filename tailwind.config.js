const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-bg)',
        foreground: 'var(--color-input-bg)',
        text: 'var(--color-text)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
        muted: 'var(--color-input-border)',
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        title: ['"Share Tech Mono"', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        neon: '0 0 8px var(--color-primary)',
        soft: '0 2px 20px rgba(0,0,0,0.2)',
        'primary-soft': '0 0 2px var(--color-primary), 0 0 5px rgba(163, 216, 244, 0.7)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        clickGlow: {
          '0%': {
            transform: 'scale(1)',
            textShadow: '0 0 3px var(--color-primary), 0 0 6px var(--color-primary)',
          },
          '50%': {
            transform: 'scale(1.05)',
            textShadow: '0 0 7px var(--color-accent), 0 0 12px var(--color-accent)',
          },
          '100%': {
            transform: 'scale(1)',
            textShadow: '0 0 3px var(--color-primary), 0 0 6px var(--color-primary)',
          },
        },
        glitch: {
          '0%, 100%': { transform: 'none' },
          '20%': { transform: 'skew(-0.3deg, -0.5deg)' },
          '40%': { transform: 'skew(0.5deg, -0.1deg)' },
          '60%': { transform: 'skew(-0.6deg, 0.1deg)' },
          '80%': { transform: 'skew(0.2deg, 0.3deg)' },
        },
        glitchTop: {
          '0%, 100%': { clip: 'rect(0, 900px, 0, 0)', transform: 'translate(-1.5px, -1.5px)' },
          '50%': { clip: 'rect(0, 900px, 0, 0)', transform: 'translate(1.5px, 1.5px)' },
        },
        glitchBottom: {
          '0%, 100%': { clip: 'rect(0, 900px, 0, 0)', transform: 'translate(1.5px, 1.5px)' },
          '50%': { clip: 'rect(0, 900px, 0, 0)', transform: 'translate(-1.5px, -1.5px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out both',
        blink: 'blink 1s step-end infinite',
        clickGlow: 'clickGlow 0.2s ease forwards',
        glitch: 'glitch 1s infinite',
        glitchTop: 'glitchTop 1s infinite',
        glitchBottom: 'glitchBottom 1s infinite',
      },
      letterSpacing: {
        widest: '0.05em',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),

    // 粒子背景插件
    function ({ addComponents }) {
      addComponents({
        '.grain-overlay': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/src/assets/grain.png")',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'screen',
          opacity: '0.08',
          pointerEvents: 'none',
          zIndex: '50',
        },
        '.grain-overlay.light': {
          opacity: '0',
        },
      });
    },

    // 霓虹冷光主题插件
    plugin(function({ addComponents, addBase }) {
      addBase({
        'body': {
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          fontFamily: `"Share Tech Mono", "Fira Code", monospace`,
          backgroundImage: `radial-gradient(circle at 10% 20%, var(--color-bg) 0%, var(--color-bg) 100%), linear-gradient(to bottom, var(--color-secondary) 0%, transparent 100%)`,
          minHeight: '100vh',
          transitionProperty: 'color, background-color',
          transitionDuration: '300ms',
        },
        'a': {
          position: 'relative',
          color: 'var(--color-secondary)',
          transition: 'color 0.3s',
        },
        'a:hover': {
          color: 'var(--color-accent)',
        },
        'a::after': {
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          width: '100%',
          height: '1px',
          background: 'currentColor',
          transform: 'scaleX(0)',
          transformOrigin: 'right',
          transition: 'transform 0.3s ease',
        },
        'a:hover::after': {
          transform: 'scaleX(1)',
          transformOrigin: 'left',
        },
        'button': {
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          borderWidth: '1px',
          borderColor: 'var(--color-secondary)',
          backgroundColor: 'transparent',
          color: 'var(--color-secondary)',
          position: 'relative',
          overflow: 'hidden',
          transitionProperty: 'all',
          transitionDuration: '300ms',
          cursor: 'pointer',
        },
        'button:hover': {
          backgroundColor: 'var(--color-secondary)',
          color: 'var(--color-bg)',
          boxShadow: '0 0 6px var(--color-secondary)',
        },
        'button::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(122, 184, 245, 0.3), transparent)',
          transition: '0.5s',
          zIndex: 0,
        },
        'button:hover::before': {
          left: '100%',
        },
        'input, select': {
          backgroundColor: 'var(--color-input-bg)',
          borderWidth: '1px',
          borderColor: 'var(--color-input-border)',
          color: 'var(--color-text)',
          padding: '0.5rem',
          borderRadius: '0.375rem',
          outline: 'none',
          transitionProperty: 'border-color',
          transitionDuration: '300ms',
        },
        'input:focus, select:focus': {
          borderColor: 'var(--color-secondary)',
          boxShadow: '0 0 5px var(--color-secondary)',
        },
      });

      addComponents({
        '.glass-card': {
          backgroundColor: 'var(--color-input-bg)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          borderWidth: '1px',
          borderColor: 'var(--color-secondary)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
          transitionProperty: 'box-shadow',
          transitionDuration: '300ms',
          '&:hover': {
            boxShadow: '0 0 8px var(--color-secondary)',
          },
        },
        '.neon-text': {
          color: 'var(--color-primary)',
          fontWeight: '400',
          letterSpacing: '0.05em',
          textShadow: '0 0 2px var(--color-primary), 0 0 4px rgba(163, 216, 244, 0.7)',
          fontFamily: `"Share Tech Mono", monospace`,
        },
        '.cursor-blink': {
          animation: 'blink 1s step-end infinite',
          color: 'var(--color-primary)',
        },
        '.glitch': {
          position: 'relative',
          color: 'var(--color-primary)',
          fontWeight: '600',
          animation: 'glitch 1s infinite',
          '&::before, &::after': {
            content: 'attr(data-text)',
            position: 'absolute',
            left: 0,
            width: '100%',
            overflow: 'hidden',
            clip: 'rect(0, 900px, 0, 0)',
          },
          '&::before': {
            animation: 'glitchTop 1s infinite',
            color: 'var(--color-accent)',
            zIndex: -1,
          },
          '&::after': {
            animation: 'glitchBottom 1s infinite',
            color: 'var(--color-secondary)',
            zIndex: -2,
          },
        },
        '.click-feedback': {
          animation: 'clickGlow 0.2s ease forwards',
        },
      });
    }),
  ],
};
