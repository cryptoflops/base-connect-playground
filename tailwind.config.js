/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ededed",
        border: "#292929",
        muted: "#1a1a1a",
        primary: {
          DEFAULT: '#0052FF',
          hover:   '#0044D6',
          active:  '#0036AD',
        },
        danger: {
          DEFAULT: '#FF0420',
          hover: '#CC0319',
        },
      },
      borderRadius: {
        lg: "8px",
        xl: "12px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "Menlo", "Monaco", "monospace"],
      },
    },
  },
  plugins: [],
};