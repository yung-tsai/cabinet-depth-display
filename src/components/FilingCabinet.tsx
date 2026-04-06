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
        {folders.map((f, i) => {
          const w = minW + (maxW - minW) * (i / (total - 1));
          const isHovered = hoveredIdx === i;
          const anyHovered = hoveredIdx !== null;
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
                zIndex: isHovered ? 200 : i + 1,
                transition: "transform 0.2s ease, filter 0.25s ease, opacity 0.25s ease",
                transform: isHovered ? "translateY(-6px)" : "none",
                filter: anyHovered && !isHovered ? "blur(1.5px)" : "none",
                opacity: anyHovered && !isHovered ? 0.55 : 1,
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Folder body - the visible edge/lip */}
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
                  boxShadow: isHovered
                    ? "0 -3px 10px rgba(0,0,0,0.12)"
                    : "0 -1px 0 rgba(255,255,255,0.4)",
                }}
              />

              {/* Tab that sticks up */}
              <div
                style={{
                  position: "absolute",
                  left: tabLeft,
                  top: -8,
                  width: tabWidth,
                  height: rowH + 8,
                  borderRadius: "6px 6px 0 0",
                  backgroundColor: f.isSection ? "#1a1a1a" : "#e8e7e4",
                  border: f.isSection ? "none" : "1px solid #c5c4c1",
                  borderBottom: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontSize: "11px",
                  color: f.isSection ? "#fff" : "#555",
                  fontWeight: f.isSection ? 500 : 400,
                  letterSpacing: "0.02em",
                }}
              >
                {f.isSection ? (
                  <>
                    <span>{f.sectionLetter}</span>
                    <span style={{ opacity: 0.55, fontSize: "10px" }}>{f.sectionCount}</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontWeight: 600, color: "#333" }}>{f.number}</span>
                    <span>{f.label}</span>
                  </>
                )}
              </div>

              {/* On-body label for section folders */}
              {f.isSection && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 4,
                    fontSize: "10px",
                    color: "#999",
                    display: "flex",
                    gap: 5,
                    zIndex: 2,
                    ...(tabPos === "left"
                      ? { left: tabWidth + 22 }
                      : tabPos === "center"
                      ? { left: 14 }
                      : { right: tabWidth + 22 }),
                  }}
                >
                  <span style={{ fontWeight: 500, color: "#777" }}>{f.number}</span>
                  <span>{f.label}</span>
                </div>
              )}
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
