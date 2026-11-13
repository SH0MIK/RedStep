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

// Rover uplinks, drawn from a point on the globe out toward Earth (off frame, top right).
// `cut` is the frame the blackout reaches that link.
const LINKS = [
  { x: 800, y: 470, cut: 38 },
  { x: 930, y: 610, cut: 52 },
  { x: 1070, y: 500, cut: 66 },
];

const Link: React.FC<{ x: number; y: number; cut: number }> = ({ x, y, cut }) => {
  const frame = useCurrentFrame();
  const dead = frame >= cut;
  const flicker = dead ? Math.max(0, 1 - (frame - cut) / 26) : 1;
  const color = dead ? "#FF2A55" : "#00F0FF";
  return (
    <g opacity={dead ? flicker * (frame % 4 < 2 ? 1 : 0.35) : 1}>
      <line
        x1={x}
        y1={y}
        x2={1820}
        y2={170}
        stroke={color}
        strokeWidth={3}
        strokeDasharray={dead ? "10 16" : "4 0"}
      />
      <circle cx={x} cy={y} r={9} fill={color} />
      <circle cx={x} cy={y} r={20 + ((frame * 1.2) % 22)} fill="none" stroke={color} strokeWidth={2} opacity={0.5} />
    </g>
  );
};

export const Scene04Blackout: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050814" }}>
      <Video
        name="Footage: Mars globe (NASA SVS 3896)"
        src={staticFile("footage/mars_roll.mp4")}
        trimBefore={0}
        muted
        style={{
          width: 1920,
          height: 1080,
          scale: interpolate(frame, [0, 120], [0.95, 0.72], {
            easing: Easing.bezier(0.2, 0, 0.2, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Grade tint={0.3} />

      {/* Clipped to the globe: this circle shrinks with the footage, and the
          crimson band slides across inside it. */}
      <Interactive.Div
        name="Blackout mask (globe)"
        style={{
          position: "absolute",
          left: 507,
          top: 87,
          width: 906,
          height: 906,
          borderRadius: "50%",
          overflow: "hidden",
          scale: interpolate(frame, [0, 120], [0.95, 0.72], {
            easing: Easing.bezier(0.2, 0, 0.2, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Blackout sweep"
          style={{
            position: "absolute",
            top: 0,
            width: 1300,
            height: 906,
            left: interpolate(frame, [20, 110], [-1300, -260], {
              easing: Easing.bezier(0.3, 0, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            background:
              "linear-gradient(90deg, rgba(255,42,85,0.5) 0%, rgba(255,42,85,0.6) 80%, rgba(255,42,85,0) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      </Interactive.Div>

      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <Link x={LINKS[0].x} y={LINKS[0].y} cut={LINKS[0].cut} />
        <Link x={LINKS[1].x} y={LINKS[1].y} cut={LINKS[1].cut} />
        <Link x={LINKS[2].x} y={LINKS[2].y} cut={LINKS[2].cut} />
      </svg>

      <Letterbox />
      <HudFrame color="#FF2A55" label="COMMS" />

      <Interactive.Div
        name="Overlay line 1"
        style={{
          position: "absolute",
          left: 144,
          bottom: 250,
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 64,
          letterSpacing: 4,
          color: "#FFFFFF",
          opacity: interpolate(frame, [14, 26], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        EARTH-MARS LATENCY: 22m 14s
      </Interactive.Div>
      <Interactive.Div
        name="Overlay line 2"
        style={{
          position: "absolute",
          left: 144,
          bottom: 186,
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 44,
          letterSpacing: 4,
          color: "#FF2A55",
          opacity: interpolate(frame, [60, 72], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        94% TRAVERSE FAILURE RATE
      </Interactive.Div>
    </AbsoluteFill>
  );
};
