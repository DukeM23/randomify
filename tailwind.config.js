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
      animation: {
        skeleton: "skeleton 4s ease-in infinite",
      },
      keyframes: {
        skeleton: {
          "0%, 100%": {
            "background-color": "#065f46",
          },
          "50%": {
            "background-color": "#10b981",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
