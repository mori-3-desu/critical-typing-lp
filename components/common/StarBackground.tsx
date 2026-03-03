"use client";

import { type Star } from "@/app/types";
import { memo } from "react";

// 親から受け取る「完成品の星データ」の型
type Props = {
  stars: Star[];
};

// 見た目（ビュー）のコンポーネント
export const StarryBackground = memo(({ stars }: Props) => {
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
