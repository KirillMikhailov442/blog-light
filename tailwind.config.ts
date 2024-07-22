import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    space: {
      10: '40px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        white: '#FFFFFF',
        black: '#2F2222',
        lightTransparent: 'rgba(255, 255, 255, .2)',
        gray: {
          100: '#F9F9F9',
          150: '#F5F5F5',
          200: '#F1F2F7',
          700: 'rgba(47, 34, 34, .4)',
        },
        blue: {
          200: '#F7F8FD',
          300: '#E2E5F5',
          500: '#5D71DD',
          600: '#6C7DD8',
        },
      },
    },
  },
  plugins: [],
};
export default config;
