import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f1117",
        surface: "#171a23",
        surface2: "#1f2330",
        line: "#2a2f3d",
        ink: "#e8eaf0",
        muted: "#9aa3b8",
        brand: "#7c5cff",
        brand2: "#22d3ee",
        accent: "#ffb86b",
        good: "#4ade80",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,0.35)",
        glow: "0 0 0 1px rgba(124,92,255,0.4), 0 8px 30px rgba(124,92,255,0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
