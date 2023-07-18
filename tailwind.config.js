/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        cream: {
          100: "#FFFAD7",
          200: "#FFE4A7",
        },
        peptobismol: {
          100: "#FF90BB",
          200: "#FF2171",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
