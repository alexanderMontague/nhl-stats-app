/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rink: {
          ice: "#e8f4ff",
          blue: "#1e88e5",
          lightBlue: "#90caf9",
          red: "#e53935",
          lightRed: "#ef9a9a",
          goal: "#ffeb3b",
          border: "#2c5282",
        },
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
