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
    },
    
  },
  plugins: [],
}


