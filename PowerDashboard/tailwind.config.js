/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,scss}",
  ], theme: {
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadein: 'fadein 2s ease-out',
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}

