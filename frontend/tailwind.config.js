export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        carbon: '#050506',
        graphite: '#111116',
        purpleNeon: '#8B5CF6',
        violetDeep: '#3B0764',
        metal: '#C8CDD6',
        champagne: '#E8D8B0'
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glow: '0 0 34px rgba(139, 92, 246, 0.32)',
        metal: '0 20px 80px rgba(0,0,0,0.45)'
      },
      backgroundImage: {
        showroom: 'radial-gradient(circle at top left, rgba(139,92,246,.22), transparent 34%), radial-gradient(circle at 80% 20%, rgba(232,216,176,.11), transparent 24%), linear-gradient(135deg, #050506, #0B0A12 52%, #07070A)'
      }
    }
  },
  plugins: []
};
