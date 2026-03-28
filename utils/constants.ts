export const HEADER_OFFSET_PX = 140 as const;

export const CONFIG = {
  curtain: {
    animDuration: 2.0,
    openDelay: 100,

    physics: {
      skewAngle: 15,
      shrinkScale: [1, 0.9, 1],
      keyframeTimes: [0, 0.4, 1],
      mobile: {
        skewAngle: 5,
        shrinkScale: [1, 0.97, 1],
      },
    },
  },
  ui: {
    cardBorderMain: "min(0.8vw, 6px)",
    cardBorderNews: "min(0.8vw, 5px)",
    btnPrimary:
      "linear-gradient(135deg, #ffb84d 0%, #ff7e5f 50%, #d459ff 100%)",
    btnSecondary:
      "linear-gradient(135deg, #fcd34d 0%, #fbbf24 40%, #c084fc 100%)",
  },
};

/* それぞれのテーマカラー */
export const PALETTE = {
  border: "#ffe0cb",
  highlight: "#fff9c4",
  text: "white",
  shadow: "rgba(0,0,0,0.5)",
  curtainBorder: "rgba(255, 255, 255, 0.8)",
  curtainBaseBorder: "rgba(255,255,255,0.1)",
  curtainBg: `
    linear-gradient(
      to bottom,
      hsla(225, 70%, 15%, 1) 0%,
      rgb(40, 62, 134) 60%,
      rgb(21, 81, 186) 100%
    )
  `,
} as const;

const PLEAT_WIDTH = "8vw" as const;

// カーテンのグラデーション
export const CURTAIN_GRADIENT = `
  repeating-linear-gradient(
    90deg,
    rgba(0,0,0, 0.7) 0,
    rgba(0,0,0, 0.2) calc(${PLEAT_WIDTH} * 0.2),
    rgba(255,255,255, 0.1) calc(${PLEAT_WIDTH} * 0.4),
    rgba(255,255,255, 0.4) calc(${PLEAT_WIDTH} * 0.5),
    rgba(255,255,255, 0.1) calc(${PLEAT_WIDTH} * 0.6),
    rgba(0,0,0, 0.2) calc(${PLEAT_WIDTH} * 0.8),
    rgba(0,0,0, 0.7) ${PLEAT_WIDTH}
  ),
  ${PALETTE.curtainBg}
` as const;
