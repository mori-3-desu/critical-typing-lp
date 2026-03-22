import { CURTAIN_STAR_CONFIG, STAR_CONFIG } from "@/utils/constants";
import { type CurtainStar, type HeaderStar, type Star } from "@/types";

const {
  COUNT,
  HEADER_COUNT,
  STAR_TOP_LEFT,
  STAR_PARTICLE_MIN_SIZE,
  STAR_PARTICLE_MAX_SIZE,
  STAR_DELAY,
  STAR_MIN_DURATION,
  STAR_DURATION,
} = STAR_CONFIG;

const { MAX_TOP, MAX_LEFT, MIN_SIZE, SIZE_VAR, MAX_DELAY, GLOW_CHANCE } =
  CURTAIN_STAR_CONFIG;

// 🌟 サーバー側で星の配列（完成品）を作る関数
export const generateStars = (): Star[] => {
  const newStars: Star[] = [];
  for (let i = 0; i < COUNT; i++) {
    newStars.push({
      id: i,
      top: `${Math.random() * STAR_TOP_LEFT}%`,
      left: `${Math.random() * STAR_TOP_LEFT}%`,
      size: `${Math.random() * (STAR_PARTICLE_MAX_SIZE - STAR_PARTICLE_MIN_SIZE) + STAR_PARTICLE_MIN_SIZE}px`,
      delay: `${Math.random() * STAR_DELAY}s`,
    });
  }
  return newStars;
};

// カーテンの星を計算する専用関数
export const generateCurtainStars = (count: number): CurtainStar[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: `${Math.random() * MAX_TOP}%`,
    left: `${Math.random() * MAX_LEFT}%`,
    size: `${Math.random() * SIZE_VAR + MIN_SIZE}px`,
    delay: `-${Math.random() * MAX_DELAY}s`,
    isGlow: Math.random() > GLOW_CHANCE,
  }));
};

// ヘッダーの星を計算する専用関数
export const generateHeaderStars = (): HeaderStar[] => {
  return Array.from({ length: HEADER_COUNT }).map((_, i) => ({
    id: i,
    top: `${Math.random() * STAR_TOP_LEFT}%`,
    left: `${Math.random() * STAR_TOP_LEFT}%`,
    width: `${Math.random() * (STAR_PARTICLE_MAX_SIZE - STAR_PARTICLE_MIN_SIZE) + STAR_PARTICLE_MIN_SIZE}px`,
    height: `${Math.random() * (STAR_PARTICLE_MAX_SIZE - STAR_PARTICLE_MIN_SIZE) + STAR_PARTICLE_MIN_SIZE}px`,
    delay: `${Math.random() * STAR_DELAY}s`,
    dur: `${STAR_MIN_DURATION + Math.random() * STAR_DURATION}s`,
    bshadow: "0 0 5px rgba(255, 255, 255, 0.8)",
  }));
};
