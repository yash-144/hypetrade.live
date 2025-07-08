/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // if using src directory
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['DotGothic16', 'monospace'], // Change VT323 to DotGothic16
      },
    },
  },
  plugins: [],
};
