/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'primary': '#16121E',
        'secondary': '#27203D',
        'accent': '#8043F9',
        'red': '#D43A4C',
        'green': '#01E2A6',
        'test': '#FF0000'
      },
      fontFamily: {
        'ubuntu': 'Ubuntu, sans-serif'
      }
    },
  },
  plugins: [],
}

