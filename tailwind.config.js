/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          lilac: "#b388eb",
          blue: "#8093f1",
          soft: "#f5f0ff",
          ink: "#201f30",
        },
      },
      backgroundImage: {
        brand: "linear-gradient(90deg, #b388eb, #8093f1)",
        "brand-soft": "linear-gradient(90deg, #ba94eb, #90a0ec)",
      },
    },
  },
  plugins: [],
};
