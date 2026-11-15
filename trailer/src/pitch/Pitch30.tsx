import { loadFont } from "@remotion/google-fonts/Inter";
import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import "../theme";

const { fontFamily: inter } = loadFont("normal", { weights: ["500"], subsets: ["latin"] });

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const full = { width: 1920, height: 1080 } as const;
const ease = Easing.bezier(0.2, 0, 0, 1);
const fade = (frame: number, at: number, len = 12) => interpolate(frame, [at, at + len], [0, 1], clamp);
const rise = (frame: number, at: number, by = 28) => interpolate(frame, [at, at + 20], [by, 0], { ...clamp, easing: ease });

// The film's palette: deep navy, white, one cool accent, red only for danger.
const NAVY = "#050814";
const CYAN = "#7FE9F5";
const RED = "#FF3B4E";
const display = "Syne";
const mono = "JetBrains Mono";

/* ------------------------------------------------------------------ */
/* Subtitles (required by the judging rules). Frames are absolute.     */
/* ------------------------------------------------------------------ */
const SUBTITLES: { from: number; to: number; text: string }[] = [
  { from: 0, to: 28, text: "RedStep." },
  { from: 36, to: 131, text: "Every step on Mars, tested before you take it." },
  { from: 138, to: 180, text: "By Team Loadstone." },
  { from: 210, to: 279, text: "On Mars, there is no GPS." },
  { from: 289, to: 319, text: "No rescue." },
  { from: 340, to: 397, text: "Help is twenty minutes away." },
  { from: 425, to: 554, text: "RedStep reads NASA's Mars Trek, HiRISE and CTX terrain data," },
  { from: 558, to: 608, text: "and tells you if a walk is safe." },
  { from: 612, to: 647, text: "Before you take it." },
  { from: 696, to: 777, text: "So the first humans on Mars can come home." },
  { from: 812, to: 841, text: "RedStep." },
];

const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const line = SUBTITLES.find((s) => frame >= s.from && frame < s.to);
  if (!line) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 46, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          maxWidth: 1500, padding: "10px 26px", borderRadius: 8, backgroundColor: "rgba(0,0,0,0.7)",
          fontFamily: inter, fontWeight: 500, fontSize: 38, lineHeight: "48px", color: "#FFFFFF", textAlign: "center",
        }}
      >
        {line.text}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 1. Hook: the name, the core line, then the team (195 frames)        */
/* ------------------------------------------------------------------ */
// `x` is each person's centre as a fraction of the illustration's width.
const TEAM = [
  { name: "NISH", role: "Product designer", x: 0.14 },
  { name: "NOMI", role: "Associate", x: 0.332 },
  { name: "LEO NOBLE", role: "Team lead", x: 0.502 },
  { name: "YEAGER", role: "Developer", x: 0.676 },
  { name: "HAN", role: "Creative designer", x: 0.858 },
];
const ART_W = 1420;
const ART_H = 710;
const ART_LEFT = (1920 - ART_W) / 2;
const ART_TOP = 236;

// Opens on the name and the core line; the team comes in at frame TEAM_AT.
const TEAM_AT = 130;

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame - TEAM_AT; // frames into the team half
  const titleOut = interpolate(frame, [TEAM_AT - 10, TEAM_AT], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      {/* --- first half: REDSTEP and the core line --- */}
      <AbsoluteFill style={{ opacity: titleOut }}>
        <Img
          src={staticFile("pitch/mars_still.jpg")}
          style={{ ...full, transformOrigin: "42% 40%", scale: interpolate(frame, [0, TEAM_AT], [1.5, 1.62], clamp), opacity: 0.55 }}
        />
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(5,8,20,0.25) 0%, rgba(5,8,20,0.9) 85%)" }} />
        <div
          style={{
            position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: display, fontWeight: 800, fontSize: 190, letterSpacing: 14,
            color: "#FFFFFF", textShadow: "0 0 70px rgba(127,233,245,0.28)",
            scale: interpolate(frame, [0, TEAM_AT], [0.97, 1.02], clamp),
          }}
        >
          REDSTEP
        </div>
        <div
          style={{
            position: "absolute", left: 0, right: 0, top: 560, textAlign: "center", fontFamily: display, fontWeight: 700, fontSize: 50, letterSpacing: 1,
            color: "#FFFFFF",
          }}
        >
          Every step on Mars, <span style={{ color: CYAN }}>tested before you take it.</span>
        </div>
      </AbsoluteFill>

      {/* --- second half: the team --- */}
      {t >= -4 ? (
        <AbsoluteFill style={{ opacity: fade(frame, TEAM_AT - 4, 12) }}>
          {/* a soft pool of light behind the team so dark shirts read against the dark */}
          <AbsoluteFill style={{ background: "radial-gradient(ellipse 62% 55% at 50% 58%, rgba(96,128,190,0.42) 0%, rgba(40,58,104,0.22) 45%, rgba(5,8,20,0) 78%)" }} />
          <div style={{ position: "absolute", left: 120, top: 70, fontFamily: mono, fontSize: 24, letterSpacing: 8, color: CYAN }}>BUILT BY TEAM</div>
          <div style={{ position: "absolute", left: 114, top: 96, fontFamily: display, fontWeight: 800, fontSize: 88, letterSpacing: 3, color: "#FFFFFF" }}>LOADSTONE</div>
          <div style={{ position: "absolute", right: 120, top: 104, textAlign: "right", fontFamily: mono, fontSize: 19, letterSpacing: 3, lineHeight: "30px", color: "#FFFFFF", opacity: 0.6 }}>
            <div>MEHERPUR, BANGLADESH</div>
            <div>NASA SPACE APPS · RAJSHAHI (VIRTUAL)</div>
          </div>
          <Img
            name="Team illustration rim light"
            src={staticFile("pitch/team.png")}
            style={{
              position: "absolute", left: ART_LEFT, top: ART_TOP, width: ART_W, height: ART_H,
              filter: "brightness(0) invert(1) blur(5px)", opacity: 0.35, translate: `0px ${rise(frame, TEAM_AT - 4, 36)}px`,
              maskImage: "linear-gradient(to bottom, #000 60%, transparent 92%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 92%)",
            }}
          />
          <Img
            name="Team illustration"
            src={staticFile("pitch/team.png")}
            style={{
              position: "absolute", left: ART_LEFT, top: ART_TOP, width: ART_W, height: ART_H,
              translate: `0px ${rise(frame, TEAM_AT - 4, 36)}px`,
              maskImage: "linear-gradient(to bottom, #000 74%, transparent 99%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 74%, transparent 99%)",
            }}
          />
          {TEAM.map((m, i) => {
            const at = TEAM_AT + 8 + i * 5;
            return (
              <div
                key={m.name}
                style={{
                  position: "absolute", left: ART_LEFT + ART_W * m.x - 150, top: 776, width: 300, textAlign: "center",
                  opacity: fade(frame, at, 8), translate: `0px ${rise(frame, at, 14)}px`,
                }}
              >
                <div style={{ display: "inline-block", padding: "8px 12px 10px", backgroundColor: "rgba(5,8,20,0.86)", borderTop: `2px solid ${CYAN}` }}>
                  <div style={{ fontFamily: display, fontWeight: 800, fontSize: 22, letterSpacing: 1, color: "#FFFFFF", whiteSpace: "nowrap" }}>{m.name}</div>
                  <div style={{ fontFamily: mono, fontSize: 16, letterSpacing: 0, color: CYAN, whiteSpace: "nowrap", marginTop: 2 }}>{m.role}</div>
                </div>
              </div>
            );
          })}
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 2. Problem: three cuts from your own astronaut film (210 frames)    */
/* ------------------------------------------------------------------ */
const Cut: React.FC<{ trimBefore: number; len: number; words: string; color?: string; still?: string }> = ({
  trimBefore, len, words, color = "#FFFFFF", still,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {still ? (
        <Img
          src={staticFile(still)}
          style={{ ...full, transformOrigin: "62% 68%", scale: interpolate(frame, [0, len], [1.14, 1.3], clamp), filter: "contrast(1.08) saturate(0.92) brightness(0.9)" }}
        />
      ) : (
        <Video
          src={staticFile("team/clip1_film_reaction.mp4")}
          trimBefore={trimBefore}
          muted
          style={{ ...full, scale: interpolate(frame, [0, len], [1.14, 1.2], clamp), filter: "contrast(1.08) saturate(0.92) brightness(0.9)" }}
        />
      )}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(5,8,20,0.7) 0%, rgba(5,8,20,0) 42%, rgba(5,8,20,0.7) 100%)" }} />
      <div
        style={{
          position: "absolute", left: 114, top: 150, fontFamily: display, fontWeight: 800, fontSize: 138, letterSpacing: 2, lineHeight: "146px",
          color, whiteSpace: "pre", textShadow: "0 6px 50px rgba(0,0,0,0.7)",
          opacity: fade(frame, 4, 6), scale: interpolate(frame, [4, 16], [1.08, 1], { ...clamp, easing: ease }), transformOrigin: "0% 50%",
        }}
      >
        {words}
      </div>
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: interpolate(frame, [0, 4], [1, 0], clamp) }} />
    </AbsoluteFill>
  );
};

const Problem: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Sequence durationInFrames={82}>
      <Cut trimBefore={135} len={82} words="NO GPS." />
    </Sequence>
    <Sequence from={82} durationInFrames={54}>
      <Cut trimBefore={215} len={54} words="NO RESCUE." />
    </Sequence>
    <Sequence from={136} durationInFrames={74}>
      <Cut still="pitch/body_still.jpg" trimBefore={0} len={74} words={"HELP IS\n20 MIN AWAY."} color={RED} />
    </Sequence>
    <div style={{ position: "absolute", left: 120, top: 96, fontFamily: mono, fontSize: 22, letterSpacing: 4, color: "#FFFFFF", opacity: 0.85 }}>
      THE CHALLENGE · INTERPLANETARY SURVIVAL GUIDE: MARTIAN MAP
    </div>
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* 3. The thing working (270 frames): the recording, full frame.       */
/* ------------------------------------------------------------------ */
const Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const rec = staticFile("team/screen_recording.mp4");
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: fade(frame, 0, 8) }}>
      {/* Cuts from the recording. trimBefore is in frames of the recording. */}
      <Sequence name="Cut: route found" durationInFrames={110}>
        <Video src={rec} trimBefore={525} muted style={full} />
      </Sequence>
      <Sequence name="Cut: 3D fly-along" from={110} durationInFrames={70}>
        <Video src={rec} trimBefore={1750} muted style={full} />
      </Sequence>
      <Sequence name="Cut: GO verdict" from={180} durationInFrames={90}>
        <Video src={rec} trimBefore={680} muted style={full} />
      </Sequence>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 72%, rgba(0,0,0,0.88) 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 122, textAlign: "center", fontFamily: mono, fontSize: 24, letterSpacing: 2, color: "#FFFFFF", opacity: fade(frame, 20, 12) }}>
        <span style={{ color: CYAN }}>NASA DATA  </span>
        MARS TREK  ·  MRO HiRISE DEM (GALE)  ·  MRO CTX DTM (JEZERO)
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 4. Impact (195 frames): one line, then the name.                    */
/* ------------------------------------------------------------------ */
const Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const nameAt = 124;
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      {/* Mars and the rocket from the app's own intro: a still with a slow, smooth push */}
      <Img
        src={staticFile("pitch/mars_still.jpg")}
        style={{
          ...full, transformOrigin: "42% 40%", scale: interpolate(frame, [0, 195], [1.55, 1.75], clamp),
          opacity: interpolate(frame, [0, 12, nameAt - 6, nameAt + 16], [0, 0.9, 0.9, 0.4], clamp),
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(5,8,20,0.2) 0%, rgba(5,8,20,0.85) 85%)" }} />
      <div
        style={{
          position: "absolute", left: 0, right: 0, top: 290, textAlign: "center", fontFamily: display, fontWeight: 800, fontSize: 62, letterSpacing: 1,
          lineHeight: "78px", color: "#FFFFFF", whiteSpace: "pre", textShadow: "0 4px 50px rgba(0,0,0,0.7)",
          opacity: interpolate(frame, [14, 28, nameAt - 10, nameAt], [0, 1, 1, 0], clamp), translate: `0px ${rise(frame, 14)}px`,
        }}
      >
        {"SO THE FIRST HUMANS ON MARS\nCAN COME HOME."}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", opacity: fade(frame, nameAt, 12), scale: interpolate(frame, [nameAt, nameAt + 80], [0.95, 1], { ...clamp, easing: ease }) }}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 160, letterSpacing: 12, color: "#FFFFFF", textShadow: "0 0 70px rgba(127,233,245,0.28)" }}>REDSTEP</div>
        <div style={{ fontFamily: mono, fontSize: 26, letterSpacing: 9, color: CYAN, marginTop: 10 }}>TEAM LOADSTONE · NASA SPACE APPS 2026</div>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 29 seconds exactly: 195 + 210 + 270 + 195 = 870 frames at 30 fps.   */
/* ------------------------------------------------------------------ */
const sfx = (n: string) => staticFile(`team/sfx/${n}.wav`);
const vo = (n: string) => staticFile(`pitch/vo3_${n}.wav`);

export const Pitch30: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Sequence name="1. Hook: name, core line, team" durationInFrames={195}><Hook /></Sequence>
    <Sequence name="2. Problem" from={195} durationInFrames={210}><Problem /></Sequence>
    <Sequence name="3. The thing working" from={405} durationInFrames={270}><Demo /></Sequence>
    <Sequence name="4. Impact" from={675} durationInFrames={195}><Impact /></Sequence>
    <Subtitles />

    <Sequence name="VO: RedStep, core line" layout="none"><Audio src={vo("0a_open")} volume={0.88} /></Sequence>
    <Sequence name="VO: by Team Loadstone" from={133} layout="none"><Audio src={vo("0b_team")} volume={0.88} /></Sequence>
    <Sequence name="VO: no GPS" from={201} layout="none"><Audio src={vo("2a_gps")} volume={0.88} /></Sequence>
    <Sequence name="VO: no rescue" from={285} layout="none"><Audio src={vo("2b_rescue")} volume={0.88} /></Sequence>
    <Sequence name="VO: twenty minutes" from={335} layout="none"><Audio src={vo("2c_help")} volume={0.88} /></Sequence>
    <Sequence name="VO: what RedStep does" from={417} layout="none"><Audio src={vo("3_demo")} volume={0.88} /></Sequence>
    <Sequence name="VO: come home" from={691} layout="none"><Audio src={vo("4a_home")} volume={0.88} /></Sequence>
    <Sequence name="VO: RedStep" from={805} layout="none"><Audio src={vo("4b_name")} volume={0.88} /></Sequence>

    <Sequence name="Score: organ" layout="none">
      <Audio src={sfx("organ_bed")} trimBefore={60} volume={(f) => interpolate(f, [0, 30, 655, 715, 835, 870], [0, 0.28, 0.28, 0.2, 0.2, 0], clamp)} />
    </Sequence>
    <Sequence name="Score: final swell" from={655} durationInFrames={215} layout="none">
      <Audio src={sfx("swell")} volume={(f) => interpolate(f, [0, 180, 215], [0.45, 0.45, 0], clamp)} />
    </Sequence>
    <Sequence name="Score: clock under the problem" from={195} durationInFrames={210} layout="none"><Audio src={sfx("tick")} volume={0.4} /></Sequence>
    <Sequence name="SFX: hit on the opening title" durationInFrames={90} layout="none"><Audio src={sfx("hit")} volume={0.26} /></Sequence>
    <Sequence name="SFX: hit cut 1" from={195} durationInFrames={80} layout="none"><Audio src={sfx("hit")} volume={0.26} /></Sequence>
    <Sequence name="SFX: hit cut 2" from={277} durationInFrames={54} layout="none"><Audio src={sfx("hit")} volume={0.26} /></Sequence>
    <Sequence name="SFX: hit cut 3" from={331} durationInFrames={74} layout="none"><Audio src={sfx("hit")} volume={0.26} /></Sequence>
    <Sequence name="SFX: whoosh into demo" from={377} layout="none"><Audio src={sfx("whoosh")} volume={0.4} /></Sequence>
    <Sequence name="SFX: hit on the name" from={799} durationInFrames={71} layout="none"><Audio src={sfx("hit")} volume={0.26} /></Sequence>
  </AbsoluteFill>
);
