/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        clay: {
          bg: '#171515',
          card: '#23201F',
          border: '#3A3633',
          input: '#2B2725',
          hover: '#2E2A28',
          muted: '#9C9792',
          fg: '#F5F4F3',
        },
        brand: {
          periwinkle: '#818CF8',
          indigo: '#6366F1',
          deep: '#4F46E5',
          dark: '#3730A3',
        },
      },
      boxShadow: {
        clay: 'inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
        'clay-button': 'inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 8px 20px -4px rgba(99, 102, 241, 0.4)',
        'clay-input': 'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
      borderRadius: {
        clay: '1.25rem', // 20px smooth clay corners
      },
    },
  },
  plugins: [],
};
