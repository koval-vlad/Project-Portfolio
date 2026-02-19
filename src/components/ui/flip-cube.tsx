import { useState, useRef, useLayoutEffect } from "react";
import type { FC, KeyboardEvent, TouchEvent, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

const MOBILE_PADDING = 80;
const MIN_CUBE_SIZE = 260;

// ─────────────────────────────────────────────────────────────────────────────
// FlipCube
// ─────────────────────────────────────────────────────────────────────────────
// Layout of the 6 faces:
//
//   FRONT  (translateZ +half)           → Image
//   BACK   (rotateY180 translateZ +half) → Text   [directly opposite Front]
//   RIGHT  (rotateY90  translateZ +half) → Purple
//   LEFT   (rotateY-90 translateZ +half) → Purple
//   TOP    (rotateX-90 translateZ +half) → Purple
//   BOTTOM (rotateX90  translateZ +half) → Purple
//
// Rotation axis: Y
//   Showing image  → cubeY = 0   (or 360 after a full round-trip)
//   Showing text   → cubeY = 180 (passes through RIGHT purple at 90deg)
//   Next hover back → cubeY = 360 (passes through LEFT purple at 270deg)
//   … always increments by 180, so direction alternates naturally.
// ─────────────────────────────────────────────────────────────────────────────

interface FlipCubeProps {
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  /** Side length in px */
  size?: number;
  /** Accent color - defaults to CSS var(--primary) */
  accentColor?: string;
  /** Custom React node for front face (overrides image if provided) */
  frontContent?: ReactNode;
  /** Custom React node for back face (overrides title+description if provided) */
  backContent?: ReactNode;
  className?: string;
  /** Show border + glow like FuturisticCard */
  showBorderGlow?: boolean;
  /** Font scale for content (0.9 = slightly smaller to fit more text) */
  fontScale?: number;
}

export const FlipCube: FC<FlipCubeProps> = ({
  image = "",
  imageAlt = "",
  title = "",
  description = "",
  size = 280,
  frontContent,
  backContent,
  className,
  showBorderGlow = false,
  fontScale = 1,
}) => {
  // We keep an ever-increasing rotation angle so CSS transition always goes
  // in the same direction (no snapping back). Each hover adds +180 deg.
  const totalRotation = useRef<number>(0);
  const [displayRotation, setDisplayRotation] = useState<number>(0);
  const [rotating, setRotating] = useState<boolean>(false);
  const [effectiveSize, setEffectiveSize] = useState(size);

  useLayoutEffect(() => {
    const updateSize = () => {
      const maxViewport = Math.min(window.innerWidth - MOBILE_PADDING, window.innerHeight - 200);
      const capped = Math.max(MIN_CUBE_SIZE, Math.min(size, maxViewport));
      setEffectiveSize(capped);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [size]);

  const flip = (): void => {
    if (rotating) return;
    setRotating(true);
    totalRotation.current += 180;
    setDisplayRotation(totalRotation.current);
    setTimeout(() => setRotating(false), 800);
  };

  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  };
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>): void => {
    const touch = e.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) flip();
  };
  const handleMouseEnter = (): void => flip();
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" || e.key === " ") flip();
  };

  const half = effectiveSize / 2;

  const face = (transform: string, extra: CSSProperties = {}): CSSProperties => ({
    position: "absolute",
    width: effectiveSize,
    height: effectiveSize,
    transform,
    overflow: "hidden",
    boxSizing: "border-box",
    borderRadius: "0.75rem",
    ...extra,
  });

  const goldLine: CSSProperties = {
    flexShrink: 0,
    width: 40,
    height: 2,
    background: "linear-gradient(90deg, #c8a96e, #f0d898)",
    borderRadius: 2,
  };

  // Current step (0 = image showing, 1 = text showing, cycles)
  const showingText = (Math.round(displayRotation / 180) % 2) === 1;

  const cubeRoot = (
    <div
      className={cn(
        "rounded-xl bg-card/10 backdrop-blur-xl relative",
        className
      )}
      style={{
        width: effectiveSize,
        height: effectiveSize,
        perspective: effectiveSize * 3.5,
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      aria-label={showingText ? `${title} — hover to flip back` : `${imageAlt} — hover to see info`}
      onKeyDown={handleKeyDown}
    >
      {/* ── Cube container ── */}
      <div
        style={{
          width: effectiveSize,
          height: effectiveSize,
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.85s cubic-bezier(0.45, 0.05, 0.25, 1)",
          transform: `rotateY(${displayRotation}deg)`,
          background: "var(--background)",
        }}
      >
        {/* Border + glow: in front of front face */}
        {showBorderGlow && (
          <div
            className="absolute pointer-events-none rounded-xl"
            style={{
              left: -2,
              top: -2,
              width: effectiveSize + 4,
              height: effectiveSize + 4,
              transform: `translateZ(${half + 1}px)`,
              border: "2px solid var(--primary)",
              boxShadow: "0 0 20px 4px rgba(108,99,255,0.45), 0 12px 28px -8px rgba(0,0,0,0.35)",
            }}
            aria-hidden
          />
        )}
        {/* Border + glow: in front of back face */}
        {showBorderGlow && (
          <div
            className="absolute pointer-events-none rounded-xl"
            style={{
              left: -2,
              top: -2,
              width: effectiveSize + 4,
              height: effectiveSize + 4,
              transform: `rotateY(180deg) translateZ(${half + 1}px)`,
              border: "2px solid var(--primary)",
              boxShadow: "0 0 20px 4px rgba(108,99,255,0.45), 0 12px 28px -8px rgba(0,0,0,0.35)",
            }}
            aria-hidden
          />
        )}
        {/* ── FRONT: Image or Custom Content ── */}
        <div
          className="bg-card/10 backdrop-blur-xl flip-cube-face"
          style={face(`translateZ(${half}px)`, {
            display: "flex",
            flexDirection: "column",
            ["--cube-size" as string]: `${effectiveSize}px`,
            ["--cube-font-scale" as string]: `${fontScale}`,
          })}
        >
          {frontContent ? (
            frontContent
          ) : (
            <img
              src={image}
              alt={imageAlt}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              draggable={false}
            />
          )}
        </div>

        {/* ── BACK: Text or Custom Content ── */}
        <div
          className="bg-card flip-cube-face"
          style={face(`rotateY(180deg) translateZ(${half}px)`, {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",
            padding: 0,
            overflow: "hidden",
            ["--cube-size" as string]: `${effectiveSize}px`,
            ["--cube-font-scale" as string]: `${fontScale}`,
          })}
        >
          {backContent ? (
            backContent
          ) : (
            <>
              <div style={{ ...goldLine, marginBottom: 20 }} />
              <h3 style={{
                margin: "0 0 14px",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: Math.max(16, effectiveSize * 0.08),
                fontWeight: "normal",
                color: "var(--primary-foreground)",
                letterSpacing: "0.06em",
              }}>
                {title}
              </h3>
              <div style={{
                width: 24, height: 1,
                background: "rgba(200,169,110,0.45)",
                margin: "0 auto 14px",
              }} />
              <p style={{
                margin: 0,
                fontFamily: "'Georgia', serif",
                fontSize: Math.max(11, effectiveSize * 0.048),
                lineHeight: 1.8,
                color: "var(--primary-foreground)",
                opacity: 0.9,
                whiteSpace: "pre-line",
                letterSpacing: "0.02em",
              }}>
                {description}
              </p>
              <div style={{ ...goldLine, marginTop: 20 }} />
            </>
          )}
        </div>

        {/* ── RIGHT, LEFT, TOP, BOTTOM: solid theme background (no see-through during spin) ── */}
        <div style={face(`rotateY(90deg) translateZ(${half}px)`, { background: "var(--background)" })} />
        <div style={face(`rotateY(-90deg) translateZ(${half}px)`, { background: "var(--background)" })} />
        <div style={face(`rotateX(90deg) translateZ(${half}px)`, { background: "var(--background)" })} />
        <div style={face(`rotateX(-90deg) translateZ(${half}px)`, { background: "var(--background)" })} />
      </div>
    </div>
  );

  return cubeRoot;
};
