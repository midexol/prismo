/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        display: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        clay: {
          bg: '#0D0C0C',
          card: '#161514',
          border: 'transparent', // borderless design as requested
          input: '#1D1B1A',
          hover: '#252220',
          muted: '#8C8782',
          fg: '#F5F4F1',
        },
        brand: {
          periwinkle: '#818CF8',
          indigo: '#6366F1',
          purple: '#A78BFA',
        },
      },
    },
  },
  plugins: [],
};
