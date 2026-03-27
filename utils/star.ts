import { STAR_CONFIG } from "@/utils/constants";
import { type Star } from "@/types";

const {
  COUNT,
  STAR_TOP_LEFT,
  STAR_PARTICLE_MIN_SIZE,
  STAR_PARTICLE_MAX_SIZE,
  STAR_DELAY,
} = STAR_CONFIG;

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
