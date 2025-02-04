import type { Config } from "tailwindcss";

export default {
  darkMode : 'class' ,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white : "#fff",
        black : "#0a0a0a",
        // white : "#0a0a0a" ,
        // black : "#fff"
      },
    },
  },
  plugins: [],
} satisfies Config;
