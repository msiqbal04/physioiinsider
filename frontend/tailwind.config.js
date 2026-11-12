import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#F4F7F4",
          100: "#E8F0E8",
          400: "#8EAF9F",
          500: "#6F9B83",
          600: "#58816B",
        },
        forest: {
          800: "#145B46",
          900: "#12453A",
          950: "#142420",
        },
        cream: {
          50: "#FAF9F5",
          100: "#F5F4EF",
          200: "#EFECE3",
        },
        accent: {
          warm: "#C98A2E",
          coral: "#C8492F",
        },
        border: {
          light: "#E3E8E0",
        },
      },
    },
  },
  plugins: [],
};

export default config;