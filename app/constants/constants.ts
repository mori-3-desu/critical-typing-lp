/* page.tsx */
export const STAR_CONFIG = {
  COUNT: 60,
  STAR_TOP_LEFT: 100,
  STAR_PARTICLE_MIN_SIZE: 1,
  STAR_PARTICLE_MAX_SIZE: 3,
  STAR_DELAY: 5,
} as const;

export const HEADER_OFFSET_PX = 140;

/* Hero.tsx */
export const CONFIG = {
  curtain: {
    animDuration: 2.0,
    openDelay: 100,
    starCount: 40,
  },
  ui: {
    cardBorderMain: "min(0.8vw, 6px)",
    cardBorderNews: "min(0.8vw, 5px)",
    btnPrimary:
      "linear-gradient(135deg, #ffb84d 0%, #ff7e5f 50%, #d459ff 100%)",
    btnSecondary:
      "linear-gradient(135deg, #fcd34d 0%, #fbbf24 40%, #c084fc 100%)",
  },
} as const;

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

// カーテンの星
export const CURTAIN_STAR_CONFIG = {
  MAX_TOP: 90,
  MAX_LEFT: 100,
  MIN_SIZE: 2,
  SIZE_VAR: 3,
  MAX_DELAY: 3,
  GLOW_CHANCE: 0.6,
} as const;

// 通常の背景の星空
export const BG_STAR_CONFIG = {
  MOBILE_BREAKPOINT: 768,
  COUNT: { MOBILE: 100, PC: 400 },
  GRID: { MOBILE: 10, PC: 20 },
  OFFSET: { BASE: 10, VAR: 80 },
  SIZE: {
    MOBILE_BASE: 0.5,
    MOBILE_VAR: 1.0,
    PC_BASE: 1.5,
    PC_VAR: 2.0,
    SMALL_CHANCE: 0.7,
    SMALL_VAR: 0.5,
  },
  ANIM: { MAX_DELAY: 5, MIN_DUR: 2, DUR_VAR: 4 },
} as const;
