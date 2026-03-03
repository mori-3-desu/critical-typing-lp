// src/components/common/HeaderStarBackground.tsx
"use client";

import { memo } from "react";
import { type HeaderStar } from "@/app/types";

// 🌟 Propsで完成品の星を受け取る
export const HeaderStarBackground = memo(({ stars }: { stars: HeaderStar[] }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white rounded-full animate-twinkle opacity-0"
          style={{
            top: s.top,
            left: s.left,
            width: s.width,
            height: s.height,
            animationDelay: s.delay,
            animationDuration: s.dur,
            boxShadow: s.bshadow,
          }}
        />
      ))}
    </div>
  );
});

HeaderStarBackground.displayName = "HeaderStarBackground";