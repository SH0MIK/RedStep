import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ContourGrid } from "../hud/ContourGrid";
import { Grade, Letterbox } from "../hud/Grade";
import "../theme";

export const Scene02Title: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050814" }}>
      <Video
        name="Footage: Mars limb from orbit (NASA/ESA Mars Sample Return animation)"
        src={staticFile("footage/msr_trailer.mp4")}
        trimBefore={2412}
        playbackRate={0.6}
        muted
        style={{
          width: 1920,
          height: 1080,
          scale: interpolate(frame, [0, 135], [1.05, 1.22], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [0, 135], ["0px -40px", "0px 30px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Grade tint={0.42} />

      {/* Blue limb glow along the horizon. */}
      <Interactive.Div
        name="Limb glow"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 420,
          height: 220,
          background:
            "linear-gradient(to bottom, rgba(0,240,255,0) 0%, rgba(0,240,255,0.22) 55%, rgba(0,240,255,0) 100%)",
          mixBlendMode: "screen",
          opacity: 0.7,
        }}
      />

      <Interactive.Div
        name="Terrain scan grid"
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(frame, [30, 70], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <ContourGrid opacity={0.4} speed={2.5} />
      </Interactive.Div>

      <Letterbox />

      <Interactive.Div
        name="Team line"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 250,
          textAlign: "center",
          fontFamily: "JetBrains Mono",
          fontWeight: 400,
          fontSize: 44,
          letterSpacing: 18,
          color: "#00F0FF",
          opacity: interpolate(frame, [18, 36], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        TEAM LOADSTONE
      </Interactive.Div>
      <Interactive.Div
        name="Title"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 310,
          textAlign: "center",
          fontFamily: "Syne",
          fontWeight: 800,
          fontSize: 170,
          color: "#FFFFFF",
          textShadow: "0 0 60px rgba(0,240,255,0.35)",
          opacity: interpolate(frame, [30, 52], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          letterSpacing: interpolate(frame, [30, 135], [34, 10], {
            easing: Easing.bezier(0.1, 0.6, 0.2, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        REDSTEP
      </Interactive.Div>
    </AbsoluteFill>
  );
};
