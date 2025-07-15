/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slack: {
          dark: "#481349",
        },
      },
    },
  },
  plugins: [],
};
