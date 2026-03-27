import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F6E56",
      },
      fontFamily: {
        sans: ["Noto Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
