import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import "../theme";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#/<>";

// Letters resolve left to right out of scrambled glyphs.
const decode = (text: string, progress: number, frame: number, seed: string) =>
  text
    .split("")
    .map((ch, i) => {
      if (ch === " ") return " ";
      if (i / text.length < progress) return ch;
      return GLYPHS[Math.floor(random(`${seed}-${i}-${Math.floor(frame / 2)}`) * GLYPHS.length)];
    })
    .join("");

/**
 * Digital nameplate: a bracket snaps open, the name decodes, the role types on.
 * `x`/`y` are the plate's anchor corner in 1920x1080 space.
 * `targetX`/`targetY` (optional) draw a leader line to the person.
 * `at` is the frame (inside the parent Sequence) the plate appears.
 */
export const Nameplate: React.FC<{
  name: string;
  role: string;
  x: number;
  y: number;
  at?: number;
  align?: "left" | "right";
  targetX?: number;
  targetY?: number;
  id?: string;
}> = ({ name, role, x, y, at = 0, align = "left", targetX, targetY, id = "01" }) => {
  const frame = useCurrentFrame() - at;
  if (frame < 0) return null;

  const open = interpolate(frame, [0, 12], [0, 1], {
    easing: Easing.bezier(0.2, 0, 0, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameProgress = interpolate(frame, [6, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const roleChars = Math.floor(
    interpolate(frame, [18, 40], [0, role.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );
  const flicker = frame < 10 && frame % 3 === 0 ? 0.4 : 1;
  const right = align === "right";
  const lineEndX = right ? x - 6 : x + 6;

  return (
    <>
      {targetX !== undefined && targetY !== undefined ? (
        <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, opacity: open * 0.9 }}>
          <line
            x1={targetX}
            y1={targetY}
            x2={targetX + (lineEndX - targetX) * open}
            y2={targetY + (y - targetY) * open}
            stroke="#00F0FF"
            strokeWidth={2}
          />
          <circle cx={targetX} cy={targetY} r={7} fill="none" stroke="#00F0FF" strokeWidth={2} />
          <circle cx={targetX} cy={targetY} r={14 + ((frame * 0.8) % 16)} fill="none" stroke="#00F0FF" strokeWidth={1.5} opacity={0.4} />
        </svg>
      ) : null}
      <div
        style={{
          position: "absolute",
          top: y,
          ...(right ? { right: 1920 - x } : { left: x }),
          opacity: flicker,
          clipPath: right ? `inset(0 0 0 ${(1 - open) * 100}%)` : `inset(0 ${(1 - open) * 100}% 0 0)`,
          padding: "16px 26px 18px 26px",
          backgroundColor: "rgba(5,8,20,0.72)",
          backdropFilter: "blur(10px)",
          borderLeft: right ? "none" : "5px solid #00F0FF",
          borderRight: right ? "5px solid #00F0FF" : "none",
          borderTop: "1px solid rgba(0,240,255,0.45)",
          borderBottom: "1px solid rgba(0,240,255,0.45)",
          boxShadow: "0 0 34px rgba(0,240,255,0.18)",
          textAlign: right ? "right" : "left",
          fontFamily: "JetBrains Mono",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 5, color: "#00F0FF", opacity: 0.75 }}>
          LOADSTONE // ID {id}
        </div>
        <div style={{ fontSize: 58, fontWeight: 700, letterSpacing: 3, color: "#FFFFFF", lineHeight: "70px" }}>
          {decode(name, nameProgress, frame, name)}
        </div>
        <div style={{ fontSize: 26, letterSpacing: 4, color: "#00F0FF", minHeight: 34 }}>
          {role.slice(0, roleChars)}
          {roleChars < role.length ? "_" : ""}
        </div>
      </div>
    </>
  );
};
