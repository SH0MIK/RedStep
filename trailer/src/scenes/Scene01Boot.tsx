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
import { RoutePath } from "../hud/RoutePath";
import "../theme";

export const Scene01Boot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050814" }}>
      <Video
        name="Footage: Orion engine burn over Earth (NASA Artemis II animation)"
        src={staticFile("footage/artemis.mp4")}
        trimBefore={1440}
        muted
        style={{
          width: 1920,
          height: 1080,
          scale: interpolate(frame, [0, 150], [1.35, 1], {
            easing: Easing.bezier(0.2, 0, 0.1, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [0, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Grade tint={0.4} />

      {/* Transfer trajectory out toward Mars, top right. */}
      <RoutePath
        d="M 1120 520 C 1280 480, 1440 420, 1620 330"
        start={60}
        duration={50}
        width={4}
      />
      <Interactive.Div
        name="Mars target dot"
        style={{
          position: "absolute",
          left: 1612,
          top: 322,
          width: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: "#FF2A55",
          boxShadow: "0 0 24px #FF2A55",
          opacity: interpolate(frame, [100, 112], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Mars target label"
        style={{
          position: "absolute",
          left: 1650,
          top: 316,
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 26,
          letterSpacing: 4,
          color: "#FF2A55",
          opacity: interpolate(frame, [106, 118], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        MARS
      </Interactive.Div>

      <Letterbox />
      <HudFrame label="TRANSFER" />

      <Interactive.Div
        name="Overlay line"
        style={{
          position: "absolute",
          left: 144,
          bottom: 190,
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 64,
          letterSpacing: 5,
          color: "#00F0FF",
          opacity: interpolate(frame, [20, 24, 28, 32], [0, 1, 0.3, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        [SYSTEM BOOT // SOL 142]
      </Interactive.Div>
    </AbsoluteFill>
  );
};
