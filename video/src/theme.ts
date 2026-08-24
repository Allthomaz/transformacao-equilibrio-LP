// theme.ts — fonte única de verdade. NUNCA hex inline em componente.
import { Easing } from "remotion";
import { loadFont as loadDMSerif } from "@remotion/google-fonts/DMSerifDisplay";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";

loadDMSerif();
loadDMSans();

export const theme = {
  colors: {
    bg: "#F5F1EA",
    bgAlt: "#FBF8F2",
    primary: "#B25F3F", // terracota — cor herói, máx. 1 elemento por frame
    primaryDark: "#96492E",
    accent: "#4A7C59", // verde
    text: "#3A2E26",
    textDim: "#7A6A5E",
    glow: "rgba(178, 95, 63, 0.35)",
  },
  fonts: {
    display: "DM Serif Display",
    body: "DM Sans",
  },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90, mass: 1 },
    bouncy: { damping: 11, stiffness: 170, mass: 0.7 },
  },
} as const;
