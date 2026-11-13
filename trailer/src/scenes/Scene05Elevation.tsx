import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Grade, Letterbox } from "../hud/Grade";
import { HudFrame } from "../hud/HudFrame";
import "../theme";

// Hand-drawn contour lines in 1920x1080 space; redraw freely.
const CONTOURS = [
  "M -40 720 C 260 640, 520 700, 800 640 S 1320 560, 1960 620",
  "M -40 640 C 300 560, 560 620, 840 550 S 1360 470, 1960 540",
  "M -40 560 C 320 480, 600 540, 880 470 S 1400 390, 1960 460",
  "M -40 480 C 340 410, 640 460, 920 400 S 1440 320, 1960 380",
];

export const Scene05Elevation: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [24, 80], [0, 1], {
    easing: Easing.bezier(0.3, 0, 0.1, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050814" }}>
      <Video
        name="Footage: Gale Crater surface, Curiosity Mastcam (NASA/JPL-Caltech/MSSS)"
        src={staticFile("footage/gale.mp4")}
        trimBefore={855}
        muted
        style={{
          width: 1920,
          height: 1080,
          scale: interpolate(frame, [0, 120], [1, 1.5], {
            easing: Easing.bezier(0.5, 0, 0.2, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Grade tint={0.55} />

      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <path d={CONTOURS[0]} fill="none" stroke="#00F0FF" strokeWidth={2.5} opacity={0.75} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
        <path d={CONTOURS[1]} fill="none" stroke="#00F0FF" strokeWidth={2.5} opacity={0.6} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
        <path d={CONTOURS[2]} fill="none" stroke="#00F0FF" strokeWidth={2.5} opacity={0.45} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
        <path d={CONTOURS[3]} fill="none" stroke="#00F0FF" strokeWidth={2.5} opacity={0.3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
      </svg>

      {/* Reticle that settles on the zoom target. */}
      <Interactive.Div
        name="Zoom reticle"
        style={{
          position: "absolute",
          left: 860,
          top: 440,
          width: 200,
          height: 200,
          border: "2px solid #00F0FF",
          borderRadius: 8,
          boxShadow: "0 0 30px rgba(0,240,255,0.4)",
          opacity: interpolate(frame, [10, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [10, 60], [2.6, 1], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Letterbox />
      <HudFrame label="ELEVATION" />

      <Interactive.Div
        name="Overlay line 1"
        style={{
          position: "absolute",
          left: 144,
          bottom: 250,
          fontFamily: "JetBrains Mono",
          fontWeight: 400,
          fontSize: 40,
          letterSpacing: 6,
          color: "#00F0FF",
          opacity: interpolate(frame, [12, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        DATA SOURCE
      </Interactive.Div>
      <Interactive.Div
        name="Overlay line 2"
        style={{
          position: "absolute",
          left: 144,
          bottom: 176,
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 62,
          letterSpacing: 3,
          color: "#FFFFFF",
          opacity: interpolate(frame, [22, 36], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        NASA MOLA / MRO HiRISE DTM
      </Interactive.Div>
    </AbsoluteFill>
  );
};
