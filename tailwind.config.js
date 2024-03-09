/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '20px 16px 17px 20px #601f37',
      },
    },
  },
  plugins: [],
}

