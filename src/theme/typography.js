// Design tokens: typography (Poppins).
// Keys of `fontFamily` are the names registered in useFonts (see src/theme/fonts.ts).
const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
};

// size / lineHeight (size x ratio from the design) in px
const fontSize = {
  h1: ["32px", { lineHeight: "38px" }], // 1.2
  h2: ["24px", { lineHeight: "31px" }], // 1.3
  h3: ["20px", { lineHeight: "26px" }], // 1.3
  h4: ["16px", { lineHeight: "22px" }], // 1.4
  "body-lg": ["16px", { lineHeight: "26px" }], // 1.6
  "body-md": ["14px", { lineHeight: "22px" }], // 1.6
  "body-sm": ["13px", { lineHeight: "21px" }], // 1.6
  caption: ["11px", { lineHeight: "15px" }], // 1.4
};

module.exports = { fontFamily, fontSize };
