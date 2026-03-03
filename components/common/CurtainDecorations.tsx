"use client";

import { type CurtainStar } from "@/app/types";
import { CURTAIN_STAR_CONFIG } from "@/app/utils/constants";
import { memo } from "react";

const { TRANS_OPACITY } = CURTAIN_STAR_CONFIG;

type Props = {
  stars: CurtainStar[]; // countの代わりに完成品の星配列を受け取る！
};

// 🌟 カーテン星コンポーネント本体
export const CurtainDecorations = memo(({ stars }: Props) => {
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