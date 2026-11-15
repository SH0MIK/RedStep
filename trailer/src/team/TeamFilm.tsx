import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Letterbox } from "../hud/Grade";
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
        muted
        style={{ ...full, filter: `brightness(${lift})` }}
      />
      <Letterbox />
      {/* Swap these two blocks if the names are on the wrong people. */}
      <Nameplate id="01" name="LEO NOBLE" role="TEAM LEAD · LOADSTONE" x={120} y={330} at={468} targetX={300} targetY={770} />
      <Nameplate id="02" name="NISH" role="PRODUCT DESIGNER" x={1800} y={190} at={482} align="right" targetX={1500} targetY={560} />
    </AbsoluteFill>
  );
};

const Clip2: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Video name="Clip 2: Han + Nomi" src={staticFile("team/clip2_han_nomi.mp4")} muted style={{ ...full, filter: "brightness(1.9)" }} />
    <Letterbox />
    <Nameplate id="03" name="HAN" role="CREATIVE DESIGNER" x={150} y={690} at={14} targetX={560} targetY={760} />
    <Nameplate id="04" name="NOMI" role="ASSOCIATE" x={1770} y={690} at={28} align="right" targetX={1330} targetY={750} />
  </AbsoluteFill>
);

const Clip3: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Video name="Clip 3: Yeager + Han" src={staticFile("team/clip3_yeager_han.mp4")} muted style={{ ...full, filter: "brightness(1.9)" }} />
    <Letterbox />
    <Nameplate id="03" name="HAN" role="CREATIVE DESIGNER" x={110} y={640} at={10} targetX={440} targetY={380} />
    <Nameplate id="05" name="YEAGER" role="DEVELOPER" x={1800} y={600} at={22} align="right" targetX={1400} targetY={370} />
  </AbsoluteFill>
);

const sfx = (name: string) => staticFile(`team/sfx/${name}.wav`);
const film = (name: string) => staticFile(`film/audio/${name}.wav`);
const vo = (name: string) => staticFile(`team/vo/n_${name}.wav`);

// Full cut: 547 + 167 + 125 + 750 + 3387 = 4976 frames at 30 fps (about 166 s).
// The camera clips are muted; every sound below is added. Sections:
//   0     the film on the screen (sound design), then the reveal
//   547   Han and Nomi        714  Yeager and Han
//   839   five problems (150 frames each, one narrated line per card)
//   1589  "We could use this" + the narrated screen recording + end card
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
    <Sequence name="The problems of going to Mars" from={839} durationInFrames={750}>
      <Problems />
    </Sequence>
    <Sequence name="Closing: narrated demo" from={1589} durationInFrames={3387}>
      <Closing />
    </Sequence>

    {/* ---- Sound for the film on the screen (0 to 10.5 s) ---- */}
    <Sequence name="Film: opening hit"  durationInFrames={90} layout="none"><Audio src={sfx("hit")} volume={0.6} /></Sequence>
    <Sequence name="Film: riser as the eye opens"  durationInFrames={62} layout="none"><Audio src={film("riser")} volume={0.5} trimBefore={30} /></Sequence>
    <Sequence name="Film: hit on the cut to Mars" from={60} durationInFrames={110} layout="none"><Audio src={sfx("hit")} volume={0.6} /></Sequence>
    <Sequence name="Film: drone" from={60} durationInFrames={225} layout="none"><Audio src={film("drone")} volume={0.5} /></Sequence>
    <Sequence name="Film: breathing (calm)" from={130} durationInFrames={80} layout="none"><Audio src={film("breath_calm")} volume={0.5} /></Sequence>
    <Sequence name="Film: boot on dust" from={146} durationInFrames={18} layout="none"><Audio src={film("step")} volume={0.6} /></Sequence>
    <Sequence name="Film: breathing (heavy)" from={205} durationInFrames={80} layout="none"><Audio src={film("breath_heavy")} volume={0.4} trimBefore={110} /></Sequence>
    <Sequence name="Film: wind" from={205} durationInFrames={80} layout="none"><Audio src={film("wind")} volume={0.38} trimBefore={110} /></Sequence>
    <Sequence name="Film: pulses" from={205} durationInFrames={80} layout="none"><Audio src={film("pulse")} volume={0.3} trimBefore={110} /></Sequence>
    <Sequence name="Film: rising tension" from={205} durationInFrames={80} layout="none"><Audio src={film("tension")} volume={0.42} trimBefore={120} /></Sequence>
    <Sequence name="Film: aftermath rumble" from={285} durationInFrames={40} layout="none"><Audio src={film("aftermath")} volume={0.5} /></Sequence>

    {/* ---- Narration ---- */}
    <Sequence name="VO: not real, but it could have been" from={332} layout="none"><Audio src={vo("a_not_real")} /></Sequence>
    <Sequence name="VO: this is Team Loadstone" from={474} layout="none"><Audio src={vo("b_team")} /></Sequence>
    <Sequence name="VO: seven months away" from={857} layout="none"><Audio src={vo("p1_distance")} /></Sequence>
    <Sequence name="VO: twenty two minutes" from={1005} layout="none"><Audio src={vo("p2_delay")} /></Sequence>
    <Sequence name="VO: air and cold" from={1155} layout="none"><Audio src={vo("p3_air")} /></Sequence>
    <Sequence name="VO: storms" from={1307} layout="none"><Audio src={vo("p4_storms")} /></Sequence>
    <Sequence name="VO: no GPS" from={1455} layout="none"><Audio src={vo("p5_gps")} /></Sequence>

    {/* ---- Score: organ from the reveal to the end; quieter under the demo ---- */}
    <Sequence name="Score: organ" from={440} layout="none">
      <Audio src={sfx("organ_bed")} volume={(f) => (f < 1149 ? 0.5 : f < 1300 ? 0.34 : 0.26)} />
    </Sequence>
    <Sequence name="Score: clock (reveal + team)" from={320} durationInFrames={519} layout="none"><Audio src={sfx("tick")} volume={0.55} /></Sequence>
    <Sequence name="Score: clock (problems)" from={839} durationInFrames={750} layout="none"><Audio src={sfx("tick")} volume={0.45} /></Sequence>

    {/* ---- Effects ---- */}
    <Sequence name="SFX: blip Leo" from={468} layout="none"><Audio src={sfx("blip")} volume={0.5} /></Sequence>
    <Sequence name="SFX: blip Nish" from={482} layout="none"><Audio src={sfx("blip")} volume={0.5} /></Sequence>
    <Sequence name="SFX: whoosh to clip 2" from={511} layout="none"><Audio src={sfx("whoosh")} volume={0.45} /></Sequence>
    <Sequence name="SFX: blip Han" from={561} layout="none"><Audio src={sfx("blip")} volume={0.5} /></Sequence>
    <Sequence name="SFX: blip Nomi" from={575} layout="none"><Audio src={sfx("blip")} volume={0.5} /></Sequence>
    <Sequence name="SFX: whoosh to clip 3" from={678} layout="none"><Audio src={sfx("whoosh")} volume={0.45} /></Sequence>
    <Sequence name="SFX: blip Han (2)" from={724} layout="none"><Audio src={sfx("blip")} volume={0.5} /></Sequence>
    <Sequence name="SFX: blip Yeager" from={736} layout="none"><Audio src={sfx("blip")} volume={0.5} /></Sequence>
    <Sequence name="SFX: hit problem 1" from={839} durationInFrames={115} layout="none"><Audio src={sfx("hit")} volume={0.6} /></Sequence>
    <Sequence name="SFX: hit problem 2" from={989} durationInFrames={115} layout="none"><Audio src={sfx("hit")} volume={0.6} /></Sequence>
    <Sequence name="SFX: hit problem 3" from={1139} durationInFrames={115} layout="none"><Audio src={sfx("hit")} volume={0.6} /></Sequence>
    <Sequence name="SFX: hit problem 4" from={1289} durationInFrames={115} layout="none"><Audio src={sfx("hit")} volume={0.6} /></Sequence>
    <Sequence name="SFX: hit problem 5" from={1439} durationInFrames={115} layout="none"><Audio src={sfx("hit")} volume={0.6} /></Sequence>
  </AbsoluteFill>
);
