// Design tokens: colors (from the Lingua design system).
// Plain CommonJS so tailwind.config.js and TypeScript files can both use it.
const colors = {
  // Primary
  purple: "#6C4EF5",
  "deep-purple": "#5B3BF6",
  blue: "#4D8BFF",
  green: "#21C16B",

  // Semantic
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  // Neutrals
  "text-primary": "#0D132B",
  "text-secondary": "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
};

module.exports = { colors };
