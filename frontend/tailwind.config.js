/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'griscard': '#2B2B2B',
      'gray700': '#374151',
      'blueUwu': '#322FA0',
      'blanquito': '#FFFFFF',
      'rosadito': '#9747FF',
      'gris': '#C9C9C9',
      'negro': '#000000',
      'color1': "#D9D9D9",
      'color2': "#000000",
      'color3': "#FFFFFF",
      'color4': '#3835A3',
      'colorFondoInicio': "#F8F8F8",
      'color6': "#9E9E9E",
      'color7': "#FF0000",
      'colorVerde': "#0ffb01",
    },
    fontFamily: {
      'zen-kaku-gothic-antique': ['Zen Kaku Gothic Antique', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

