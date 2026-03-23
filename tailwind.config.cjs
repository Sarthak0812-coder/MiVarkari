/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        "card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",
        popover: "hsl(var(--popover) / <alpha-value>)",
        "popover-foreground": "hsl(var(--popover-foreground) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        "secondary-foreground": "hsl(var(--secondary-foreground) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-foreground": "hsl(var(--accent-foreground) / <alpha-value>)",
        destructive: "hsl(var(--destructive) / <alpha-value>)",
        "destructive-foreground": "hsl(var(--destructive-foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",

        // App-specific palette (defined in src/index.css)
        saffron: "hsl(var(--saffron) / <alpha-value>)",
        "saffron-light": "hsl(var(--saffron-light) / <alpha-value>)",
        maroon: "hsl(var(--maroon) / <alpha-value>)",
        "temple-gold": "hsl(var(--temple-gold) / <alpha-value>)",
        earth: "hsl(var(--earth) / <alpha-value>)",
        cream: "hsl(var(--cream) / <alpha-value>)",
        "river-blue": "hsl(var(--river-blue) / <alpha-value>)",

        // Sidebar palette (defined in src/index.css)
        sidebar: "hsl(var(--sidebar-background) / <alpha-value>)",
        "sidebar-foreground": "hsl(var(--sidebar-foreground) / <alpha-value>)",
        "sidebar-primary": "hsl(var(--sidebar-primary) / <alpha-value>)",
        "sidebar-primary-foreground": "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
        "sidebar-accent": "hsl(var(--sidebar-accent) / <alpha-value>)",
        "sidebar-accent-foreground": "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
        "sidebar-border": "hsl(var(--sidebar-border) / <alpha-value>)",
        "sidebar-ring": "hsl(var(--sidebar-ring) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

