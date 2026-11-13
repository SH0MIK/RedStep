import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Finish } from "./fx";

// 3 seconds. Black, the eye opens, the camera falls into the pupil.
export const Film01Eye: React.FC = () => {
  const frame = useCurrentFrame();

  // Eyelid: a soft-edged ellipse that opens vertically.
  const lid = interpolate(frame, [10, 44], [0, 120], {
    easing: Easing.bezier(0.6, 0, 0.2, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Push into the pupil. Exponential so it reads as accelerating.
  const push = interpolate(frame, [46, 86], [0, 1], {
    easing: Easing.bezier(0.7, 0, 1, 0.6),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = 1.04 * Math.pow(26, push);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill
        style={{
          maskImage: `radial-gradient(ellipse 130% ${lid}% at 50% 50%, #000 55%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(ellipse 130% ${lid}% at 50% 50%, #000 55%, transparent 100%)`,
        }}
      >
        <Img
          name="Still: eye"
          src={staticFile("film/eye.png")}
          style={{
            width: 1920,
            height: 1080,
            // The pupil sits at the centre of this still; change this if you swap it.
            transformOrigin: "50.1% 49.9%",
            scale,
          }}
        />
      </AbsoluteFill>
      <Finish />
      {/* Guarantees pure black on the last frames before the cut. */}
      <AbsoluteFill
        style={{
          backgroundColor: "#000",
          opacity: interpolate(frame, [80, 86], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
