/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#15803d",
        success: "#22c55e",
        warning: "#facc15",
        error: "#ef4444",
        background: "#f9fafb",
      }
    },
  },
  plugins: [],
}
