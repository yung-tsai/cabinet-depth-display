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
  const minW = 320;
  const maxW = 500;
  const rowH = 26;
  const tabH = 20;
  const tabW = 110;
  const smallTabW = 80;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cabinet-bg">
      <div className="relative flex flex-col items-center" style={{ marginTop: tabH + 8 }}>
        {folders.map((f, i) => {
          const w = minW + (maxW - minW) * (i / (total - 1));
          const isHovered = hoveredIdx === i;
          const anyHovered = hoveredIdx !== null;

          // Tab horizontal position
          const getTabStyle = (): React.CSSProperties => {
            const base: React.CSSProperties = {
              position: "absolute",
              top: -tabH + 2,
              height: tabH,
              borderRadius: "6px 6px 0 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              cursor: "pointer",
            };

            if (f.isSection) {
              base.width = tabW;
              base.backgroundColor = "#1a1a1a";
              base.color = "#fff";
              base.fontWeight = 500;
            } else {
              base.width = smallTabW;
              base.backgroundColor = "#e8e8e8";
              base.border = "1px solid #ccc";
              base.borderBottom = "none";
              base.color = "#555";
              base.fontWeight = 400;
            }

            if (f.tabPosition === "left") {
              base.left = 16;
            } else if (f.tabPosition === "right") {
              base.right = 16;
            } else {
              base.left = "50%";
              base.transform = "translateX(-50%)";
            }

            return base;
          };

          return (
            <div
              key={i}
              className="relative transition-all duration-200 ease-out"
              style={{
                width: w,
                height: rowH,
                zIndex: isHovered ? 100 : total - i,
                transform: isHovered ? "translateY(-6px) scale(1.01)" : "none",
                filter: anyHovered && !isHovered ? "blur(1.2px)" : "none",
                opacity: anyHovered && !isHovered ? 0.65 : 1,
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Folder body - the actual folder sheet */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#f5f5f3",
                  borderLeft: "1px solid #d0d0d0",
                  borderRight: "1px solid #d0d0d0",
                  borderTop: "1px solid #d5d5d5",
                  boxShadow: isHovered
                    ? "0 -3px 10px rgba(0,0,0,0.12)"
                    : "inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              />

              {/* Tab sticking up */}
              <div style={getTabStyle()}>
                {f.isSection ? (
                  <span className="flex items-center gap-3">
                    <span>{f.sectionLetter}</span>
                    <span style={{ opacity: 0.6 }}>{f.sectionCount}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span style={{ fontWeight: 500, color: "#333" }}>{f.number}</span>
                    <span>{f.label}</span>
                  </span>
                )}
              </div>

              {/* Number and label on folder body for section folders */}
              {f.isSection && (
                <div
                  className="absolute flex items-center gap-2"
                  style={{
                    fontSize: "11px",
                    color: "#888",
                    top: "50%",
                    transform: "translateY(-50%)",
                    ...(f.tabPosition === "left"
                      ? { left: tabW + 28 }
                      : f.tabPosition === "right"
                      ? { right: tabW + 28 }
                      : { left: 20 }),
                  }}
                >
                  <span style={{ fontWeight: 500, color: "#666" }}>{f.number}</span>
                  <span>{f.label}</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Cabinet bottom */}
        <div
          style={{
            width: maxW,
            height: 10,
            backgroundColor: "#f0f0ee",
            borderRadius: "0 0 4px 4px",
            border: "1px solid #d0d0d0",
            borderTop: "none",
          }}
        />
      </div>

      {/* Label at bottom */}
      <div
        className="mt-6 px-5 py-1.5 text-sm font-medium rounded"
        style={{
          backgroundColor: "#f7ef8a",
          color: "#5a4e1a",
          border: "1px solid #d4c94e",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        sam's secret files
      </div>
    </div>
  );
};

export default FilingCabinet;
