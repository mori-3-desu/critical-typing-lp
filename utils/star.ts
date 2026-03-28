import { type Star } from "@/types";

/* 星の設定 */
const STAR_CONFIG = {
  COUNT: 80,
  STAR_TOP_LEFT: 100,
  STAR_PARTICLE_MIN_SIZE: 1,
  STAR_PARTICLE_MAX_SIZE: 3,
  STAR_DELAY: 5,
  STAR_DURATION_MIN: 2,
  STAR_DURATION_MAX: 5,
} as const;

const {
  COUNT,
  STAR_TOP_LEFT,
  STAR_PARTICLE_MIN_SIZE,
  STAR_PARTICLE_MAX_SIZE,
  STAR_DELAY,
  STAR_DURATION_MIN,
  STAR_DURATION_MAX
} = STAR_CONFIG;

// 背景のグラデーションだけでは寂しいと感じたため、
// ささやかではあるが星空アニメーションを追加
export const generateStars = (): Star[] => {
  const newStars: Star[] = [];
  for (let i = 0; i < COUNT; i++) {
    newStars.push({
      id: i,
      top: `${Math.random() * STAR_TOP_LEFT}%`,
      left: `${Math.random() * STAR_TOP_LEFT}%`,
      size: `${Math.random() * (STAR_PARTICLE_MAX_SIZE - STAR_PARTICLE_MIN_SIZE) + STAR_PARTICLE_MIN_SIZE}px`,
      delay: `-${Math.random() * STAR_DELAY}s`,
      duration: `${STAR_DURATION_MIN + Math.random() * STAR_DURATION_MAX}s`,
    });
  }
  return newStars;
};
