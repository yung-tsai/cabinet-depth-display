import { useState, useEffect, useCallback } from "react";

interface FolderData {
  label: string;
  isSection?: boolean;
}

const folders: FolderData[] = [
  { label: "Folder" },
  { label: "Folder" },
  { label: "Section", isSection: true },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Section", isSection: true },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Section", isSection: true },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Section", isSection: true },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Folder" },
  { label: "Section", isSection: true },
];

const FilingCabinet = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [visibleFolders, setVisibleFolders] = useState<Set<number>>(new Set());
  const [reEntering, setReEntering] = useState(false);

  const total = folders.length;
  const staggerDelay = 15; // ms between each folder

  const cascadeIn = useCallback(() => {
    // Bottom to top: last folder first
    for (let i = 0; i < total; i++) {
      const folderIdx = total - 1 - i;
      setTimeout(() => {
        setVisibleFolders((prev) => new Set(prev).add(folderIdx));
      }, i * staggerDelay);
    }
  }, [total]);

  const cascadeOut = useCallback(() => {
    // Top to bottom: first folder disappears first
    for (let i = 0; i < total; i++) {
      setTimeout(() => {
        setVisibleFolders((prev) => {
          const next = new Set(prev);
          next.delete(i);
          return next;
        });
      }, i * staggerDelay);
    }
  }, [total]);

  useEffect(() => {
    const timer = setTimeout(() => cascadeIn(), 100);
    return () => clearTimeout(timer);
  }, [cascadeIn]);

  // Close on Esc
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedIdx !== null) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [expandedIdx]);

  const handleClose = useCallback(() => {
    setExpandedIdx(null);
    setReEntering(true);
    cascadeOut();
    setTimeout(() => {
      cascadeIn();
      setTimeout(() => setReEntering(false), total * staggerDelay + 300);
    }, total * staggerDelay + 50);
  }, [cascadeIn, cascadeOut, total, staggerDelay]);

  // Click outside
  const handleBackdropClick = useCallback(() => {
    if (expandedIdx !== null) {
      handleClose();
    }
  }, [expandedIdx, handleClose]);

  const handlePaperClick = useCallback((idx: number) => {
    setExpandedIdx(idx);
    setHoveredIdx(null);
  }, []);

  const minW = 330;
  const maxW = 510;
  const rowH = 22;
  const paperHeight = 60;
  const paperWidthRatio = 0.8;

  const isExpanded = expandedIdx !== null;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#f0efec", fontFamily: "system-ui, -apple-system, sans-serif" }}
      onClick={handleBackdropClick}
    >
      {/* Expanded paper overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          onClick={handleBackdropClick}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 400,
              height: 500,
              backgroundColor: "#fff",
              borderRadius: 8,
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              animation: "paperExpand 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              padding: 32,
            }}
          />
        </div>
      )}

      <div
        className="relative"
        style={{
          width: maxW,
          height: total * rowH + 20,
          marginTop: 30,
          opacity: isExpanded ? 0 : 1,
          transition: "opacity 0.3s ease",
          pointerEvents: isExpanded ? "none" : "auto",
        }}
      >
        {folders.map((f, i) => {
          const w = minW + (maxW - minW) * (i / (total - 1));
          const isHovered = hoveredIdx === i;
          const isVisible = visibleFolders.has(i);

          const offsetX = (maxW - w) / 2;
          const top = i * rowH;

          const positions = ["left", "center", "right"] as const;
          const tabPos = positions[i % 3];
          const tabWidth = f.isSection ? 120 : 100;
          const paperWidth = w * paperWidthRatio;
          const paperLeft = (w - paperWidth) / 2;
          let tabLeft: number;
          if (tabPos === "left") tabLeft = 14;
          else if (tabPos === "right") tabLeft = w - tabWidth - 14;
          else tabLeft = (w - tabWidth) / 2;

          const hoverZoneLeft = Math.min(tabLeft, paperLeft);
          const hoverZoneWidth = Math.max(tabLeft + tabWidth, paperLeft + paperWidth) - hoverZoneLeft;
          const interactionLeft = isHovered ? hoverZoneLeft : tabLeft;
          const interactionWidth = isHovered ? hoverZoneWidth : tabWidth;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top,
                left: offsetX,
                width: w,
                height: rowH,
                zIndex: i + 1,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                opacity: isVisible ? 1 : 0,
                transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
              }}
            >
              {/* Tab + Paper hover zone */}
              <div
                onMouseEnter={() => !isExpanded && setHoveredIdx(i)}
                onMouseLeave={() => !isExpanded && setHoveredIdx(null)}
                style={{
                  position: "absolute",
                  left: interactionLeft,
                  top: -14 - (isHovered ? paperHeight : 0),
                  width: interactionWidth,
                  height: rowH + 14 + (isHovered ? paperHeight : 0),
                  zIndex: 3,
                }}
              >
                {/* Paper — slides up centered between folders */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isHovered) handlePaperClick(i);
                  }}
                  style={{
                    position: "absolute",
                    left: paperLeft - interactionLeft,
                    bottom: rowH,
                    width: paperWidth,
                    height: paperHeight,
                    backgroundColor: "#fff",
                    borderRadius: "3px 3px 0 0",
                    boxShadow: isHovered ? "0 -2px 8px rgba(0,0,0,0.08)" : "none",
                    transition: "transform 0.3s ease, opacity 0.3s ease",
                    transform: isHovered ? "translateY(0)" : `translateY(${paperHeight}px)`,
                    opacity: isHovered ? 1 : 0,
                    cursor: isHovered ? "pointer" : "default",
                    pointerEvents: isHovered ? "auto" : "none",
                  }}
                />

                {/* Tab */}
                <div
                  style={{
                    position: "absolute",
                    left: tabLeft - interactionLeft,
                    bottom: 0,
                    width: tabWidth,
                    height: rowH + 14,
                    borderRadius: "6px 6px 0 0",
                    backgroundColor: f.isSection ? "#1a1a1a" : "#e8e7e4",
                    border: f.isSection ? "none" : "1px solid #c5c4c1",
                    borderBottom: "none",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingTop: 4,
                    gap: 8,
                    fontSize: "11px",
                    color: f.isSection ? "#fff" : "#555",
                    fontWeight: f.isSection ? 500 : 400,
                    letterSpacing: "0.02em",
                    cursor: "pointer",
                  }}
                >
                  <span>{f.isSection ? `Section ${i + 1}` : `Folder ${i + 1}`}</span>
                </div>
              </div>

              {/* Folder body */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: rowH,
                  backgroundColor: "#f3f2ef",
                  borderTop: "1px solid #d0cfcc",
                  borderLeft: "1px solid #d0cfcc",
                  borderRight: "1px solid #d0cfcc",
                  boxShadow: "0 -1px 0 rgba(255,255,255,0.4)",
                  zIndex: 2,
                }}
              />
            </div>
          );
        })}

        {/* Bottom edge */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: "#eeedea",
            borderRadius: "0 0 4px 4px",
            border: "1px solid #ccc",
            borderTop: "none",
          }}
        />
      </div>

      <style>{`
        @keyframes paperExpand {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FilingCabinet;
