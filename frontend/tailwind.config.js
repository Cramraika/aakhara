/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'Manrope', 'sans-serif'],
      },
      colors: {
        brand: {
          primary:   '#E8821A',       // saffron amber
          'primary-hover':  '#F49934',
          'primary-active': '#C66B0C',
          secondary: '#1E3A8A',       // deep navy
          'secondary-hover':  '#2E4FA5',
          'secondary-active': '#142961',
          tertiary:  '#11998E',       // muted teal
        },
        neutral: {
          50:  '#F5F7FB',
          100: '#E6EAF2',
          200: '#C4CAD8',
          300: '#939BAF',
          400: '#646C83',
          500: '#424A60',
          600: '#2C3347',
          700: '#1C2134',
          800: '#121626',
          900: '#0A0D1A',
          950: '#05070F',
        },
        semantic: {
          success: '#3CCB7F',
          warning: '#FFB547',
          error:   '#FF5E6F',
          info:    '#5EBAFF',
        },
      },
    },
  },
  plugins: [],
};
