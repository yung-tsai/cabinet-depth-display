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

  const getW = (i: number) => minW + (maxW - minW) * (i / (total - 1));
  const getOffsetX = (i: number) => (maxW - getW(i)) / 2;
  const getTop = (i: number) => i * rowH;

  const positions: Array<"left" | "center" | "right"> = ["left", "center", "right"];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#f0efec", fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      <div className="relative" style={{ width: maxW, height: total * rowH + 20, marginTop: 30 }}>
        {/* Layer 1: Papers (lowest z-index, behind everything) */}
        {folders.map((_, i) => {
          const w = getW(i);
          const offsetX = getOffsetX(i);
          const top = getTop(i);
          const isHovered = hoveredIdx === i;

          return (
            <div
              key={`paper-${i}`}
              style={{
                position: "absolute",
                top: top,
                left: offsetX + w * 0.1,
                width: w * 0.8,
                height: 55,
                backgroundColor: "#fff",
                borderRadius: "3px 3px 0 0",
                boxShadow: isHovered ? "0 -2px 8px rgba(0,0,0,0.08)" : "none",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: isHovered ? "translateY(-45px)" : "translateY(0)",
                opacity: isHovered ? 1 : 0,
                zIndex: 100 + i * 2 + 1,
              }}
            />
          );
        })}

        {/* Layer 2: Folder bodies */}
        {folders.map((_, i) => {
          const w = getW(i);
          const offsetX = getOffsetX(i);
          const top = getTop(i);

          return (
            <div
              key={`body-${i}`}
              style={{
                position: "absolute",
                top: top,
                left: offsetX,
                width: w,
                height: rowH,
                backgroundColor: "#f3f2ef",
                borderTop: "1px solid #d0cfcc",
                borderLeft: "1px solid #d0cfcc",
                borderRight: "1px solid #d0cfcc",
                boxShadow: "0 -1px 0 rgba(255,255,255,0.4)",
                zIndex: 100 + i * 2,
              }}
            />
          );
        })}

        {/* Layer 3: Tabs (highest z-index, always on top) */}
        {folders.map((f, i) => {
          const w = getW(i);
          const offsetX = getOffsetX(i);
          const top = getTop(i);
          const tabPos = positions[i % 3];
          const tabWidth = f.isSection ? 120 : 100;
          let tabLeft: number;
          if (tabPos === "left") tabLeft = 14;
          else if (tabPos === "right") tabLeft = w - tabWidth - 14;
          else tabLeft = (w - tabWidth) / 2;

          return (
            <div
              key={`tab-${i}`}
              style={{
                position: "absolute",
                top: top - 14,
                left: offsetX + tabLeft,
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
                zIndex: 200 + i,
              }}
            >
              <span>{f.label}</span>
            </div>
          );
        })}

        {/* Invisible hover targets (highest z-index for interaction) */}
        {folders.map((_, i) => {
          const w = getW(i);
          const offsetX = getOffsetX(i);
          const top = getTop(i);

          return (
            <div
              key={`hover-${i}`}
              style={{
                position: "absolute",
                top: top - 14,
                left: offsetX,
                width: w,
                height: rowH + 14,
                zIndex: 300 + i,
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
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
            zIndex: 500,
          }}
        />
      </div>
    </div>
  );
};

export default FilingCabinet;
