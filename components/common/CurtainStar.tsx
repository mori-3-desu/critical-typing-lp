"use client";

import { type CurtainStar } from "@/app/types";
import { CURTAIN_STAR_CONFIG } from "@/app/utils/constants";
import { memo, useEffect, useState } from "react";

const {
  MAX_TOP,
  MAX_LEFT,
  MIN_SIZE,
  SIZE_VAR,
  MAX_DELAY,
  GLOW_CHANCE,
  TRANS_OPACITY,
} = CURTAIN_STAR_CONFIG;
// ==========================================
// 1. カーテン用の星（CurtainDecorations）
// ==========================================

// 🌟 カーテン星放出マシン
const useCurtainStars = (count: number) => {
  const [stars, setStars] = useState<CurtainStar[]>([]);

  useEffect(() => {
    const newStars: CurtainStar[] = Array.from({ length: count }).map(
      (_, i) => ({
        id: i,
        top: `${Math.random() * MAX_TOP}%`,
        left: `${Math.random() * MAX_LEFT}%`,
        size: `${Math.random() * SIZE_VAR + MIN_SIZE}px`,
        delay: `-${Math.random() * MAX_DELAY}s`,
        isGlow: Math.random() > GLOW_CHANCE,
      }),
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(newStars);
  }, [count]);

  return stars;
};

// 🌟 カーテン星コンポーネント本体
export const CurtainDecorations = memo(({ count }: { count: number }) => {
  const stars = useCurtainStars(count); // マシンから受け取るだけ！

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className={`absolute bg-white rounded-full ${s.isGlow ? "shadow-[0_0_8px_rgba(255,255,255,0.9)]" : ""}`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: TRANS_OPACITY,
            animation: `twinkle 3s infinite ease-in-out ${s.delay}`,
          }}
        />
      ))}
    </>
  );
});

CurtainDecorations.displayName = "CurtainDecorations";
