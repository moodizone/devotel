import { zinc } from 'tailwindcss/colors'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: zinc,
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
} 