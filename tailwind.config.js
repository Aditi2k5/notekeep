/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'neon-blue': '#00f0ff',
        'neon-purple': '#8a4fff',
        'cyberpunk-bg': {
          primary: '#0a0a1a',
          secondary: '#121228',
        },
        'cyberpunk-text': {
          primary: '#e0e0ff',
          secondary: '#a0a0ff',
        },
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(90deg, #00f0ff, #8a4fff)',
      },
      boxShadow: {
        'neon-blue': '0 0 10px rgba(0, 240, 255, 0.5)',
        'neon-purple': '0 0 10px rgba(138, 79, 255, 0.5)',
      },
    },
  },
  plugins: [],
}

