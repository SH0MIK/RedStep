import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Glitch } from "../hud/Glitch";
import { Grade, Letterbox } from "../hud/Grade";
import "../theme";

// Scrolling "weights": deterministic pseudo-random hex, purely decorative.
const WeightColumn: React.FC<{ seed: number; left: number }> = ({ seed, left }) => {
  const frame = useCurrentFrame();
  const rows = new Array(16).fill(0).map((_, i) => {
    const tick = Math.floor((frame + seed * 7) / 3) + i;
    const value = Math.floor(random(`w-${seed}-${tick}`) * 0xffffff)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase();
    return <div key={i}>0x{value}</div>;
  });
  return (
    <div
      style={{
        position: "absolute",
        left,
        top: 20,
        fontFamily: "JetBrains Mono",
        fontSize: 20,
        lineHeight: "30px",
        color: "#00F0FF",
        opacity: 0.4,
      }}
    >
      {rows}
    </div>
  );
};

export const Scene09ProtocolZero: React.FC = () => {
  const frame = useCurrentFrame();

  // Survival probability races up and lands on 99.4 at frame 78.
  const probability = interpolate(frame, [18, 78], [12, 99.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // The glitch hits right after the number lands.
  const glitch = interpolate(frame, [82, 90, 112, 120], [0, 1, 1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const jitterX = glitch > 0 ? (random(`jx-${frame}`) - 0.5) * 70 * glitch : 0;
  const jitterY = glitch > 0 ? (random(`jy-${frame}`) - 0.5) * 24 * glitch : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#050814" }}>
      <AbsoluteFill style={{ translate: `${jitterX}px ${jitterY}px` }}>
        <Video
          name="Footage: backdrop, MOLA elevation (NASA SVS 1335)"
          src={staticFile("footage/mola_flyover.mp4")}
          trimBefore={2640}
          muted
          style={{
            width: 1920,
            height: 1080,
            filter: "blur(14px) saturate(0.5) brightness(0.5)",
            scale: 1.15,
          }}
        />
        <Grade tint={0.7} />

        <Interactive.Div
          name="Encrypted modal"
          style={{
            position: "absolute",
            left: 460,
            top: 230,
            width: 1000,
            height: 520,
            borderRadius: 28,
            border: "1.5px solid rgba(0,240,255,0.55)",
            backgroundColor: "rgba(10,18,40,0.62)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 30px 120px rgba(0,0,0,0.6), inset 0 0 80px rgba(0,240,255,0.06)",
            overflow: "hidden",
            opacity: interpolate(frame, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [0, 14], [0.94, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <WeightColumn seed={1} left={36} />
          <WeightColumn seed={2} left={176} />
          <WeightColumn seed={3} left={724} />
          <WeightColumn seed={4} left={864} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 130,
              textAlign: "center",
              fontFamily: "JetBrains Mono",
              fontSize: 26,
              letterSpacing: 5,
              color: "#FFFFFF",
              opacity: 0.8,
            }}
          >
            PREDICTED SURVIVAL
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 176,
              textAlign: "center",
              fontFamily: "JetBrains Mono",
              fontWeight: 700,
              fontSize: 170,
              color: glitch > 0.5 ? "#FF2A55" : "#00F0FF",
              textShadow: "0 0 40px rgba(0,240,255,0.5)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {probability.toFixed(1)}%
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Overlay line 1"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 236,
            textAlign: "center",
            fontFamily: "JetBrains Mono",
            fontWeight: 700,
            fontSize: 60,
            letterSpacing: 5,
            color: "#FFFFFF",
            opacity: interpolate(frame, [10, 22], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          PROTOCOL ZERO
        </Interactive.Div>
        <Interactive.Div
          name="Overlay line 2"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 180,
            textAlign: "center",
            fontFamily: "JetBrains Mono",
            fontWeight: 400,
            fontSize: 36,
            letterSpacing: 4,
            color: "#FF2A55",
            opacity: interpolate(frame, [24, 36], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          PREDICTIVE SURVIVAL MATRIX [ENCRYPTED]
        </Interactive.Div>
      </AbsoluteFill>

      <Glitch intensity={glitch} />
      <Letterbox />
    </AbsoluteFill>
  );
};
