/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        valentine: {
          bg: '#FBC9D5',
          brown: '#7F3A27',
          red: '#C92A46',
        }
      },
      fontFamily: {
        serif: ['Maragsa', 'serif'],
        sans: ['Inter', 'sans-serif'],
        script: ['"Luxurious Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}
