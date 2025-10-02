/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{mdx,js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}" // garante que Markdown influencie purge/estilos
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // Cores e hierarquia base de “revista científica”
            "--tw-prose-body": "#374151",       // gray-700
            "--tw-prose-headings": "#111827",   // gray-900
            "--tw-prose-links": "#1d4ed8",      // blue-700
            "--tw-prose-bold": "#111827",
            "--tw-prose-counters": "#6b7280",
            "--tw-prose-bullets": "#6b7280",
            "--tw-prose-hr": "#e5e7eb",
            "--tw-prose-quotes": "#111827",
            "--tw-prose-quote-borders": "#d1d5db",
            "--tw-prose-captions": "#6b7280",
            "--tw-prose-code": "#111827",
            "--tw-prose-pre-code": "#e5e7eb",
            "--tw-prose-pre-bg": "#111827",
            "--tw-prose-th-borders": "#d1d5db",
            "--tw-prose-td-borders": "#e5e7eb",

            p: {
              lineHeight: "1.9",
              marginBottom: "1.1em",
            },
            h1: {
              lineHeight: "1.2",
              marginTop: "0",
              marginBottom: "0.6em",
            },
            h2: {
              lineHeight: "1.25",
              marginTop: "2.5rem",
              marginBottom: "1rem",
              paddingBottom: "0.25rem",
              borderBottom: "1px solid #d1d5db", // gray-300
            },
            h3: {
              lineHeight: "1.3",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            },
            "ul, ol": {
              marginTop: "0.5rem",
              marginBottom: "1.25rem",
            },
            li: {
              marginTop: "0.25rem",
              marginBottom: "0.25rem",
            },
            hr: {
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            blockquote: {
              fontStyle: "italic",
              color: "#374151",
              borderLeftColor: "#d1d5db",
            },
            code: {
              fontWeight: "600",
            },
            pre: {
              borderRadius: "0.75rem",
            },
            table: {
              marginTop: "1rem",
              marginBottom: "1.5rem",
            },
            thead: {
              borderBottomColor: "#d1d5db",
            },
          },
        },
        lg: {
          css: {
            p: { lineHeight: "1.95" },
          },
        },
        xl: {
          css: {
            p: { lineHeight: "2.0" },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
