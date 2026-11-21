/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#FBF5E6',
          200: '#F5E6BF',
          300: '#EED596',
          400: '#E5C158',
          500: '#D4AF37', // Metallic Imperial Gold
          600: '#B89428',
          700: '#8C6F19',
          800: '#5C470D',
          900: '#2E2204',
          glow: 'rgba(212, 175, 55, 0.15)',
        },
        obsidian: {
          950: '#070709', // Deepest background
          900: '#0C0D11', // Card background
          850: '#121319', // Elevated surface
          800: '#181922', // Borders and separators
          700: '#262736',
          600: '#3D3F52',
          500: '#64677F',
          400: '#9497AF',
          300: '#C7C9D9',
          100: '#F0F1F7',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        'gold-sm': '0 2px 8px rgba(212, 175, 55, 0.12)',
        'gold-md': '0 4px 20px rgba(212, 175, 55, 0.18)',
        'gold-lg': '0 8px 32px rgba(212, 175, 55, 0.25)',
        'gold-glow': '0 0 40px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
