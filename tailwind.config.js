const { colors } = require("./src/theme/colors");
const { fontFamily, fontSize } = require("./src/theme/typography");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily,
      fontSize,
      borderRadius: {
        card: "20px",
        button: "16px",
      },
    },
  },
  plugins: [],
};
