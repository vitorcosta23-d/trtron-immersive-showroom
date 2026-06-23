/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        trtron: {
          50: '#fffaf1',
          100: '#f9ecd4',
          200: '#edd3a3',
          300: '#dbb772',
          400: '#c99a43',
          500: '#b77b21',
          600: '#8d5b15',
          700: '#613e11',
          800: '#3d2812',
          900: '#24180e',
          950: '#120b07',
        },
        graphite: '#65584d',
        pearl: '#f6efe2',
        night: '#17100b',
      },
      boxShadow: {
        glow: '0 0 44px rgba(201, 154, 67, 0.28)',
        panel: '0 24px 80px rgba(0, 0, 0, 0.42)',
      },
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui'],
        serif: ['Cormorant Garamond', 'ui-serif', 'Georgia'],
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
}
