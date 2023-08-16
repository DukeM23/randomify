/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      minHeight: {
        screen: ["100vh /* fallback for Opera, IE and etc. */", "100dvh"],
      },
      maxHeight: {
        screen: ["100vh /* fallback for Opera, IE and etc. */", "100dvh"],
      },
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
        "playing-sides": "playing-sides 1s ease-in-out infinite",
        "playing-middle": "playing-middle 1s ease-in-out infinite",
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
        "playing-sides": {
          "0%, 100%": {
            height: "40%",
          },
          "50%": {
            height: "20%",
          },
        },
        "playing-middle": {
          "0%, 100%": {
            height: "20%",
          },
          "50%": {
            height: "70%",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
