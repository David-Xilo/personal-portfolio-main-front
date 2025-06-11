/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // example
      colors: {
        'custom-gray': '#f0f2f5',
      },
      boxShadow: {
        custom: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        2.5: '10px',
      },
    },
  },
  plugins: [],
}
