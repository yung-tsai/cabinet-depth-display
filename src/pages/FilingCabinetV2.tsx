import { useState, useEffect, useCallback } from "react";

interface FolderData {
  label: string;
  isSection?: boolean;
  description?: string;
}

const folders: FolderData[] = [
  { label: "Folder", description: "Project overview & goals" },
  { label: "Folder", description: "Research notes" },
  { label: "Section", isSection: true, description: "Design System" },
  { label: "Folder", description: "Wireframes & mockups" },
  { label: "Folder", description: "Brand guidelines" },
  { label: "Folder", description: "Typography specs" },
  { label: "Folder", description: "Color palette" },
  { label: "Folder", description: "Component library" },
  { label: "Folder", description: "Icon set" },
  { label: "Folder", description: "Layout templates" },
  { label: "Section", isSection: true, description: "Development" },
  { label: "Folder", description: "Frontend architecture" },
  { label: "Folder", description: "API documentation" },
  { label: "Folder", description: "Database schema" },
  { label: "Folder", description: "Testing strategy" },
  { label: "Section", isSection: true, description: "Content" },
  { label: "Folder", description: "Copy & messaging" },
  { label: "Folder", description: "Image assets" },
  { label: "Folder", description: "Video scripts" },
  { label: "Folder", description: "Social media plan" },
  { label: "Folder", description: "SEO keywords" },
  { label: "Section", isSection: true, description: "Operations" },
  { label: "Folder", description: "Budget & expenses" },
  { label: "Folder", description: "Timeline & milestones" },
  { label: "Folder", description: "Team assignments" },
  { label: "Folder", description: "Meeting notes" },
  { label: "Folder", description: "Client feedback" },
  { label: "Folder", description: "Legal documents" },
  { label: "Folder", description: "Archive" },
  { label: "Section", isSection: true, description: "Reports" },
];

const FilingCabinetV2 = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [visibleFolders, setVisibleFolders] = useState<Set<number>>(new Set());

  const total = folders.length;
  const staggerDelay = 15;

  const cascadeIn = useCallback(() => {
    for (let i = 0; i < total; i++) {
      const folderIdx = total - 1 - i;
      setTimeout(() => {
        setVisibleFolders((prev) => new Set(prev).add(folderIdx));
      }, i * staggerDelay);
    }
  }, [total]);

  const cascadeOut = useCallback(() => {
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
    cascadeOut();
    setTimeout(() => {
      cascadeIn();
    }, total * staggerDelay + 50);
  }, [cascadeIn, cascadeOut, total]);

  const handleBackdropClick = useCallback(() => {
    if (expandedIdx !== null) {
      handleClose();
    }
  }, [expandedIdx, handleClose]);

  const handleFolderClick = useCallback((idx: number) => {
    setExpandedIdx(idx);
    setHoveredIdx(null);
  }, []);

  const minW = 330;
  const maxW = 510;
  const rowH = 22;
  const slideUpAmount = 30; // how far the folder slides up on hover

  const isExpanded = expandedIdx !== null;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#f0efec", fontFamily: "system-ui, -apple-system, sans-serif" }}
      onClick={handleBackdropClick}
    >
      {/* Expanded folder overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          onClick={handleBackdropClick}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 420,
              height: 520,
              backgroundColor: "#fff",
              borderRadius: 8,
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              animation: "folderExpand 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: "#1a1a1a" }}>
                {folders[expandedIdx!].isSection
                  ? `Section ${expandedIdx! + 1}`
                  : `Folder ${expandedIdx! + 1}`}
              </span>
              <span
                onClick={handleClose}
                style={{
                  fontSize: 13,
                  color: "#888",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: 4,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Close
              </span>
            </div>
            <div style={{ fontSize: 14, color: "#666" }}>
              {folders[expandedIdx!].description}
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: "#fafaf9",
                borderRadius: 6,
                border: "1px solid #e5e5e3",
              }}
            />
          </div>
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
          let tabLeft: number;
          if (tabPos === "left") tabLeft = 14;
          else if (tabPos === "right") tabLeft = w - tabWidth - 14;
          else tabLeft = (w - tabWidth) / 2;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top,
                left: offsetX,
                width: w,
                height: rowH,
                zIndex: isHovered ? total + 10 : i + 1,
                transform: isVisible
                  ? isHovered
                    ? `translateY(-${slideUpAmount}px)`
                    : "translateY(0)"
                  : "translateY(40px)",
                opacity: isVisible ? 1 : 0,
                transition:
                  "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
                cursor: isHovered ? "pointer" : "default",
              }}
              onClick={(e) => {
                if (isHovered) {
                  e.stopPropagation();
                  handleFolderClick(i);
                }
              }}
            >
              {/* Tab — hover target */}
              <div
                onMouseEnter={() => !isExpanded && setHoveredIdx(i)}
                onMouseLeave={() => !isExpanded && setHoveredIdx(null)}
                style={{
                  position: "absolute",
                  left: tabLeft,
                  top: -14,
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
                  fontSize: "11px",
                  color: f.isSection ? "#fff" : "#555",
                  fontWeight: f.isSection ? 500 : 400,
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  zIndex: 3,
                }}
              >
                <span>{f.isSection ? `Section ${i + 1}` : `Folder ${i + 1}`}</span>
              </div>

              {/* Folder body — shows description text when slid up */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: rowH + slideUpAmount,
                  backgroundColor: f.isSection ? "#2a2a2a" : "#f3f2ef",
                  borderTop: f.isSection ? "none" : "1px solid #d0cfcc",
                  borderLeft: `1px solid ${f.isSection ? "#333" : "#d0cfcc"}`,
                  borderRight: `1px solid ${f.isSection ? "#333" : "#d0cfcc"}`,
                  boxShadow: isHovered
                    ? "0 -2px 12px rgba(0,0,0,0.08)"
                    : "0 -1px 0 rgba(255,255,255,0.4)",
                  zIndex: 2,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "flex-end",
                  paddingBottom: 4,
                  paddingLeft: 12,
                  paddingRight: 12,
                }}
              >
                {/* Text content revealed when folder slides up */}
                <span
                  style={{
                    fontSize: 11,
                    color: f.isSection ? "#aaa" : "#888",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.25s ease",
                    transform: isHovered ? "translateY(0)" : "translateY(4px)",
                  }}
                >
                  {f.description}
                </span>
              </div>
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
        @keyframes folderExpand {
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

export default FilingCabinetV2;
