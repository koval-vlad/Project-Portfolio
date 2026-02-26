import { useState, useRef, useCallback } from "react";

interface PapyrusScrollProps {
  title: string;
  /** Optional element shown to the left of the title (e.g. a flag) */
  titleLeft?: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  /** When set, the image is clickable and this is called with imageSrc */
  onImageClick?: (imageSrc: string) => void;
  children: React.ReactNode;
}

export default function PapyrusScroll({ title, titleLeft, imageSrc, imageAlt = "scroll image", onImageClick, children }: PapyrusScrollProps) {
  const [expanded, setExpanded] = useState(false);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dy) > 30) setExpanded(dy > 0);
    else setExpanded(v => !v);
    touchStartY.current = null;
  }, []);

  const toggle = useCallback(() => setExpanded(v => !v), []);

  const ROD = "linear-gradient(180deg, #d4a050 0%, #8a5420 35%, #c49040 55%, #7a4818 80%, #b07838 100%)";
  const CAP_L = "radial-gradient(ellipse at 38% 32%, #f0c870 0%, #9a6228 55%, #4a2c08 100%)";
  const CAP_R = "radial-gradient(ellipse at 62% 32%, #f0c870 0%, #9a6228 55%, #4a2c08 100%)";
  /* Subtle parchment lines overlay; main background is theme-aware via className */
  const PARCHMENT_LINES = `
    repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(139,100,50,0.06) 18px,rgba(139,100,50,0.06) 19px),
    repeating-linear-gradient(90deg,transparent,transparent 24px,rgba(139,100,50,0.04) 24px,rgba(139,100,50,0.04) 25px)
  `;

  const cap = (side: "left" | "right", h = 42, w = 24): React.CSSProperties => ({
    position: "absolute", top: "50%", [side]: -10,
    transform: "translateY(-50%)",
    width: w, height: h, borderRadius: "50%",
    background: side === "left" ? CAP_L : CAP_R,
    boxShadow: `${side === "left" ? "2px" : "-2px"} 0 8px rgba(0,0,0,0.7)`,
    zIndex: 4,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif", userSelect: "none", width: "100%", maxWidth: 440 }}>

      {/* TITLE BANNER - theme aware */}
      <div
        style={{
          width: "calc(100% - 20px)",
          backgroundColor: "var(--accent)",
          border: "2px solid #c08030",
          borderBottom: "none",
          borderRadius: "8px 8px 0 0",
          padding: "10px 20px 9px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          justifyContent: "center",
          textAlign: titleLeft ? "left" : "center",
        }}
      >
        {titleLeft && <span style={{ flexShrink: 0 }}>{titleLeft}</span>}
        <span style={{ color: "var(--foreground)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", display: "block", lineHeight: 1.5, textShadow: "0 1px 2px rgba(0,0,0,0.3)", flex: titleLeft ? 1 : undefined }}>
          {title}
        </span>
      </div>

      {/* TOP ROD */}
      <div style={{ position: "relative", width: "100%", height: 34, zIndex: 3 }}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)", height: 28, borderRadius: 14, background: ROD, boxShadow: "0 4px 14px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,220,150,0.5)" }} />
        <div style={cap("left")} />
        <div style={cap("right")} />
      </div>

      {/* PARCHMENT - same theme/mode as FuturisticCard text area: bg-card/10 backdrop-blur-xl */}
      <div style={{ position: "relative", width: "100%", zIndex: 2 }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div style={{ height: 6, background: "linear-gradient(180deg,rgba(80,40,5,0.35) 0%,transparent 100%)" }} />
        <div
          className="bg-card/10 backdrop-blur-xl"
          style={{
            backgroundImage: PARCHMENT_LINES,
            padding: "8px 22px 0",
            overflow: "hidden",
            border: "2px solid #c08030",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 8px" }}>
            {onImageClick ? (
              <div
                role="button"
                tabIndex={0}
                onClick={() => onImageClick(imageSrc)}
                onKeyDown={(e) => e.key === "Enter" && onImageClick(imageSrc)}
                style={{ width: "100%", maxWidth: 400, cursor: "pointer", display: "block" }}
              >
                <img src={imageSrc} alt={imageAlt} style={{ width: "100%", borderRadius: 4, boxShadow: "0 4px 18px rgba(80,40,0,0.38)", display: "block", transition: "opacity 0.2s ease" }} className="hover:opacity-80" />
              </div>
            ) : (
              <img src={imageSrc} alt={imageAlt} style={{ width: "100%", maxWidth: 400, borderRadius: 4, boxShadow: "0 4px 18px rgba(80,40,0,0.38)", display: "block" }} />
            )}
          </div>
          <div style={{ overflow: "hidden", maxHeight: expanded ? 800 : 0, opacity: expanded ? 1 : 0, transition: "max-height 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease", color: "var(--foreground)", fontSize: 14.5, lineHeight: 1.78, paddingBottom: 14 }}>
            <div style={{ width: "55%", height: 1, margin: "10px auto 14px", background: "linear-gradient(90deg,transparent,var(--foreground),transparent)" }} />
            {children}
          </div>
        </div>
        <div style={{ height: 20, background: "linear-gradient(0deg,#7a4010 0%,#b07030 25%,#d0a050 50%,#b07030 75%,#7a4010 100%)", boxShadow: "inset 0 4px 8px rgba(0,0,0,0.22)" }} />
      </div>

      {/* BOTTOM ROD + BUTTON */}
      <div style={{ position: "relative", width: "100%", height: 34, zIndex: 1 }}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)", height: 28, borderRadius: 14, background: ROD, boxShadow: "0 6px 16px rgba(0,0,0,0.65)" }} />
        <div style={cap("left", 38, 22)} />
        <div style={cap("right", 38, 22)} />
        <button
          type="button"
          onClick={toggle}
          style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            zIndex: 5,
            background: "var(--accent)",
            border: "1px solid var(--primary)", borderRadius: 10,
            padding: "3px 14px", cursor: "pointer",
            fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--foreground)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            whiteSpace: "nowrap",
          }}
        >
          {expanded ? "▲ Roll Up" : "▼ Unroll"}
        </button>
      </div>
    </div>
  );
}


