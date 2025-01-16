import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        hoverBackground: "#01B8C1", // Added hover background color
        hoverBorder: "#087378", // Added hover border color
      },
      fontFamily: {
        comic: ['"Comic Sans MS"', "cursive"],
        outfit: ['"Outfit"', "sans-serif"], // Added Outfit font
        aladin: ['"Aladin" , "sanserif"  '], // Added Aladin font
      },
      animation: {
        "infinite-scroll": "scroll 15s linear infinite",
        "infinite-scroll-reverse": "scroll-reverse 15s linear infinite",
        fade: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      lineClamp: {
        10: '10',
      },
      screens: {
        '2xl': '1440px', // Added new breakpoint for screens larger than 1280px
      },
    },
  },
  plugins: [],
};

export default config as unknown as Config;
