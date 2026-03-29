"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { type AnimationContextType } from "../types";

// 作成時はundefinedを許容
// undefinedを入れるのは、他の適当な初期値だとProviderが無くても動いてしまい、原因不明のバグにつながる
const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined,
);

export function AnimationProvider({ children }: { children: ReactNode }) {
  // リロードすると false に初期化され、SPA遷移中は値を保持する
  // 開幕のカーテンのアニメーションは初回のみの再生のため、リロードしない限りは再生させない
  const [hasPlayedOpening, setHasPlayedOpening] = useState(false);

  return (
    <AnimationContext.Provider
      value={{ hasPlayedOpening, setHasPlayedOpening }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

// カスタムフックでundefinedじゃないことを保証する
export function useAnimationContext() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error(
      "useAnimationContext must be used within an AnimationProvider",
    );
  }
  return context;
}
