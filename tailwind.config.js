/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g., var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  const colors = theme("colors");

  // Manually flatten the color palette
  const flattenColors = (colors, prefix = '') => {
    return Object.entries(colors).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null) {
        acc = { ...acc, ...flattenColors(value, `${prefix}${key}-`) };
      } else {
        acc[`${prefix}${key}`] = value;
      }
      return acc;
    }, {});
  };

  const flattenedColors = flattenColors(colors);

  const newVars = Object.fromEntries(
    Object.entries(flattenedColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
