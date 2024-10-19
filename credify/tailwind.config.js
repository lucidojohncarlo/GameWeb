module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // Black
        secondary: '#white', // Green (Monster Drink color)
        dark: '#0a0a0a', // Darker shade of black
        light: '#1a1a1a', // Lighter shade of black
      },
    },
  },
  darkMode: 'class', // Enable dark mode using a class
  plugins: [],
};