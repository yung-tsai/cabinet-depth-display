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
  const minW = 280;
  const maxW = 580;
  const rowH = 22;
  const tabH = 14;
  const cabinetPadX = 16;
  const cabinetPadTop = 24;
  const cabinetPadBottom = 12;

  const innerHeight = total * rowH + tabH;
  const cabinetHeight = innerHeight + cabinetPadTop + cabinetPadBottom;
  const cabinetWidth = maxW + cabinetPadX * 2;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#e8e8e8", fontFamily: "'SF Pro Display', system-ui, -apple-system, sans-serif" }}
    >
      {/* Cabinet frame */}
      <div
        style={{
          position: "relative",
          width: cabinetWidth,
          height: cabinetHeight,
          backgroundColor: "#d4d4d4",
          borderRadius: 6,
          border: "1px solid #aaa",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      >
        {/* Inner recessed area */}
        <div
          style={{
            position: "absolute",
            top: cabinetPadTop,
            left: cabinetPadX,
            right: cabinetPadX,
            bottom: cabinetPadBottom,
            backgroundColor: "#eaeaea",
            borderRadius: 3,
            border: "1px solid #bbb",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Folders container */}
          <div style={{ position: "relative", width: "100%", height: innerHeight }}>
            {folders.map((f, i) => {
              const progress = i / (total - 1);
              const w = minW + (maxW - minW) * progress;
              const isHovered = hoveredIdx === i;
              const anyHovered = hoveredIdx !== null;
              const offsetX = (maxW - w) / 2;
              const top = i * rowH + tabH;

              const positions: Array<"left" | "center" | "right"> = ["left", "center", "right"];
              const tabPos = positions[i % 3];
              const tabWidth = f.isSection ? 110 : 90;
              let tabLeft: number;
              if (tabPos === "left") tabLeft = 10;
              else if (tabPos === "right") tabLeft = w - tabWidth - 10;
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
                    zIndex: isHovered ? 200 : i + 1,
                    transition: "transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.25s ease, opacity 0.25s ease",
                    transform: isHovered ? "translateY(-7px)" : "none",
                    filter: anyHovered && !isHovered ? "blur(1.2px)" : "none",
                    opacity: anyHovered && !isHovered ? 0.5 : 1,
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Folder body */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: rowH,
                      backgroundColor: "#f5f5f5",
                      borderTop: "1.5px solid #c0c0c0",
                      borderLeft: "1px solid #ccc",
                      borderRight: "1px solid #ccc",
                      boxShadow: isHovered
                        ? "0 -3px 12px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.6) inset"
                        : "0 -1px 0 rgba(255,255,255,0.5) inset",
                    }}
                  />

                  {/* Tab */}
                  <div
                    style={{
                      position: "absolute",
                      left: tabLeft,
                      top: -tabH,
                      width: tabWidth,
                      height: rowH + tabH,
                      borderRadius: "5px 5px 0 0",
                      backgroundColor: f.isSection ? "#1a1a1a" : "#ebebeb",
                      border: f.isSection ? "1px solid #333" : "1px solid #bbb",
                      borderBottom: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10.5,
                      fontWeight: f.isSection ? 600 : 400,
                      color: f.isSection ? "#fff" : "#666",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase" as const,
                      boxShadow: f.isSection
                        ? "0 -2px 6px rgba(0,0,0,0.2)"
                        : "0 -1px 3px rgba(0,0,0,0.06)",
                    }}
                  >
                    <span>{f.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cabinet label / handle at top */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 40,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#999",
          }}
        />
      </div>
    </div>
  );
};

export default FilingCabinet;
