/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

module.exports = {
  darkMode: "class", // Enables dark mode support
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "inherit",
            maxWidth: "100%",
            a: {
              color: "#4F46E5", // (indigo-500)
              textDecoration: "underline",
              "&:hover": {
                color: "#4338CA", // (indigo-600)
              },
            },
            h1: {
              color: "inherit",
            },
            h2: {
              color: "inherit",
            },
            h3: {
              color: "inherit",
            },
            h4: {
              color: "inherit",
            },
          },
        },
        invert: {
          css: {
            a: {
              color: "#5B21B6", //  (indigo-600)
              "&:hover": {
                color: "#4C1D95", // (indigo-700)
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    daisyui,
    require("@tailwindcss/typography"),
  ],
}
