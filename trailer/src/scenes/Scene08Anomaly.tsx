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
import { HexGrid } from "../hud/HexGrid";
import { HudFrame } from "../hud/HudFrame";
import "../theme";

export const Scene08Anomaly: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050814" }}>
      <Video
        name="Footage: Olympus Mons, MOLA elevation (NASA SVS 1335)"
        src={staticFile("footage/mola_flyover.mp4")}
        trimBefore={2370}
        muted
        style={{
          width: 1920,
          height: 1080,
          filter: "saturate(0.3) brightness(1.15) contrast(1.2)",
          scale: interpolate(frame, [0, 120], [1, 1.9], {
            easing: Easing.bezier(0.6, 0, 0.9, 0.6),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transformOrigin: "58% 30%",
        }}
      />
      <Grade tint={0.5} />

      <HexGrid cx={1070} cy={410} radius={460} />

      <Interactive.Div
        name="Thermal fissure glow"
        style={{
          position: "absolute",
          left: 930,
          top: 320,
          width: 280,
          height: 180,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(255,42,85,0.95) 0%, rgba(255,42,85,0.45) 35%, rgba(255,42,85,0) 70%)",
          mixBlendMode: "screen",
          opacity: interpolate(
            frame,
            [20, 34, 48, 62, 76, 90, 104, 120],
            [0, 1, 0.35, 1, 0.35, 1, 0.5, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
          scale: interpolate(frame, [20, 120], [0.6, 1.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Letterbox />
      <HudFrame color="#FF2A55" label="THERMAL" />

      <Interactive.Div
        name="Overlay line 1"
        style={{
          position: "absolute",
          left: 144,
          bottom: 250,
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 68,
          letterSpacing: 5,
          color: "#FF2A55",
          opacity: interpolate(frame, [26, 30, 34, 38], [0, 1, 0.3, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        ANOMALY DETECTED
      </Interactive.Div>
      <Interactive.Div
        name="Overlay line 2"
        style={{
          position: "absolute",
          left: 144,
          bottom: 186,
          fontFamily: "JetBrains Mono",
          fontWeight: 400,
          fontSize: 40,
          letterSpacing: 3,
          color: "#FFFFFF",
          opacity: interpolate(frame, [48, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        SUB-SURFACE LAVA TUBE THERMAL SIGNATURE
      </Interactive.Div>
    </AbsoluteFill>
  );
};
