"use client";

import { generateStars } from "@/utils/star";
import { type Star } from "@/types";
import { memo, useState } from "react";

export default memo(function StarryBackgroundClient() {
  // ssr: false により、このコンポーネントはクライアントのみで実行される
  // useState遅延初期化でマウント時に1度だけ生成
  const [stars] = useState<Star[]>(generateStars);

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
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
});
