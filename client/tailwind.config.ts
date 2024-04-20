import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        crayola: "#FDE68A",
        rackley: "#568E9D",
        "crystal-blue": "#6AA2B1",
        "jelly-bean-blue": "#427A89",
        "moonstone-blue": "#7EB6C5",
        "dark-slate-gray": "#1A5360",
        "philippine-silver": "#B3B3B3",
        "jelly-bean": "#E45D5D",
        eucalyptus: "#37C8AB",
        platinum: "#E6E6E6",
        "aero-blue": "#C2EEE6",
        "celadon-green": "#298F96",
        "chinese-silver": "#cccccc",
        "light-red": "#FECACA",
        "medium-aquamarine": "#6BD6C2",
        "dark-liver": "#4D4D4D",
        "middle-blue-green": "#86DDCD",
        "royal-orange": "#F29C4D",
        "mountain-meadow": "#20BF86",
        "alice-blue": "#ECF6F9",
        "eagle-green": "#014455",
        skobeloff: "#00667F",
        "eerie-black": "#1A1A1A",
        "dark-charcoal": "#333333",
        "cadet-blue": "#57A3A9",
        "pink-lace": "#FFD4FF",
        maroon: "#800100",
        "dark-magenta": "#940094",
        "smoky-black": "#0D0D0D",
        "granite-gray": "#666666",
        crystal: "#A4E5D9",
        "international-orange": "#BC3535",
        "dark-bronze": "#834700",
        indigo: "#480C84",
        diamond: "#BAE6FD",
        "magic-mint": "#A7F3D0",
        "pale-lavender": "#E9D5FF",
        "pastel-yellow": "#F8F98F",
        "pale-blue": "#BBEDE4",
        "light-silver": "#D0D5DD",
        "azureish-white": "#DFF6F2",
        "english-vermillion": "#D04949",
        "imperial-red": "#EF233C",
        charcoal: "#344054",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
