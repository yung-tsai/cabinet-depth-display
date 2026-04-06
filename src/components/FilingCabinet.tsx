import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FolderData {
  label: string;
  isSection?: boolean;
  paperTitle?: string;
  paperContent?: string[];
}

const folders: FolderData[] = [
  { label: "Folder", paperTitle: "Things To Do Today", paperContent: ["Water plant or admit defeat", "Reply to emails", "Organize desk"] },
  { label: "Folder", paperTitle: "Meeting Notes", paperContent: ["Discuss Q2 goals", "Review budget", "Assign action items"] },
  { label: "Section", isSection: true },
  { label: "Folder", paperTitle: "Shopping List", paperContent: ["Milk", "Bread", "Coffee beans"] },
  { label: "Folder", paperTitle: "Ideas", paperContent: ["New landing page concept", "Redesign checkout flow"] },
  { label: "Folder", paperTitle: "Reminders", paperContent: ["Call dentist", "Renew subscription", "Pick up dry cleaning"] },
  { label: "Section", isSection: true },
  { label: "Folder", paperTitle: "Project Notes", paperContent: ["Finalize wireframes", "Send to client for review"] },
  { label: "Folder", paperTitle: "Bookmarks", paperContent: ["Design inspiration site", "CSS tricks article"] },
  { label: "Folder", paperTitle: "Misc", paperContent: ["Random thoughts", "Sketch ideas"] },
];

const FilingCabinet = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<FolderData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

          const hasPaper = !f.isSection && f.paperContent;

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
                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease, opacity 0.25s ease",
                transform: loaded
                  ? isHovered ? "translateY(-6px)" : "none"
                  : `translateY(${(total - i) * 40 + 200}px)`,
                transitionDelay: loaded ? "0s" : `${i * 0.04}s`,
                filter: anyHovered && !isHovered ? "blur(1.5px)" : "none",
                opacity: anyHovered && !isHovered ? 0.55 : loaded ? 1 : 0,
                cursor: hasPaper ? "pointer" : "default",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Paper peek - slides up IN FRONT of the tab */}
              {hasPaper && (
                <div
                  onClick={() => setSelectedFolder(f)}
                  style={{
                    position: "absolute",
                    left: tabLeft + 5,
                    top: isHovered ? -50 : -2,
                    width: tabWidth - 10,
                    height: 48,
                    backgroundColor: "#fff",
                    borderRadius: "4px 4px 0 0",
                    boxShadow: isHovered ? "0 -4px 12px rgba(0,0,0,0.15)" : "none",
                    transition: "top 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease",
                    opacity: isHovered ? 1 : 0,
                    zIndex: 300,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "7px", fontWeight: 600, color: "#333", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", lineHeight: 1.2 }}>
                    {f.paperTitle}
                  </span>
                  <div style={{ marginTop: 3, display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                    {f.paperContent!.slice(0, 2).map((line, li) => (
                      <div key={li} style={{ height: 2, backgroundColor: "#ddd", borderRadius: 1, width: li === 1 ? "60%" : "80%" }} />
                    ))}
                  </div>
                </div>
              )}

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
                  boxShadow: isHovered
                    ? "0 -3px 10px rgba(0,0,0,0.12)"
                    : "0 -1px 0 rgba(255,255,255,0.4)",
                }}
              />

              {/* Tab */}
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
                <span>{f.label}</span>
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

      {/* Full paper dialog */}
      <Dialog open={!!selectedFolder} onOpenChange={(open) => !open && setSelectedFolder(null)}>
        <DialogContent className="sm:max-w-md" style={{ backgroundColor: "#fffef9", border: "1px solid #e0ddd5", borderRadius: 12 }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "system-ui", fontSize: 18, fontWeight: 600, color: "#1a1a1a" }}>
              {selectedFolder?.paperTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            {selectedFolder?.paperContent?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div style={{ width: 14, height: 14, border: "1.5px solid #ccc", borderRadius: 3, marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#444", lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilingCabinet;
