import { fontFamily } from "./typography";

// Passed to useFonts() in the root layout.
export const fontAssets = {
  [fontFamily.regular]: require("../../assets/fonts/Poppins-Regular.ttf"),
  [fontFamily.medium]: require("../../assets/fonts/Poppins-Medium.ttf"),
  [fontFamily.semibold]: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  [fontFamily.bold]: require("../../assets/fonts/Poppins-Bold.ttf"),
};
