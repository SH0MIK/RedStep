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

export const Scene06Storm: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050814" }}>
      <Video
        name="Footage: outflow channels, MOLA elevation (NASA SVS 1335)"
        src={staticFile("footage/mola_flyover.mp4")}
        trimBefore={3060}
        muted
        style={{
          width: 1920,
          height: 1080,
          scale: 1.1,
        }}
      />
      <Grade tint={0.5} />

      {/* Dust rolling in as the slider goes up. */}
      <Interactive.Div
        name="Dust haze"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(100deg, rgba(190,110,60,0) 20%, rgba(190,110,60,0.55) 100%)",
          mixBlendMode: "screen",
          opacity: interpolate(frame, [40, 75], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* First route, valid in clear air. */}
      <RoutePath
        d="M 260 700 C 520 560, 820 520, 1080 560 S 1420 520, 1560 420"
        start={6}
        duration={30}
        opacity={interpolate(frame, [48, 62], [1, 0.18], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      />
      {/* Recalculated route once the storm intensity rises. */}
      <RoutePath
        d="M 260 700 C 420 800, 700 840, 940 760 S 1300 620, 1400 520 S 1520 440, 1560 420"
        start={56}
        duration={34}
      />

      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <circle cx={260} cy={700} r={14} fill="#00F0FF" />
        <circle cx={1560} cy={420} r={14} fill="none" stroke="#00F0FF" strokeWidth={4} />
        <circle cx={1560} cy={420} r={30} fill="none" stroke="#00F0FF" strokeWidth={2} opacity={0.5} />
      </svg>
      <Interactive.Div
        name="Label: Base Alpha"
        style={{
          position: "absolute",
          left: 200,
          top: 630,
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: 3,
          color: "#00F0FF",
        }}
      >
        BASE ALPHA
      </Interactive.Div>
      <Interactive.Div
        name="Label: Ice deposit"
        style={{
          position: "absolute",
          left: 1410,
          top: 340,
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: 3,
          color: "#00F0FF",
        }}
      >
        ICE DEPOSIT
      </Interactive.Div>

      {/* Inset: real MRO Mars Climate Sounder dust opacity, June 2018 global storm. */}
      <Interactive.Div
        name="Dust data inset"
        style={{
          position: "absolute",
          right: 150,
          top: 440,
          width: 250,
          height: 250,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid rgba(0,240,255,0.7)",
          boxShadow: "0 0 40px rgba(0,240,255,0.25)",
          opacity: interpolate(frame, [20, 34], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Video
          name="Footage: MCS dust opacity (NASA PIA22737)"
          src={staticFile("footage/dust_globe.mp4")}
          trimBefore={90}
          playbackRate={5}
          muted
          style={{
            position: "absolute",
            width: 528,
            height: 297,
            left: -5,
            top: -26,
          }}
        />
      </Interactive.Div>

      {/* Storm intensity slider. */}
      <Interactive.Div
        name="Slider track"
        style={{
          position: "absolute",
          right: 150,
          top: 740,
          width: 250,
          height: 4,
          backgroundColor: "rgba(255,255,255,0.3)",
        }}
      />
      <Interactive.Div
        name="Slider knob"
        style={{
          position: "absolute",
          top: 728,
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: "#00F0FF",
          boxShadow: "0 0 18px #00F0FF",
          right: interpolate(frame, [38, 70], [350, 160], {
            easing: Easing.bezier(0.3, 0, 0.2, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Slider label"
        style={{
          position: "absolute",
          right: 150,
          top: 772,
          width: 250,
          fontFamily: "JetBrains Mono",
          fontSize: 22,
          letterSpacing: 2,
          color: "#FFFFFF",
          opacity: 0.85,
        }}
      >
        DUST STORM INTENSITY
      </Interactive.Div>

      <Letterbox />
      <HudFrame label="REROUTE" />

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
        DATA SOURCE: NASA MRO CRISM &amp; MCS
      </Interactive.Div>
      <Interactive.Div
        name="Overlay line 2"
        style={{
          position: "absolute",
          left: 144,
          bottom: 176,
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 64,
          letterSpacing: 4,
          color: "#00F0FF",
          opacity: interpolate(frame, [88, 94], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        ROUTE CALC: 118ms
      </Interactive.Div>
    </AbsoluteFill>
  );
};
