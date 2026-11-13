import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import "../theme";
import { Closing } from "./Closing";
import { Nameplate } from "./Nameplate";
import { Problems } from "./Problems";

const full = { width: 1920, height: 1080 } as const;

// Clip 1: the film playing on a screen, then the pull-back to the two people
// watching. The room is dark, so the picture is lifted once the film ends.
const Clip1: React.FC = () => {
  const frame = useCurrentFrame();
  const lift = interpolate(frame, [400, 450], [1, 2.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video
        name="Clip 1: film + reaction"
        src={staticFile("team/clip1_film_reaction.mp4")}
        style={{ ...full, filter: `brightness(${lift})` }}
      />
      {/* Swap these two blocks if the names are on the wrong people. */}
      <Nameplate id="01" name="LEO NOBLE" role="TEAM LEAD · LOADSTONE" x={120} y={330} at={468} targetX={300} targetY={770} />
      <Nameplate id="02" name="NISH" role="PRODUCT DESIGNER" x={1800} y={190} at={482} align="right" targetX={1500} targetY={560} />
    </AbsoluteFill>
  );
};

const Clip2: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Video name="Clip 2: Han + Nomi" src={staticFile("team/clip2_han_nomi.mp4")} style={{ ...full, filter: "brightness(1.9)" }} />
    <Nameplate id="03" name="HAN" role="CREATIVE DESIGNER" x={150} y={690} at={14} targetX={560} targetY={760} />
    <Nameplate id="04" name="NOMI" role="ASSOCIATE" x={1770} y={690} at={28} align="right" targetX={1330} targetY={750} />
  </AbsoluteFill>
);

const Clip3: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Video name="Clip 3: Yeager + Han" src={staticFile("team/clip3_yeager_han.mp4")} style={{ ...full, filter: "brightness(1.9)" }} />
    <Nameplate id="03" name="HAN" role="CREATIVE DESIGNER" x={110} y={640} at={10} targetX={440} targetY={380} />
    <Nameplate id="05" name="YEAGER" role="DEVELOPER" x={1800} y={600} at={22} align="right" targetX={1400} targetY={370} />
  </AbsoluteFill>
);

// Full cut: 547 + 167 + 125 + 600 + 3387 = 4826 frames at 30 fps (about 161 s).
export const TeamFilm: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Sequence name="Clip 1: film + Leo and Nish"  durationInFrames={547}>
      <Clip1 />
    </Sequence>
    <Sequence name="Clip 2: Han and Nomi" from={547} durationInFrames={167}>
      <Clip2 />
    </Sequence>
    <Sequence name="Clip 3: Yeager and Han" from={714} durationInFrames={125}>
      <Clip3 />
    </Sequence>
    <Sequence name="The problems of going to Mars" from={839} durationInFrames={600}>
      <Problems />
    </Sequence>

    <Sequence name="Closing: narrated demo" from={1439} durationInFrames={3387}>
      <Closing />
    </Sequence>

    <Sequence name="SFX drone under problems" from={839} durationInFrames={420} layout="none">
      <Audio src={staticFile("film/audio/drone.wav")} volume={0.6} />
    </Sequence>
    <Sequence name="SFX drone under problems (2)" from={1229} durationInFrames={210} layout="none">
      <Audio src={staticFile("film/audio/drone.wav")} volume={0.6} />
    </Sequence>
    <Sequence name="SFX impact 1" from={839} durationInFrames={110} layout="none">
      <Audio src={staticFile("film/audio/impact.wav")} volume={0.9} />
    </Sequence>
    <Sequence name="SFX impact 2" from={959} durationInFrames={110} layout="none">
      <Audio src={staticFile("film/audio/impact.wav")} volume={0.9} />
    </Sequence>
    <Sequence name="SFX impact 3" from={1079} durationInFrames={110} layout="none">
      <Audio src={staticFile("film/audio/impact.wav")} volume={0.9} />
    </Sequence>
    <Sequence name="SFX impact 4" from={1199} durationInFrames={110} layout="none">
      <Audio src={staticFile("film/audio/impact.wav")} volume={0.9} />
    </Sequence>
    <Sequence name="SFX impact 5" from={1319} durationInFrames={110} layout="none">
      <Audio src={staticFile("film/audio/impact.wav")} volume={0.9} />
    </Sequence>
  </AbsoluteFill>
);
