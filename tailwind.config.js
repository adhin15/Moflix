/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main-bg':'#000814',
        'secondary-bg': '#001D3D',
        'footer-accent':'#003566',
        'main-accent': '#FFC300',
        'main-content': '#F0F0F0',
      }
    },
  },
  plugins: [],
}
