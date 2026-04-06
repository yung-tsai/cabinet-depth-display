const BoxIllustration = () => {
  const sw = 2.5;
  const c = "#1a1a1a";
  const bg = "#f0efec";
  const purple = "#8b7fdb";

  const bx = 60, bw = 400, bh = 240, br = 10;
  // Folders config
  const folderCount = 5;
  const folderSpacing = 24;
  const tabH = 32;
  const tabR = 10;
  const innerPad = 8;
  const innerL = bx + innerPad;
  // Each folder narrows toward the back (top). Front folder (i=4) is widest.
  const maxW = bw - innerPad * 2;
  const narrowStep = 28; // px narrower per step toward back

  // The folders stick out above the box top
  const foldersTopY = 40;
  const boxTopY = foldersTopY + folderCount * folderSpacing + tabH + 8;
  const totalH = boxTopY + bh + 20;

  const folders = [
    { tabX: 20, tabW: 120 },
    { tabX: 100, tabW: 130 },
    { tabX: 50, tabW: 140 },
    { tabX: 140, tabW: 110 },
    { tabX: 70, tabW: 120 },
  ].map((f, i) => {
    const w = maxW - (folderCount - 1 - i) * narrowStep; // back folders narrower
    return { ...f, folderW: w };
  });

  // Lines on box front
  const lineCount = 7;
  const lineStart = boxTopY + 55;
  const lineEnd = boxTopY + bh - 20;
  const lineGap = (lineEnd - lineStart) / (lineCount - 1);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: bg }}
    >
      <svg width="520" height={totalH} viewBox={`0 0 520 ${totalH}`}>
        {/* Back wall */}
        <rect
          x={bx} y={boxTopY - 14} width={bw} height={18}
          rx={6} fill={bg} stroke={c} strokeWidth={sw}
        />
        {/* Side walls going up to contain folders */}
        <line x1={bx} y1={foldersTopY + tabH} x2={bx} y2={boxTopY} stroke={c} strokeWidth={sw} />
        <line x1={bx + bw} y1={foldersTopY + tabH} x2={bx + bw} y2={boxTopY} stroke={c} strokeWidth={sw} />

        {/* Dark interior - tapered shape following folder depth */}
        <path
          d={`
            M ${innerL} ${foldersTopY + tabH - 2}
            H ${innerL + folders[0].folderW}
            L ${innerL + folders[folders.length - 1].folderW} ${boxTopY + 6}
            H ${innerL}
            Z
          `}
          fill={c}
        />

        {/* Folders (back to front) */}
        {folders.map((f, i) => {
          const bodyY = foldersTopY + i * folderSpacing + tabH;
          const tabTop = bodyY - tabH;
          const folderR = innerL + f.folderW;

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
              {/* Folder body fills over dark bg */}
              <rect
                x={innerL} y={bodyY} width={f.folderW} height={folderSpacing}
                fill={bg} stroke="none"
              />
              <line
                x1={innerL} y1={bodyY} x2={folderR} y2={bodyY}
                stroke={c} strokeWidth={sw - 0.5}
              />
            </g>
          );
        })}

        {/* Box front face */}
        <path
          d={`
            M ${bx} ${boxTopY}
            V ${boxTopY + bh - br}
            Q ${bx} ${boxTopY + bh} ${bx + br} ${boxTopY + bh}
            H ${bx + bw - br}
            Q ${bx + bw} ${boxTopY + bh} ${bx + bw} ${boxTopY + bh - br}
            V ${boxTopY}
            Z
          `}
          fill={bg} stroke={c} strokeWidth={sw}
        />

        {/* Handle */}
        <rect
          x={bx + bw / 2 - 50} y={boxTopY + 18}
          width={100} height={26} rx={13}
          fill={purple} stroke={c} strokeWidth={sw - 0.5}
        />

        {/* Ruled lines */}
        {Array.from({ length: lineCount }).map((_, i) => (
          <line
            key={i}
            x1={bx + 14} y1={lineStart + i * lineGap}
            x2={bx + bw - 14} y2={lineStart + i * lineGap}
            stroke={c} strokeWidth={1} opacity={0.25}
          />
        ))}
      </svg>
    </div>
  );
};

export default BoxIllustration;
