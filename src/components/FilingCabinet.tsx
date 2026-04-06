import { useState } from "react";

interface FolderData {
  number: number;
  label: string;
  tabPosition: "left" | "center" | "right";
  isSection?: boolean;
  sectionLetter?: string;
  sectionCount?: string;
}

const folders: FolderData[] = [
  { number: 94, label: "oil lamp", tabPosition: "center" },
  { number: 95, label: "oats", tabPosition: "right" },
  { number: 96, label: "pants", tabPosition: "center", isSection: true, sectionLetter: "O", sectionCount: "010" },
  { number: 97, label: "plane", tabPosition: "right" },
  { number: 98, label: "plant 003", tabPosition: "center" },
  { number: 99, label: "pomelo", tabPosition: "right" },
  { number: 100, label: "phisher", tabPosition: "center" },
  { number: 101, label: "palo alto", tabPosition: "right" },
  { number: 102, label: "pencile", tabPosition: "center" },
  { number: 103, label: "photos", tabPosition: "right" },
  { number: 104, label: "quiet", tabPosition: "left", isSection: true, sectionLetter: "P", sectionCount: "012" },
  { number: 105, label: "queen", tabPosition: "right" },
  { number: 106, label: "questions", tabPosition: "center" },
  { number: 107, label: "quizz", tabPosition: "right" },
  { number: 108, label: "quit", tabPosition: "center" },
  { number: 109, label: "raccoon", tabPosition: "center", isSection: true, sectionLetter: "Q", sectionCount: "005" },
  { number: 111, label: "rizz", tabPosition: "right" },
  { number: 112, label: "rum", tabPosition: "left" },
  { number: 113, label: "generic guy", tabPosition: "right" },
  { number: 114, label: "rain", tabPosition: "center" },
  { number: 115, label: "rug", tabPosition: "right" },
  { number: 116, label: "ruby", tabPosition: "center", isSection: true, sectionLetter: "R", sectionCount: "002" },
  { number: 117, label: "sider", tabPosition: "right" },
  { number: 118, label: "sony", tabPosition: "center" },
  { number: 119, label: "sun", tabPosition: "right" },
  { number: 120, label: "seller", tabPosition: "center" },
  { number: 121, label: "sims", tabPosition: "right" },
  { number: 122, label: "slides", tabPosition: "center" },
  { number: 123, label: "simpsons", tabPosition: "right" },
  { number: 124, label: "sir", tabPosition: "center", isSection: true, sectionLetter: "S", sectionCount: "002" },
];

const FilingCabinet = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const total = folders.length;
  const minW = 340;
  const maxW = 510;
  const folderH = 24;
  const tabH = 18;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#f0efec" }}
    >
      <div className="relative" style={{ marginTop: 40 }}>
        {folders.map((f, i) => {
          const w = minW + (maxW - minW) * (i / (total - 1));
          const isHovered = hoveredIdx === i;
          const anyHovered = hoveredIdx !== null;

          // Calculate left offset to center all folders
          const offsetX = (maxW - w) / 2;

          // Tab positioning
          const tabWidth = f.isSection ? 110 : 90;
          let tabLeft: number;
          if (f.tabPosition === "left") {
            tabLeft = offsetX + 14;
          } else if (f.tabPosition === "right") {
            tabLeft = offsetX + w - tabWidth - 14;
          } else {
            tabLeft = offsetX + (w - tabWidth) / 2;
          }

          const top = i * folderH;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top,
                left: offsetX,
                width: w,
                height: folderH,
                zIndex: isHovered ? 200 : total - i,
                transition: "transform 0.2s ease, filter 0.2s ease, opacity 0.2s ease",
                transform: isHovered ? "translateY(-5px)" : "none",
                filter: anyHovered && !isHovered ? "blur(1.5px)" : "none",
                opacity: anyHovered && !isHovered ? 0.6 : 1,
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tab */}
              <div
                style={{
                  position: "absolute",
                  left: tabLeft - offsetX,
                  top: -tabH + 2,
                  width: tabWidth,
                  height: tabH,
                  borderRadius: "5px 5px 0 0",
                  backgroundColor: f.isSection ? "#1a1a1a" : "#eae9e6",
                  border: f.isSection ? "none" : "1px solid #c8c7c4",
                  borderBottom: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  color: f.isSection ? "#fff" : "#555",
                  fontWeight: f.isSection ? 500 : 400,
                  letterSpacing: "0.03em",
                  gap: "6px",
                }}
              >
                {f.isSection ? (
                  <>
                    <span>{f.sectionLetter}</span>
                    <span style={{ opacity: 0.6 }}>{f.sectionCount}</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontWeight: 600, color: "#333" }}>{f.number}</span>
                    <span>{f.label}</span>
                  </>
                )}
              </div>

              {/* Folder body */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#f5f4f1",
                  borderLeft: "1px solid #ccc",
                  borderRight: "1px solid #ccc",
                  borderTop: "1px solid #d4d3d0",
                  boxShadow: isHovered
                    ? "0 -4px 12px rgba(0,0,0,0.1)"
                    : "none",
                }}
              />

              {/* Label text on body for section folders */}
              {f.isSection && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "10px",
                    color: "#999",
                    display: "flex",
                    gap: "5px",
                    ...(f.tabPosition === "left"
                      ? { left: tabWidth + 24 }
                      : f.tabPosition === "center"
                      ? { left: 16 }
                      : { right: tabWidth + 24 }),
                    zIndex: 2,
                  }}
                >
                  <span style={{ fontWeight: 500, color: "#777" }}>{f.number}</span>
                  <span>{f.label}</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Container sizing */}
        <div style={{ width: maxW, height: total * folderH + 10, position: "relative", pointerEvents: "none" }}>
          {/* Bottom edge */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 10,
              backgroundColor: "#eeedea",
              borderRadius: "0 0 4px 4px",
              border: "1px solid #ccc",
              borderTop: "none",
            }}
          />
        </div>
      </div>

      {/* Label */}
      <div
        className="mt-8 px-5 py-1.5 text-sm font-medium rounded"
        style={{
          backgroundColor: "#f7ef8a",
          color: "#5a4e1a",
          border: "1px solid #d4c94e",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        sam's secret files
      </div>
    </div>
  );
};

export default FilingCabinet;
