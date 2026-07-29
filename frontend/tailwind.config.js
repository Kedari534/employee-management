/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        sidebar: "#1e293b",
        card: {
          DEFAULT: "#1e293b",
          border: "#334155", // slate-700
        },
        primary: {
          DEFAULT: "#6366f1", // indigo-500
          foreground: "#ffffff",
        },
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        foreground: "#f1f5f9",
        muted: "#94a3b8",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
