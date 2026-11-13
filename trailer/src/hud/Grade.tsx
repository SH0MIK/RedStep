import { AbsoluteFill } from "remotion";
import { NAVY } from "../theme";

/**
 * The shared look that sits on top of every clip: a navy wash so mixed NASA
 * sources read as one film, a vignette, and 2.39:1 letterbox bars.
 * `tint` is how strong the navy wash is (0 = footage untouched).
 */
export const Grade: React.FC<{ tint?: number; letterbox?: boolean }> = ({
  tint = 0.35,
  letterbox = false,
}) => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{ backgroundColor: NAVY, opacity: tint, mixBlendMode: "multiply" }}
      />
      <AbsoluteFill
        style={{ backgroundColor: "#0a2a55", opacity: tint * 0.45, mixBlendMode: "screen" }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(5,8,20,0) 45%, rgba(5,8,20,0.85) 100%)",
        }}
      />
      {letterbox ? (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 138,
              backgroundColor: "#000",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 138,
              backgroundColor: "#000",
            }}
          />
        </>
      ) : null}
    </AbsoluteFill>
  );
};

/** 2.39:1 bars. Put this after the overlays so nothing spills onto the bars. */
export const Letterbox: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 138, backgroundColor: "#000" }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 138, backgroundColor: "#000" }} />
  </AbsoluteFill>
);
