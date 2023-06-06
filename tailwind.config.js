/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#C15A38',
      primaryDark: '#803b25',
      secondary: '#456990',
      white: '#FEFFFE',
      whiteSecondary: '#E9EBF8',
      gray: '#B4B8C5',
      gray: '#000000',
      green: '#47C6A0',
    },
    extend: {
      gridTemplateColumns: {
        layout: '200px repeat(12, minmax(0, 1fr))'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
