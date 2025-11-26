/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: "#000000",
        burnt: "#F37021",
        danger: "#FFE500",
        lavender: "#9080EF",
        offwhite: "#F5F7FA",
        base: {
          blue: "#0052FF",
          dark: "#003399",
        },
        optimism: {
          red: "#FF0420",
          dark: "#990213",
        },
        celo: {
          yellow: "#FCFF52",
          green: "#35D07F",
        },
        arbitrum: {
          cyan: "#2D374B",
          blue: "#12AAFF",
        },
        polygon: {
          purple: "#8247E5",
        },
        neon: {
          blue: "#00F3FF",
          purple: "#BC13FE",
          pink: "#FF00FF",
        },
        glass: {
          border: "rgba(255, 255, 255, 0.1)",
          bg: "rgba(255, 255, 255, 0.05)",
        },
      },
      borderRadius: {
        card: "24px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 24px 80px rgba(0,0,0,0.9)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-sweep": "glow-sweep 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "glow-sweep": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};