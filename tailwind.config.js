/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'barlow': ['"Barlow"', 'sans-serif'],
        'poppins': ['"Poppins"', 'sans-serif'],

      }
    },
  },
  plugins: [],
}