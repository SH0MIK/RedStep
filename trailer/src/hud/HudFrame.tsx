import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { CYAN, mono } from "../theme";

const Corner: React.FC<{ x: "left" | "right"; y: "top" | "bottom"; color: string }> = ({
  x,
  y,
  color,
}) => (
  <div
    style={{
      position: "absolute",
      [x]: 80,
      [y]: 178,
      width: 44,
      height: 44,
      [`border${y === "top" ? "Top" : "Bottom"}`]: `2px solid ${color}`,
      [`border${x === "left" ? "Left" : "Right"}`]: `2px solid ${color}`,
      opacity: 0.8,
    }}
  />
);

/**
 * Corner brackets, a running mission clock and a slow scan line.
 * Purely decorative; the on-screen copy lives in each scene file.
 */
export const HudFrame: React.FC<{ color?: string; label?: string }> = ({
  color = CYAN,
  label = "REDSTEP NAV",
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const seconds = (frame / fps).toFixed(2).padStart(5, "0");
  const scanY = 150 + ((frame * 5) % (height - 300));

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <Corner x="left" y="top" color={color} />
      <Corner x="right" y="top" color={color} />
      <Corner x="left" y="bottom" color={color} />
      <Corner x="right" y="bottom" color={color} />
      <div
        style={{
          position: "absolute",
          top: 184,
          right: 144,
          fontFamily: mono,
          fontSize: 22,
          letterSpacing: 3,
          color,
          opacity: 0.75,
        }}
      >
        {label} · T+{seconds}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanY,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.18,
        }}
      />
    </AbsoluteFill>
  );
};
