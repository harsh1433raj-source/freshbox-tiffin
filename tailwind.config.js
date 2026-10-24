/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#E8F5EE',
          100: '#D1EBDD',
          200: '#A3D7BB',
          300: '#75C399',
          400: '#47AF77',
          500: '#176B45', // Primary Brand Color
          600: '#135839',
          700: '#0F442C',
          800: '#0B3120',
          900: '#071D13',
        },
        warmOrange: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Accent Brand Color
          600: '#D97706',
          700: '#B45309',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FFFDF9',
          200: '#FFF9F0', // Brand Background
          300: '#F7EFE3',
          400: '#EFE3D3',
          500: '#E5D5C1',
        },
        charcoal: {
          900: '#111827',
          800: '#1F2937', // Text Primary
          700: '#374151',
          600: '#4B5563', // Text Muted
          500: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(23, 107, 69, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 6px 24px rgba(23, 107, 69, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'lift': '0 12px 32px -4px rgba(23, 107, 69, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
