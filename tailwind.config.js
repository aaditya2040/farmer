/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        govt: {
          navy: '#0B3559',
          'navy-dark': '#062038',
          'navy-light': '#184D7A',
          blue: '#1A568C',
          saffron: '#FF9933',
          'saffron-dark': '#E65100',
          'saffron-light': '#FFF3E0',
          green: '#138808',
          'green-dark': '#0C6005',
          'green-light': '#E8F5E9',
          gold: '#FFD700',
          bg: '#F4F6F9',
          card: '#FFFFFF',
          border: '#D1D5DB',
          text: '#1F2937',
          'text-muted': '#4B5563',
        },
      },
      fontFamily: {
        govt: ['"Noto Sans"', '"Segoe UI"', 'Roboto', 'system-ui', '-apple-system', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'govt': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'govt-card': '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.08)',
        'govt-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
