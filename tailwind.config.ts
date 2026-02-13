import type { Config } from "tailwindcss";

export default {
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
        cyan: {
          electric: "#00FFFF",
          bright: "#00E5E5",
          deep: "#00CCCC",
          teal: "#00B3B3",
        },
        velox: {
          black: "#000000",
          white: "#FFFFFF",
          gray: {
            100: "#F0F0F0",
            200: "#E0E0E0",
            300: "#CCCCCC",
            400: "#999999",
            500: "#888888",
            600: "#666666",
            700: "#555555",
            800: "#252525",
            850: "#141414",
            900: "#0A0A0A",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "scroll-left": "scrollLeft 30s linear infinite",
        "scroll-right": "scrollRight 30s linear infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.15)" },
          "100%": { boxShadow: "0 0 40px rgba(0, 255, 255, 0.3)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 255, 0.3)" },
        },
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 255, 255, 0.15), 0 0 40px rgba(0, 255, 255, 0.1)',
        'cyan-glow-strong': '0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config;
