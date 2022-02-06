const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        slate: colors.slate,
        white: colors.white,
        blue: colors.blue,
        gray: colors.gray,
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(["disabled"]),
    backgroundColor: ({ after }) => after(["disabled"]),
    cursor: ({ after }) => after(["disabled"]),
    transition: ({ after }) => after(["disabled"]),
  },
  plugins: [],
};
