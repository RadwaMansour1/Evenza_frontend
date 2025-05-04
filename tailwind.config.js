module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./public/**/*.html",
    './src/index.html',
    './src/**/*.{html,ts}', // Include all HTML and TS files

  ],
  theme: {
    extend: {
      fontFamily: {
        quantico: ["Quantico", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        0.5: "0.125rem",
        1.5: "0.375rem",
        22: "5.5rem",
        26: "6.5rem",
      }
    },

  },
  plugins: [],
}


