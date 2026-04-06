const BoxIllustration = () => {
  const boxWidth = 420;
  const boxHeight = 300;
  const boxTop = 200;
  const boxLeft = 50;
  const cornerRadius = 8;
  const strokeWidth = 3;
  const lineColor = "#1a1a1a";
  const fillColor = "#f0efec";
  const handleColor = "#8b7fdb";

  // Horizontal lines on box front
  const lineCount = 6;
  const lineStartY = boxTop + 50;
  const lineSpacing = (boxHeight - 70) / lineCount;

  // Folder definitions (from back to front)
  const folders = [
    { tabX: 80, tabW: 120, height: 60 },
    { tabX: 160, tabW: 130, height: 50 },
    { tabX: 100, tabW: 140, height: 40 },
    { tabX: 200, tabW: 110, height: 30 },
    { tabX: 130, tabW: 120, height: 20 },
  ];

  const innerLeft = boxLeft + 12;
  const innerRight = boxLeft + boxWidth - 12;
  const innerWidth = innerRight - innerLeft;
  const folderBaseY = boxTop + 8;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#f0efec" }}
    >
      <svg
        width={boxWidth + 100}
        height={boxTop + boxHeight + 40}
        viewBox={`0 0 ${boxWidth + 100} ${boxTop + boxHeight + 40}`}
      >
        {/* Box back wall (visible above folders) */}
        <rect
          x={boxLeft}
          y={boxTop - 10}
          width={boxWidth}
          height={16}
          rx={4}
          fill={fillColor}
          stroke={lineColor}
          strokeWidth={strokeWidth}
        />

        {/* Dark interior behind folders */}
        <rect
          x={boxLeft + 6}
          y={boxTop - 2}
          width={boxWidth - 12}
          height={60}
          fill={lineColor}
        />

        {/* Folders (back to front) */}
        {folders.map((folder, i) => {
          const tabHeight = 28;
          const folderY = folderBaseY + i * 18;
          const tabR = 8;

          // Folder body (the flat part inside the box)
          const bodyY = folderY + tabHeight - 4;

          return (
            <g key={i}>
              {/* Tab */}
              <path
                d={`
                  M ${innerLeft + folder.tabX} ${bodyY}
                  L ${innerLeft + folder.tabX} ${folderY + tabR}
                  Q ${innerLeft + folder.tabX} ${folderY} ${innerLeft + folder.tabX + tabR} ${folderY}
                  L ${innerLeft + folder.tabX + folder.tabW - tabR} ${folderY}
                  Q ${innerLeft + folder.tabX + folder.tabW} ${folderY} ${innerLeft + folder.tabX + folder.tabW} ${folderY + tabR}
                  L ${innerLeft + folder.tabX + folder.tabW} ${bodyY}
                `}
                fill={fillColor}
                stroke={lineColor}
                strokeWidth={strokeWidth - 0.5}
              />
              {/* Folder body line */}
              <line
                x1={innerLeft}
                y1={bodyY}
                x2={innerRight}
                y2={bodyY}
                stroke={lineColor}
                strokeWidth={strokeWidth - 0.5}
              />
              {/* Folder body fill (covers dark bg) */}
              <rect
                x={innerLeft}
                y={bodyY}
                width={innerWidth}
                height={4}
                fill={fillColor}
                stroke="none"
              />
            </g>
          );
        })}

        {/* Box front */}
        <path
          d={`
            M ${boxLeft} ${boxTop}
            L ${boxLeft} ${boxTop + boxHeight - cornerRadius}
            Q ${boxLeft} ${boxTop + boxHeight} ${boxLeft + cornerRadius} ${boxTop + boxHeight}
            L ${boxLeft + boxWidth - cornerRadius} ${boxTop + boxHeight}
            Q ${boxLeft + boxWidth} ${boxTop + boxHeight} ${boxLeft + boxWidth} ${boxTop + boxHeight - cornerRadius}
            L ${boxLeft + boxWidth} ${boxTop}
          `}
          fill={fillColor}
          stroke={lineColor}
          strokeWidth={strokeWidth}
        />

        {/* Horizontal ruled lines on box front */}
        {Array.from({ length: lineCount }).map((_, i) => (
          <line
            key={i}
            x1={boxLeft + 8}
            y1={lineStartY + i * lineSpacing}
            x2={boxLeft + boxWidth - 8}
            y2={lineStartY + i * lineSpacing}
            stroke={lineColor}
            strokeWidth={1.2}
            opacity={0.3}
          />
        ))}

        {/* Handle cutout */}
        <rect
          x={boxLeft + boxWidth / 2 - 45}
          y={boxTop + 20}
          width={90}
          height={24}
          rx={12}
          fill={handleColor}
          stroke={lineColor}
          strokeWidth={strokeWidth - 0.5}
        />

        {/* Box left side edge */}
        <line
          x1={boxLeft}
          y1={boxTop - 4}
          x2={boxLeft}
          y2={boxTop}
          stroke={lineColor}
          strokeWidth={strokeWidth}
        />
        {/* Box right side edge */}
        <line
          x1={boxLeft + boxWidth}
          y1={boxTop - 4}
          x2={boxLeft + boxWidth}
          y2={boxTop}
          stroke={lineColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
};

export default BoxIllustration;
