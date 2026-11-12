import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#F4F7F4",
          100: "#E8F0E8",
          400: "#8EAF9F",
          500: "#6F9B83", // Primary Brand Sage
          600: "#58816B",
        },
        forest: {
          800: "#145B46", // Primary Dark Green
          900: "#12453A", // Deep Forest Green
          950: "#142420", // Primary Text
        },
        cream: {
          50: "#FAF9F5",
          100: "#F5F4EF", // Main Canvas Background
          200: "#EFECE3",
        },
        accent: {
          warm: "#C98A2E", // Warning / Streak Fire
          coral: "#C8492F", // Errors / Urgent Notices
        },
        border: {
          light: "#E3E8E0",
        },
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(18, 69, 58, 0.05)",
        card: "0 2px 12px rgba(20, 36, 32, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;