const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      primary: '#C15A38',
      primaryDark: '#803b25',
      secondary: '#456990',
      white: '#FEFFFE',
      whiteSecondary: '#E9EBF8',
      greenAccent: '#47C6A0',
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      green: colors.emerald,
      yellow: colors.amber,
      sky: colors.sky,
      cyan: colors.cyan,
      pink: colors.fuchsia,
      indigo: colors.indigo,
      purple: colors.purple,
    },
    extend: {
      gridTemplateColumns: {
        layout: '200px repeat(12, minmax(0, 1fr))',
      },
      height: {
        'loading': 'calc(100vh - 42px - 16px * 2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
