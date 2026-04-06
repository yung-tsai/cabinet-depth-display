const BoxIllustration = () => {
  const sw = 2.5; // stroke width
  const c = "#1a1a1a";
  const bg = "#f0efec";
  const purple = "#8b7fdb";

  // Box dimensions
  const bx = 60, by = 220, bw = 400, bh = 260, br = 10;

  // Folders (back to front, staggered tabs)
  const folders = [
    { tabX: 30, tabW: 110 },
    { tabX: 140, tabW: 120 },
    { tabX: 60, tabW: 130 },
    { tabX: 180, tabW: 100 },
    { tabX: 90, tabW: 120 },
  ];

  const innerL = bx + 8;
  const innerR = bx + bw - 8;
  const innerW = innerR - innerL;
  const folderSpacing = 22;
  const tabH = 30;
  const tabR = 10;

  // Lines on box front
  const lineCount = 7;
  const lineStart = by + 55;
  const lineEnd = by + bh - 20;
  const lineGap = (lineEnd - lineStart) / (lineCount - 1);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: bg }}
    >
      <svg width="520" height="520" viewBox="0 0 520 520">
        {/* Back wall top edge */}
        <rect
          x={bx} y={by - 14} width={bw} height={18}
          rx={6} fill={bg} stroke={c} strokeWidth={sw}
        />

        {/* Dark interior */}
        <rect
          x={bx + 4} y={by - 2} width={bw - 8} height={folders.length * folderSpacing + tabH + 10}
          fill={c}
        />

        {/* Folders */}
        {folders.map((f, i) => {
          const bodyY = by + 6 + i * folderSpacing + tabH;
          const tabTop = bodyY - tabH;

          return (
            <g key={i}>
              {/* Tab */}
              <path
                d={`
                  M ${innerL + f.tabX} ${bodyY}
                  V ${tabTop + tabR}
                  Q ${innerL + f.tabX} ${tabTop} ${innerL + f.tabX + tabR} ${tabTop}
                  H ${innerL + f.tabX + f.tabW - tabR}
                  Q ${innerL + f.tabX + f.tabW} ${tabTop} ${innerL + f.tabX + f.tabW} ${tabTop + tabR}
                  V ${bodyY}
                `}
                fill={bg} stroke={c} strokeWidth={sw - 0.5}
              />
              {/* Folder body */}
              <rect
                x={innerL} y={bodyY} width={innerW} height={folderSpacing}
                fill={bg} stroke="none"
              />
              <line
                x1={innerL} y1={bodyY} x2={innerR} y2={bodyY}
                stroke={c} strokeWidth={sw - 0.5}
              />
            </g>
          );
        })}

        {/* Box front face */}
        <path
          d={`
            M ${bx} ${by}
            V ${by + bh - br}
            Q ${bx} ${by + bh} ${bx + br} ${by + bh}
            H ${bx + bw - br}
            Q ${bx + bw} ${by + bh} ${bx + bw} ${by + bh - br}
            V ${by}
          `}
          fill={bg} stroke={c} strokeWidth={sw}
        />

        {/* Handle */}
        <rect
          x={bx + bw / 2 - 50} y={by + 18}
          width={100} height={26} rx={13}
          fill={purple} stroke={c} strokeWidth={sw - 0.5}
        />

        {/* Ruled lines */}
        {Array.from({ length: lineCount }).map((_, i) => (
          <line
            key={i}
            x1={bx + 12} y1={lineStart + i * lineGap}
            x2={bx + bw - 12} y2={lineStart + i * lineGap}
            stroke={c} strokeWidth={1} opacity={0.25}
          />
        ))}
      </svg>
    </div>
  );
};

export default BoxIllustration;
