
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        airbnbPink: '#FF385C',
        airbnbGray: '#717171',
      },
    },
  },
  plugins: [],
}
