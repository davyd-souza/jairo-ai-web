/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: 'var(--font-barlow)',
      display: 'var(--font-syne)',
    },

    colors: {
      lime: '#D8FF4A',
      'soft-lime': '#AAF39E',
      'soft-violet': '#C79FFA',
      'pale-yellow': '#FFFBEA',
      gray: '#F1F1F1',
      'dark-gray': '#3C3C3C',
      white: '#FFF',
      black: '#000',
      transparent: 'transparent',
    },

    boxShadow: {
      md: '5px 5px 0 0 #000',
      lg: '10px 10px 0 0 #000',
    },

    // SHADCN/UI
    extend: {
      minHeight: {
        screen: '100dvh',
      },

      borderWidth: {
        3: '3px',
      },

      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
