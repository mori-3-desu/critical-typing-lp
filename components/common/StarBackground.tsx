"use client";

import { useState, useEffect, memo } from "react";
import { type Star } from "@/app/constants";
import { STAR_CONFIG } from "@/app/constants/constants";

export const {
  COUNT,
  STAR_TOP_LEFT,
  STAR_PARTICLE_MIN_SIZE,
  STAR_PARTICLE_MAX_SIZE,
  STAR_DELAY,
} = STAR_CONFIG;

// 🌟 星の計算・放出専用マシン（カスタムフック）
const useStarGenerator = () => {
  // 1. 最初は純粋に空っぽにしておく（これでPurityエラー回避）
  const [stars, setStars] = useState<Star[]>([]);

  // 2. 画面が出た後の安全地帯でランダム計算をする
  useEffect(() => {
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

    // ▼ Lint先生を黙らせる魔法の1行（この下の行だけエラー検査を無視する）▼
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(newStars);
  }, []);

  return stars;
};

// 🌟 見た目（ビュー）のコンポーネント
export const StarryBackground = memo(() => {
  const stars = useStarGenerator();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white rounded-full animate-twinkle opacity-50"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
});

StarryBackground.displayName = "StarryBackground";