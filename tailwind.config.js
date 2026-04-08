/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#4aa5da',
          red: '#d95853',
        },
        background: {
          dark: '#2a2a2a',
        },
        text: {
          light: '#f7f7f7',
          gray: '#5c5c5c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display': '120px',
        'heading-1': '61px',
        'heading-2': '49px',
        'heading-3': '46px',
        'body-large': '44px',
        'body': '36px',
        'body-small': '34px',
      }
    },
  },
  plugins: [],
}
