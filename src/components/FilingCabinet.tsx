import { useState } from "react";

interface FolderData {
  id: number;
  number: number;
  label: string;
  tabPosition: "left" | "center" | "right";
  letter?: string;
  letterCount?: string;
}

const folders: FolderData[] = [
  { id: 1, number: 94, label: "oil lamp", tabPosition: "center" },
  { id: 2, number: 95, label: "oats", tabPosition: "right" },
  { id: 3, number: 96, label: "pants", tabPosition: "center", letter: "O", letterCount: "010" },
  { id: 4, number: 97, label: "plane", tabPosition: "right" },
  { id: 5, number: 98, label: "plant 003", tabPosition: "center" },
  { id: 6, number: 99, label: "pomelo", tabPosition: "right" },
  { id: 7, number: 100, label: "phisher", tabPosition: "center" },
  { id: 8, number: 101, label: "palo alto", tabPosition: "right" },
  { id: 9, number: 102, label: "pencile", tabPosition: "center" },
  { id: 10, number: 103, label: "photos", tabPosition: "right" },
  { id: 11, number: 104, label: "quiet", tabPosition: "left", letter: "P", letterCount: "012" },
  { id: 12, number: 105, label: "queen", tabPosition: "right" },
  { id: 13, number: 106, label: "questions", tabPosition: "center" },
  { id: 14, number: 107, label: "quizz", tabPosition: "right" },
  { id: 15, number: 108, label: "quit", tabPosition: "center" },
  { id: 16, number: 109, label: "raccoon", tabPosition: "center", letter: "Q", letterCount: "005" },
  { id: 17, number: 111, label: "rizz", tabPosition: "right" },
  { id: 18, number: 112, label: "rum", tabPosition: "left" },
  { id: 19, number: 113, label: "generic guy", tabPosition: "right" },
  { id: 20, number: 114, label: "rain", tabPosition: "center" },
  { id: 21, number: 115, label: "rug", tabPosition: "right" },
  { id: 22, number: 116, label: "ruby", tabPosition: "center", letter: "R", letterCount: "002" },
  { id: 23, number: 117, label: "sider", tabPosition: "right" },
  { id: 24, number: 118, label: "sony", tabPosition: "center" },
  { id: 25, number: 119, label: "sun", tabPosition: "right" },
  { id: 26, number: 120, label: "seller", tabPosition: "center" },
  { id: 27, number: 121, label: "sims", tabPosition: "right" },
  { id: 28, number: 122, label: "slides", tabPosition: "center" },
  { id: 29, number: 123, label: "simpsons", tabPosition: "right" },
  { id: 30, number: 124, label: "sir", tabPosition: "center", letter: "S", letterCount: "002" },
];

const FilingCabinet = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const totalFolders = folders.length;
  const minWidth = 340;
  const maxWidth = 520;
  const folderHeight = 28;
  const tabHeight = 22;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cabinet-bg select-none">
      <div className="relative flex flex-col items-center" style={{ paddingTop: tabHeight }}>
        {folders.map((folder, index) => {
          const progress = index / (totalFolders - 1);
          const width = minWidth + (maxWidth - minWidth) * progress;
          const isHovered = hoveredId === folder.id;
          const hasHover = hoveredId !== null;
          const isBlurred = hasHover && !isHovered;

          return (
            <div
              key={folder.id}
              className="relative flex items-center justify-center transition-all duration-200"
              style={{
                width: `${width}px`,
                height: `${folderHeight}px`,
                zIndex: isHovered ? 50 : totalFolders - index,
                transform: isHovered ? "translateY(-4px)" : "none",
                filter: isBlurred ? "blur(1.5px)" : "none",
                opacity: isBlurred ? 0.7 : 1,
              }}
              onMouseEnter={() => setHoveredId(folder.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Folder body */}
              <div
                className="absolute inset-0 bg-cabinet-folder border border-cabinet-border"
                style={{
                  borderRadius: "8px 8px 0 0",
                  borderBottom: index < totalFolders - 1 ? "none" : undefined,
                  boxShadow: isHovered
                    ? "0 -2px 8px rgba(0,0,0,0.15)"
                    : "0 -1px 0 rgba(0,0,0,0.04)",
                }}
              />

              {/* Tab */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  top: `-${tabHeight - 4}px`,
                  height: `${tabHeight}px`,
                  borderRadius: "6px 6px 0 0",
                  ...(folder.letter
                    ? {
                        width: "120px",
                        backgroundColor: "#111",
                        color: "#fff",
                        ...(folder.tabPosition === "left"
                          ? { left: "20px" }
                          : folder.tabPosition === "right"
                          ? { right: "20px" }
                          : { left: "50%", transform: "translateX(-50%)" }),
                      }
                    : {
                        width: "auto",
                        minWidth: "40px",
                        padding: "0 8px",
                        backgroundColor: "transparent",
                        color: "#333",
                        ...(folder.tabPosition === "left"
                          ? { left: "20px" }
                          : folder.tabPosition === "right"
                          ? { right: "20px" }
                          : { left: "50%", transform: "translateX(-50%)" }),
                      }),
                }}
              >
                {folder.letter ? (
                  <div className="flex items-center gap-3 text-xs font-medium tracking-wide">
                    <span>{folder.letter}</span>
                    <span className="opacity-70">{folder.letterCount}</span>
                  </div>
                ) : null}
              </div>

              {/* Number and label - positioned based on tab position */}
              <div
                className="absolute flex items-center gap-3 text-xs"
                style={{
                  ...(folder.tabPosition === "left"
                    ? { left: "24px" }
                    : folder.tabPosition === "right"
                    ? { right: "24px" }
                    : { left: "50%", transform: "translateX(-50%)" }),
                  color: "#555",
                  top: "50%",
                  marginTop: "-6px",
                }}
              >
                <span className="font-medium text-cabinet-number">{folder.number}</span>
                <span className="text-cabinet-label">{folder.label}</span>
              </div>
            </div>
          );
        })}

        {/* Bottom of cabinet */}
        <div
          className="bg-cabinet-folder border border-cabinet-border"
          style={{
            width: `${maxWidth}px`,
            height: "12px",
            borderRadius: "0 0 4px 4px",
            borderTop: "none",
          }}
        />
      </div>

      {/* Label */}
      <div className="mt-6 px-5 py-2 bg-cabinet-label text-cabinet-labelText text-sm font-medium rounded border border-cabinet-labelBorder shadow-sm">
        sam's secret files
      </div>
    </div>
  );
};

export default FilingCabinet;
