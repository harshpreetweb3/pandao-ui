/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-r-fuchsia': 'linear-gradient(to right, #C026D3, #E879F9)', // Tailwind colors for fuchsia-900 to fuchsia-800
      },
    },
  },
  plugins: [],
}

