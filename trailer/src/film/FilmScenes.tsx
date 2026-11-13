import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Dust, Finish, useShake } from "./fx";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// 5 seconds. Slow push toward the lander, tiny in a huge landscape.
export const Film02Landing: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Img
        name="Still: lander"
        src={staticFile("film/lander.png")}
        style={{
          width: 1920,
          height: 1080,
          // The lander sits just right of centre in this still.
          transformOrigin: "58% 51%",
          scale: interpolate(frame, [0, 150], [1.02, 1.22], clamp),
        }}
      />
      <Dust density={0.28} speed={2.2} seed={3} />
      <Finish />
    </AbsoluteFill>
  );
};

// 5 seconds. Boot hits the soil, then the helmet looks up and around: nothing.
export const Film03Footsteps: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = useShake(5, "step");
  // The step lands at frame 20: a short downward jolt.
  const jolt = interpolate(frame, [18, 21, 34], [0, 22, 0], {
    ...clamp,
    easing: Easing.bezier(0.2, 0, 0.3, 1),
  });
  const lookUp = frame >= 68;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {lookUp ? (
        <Img
          name="Still: empty landscape POV"
          src={staticFile("film/landscape.png")}
          style={{
            width: 1920,
            height: 1080,
            scale: 1.18,
            translate: `${interpolate(frame, [68, 150], [110, -110], {
              ...clamp,
              easing: Easing.bezier(0.4, 0, 0.6, 1),
            }) + shake.x}px ${shake.y}px`,
            rotate: `${shake.r}deg`,
          }}
        />
      ) : (
        <Img
          name="Still: boot POV"
          src={staticFile("film/boot.png")}
          style={{
            width: 1920,
            height: 1080,
            scale: interpolate(frame, [0, 68], [1.14, 1.06], clamp),
            translate: `${shake.x}px ${shake.y + jolt}px`,
            rotate: `${shake.r}deg`,
          }}
        />
      )}
      <Dust density={0.14} speed={1.5} seed={8} />
      <Finish />
    </AbsoluteFill>
  );
};

const OxygenReadout: React.FC = () => {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame / 5) % 2 === 0 ? 1 : 0.35;
  return (
    <div
      style={{
        position: "absolute",
        left: 250,
        bottom: 250,
        opacity:
          interpolate(frame, [48, 54, 92, 98], [0, 1, 1, 0], clamp) * blink,
        fontFamily: "JetBrains Mono",
        color: "#FF3B30",
        textShadow: "0 0 18px rgba(255,59,48,0.8)",
        filter: "blur(0.6px)",
        rotate: "-4deg",
      }}
    >
      <div style={{ fontSize: 26, letterSpacing: 6 }}>O2</div>
      <div style={{ fontSize: 84, fontWeight: 700, lineHeight: "84px" }}>04%</div>
      <div
        style={{
          width: 230,
          height: 8,
          marginTop: 10,
          backgroundColor: "rgba(255,59,48,0.25)",
        }}
      >
        <div style={{ width: 10, height: 8, backgroundColor: "#FF3B30" }} />
      </div>
    </div>
  );
};

// 7 seconds. The climb, the oxygen readout, the turn back, the dust closing in.
export const Film04Danger: React.FC = () => {
  const frame = useCurrentFrame();
  // Shake grows across the whole scene.
  const amount = interpolate(frame, [0, 210], [8, 34], clamp);
  const shake = useShake(amount, "climb");
  const turned = frame >= 110;
  const dust = interpolate(frame, [0, 110, 205], [0.15, 0.3, 0.62], clamp);
  // Breathing: the picture swells slightly, faster as it goes on.
  const breath = Math.sin(frame / interpolate(frame, [0, 210], [9, 4.5], clamp)) * 0.012;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {turned ? (
        <Img
          name="Still: looking back at the lander"
          src={staticFile("film/lookback.png")}
          style={{
            width: 1920,
            height: 1080,
            scale: 1.16 + breath,
            translate: `${interpolate(frame, [110, 140], [130, 0], {
              ...clamp,
              easing: Easing.bezier(0.2, 0, 0.2, 1),
            }) + shake.x}px ${shake.y}px`,
            rotate: `${shake.r}deg`,
            filter: `blur(${interpolate(frame, [150, 208], [0, 5], clamp)}px)`,
          }}
        />
      ) : (
        <Img
          name="Still: climbing POV"
          src={staticFile("film/climb.png")}
          style={{
            width: 1920,
            height: 1080,
            scale: 1.14 + breath,
            translate: `${shake.x}px ${shake.y +
              // Hauling upward in two slow, tiring heaves.
              interpolate(frame, [0, 30, 55, 85, 110], [0, 26, 4, 30, 8], clamp)}px`,
            rotate: `${shake.r}deg`,
          }}
        />
      )}
      <Dust density={dust} speed={6} seed={12} />
      <Dust density={dust * 0.5} speed={11} seed={21} />
      <OxygenReadout />
      <Finish />
      {/* Tunnel vision closing in toward the cut. */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 20%, rgba(0,0,0,0.95) 85%)",
          opacity: interpolate(frame, [150, 208], [0, 1], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

// 3 seconds. Locked off. Nothing moves but the dust.
export const Film05Aftermath: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Img
        name="Still: aftermath"
        src={staticFile("film/aftermath.png")}
        style={{ width: 1920, height: 1080 }}
      />
      <Dust density={0.3} speed={1.6} seed={30} />
      <Finish />
    </AbsoluteFill>
  );
};
