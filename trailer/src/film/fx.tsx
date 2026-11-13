import { AbsoluteFill, random, useCurrentFrame } from "remotion";

/**
 * Drifting Martian dust: fractal noise tinted orange, sliding sideways.
 * `density` 0..1 is how thick it is; `speed` is pixels per frame.
 */
export const Dust: React.FC<{ density?: number; speed?: number; seed?: number }> = ({
  density = 0.3,
  speed = 3,
  seed = 4,
}) => {
  const frame = useCurrentFrame();
  const id = `dust-${seed}`;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: density, mixBlendMode: "screen" }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <filter id={id} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0022 0.009"
              numOctaves={4}
              seed={seed}
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.86  0 0 0 0 0.48  0 0 0 0 0.26  1.9 0 0 0 -0.75"
            />
          </filter>
        </defs>
        <rect
          x={-frame * speed}
          y={0}
          width={1920 + 4000}
          height={1080}
          filter={`url(#${id})`}
        />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * Handheld / helmet-cam shake. `amount` is the peak offset in pixels.
 * Smooth (interpolated between random targets) so it reads as a body moving,
 * not as jitter.
 */
export const useShake = (amount: number, seed = "s") => {
  const frame = useCurrentFrame();
  const step = 5;
  const i = Math.floor(frame / step);
  const t = (frame % step) / step;
  const ease = t * t * (3 - 2 * t);
  const at = (n: number, axis: string) => (random(`${seed}-${axis}-${n}`) - 0.5) * 2;
  const x = (at(i, "x") + (at(i + 1, "x") - at(i, "x")) * ease) * amount;
  const y = (at(i, "y") + (at(i + 1, "y") - at(i, "y")) * ease) * amount;
  const r = (at(i, "r") + (at(i + 1, "r") - at(i, "r")) * ease) * amount * 0.03;
  return { x, y, r };
};

/** Film grain + vignette that sits over every shot. */
export const Finish: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      <svg width="1920" height="1080" style={{ opacity: 0.09, mixBlendMode: "overlay" }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={frame % 60} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="1920" height="1080" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};
