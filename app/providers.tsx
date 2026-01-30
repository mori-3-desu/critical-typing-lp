"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AnimationContextType = {
  hasPlayedOpening: boolean;
  setHasPlayedOpening: (value: boolean) => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  // リロードすると false に初期化され、SPA遷移中は値を保持する
  const [hasPlayedOpening, setHasPlayedOpening] = useState(false);

  return (
    <AnimationContext.Provider value={{ hasPlayedOpening, setHasPlayedOpening }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationContext() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimationContext must be used within an AnimationProvider");
  }
  return context;
}