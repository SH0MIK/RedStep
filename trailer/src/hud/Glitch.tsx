import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { CRIMSON, CYAN } from "../theme";

/**
 * Digital tearing: horizontal bars, an RGB-split wash and a red flash.
 * `intensity` is 0..1. Deterministic per frame, so renders match the preview.
 */
export const Glitch: React.FC<{ intensity: number }> = ({ intensity }) => {
  const frame = useCurrentFrame();
  if (intensity <= 0) {
    return null;
  }

  const bars = new Array(9).fill(0).map((_, i) => {
    const top = random(`top-${frame}-${i}`) * 1080;
    const h = 6 + random(`h-${frame}-${i}`) * 70 * intensity;
    const shift = (random(`s-${frame}-${i}`) - 0.5) * 260 * intensity;
    const isRed = random(`c-${frame}-${i}`) > 0.45;
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          top,
          left: shift,
          width: "100%",
          height: h,
          backgroundColor: isRed ? CRIMSON : CYAN,
          opacity: 0.25 + 0.5 * intensity * random(`o-${frame}-${i}`),
          mixBlendMode: "screen",
        }}
      />
    );
  });

  const flash = random(`flash-${frame}`) > 1 - 0.35 * intensity ? 0.45 * intensity : 0;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          backgroundColor: CRIMSON,
          opacity: 0.18 * intensity,
          mixBlendMode: "screen",
          translate: `${(random(`rx-${frame}`) - 0.5) * 40 * intensity}px 0px`,
        }}
      />
      {bars}
      <AbsoluteFill style={{ backgroundColor: CRIMSON, opacity: flash }} />
    </AbsoluteFill>
  );
};
