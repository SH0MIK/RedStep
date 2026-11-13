import { Easing, interpolate, useCurrentFrame } from "remotion";
import { CYAN } from "../theme";

/**
 * An SVG path that draws itself on, with a glowing head dot.
 * `d` is a normal SVG path in 1920x1080 space, so it can be redrawn in any
 * vector tool and pasted back in.
 */
export const RoutePath: React.FC<{
  d: string;
  start?: number;
  duration?: number;
  color?: string;
  width?: number;
  dashed?: boolean;
  opacity?: number;
}> = ({ d, start = 0, duration = 45, color = CYAN, width = 5, dashed = false, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [start, start + duration], [0, 1], {
    easing: Easing.bezier(0.3, 0, 0.1, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }}
    >
      <defs>
        <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <mask id={`reveal-${start}-${duration}`}>
          <path
            d={d}
            fill="none"
            stroke="#fff"
            strokeWidth={width + 30}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - progress}
          />
        </mask>
      </defs>
      <g mask={`url(#reveal-${start}-${duration})`}>
        <path d={d} fill="none" stroke={color} strokeWidth={width * 2.4} filter="url(#route-glow)" opacity={0.7} />
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeDasharray={dashed ? "18 14" : undefined}
        />
      </g>
    </svg>
  );
};
