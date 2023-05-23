/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  plugins: [
    // ...
    require('@tailwindcss/forms')
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        neutral: {
          0: '#FFFFFF',
          50: '#ECF1FB',
          100: '#DEE3EC',
          150: '#D0D5DE',
          200: '#C2C7D0',
          250: '#B4B9C2',
          300: '#A7ABB4',
          350: '#999EA7',
          400: '#8C919A',
          450: '#7F848C',
          500: '#737780',
          550: '#666B73',
          600: '#5A5F67',
          650: '#4E535B',
          700: '#42474F',
          750: '#373C43',
          800: '#2C3138',
          850: '#22262D',
          900: '#181C23',
          950: '#0C1119',
          1000: '#000000'
        },
        blue: {
          0: '#BAC9DE',
          100: '#95B6DD',
          200: '#7FAADC',
          300: '#699EDC',
          400: '#5393DB',
          500: '#3D87DB',
          600: '#3978C1',
          700: '#356AA7',
          800: '#315B8D',
          900: '#2D4D73',
          1000: '#263547'
        },
        gold: {
          0: '#D7D2C6',
          100: '#E3CC9F',
          200: '#EAC888',
          300: '#F1C570',
          400: '#F8C159',
          500: '#FFBE41',
          600: '#DEA73E',
          700: '#BD903B',
          800: '#9C7A38',
          900: '#7A6335',
          1000: '#433D30'
        }
      }
    }
  },
  plugins: []
};
