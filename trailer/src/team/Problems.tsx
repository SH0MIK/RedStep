import { Video } from "@remotion/media";
import { AbsoluteFill, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Grade, Letterbox } from "../hud/Grade";
import "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// One problem: a big figure, a one-line consequence, footage behind it.
// 120 frames (4 s) each.
const Card: React.FC<{
  index: string;
  figure: string;
  label: string;
  line: string;
  size?: number;
  children: React.ReactNode;
}> = ({ index, figure, label, line, size = 200, children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#050814" }}>
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 120], [1.04, 1.14], clamp),
          opacity: interpolate(frame, [0, 8], [0, 1], clamp),
        }}
      >
        {children}
      </AbsoluteFill>
      <Grade tint={0.62} />
      <Letterbox />
      <div
        style={{
          position: "absolute",
          left: 144,
          top: 196,
          fontFamily: "JetBrains Mono",
          fontSize: 28,
          letterSpacing: 6,
          color: "#FF2A55",
          opacity: interpolate(frame, [6, 14], [0, 1], clamp),
        }}
      >
        PROBLEM {index} / 05 · {label}
      </div>
      <div
        style={{
          position: "absolute",
          left: 138,
          top: 330,
          fontFamily: "Syne",
          fontWeight: 800,
          fontSize: size,
          lineHeight: "220px",
          whiteSpace: "nowrap",
          color: "#FFFFFF",
          textShadow: "0 0 70px rgba(0,0,0,0.7)",
          opacity: interpolate(frame, [10, 20], [0, 1], clamp),
          translate: `0px ${interpolate(frame, [10, 28], [40, 0], { ...clamp, easing: Easing.bezier(0.2, 0, 0, 1) })}px`,
        }}
      >
        {figure}
      </div>
      <div
        style={{
          position: "absolute",
          left: 144,
          top: 600,
          width: 1500,
          fontFamily: "JetBrains Mono",
          fontSize: 46,
          lineHeight: "62px",
          color: "#00F0FF",
          opacity: interpolate(frame, [34, 46], [0, 1], clamp),
        }}
      >
        {line}
      </div>
    </AbsoluteFill>
  );
};

const full = { width: 1920, height: 1080 } as const;

// 20 seconds: five problems of going to Mars, four seconds each.
// The figures are standard published values; edit the copy inline.
export const Problems: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050814" }}>
    <Sequence name="Problem 1: distance" durationInFrames={120}>
      <Card index="01" label="DISTANCE" figure="7 MONTHS" size={180} line="One way. About 225 million km from home, on average.">
        <Video name="Footage: departing spacecraft" src={staticFile("footage/msr_trailer.mp4")} trimBefore={2580} muted style={full} />
      </Card>
    </Sequence>
    <Sequence name="Problem 2: signal delay" from={120} durationInFrames={120}>
      <Card index="02" label="SIGNAL DELAY" figure="22 MIN" line="Up to 22 minutes for a message to reach Earth. Nobody can talk you through it live.">
        <Video name="Footage: Mars globe" src={staticFile("footage/mars_roll.mp4")} trimBefore={0} muted style={full} />
      </Card>
    </Sequence>
    <Sequence name="Problem 3: environment" from={240} durationInFrames={120}>
      <Card index="03" label="ENVIRONMENT" figure="−63 °C" line="Average temperature. The air is 95% carbon dioxide at under 1% of Earth's pressure.">
        <Video name="Footage: Gale Crater" src={staticFile("footage/gale.mp4")} trimBefore={855} muted style={full} />
      </Card>
    </Sequence>
    <Sequence name="Problem 4: dust storms" from={360} durationInFrames={120}>
      <Card index="04" label="DUST STORMS" figure="PLANET-WIDE" size={122} line="In 2018 a single storm covered the whole planet and ended the Opportunity rover.">
        <Video name="Footage: 2018 dust storm (MRO MCS)" src={staticFile("footage/dust_globe.mp4")} trimBefore={60} playbackRate={5} muted style={full} />
      </Card>
    </Sequence>
    <Sequence name="Problem 5: navigation" from={480} durationInFrames={120}>
      <Card index="05" label="NAVIGATION" figure="NO GPS" line="No navigation satellites. On foot, one wrong route can be the last one.">
        <Video name="Footage: Valles Marineris (MOLA)" src={staticFile("footage/mola_flyover.mp4")} trimBefore={2760} muted style={full} />
      </Card>
    </Sequence>
  </AbsoluteFill>
);
