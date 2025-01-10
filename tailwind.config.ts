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
        roboto: ['"Roboto"', "sans-serif"], // Added Roboto font
        outfit: ['"Outfit"', "sans-serif"], // Added Outfit font
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
    },
  },
  plugins: [],
};

export default config as unknown as Config;
