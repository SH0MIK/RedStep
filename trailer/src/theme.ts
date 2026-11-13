import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadDisplay } from "@remotion/google-fonts/Syne";

export const mono = loadMono("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
}).fontFamily;

export const display = loadDisplay("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
}).fontFamily;

export const CYAN = "#00F0FF";
export const NAVY = "#050814";
export const CRIMSON = "#FF2A55";
