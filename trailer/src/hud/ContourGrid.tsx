import { useCurrentFrame } from "remotion";
import { CYAN } from "../theme";

/**
 * A perspective wireframe floor that scrolls toward the camera, used to make
 * orbital footage read as "being scanned".
 */
export const ContourGrid: React.FC<{ color?: string; opacity?: number; speed?: number }> = ({
  color = CYAN,
  opacity = 0.35,
  speed = 2,
}) => {
  const frame = useCurrentFrame();
  const offset = (frame * speed) % 80;

  return (
    <div
      style={{
        position: "absolute",
        left: -480,
        right: -480,
        bottom: 0,
        height: 620,
        opacity,
        transform: "perspective(900px) rotateX(62deg)",
        transformOrigin: "50% 100%",
        backgroundImage: `linear-gradient(${color} 2px, transparent 2px), linear-gradient(90deg, ${color} 2px, transparent 2px)`,
        backgroundSize: "80px 80px",
        backgroundPosition: `0px ${offset}px`,
        maskImage: "linear-gradient(to top, #000 10%, transparent 95%)",
        WebkitMaskImage: "linear-gradient(to top, #000 10%, transparent 95%)",
      }}
    />
  );
};
