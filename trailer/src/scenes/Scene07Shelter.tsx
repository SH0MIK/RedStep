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

const Check: React.FC<{ at: number; top: number; children: React.ReactNode }> = ({
  at,
  top,
  children,
}) => {
  const frame = useCurrentFrame();
  const done = frame >= at;
  return (
    <div
      style={{
        position: "absolute",
        left: 44,
        top,
        display: "flex",
        alignItems: "center",
        gap: 20,
        fontFamily: "JetBrains Mono",
        fontSize: 30,
        color: done ? "#FFFFFF" : "rgba(255,255,255,0.45)",
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 6,
          border: "2px solid #00F0FF",
          backgroundColor: done ? "#00F0FF" : "transparent",
        }}
      />
      {children}
    </div>
  );
};

export const Scene07Shelter: React.FC = () => {
  const frame = useCurrentFrame();
  const oxygen = interpolate(frame, [0, 120], [86, 79], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050814" }}>
      <Video
        name="Footage: Gale Crater butte, Curiosity Mastcam (NASA/JPL-Caltech/MSSS)"
        src={staticFile("footage/gale.mp4")}
        trimBefore={4380}
        muted
        style={{
          width: 1920,
          height: 1080,
          scale: interpolate(frame, [0, 120], [1.04, 1.14], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Grade tint={0.5} />

      {/* Shelter waypoint pinned on the terrain. */}
      <Interactive.Div
        name="Shelter waypoint"
        style={{
          position: "absolute",
          left: 520,
          top: 470,
          width: 64,
          height: 64,
          borderRadius: 32,
          border: "3px solid #00F0FF",
          boxShadow: "0 0 30px #00F0FF",
          opacity: interpolate(frame, [50, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [50, 70], [2.2, 1], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Side drawer"
        style={{
          position: "absolute",
          top: 190,
          right: 110,
          width: 620,
          height: 520,
          borderRadius: 26,
          border: "1.5px solid rgba(0,240,255,0.5)",
          backgroundColor: "rgba(10,18,40,0.6)",
          backdropFilter: "blur(22px)",
          boxShadow: "0 30px 100px rgba(0,0,0,0.55)",
          translate: interpolate(frame, [6, 30], ["760px 0px", "0px 0px"], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 44,
            top: 36,
            fontFamily: "JetBrains Mono",
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 5,
            color: "#00F0FF",
          }}
        >
          EVA CHECKLIST
        </div>
        <Check at={34} top={100}>Suit pressure nominal</Check>
        <Check at={50} top={156}>Route uploaded</Check>
        <Check at={66} top={212}>Shelter waypoints verified</Check>
        <Check at={82} top={268}>Comms window confirmed</Check>

        <div
          style={{
            position: "absolute",
            left: 44,
            top: 356,
            fontFamily: "JetBrains Mono",
            fontSize: 22,
            letterSpacing: 4,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          OXYGEN RESERVE
        </div>
        <div
          style={{
            position: "absolute",
            right: 44,
            top: 340,
            fontFamily: "JetBrains Mono",
            fontWeight: 700,
            fontSize: 44,
            color: "#FFFFFF",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {oxygen.toFixed(1)}%
        </div>
        <div
          style={{
            position: "absolute",
            left: 44,
            right: 44,
            top: 420,
            height: 10,
            borderRadius: 5,
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
        >
          <div
            style={{
              width: `${oxygen}%`,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#00F0FF",
              boxShadow: "0 0 16px #00F0FF",
            }}
          />
        </div>
      </Interactive.Div>

      <Letterbox />
      <HudFrame label="EVA" />

      <Interactive.Div
        name="Overlay line 1"
        style={{
          position: "absolute",
          left: 144,
          bottom: 250,
          fontFamily: "JetBrains Mono",
          fontWeight: 400,
          fontSize: 40,
          letterSpacing: 3,
          color: "#FFFFFF",
          opacity: interpolate(frame, [12, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        DATA SOURCE: NASA ODYSSEY THEMIS
      </Interactive.Div>
      <Interactive.Div
        name="Overlay line 2"
        style={{
          position: "absolute",
          left: 144,
          bottom: 176,
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 58,
          letterSpacing: 3,
          color: "#00F0FF",
          opacity: interpolate(frame, [66, 76], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        SHELTER LOCK: LAVA TUBE NODE #04
      </Interactive.Div>
    </AbsoluteFill>
  );
};
