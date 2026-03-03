"use client";

import { type BgStar } from "@/app/types";
import { BG_STAR_CONFIG } from "@/app/utils/constants";
import { memo, useEffect, useState } from "react";

const { MOBILE_BREAKPOINT, COUNT, GRID, OFFSET, SIZE, ANIM } = BG_STAR_CONFIG;

// ==========================================
// 2. 背景用の星（StarryBackground）
// ==========================================

// 🌟 背景星放出マシン
const useBgStars = () => {
  const [stars, setStars] = useState<BgStar[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const starCount = isMobile ? COUNT.MOBILE : COUNT.PC;
    const cols = isMobile ? GRID.MOBILE : GRID.PC;
    const rows = isMobile ? GRID.MOBILE : GRID.PC;
    const newStars: BgStar[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newStars.length >= starCount) break;

        const xOffset = OFFSET.BASE + Math.random() * OFFSET.VAR;
        const yOffset = OFFSET.BASE + Math.random() * OFFSET.VAR;
        const left = c * (100 / cols) + xOffset / cols;
        const top = r * (100 / rows) + yOffset / rows;

        const baseSize = isMobile ? SIZE.MOBILE_BASE : SIZE.PC_BASE;
        const sizeVar = isMobile ? SIZE.MOBILE_VAR : SIZE.PC_VAR;

        const calculatedSize =
          (Math.random() < SIZE.SMALL_CHANCE
            ? baseSize + Math.random() * SIZE.SMALL_VAR
            : baseSize + 1 + Math.random() * sizeVar) + "px";

        newStars.push({
          id: `${r}-${c}`,
          top: `${top}%`,
          left: `${left}%`,
          delay: `-${Math.random() * ANIM.MAX_DELAY}s`,
          dur: `${ANIM.MIN_DUR + Math.random() * ANIM.DUR_VAR}s`,
          size: calculatedSize,
        });
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(newStars);
  }, []);

  return stars;
};

// 🌟 背景星コンポーネント本体
export const StarryBackground = memo(() => {
  const stars = useBgStars(); // マシンから受け取るだけ！

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.dur,
            boxShadow: "0 0 3px 1px rgba(255, 255, 204, 0.8)",
          }}
        />
      ))}
    </div>
  );
});

StarryBackground.displayName = "StarryBackground";
