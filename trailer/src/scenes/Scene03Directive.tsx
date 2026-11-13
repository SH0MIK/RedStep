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

export const Scene03Directive: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050814" }}>
      <Video
        name="Footage: Valles Marineris, MOLA elevation (NASA SVS 1335)"
        src={staticFile("footage/mola_flyover.mp4")}
        trimBefore={2760}
        muted
        style={{
          width: 1920,
          height: 1080,
          scale: interpolate(frame, [0, 120], [1.08, 1.2], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Grade tint={0.5} />

      {/* The straight line a naive planner would take, straight over the drop-off. */}
      <RoutePath
        d="M 300 640 L 1620 420"
        start={8}
        duration={22}
        color="#FF2A55"
        width={3}
        dashed
        opacity={interpolate(frame, [8, 30, 52, 64], [0, 0.9, 0.9, 0.25], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      />
      {/* The safe route, bending around the canyon. */}
      <RoutePath
        d="M 300 640 C 460 720, 700 790, 900 750 S 1260 640, 1380 520 S 1560 440, 1620 420"
        start={44}
        duration={50}
      />

      <Interactive.Div
        name="Hazard tag"
        style={{
          position: "absolute",
          left: 880,
          top: 440,
          padding: "10px 18px",
          border: "2px solid #FF2A55",
          backgroundColor: "rgba(255,42,85,0.14)",
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: 3,
          color: "#FF2A55",
          opacity: interpolate(frame, [30, 38], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        CANYON DROP-OFF
      </Interactive.Div>

      <Letterbox />
      <HudFrame label="ROUTE" />

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
        CORE DIRECTIVE
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
          translate: interpolate(frame, [22, 40], ["0px 16px", "0px 0px"], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        ZERO-CASUALTY SURFACE ROUTING
      </Interactive.Div>
    </AbsoluteFill>
  );
};
