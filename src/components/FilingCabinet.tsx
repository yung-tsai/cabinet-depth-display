import { useState } from "react";

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

  const total = folders.length;
  const minW = 330;
  const maxW = 510;
  const rowH = 22;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#f0efec", fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      <div className="relative" style={{ width: maxW, height: total * rowH + 20, marginTop: 30 }}>
        {/* Paper element — rendered separately so z-index works across rows */}
        {hoveredIdx !== null && (() => {
          const i = hoveredIdx;
          const w = minW + (maxW - minW) * (i / (total - 1));
          const offsetX = (maxW - w) / 2;
          const paperBottom = i * rowH; // bottom flush with hovered folder's body top
          const paperW = w * 0.8;
          const paperLeft = offsetX + w * 0.1;
          // Paper extends from hovered folder body top, upward past the cabinet
          const paperTop = -80; // extend above the cabinet
          const paperHeight = paperBottom - paperTop;

          return (
            <div
              style={{
                position: "absolute",
                left: paperLeft,
                width: paperW,
                top: paperTop,
                height: paperHeight,
                backgroundColor: "#fff",
                borderRadius: "3px 3px 0 0",
                boxShadow: "0 -4px 12px rgba(0,0,0,0.06)",
                zIndex: 0, // behind all folder rows
                transition: "top 0.3s ease, height 0.3s ease, left 0.3s ease, width 0.3s ease",
                pointerEvents: "none",
              }}
            />
          );
        })()}

        {folders.map((f, i) => {
          const w = minW + (maxW - minW) * (i / (total - 1));
          
          const offsetX = (maxW - w) / 2;
          const top = i * rowH;

          const positions: Array<"left" | "center" | "right"> = ["left", "center", "right"];
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
                zIndex: i + 1,
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tab */}
              <div
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
                }}
              >
                <span>{f.label}</span>
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

    </div>
  );
};

export default FilingCabinet;
