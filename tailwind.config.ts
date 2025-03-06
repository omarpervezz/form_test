/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"], 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "500px",
      },

      height: {
        "17": "4.25rem",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-down": "slideDown 0.3s ease-out",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        darkMainBg: "#111827",
        darkPrimaryBg: "#1E293B",
        darkButtonBg: "#313d4a",
        "stone-gray": "#7C7C7C",
        "light-gray": "#BDBDBD",
        "dark-blue": "#243045",
        "blue-gray": "#8391A1",
        "aqua-breeze": "#00BAD1",
        "royal-plum": "#7F56D9",
        "light-grayish-blue": "#F5F7FA",
        "midnight-teal": "#0B2646",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "20px": "20px",
      },

      backgroundImage: {
        "deep-blue-to-light-purple":
          "linear-gradient(0deg, #3528C5 0%, #7367F0 100%)",
        "gradient-text": "linear-gradient(to right, #1768D0, #0070FF)",
        "teal-gradient": "linear-gradient(90deg, #02AAB0 0%, #00CDAC 100%)",
        "aqua-teal-gradient":
          "linear-gradient(90deg, #02AAB0 0%, #00CDAC 100%)",
        "golden-yellow-gradient":
          "linear-gradient(99.14deg, #FCAA22 -46.88%, #FED44F 97.53%)",
        "pink-red-gradient":
          "linear-gradient(270deg, #F72F7C 0%, #D62170 91.23%)",
        "overlay-light-gray":
          "linear-gradient(0deg, rgba(94, 94, 94, 0.18), rgba(94, 94, 94, 0.18)), linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06))",
        "spring-awakening": "linear-gradient(0deg, #20B038 0%, #60D66A 100%)",
        "dual-gradient": `
          linear-gradient(0deg, rgba(61, 66, 76, 0.1), rgba(61, 66, 76, 0.1)), 
          linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))
        `,
        "pink-purple-gradient":
          "linear-gradient(135deg, #FF6FD8 0%, #3813C2 100%)",
        "gradient-danger":
          "linear-gradient(0deg, #DD3B49 0%, #EF8E6A 49.66%, #FFB79B 100%)",
        "gradient-purple-pink":
          "linear-gradient(135deg, #FF6FD8 0%, #3813C2 100%)",
        "gradient-blue-purple":
          "linear-gradient(0deg, #3528C5 0%, #7367F0 100%)",
        "gradient-blue-light":
          "linear-gradient(91.74deg, #0B5BA8 30.91%, #299BD8 100.98%)",
      },
      boxShadow: {
        "soft-blue": "0px 10px 50px 0.78px rgba(174, 203, 250, 0.121)",
        deep: "0px 5px 16px 0px rgba(8, 15, 52, 0.062)",
        "deep-blue": "0px 5px 16px 0px #080F340F",
        "light-shadow": "0px 5px 16px 0px #080F340F",
        "soft-glow": "0px 5px 16px 0px #080F340F",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addComponents }) {
      addComponents({
        // Light mode (default)
        ".table-container": {
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#D8ECFD #f5f5f5",
          "&::-webkit-scrollbar": {
            width: "8px",
            borderRadius: "20px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f5f5f5",
            borderRadius: "20px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#D8ECFD",
            borderRadius: "20px",
            border: "2px solid #f5f5f5",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#D8ECFD",
          },
        },

        // Dark mode
        ".dark .table-container": {
          scrollbarWidth: "thin",
          scrollbarColor: "#2C3E50 #34495E",
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2C3E50",
            borderRadius: "20px",
            border: "2px solid #34495E",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#34495E",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#2C3E50",
          },
        },

        // Sidebar Light mode (default)
        ".sidebar-container": {
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#D8ECFD #f5f5f5",
          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#D8ECFD",
            borderRadius: "20px",
            border: "2px solid #f5f5f5",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f5f5f5",
          },
        },

        // Sidebar Dark mode
        ".dark .sidebar-container": {
          scrollbarWidth: "thin",
          scrollbarColor: "#2C3E50 #34495E",
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2C3E50",
            borderRadius: "20px",
            border: "2px solid #34495E",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#34495E",
          },
        },
        ".bg-blue-gradient": {
          background: "#1571E7",
        },
        ".gradient-text": {
          color: "#1571E7",
        },
        ".scrollbar-none": {
          "scrollbar-width": "none",
        },
      });
    }),
  ],
} satisfies Config;
