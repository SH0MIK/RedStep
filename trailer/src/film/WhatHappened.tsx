import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import "../theme";
import { Film01Eye } from "./Film01Eye";
import {
  Film02Landing,
  Film03Footsteps,
  Film04Danger,
  Film05Aftermath,
} from "./FilmScenes";

// 25 seconds at 30 fps = 750 frames.
// Picture: every scene ends three frames early, leaving pure black before the
// next one starts (the hard black cuts). Nothing cross-fades.
// Sound: every layer is its own <Audio>; change `volume`, move the Sequence, or
// swap the file. All sound in scene 4 stops at frame 592, eight frames before
// the picture cuts.
export const WhatHappened: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {/* ---------- Picture ---------- */}
    <Sequence name="01 The eye"  durationInFrames={87}>
      <Film01Eye />
    </Sequence>
    <Sequence name="02 Landing on Mars" from={90} durationInFrames={147}>
      <Film02Landing />
    </Sequence>
    <Sequence name="03 The first footsteps" from={240} durationInFrames={147}>
      <Film03Footsteps />
    </Sequence>
    <Sequence name="04 The descent into danger" from={390} durationInFrames={207}>
      <Film04Danger />
    </Sequence>
    <Sequence name="05 The aftermath" from={600} durationInFrames={90}>
      <Film05Aftermath />
    </Sequence>

    {/* ---------- Sound: scene 1 ---------- */}
    <Sequence name="SFX impact (open)" from={2} durationInFrames={80} layout="none">
      <Audio src={staticFile("film/audio/impact.wav")} volume={1} />
    </Sequence>
    <Sequence name="SFX metallic riser"  durationInFrames={87} layout="none">
      <Audio src={staticFile("film/audio/riser.wav")} volume={0.55} />
    </Sequence>
    <Sequence name="SFX impact (into the pupil)" from={82} durationInFrames={110} layout="none">
      <Audio src={staticFile("film/audio/impact.wav")} volume={1} />
    </Sequence>

    {/* ---------- Sound: scene 2 ---------- */}
    <Sequence name="SFX drone" from={90} durationInFrames={147} layout="none">
      <Audio src={staticFile("film/audio/drone.wav")} volume={0.7} />
    </Sequence>
    <Sequence name="SFX landing rumble" from={90} durationInFrames={147} layout="none">
      <Audio src={staticFile("film/audio/rumble.wav")} volume={0.8} />
    </Sequence>
    <Sequence name="SFX mechanical vibration" from={90} durationInFrames={147} layout="none">
      <Audio src={staticFile("film/audio/mechanical.wav")} volume={0.5} />
    </Sequence>

    {/* ---------- Sound: scene 3 ---------- */}
    <Sequence name="SFX breathing (calm)" from={240} durationInFrames={147} layout="none">
      <Audio src={staticFile("film/audio/breath_calm.wav")} volume={0.9} />
    </Sequence>
    <Sequence name="SFX boot on dust" from={258} durationInFrames={18} layout="none">
      <Audio src={staticFile("film/audio/step.wav")} volume={0.9} />
    </Sequence>
    <Sequence name="SFX helmet hum" from={240} durationInFrames={147} layout="none">
      <Audio src={staticFile("film/audio/mechanical.wav")} volume={0.3} />
    </Sequence>
    <Sequence name="SFX warning tone (quiet)" from={300} durationInFrames={87} layout="none">
      <Audio src={staticFile("film/audio/warning.wav")} volume={0.1} />
    </Sequence>

    {/* ---------- Sound: scene 4 (everything stops at 592) ---------- */}
    <Sequence name="SFX breathing (heavy)" from={390} durationInFrames={202} layout="none">
      <Audio src={staticFile("film/audio/breath_heavy.wav")} volume={0.85} />
    </Sequence>
    <Sequence name="SFX wind" from={390} durationInFrames={202} layout="none">
      <Audio src={staticFile("film/audio/wind.wav")} volume={0.9} />
    </Sequence>
    <Sequence name="SFX low pulses" from={390} durationInFrames={202} layout="none">
      <Audio src={staticFile("film/audio/pulse.wav")} volume={0.5} />
    </Sequence>
    <Sequence name="SFX rising tension" from={390} durationInFrames={202} layout="none">
      <Audio src={staticFile("film/audio/tension.wav")} volume={0.9} />
    </Sequence>
    <Sequence name="SFX warning tone" from={390} durationInFrames={202} layout="none">
      <Audio src={staticFile("film/audio/warning.wav")} volume={0.22} />
    </Sequence>

    {/* ---------- Sound: scene 5 ---------- */}
    <Sequence name="SFX aftermath rumble" from={600} durationInFrames={90} layout="none">
      <Audio src={staticFile("film/audio/aftermath.wav")} volume={0.35} />
    </Sequence>
  </AbsoluteFill>
);
