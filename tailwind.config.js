/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7bc7fc',
          400: '#36adf8',
          500: '#0e94ea',
          600: '#0076c8',
          700: '#015fa3',
          800: '#065086',
          900: '#0a4270',
          950: '#062a4a',
        },
        secondary: {
          50: '#f3f4ff',
          100: '#e9ebff',
          200: '#d5d8ff',
          300: '#b3b9ff',
          400: '#8a8fff',
          500: '#6566ff',
          600: '#4b40f5',
          700: '#3f2fe0',
          800: '#3429b6',
          900: '#2d258f',
          950: '#1b164f',
        },
        accent: {
          50: '#fff2f0',
          100: '#ffe5e1',
          200: '#ffccc5',
          300: '#ffa69a',
          400: '#ff7663',
          500: '#fe4e35',
          600: '#ef2c14',
          700: '#c9200c',
          800: '#a61d0e',
          900: '#881d13',
          950: '#4a0c06',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'rainbow-spin': 'rainbow-spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'rainbow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};