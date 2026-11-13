import { useCurrentFrame } from "remotion";
import { CYAN } from "../theme";

const R = 46;
const W = Math.sqrt(3) * R;

const hex = (cx: number, cy: number) => {
  const pts = new Array(6).fill(0).map((_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return `${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}`;
  });
  return pts.join(" ");
};

/**
 * A hexagonal scanning grid that lights up outward from a centre point.
 * `cx`/`cy` are in 1920x1080 space.
 */
export const HexGrid: React.FC<{ cx?: number; cy?: number; color?: string; radius?: number }> = ({
  cx = 960,
  cy = 540,
  color = CYAN,
  radius = 420,
}) => {
  const frame = useCurrentFrame();
  const cells: React.ReactNode[] = [];
  const wave = (frame * 9) % (radius + 200);

  for (let row = -6; row <= 6; row++) {
    for (let col = -8; col <= 8; col++) {
      const x = cx + col * W + (row % 2 === 0 ? 0 : W / 2);
      const y = cy + row * R * 1.5;
      const dist = Math.hypot(x - cx, y - cy);
      if (dist > radius) {
        continue;
      }
      const lit = Math.max(0, 1 - Math.abs(dist - wave) / 90);
      cells.push(
        <polygon
          key={`${row}-${col}`}
          points={hex(x, y)}
          fill={color}
          fillOpacity={lit * 0.16}
          stroke={color}
          strokeOpacity={0.14 + lit * 0.6}
          strokeWidth={1.5}
        />,
      );
    }
  }

  return (
    <svg
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      {cells}
    </svg>
  );
};
