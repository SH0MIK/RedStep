import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const full = { width: 1920, height: 1080 } as const;
const vo = (name: string) => staticFile(`team/vo/n_${name}.wav`);

// A. The closing shot. The line sits on the lit wall behind them.
const UseThis: React.FC = () => {
  const frame = useCurrentFrame();
  const text = "WE COULD\nUSE THIS.";
  const chars = Math.floor(interpolate(frame, [28, 62], [0, text.length], clamp));
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: interpolate(frame, [136, 151], [1, 0], clamp) }}>
      <Video name="Clip 4: ending" src={staticFile("team/clip4_ending.mp4")} volume={0.4} style={full} />
      <div
        style={{
          position: "absolute", left: 600, top: 190, width: 1000, whiteSpace: "pre",
          fontFamily: "Syne", fontWeight: 800, fontSize: 92, lineHeight: "104px", color: "#FFFFFF",
          opacity: 0.82, mixBlendMode: "overlay", filter: "blur(0.7px)",
          transform: "perspective(1400px) rotateY(-7deg) rotate(-1.2deg)",
          textShadow: "0 0 26px rgba(0,240,255,0.55)",
        }}
      >
        {text.slice(0, chars)}
      </div>
    </AbsoluteFill>
  );
};

// B. The screen recording, full frame, no captions. The voice carries it.
const Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 18, 3046, 3071], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: o }}>
      <Video name="Screen recording" src={staticFile("team/screen_recording.mp4")} muted style={full} />
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [4, 22, 142, 165], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", alignItems: "center", justifyContent: "center", opacity: o }}>
      <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 150, letterSpacing: 14, color: "#FFF" }}>REDSTEP</div>
      <div style={{ fontFamily: "JetBrains Mono", fontSize: 30, letterSpacing: 12, color: "#00F0FF", marginTop: 14 }}>TEAM LOADSTONE</div>
    </AbsoluteFill>
  );
};

// 151 + 3071 + 165 = 3387 frames (about 113 s).
// Narration: one ElevenLabs take (public/team/vo/narration_full.mp3) cut into
// lines, each placed where the recording shows what the line is about.
// To retime a line, change its `from` (frames; the recording starts at 151).
export const Closing: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Sequence name="A. We could use this" durationInFrames={151}><UseThis /></Sequence>
    <Sequence name="B. Screen recording" from={151} durationInFrames={3071}><Demo /></Sequence>
    <Sequence name="C. End card" from={3222} durationInFrames={165}><EndCard /></Sequence>

    <Sequence name="Bed: low drone" from={130} layout="none"><Audio src={staticFile("team/vo/bed.wav")} volume={0.16} /></Sequence>

    <Sequence name="VO: We could use this" from={36} layout="none"><Audio src={vo("01_use_this")} /></Sequence>
    <Sequence name="VO: leaving" from={196} layout="none"><Audio src={vo("02_leaving")} /></Sequence>
    <Sequence name="VO: Jezero, is it safe" from={436} layout="none"><Audio src={vo("03_jezero")} /></Sequence>
    <Sequence name="VO: one word, Go" from={721} layout="none"><Audio src={vo("04_go")} /></Sequence>
    <Sequence name="VO: real photographs" from={1066} layout="none"><Audio src={vo("05_photos")} /></Sequence>
    <Sequence name="VO: sample sites, air, time" from={1426} layout="none"><Audio src={vo("06_stops")} /></Sequence>
    <Sequence name="VO: fly the route" from={1831} layout="none"><Audio src={vo("07_fly")} /></Sequence>
    <Sequence name="VO: a guide for the rest" from={2236} layout="none"><Audio src={vo("08_guide")} /></Sequence>
    <Sequence name="VO: the landing" from={2446} layout="none"><Audio src={vo("09_landing")} /></Sequence>
    <Sequence name="VO: water and food" from={2581} layout="none"><Audio src={vo("10_water_food")} /></Sequence>
    <Sequence name="VO: a longer day" from={2710} layout="none"><Audio src={vo("11_day")} /></Sequence>
    <Sequence name="VO: a message home" from={2797} layout="none"><Audio src={vo("12_message")} /></Sequence>
    <Sequence name="VO: air, pressure, heat, power" from={2941} layout="none"><Audio src={vo("13_emergency")} /></Sequence>
    <Sequence name="VO: outro" from={3240} layout="none"><Audio src={vo("14_outro")} /></Sequence>
  </AbsoluteFill>
);
