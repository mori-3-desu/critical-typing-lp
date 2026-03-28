import { ReactNode } from "react";

// 星空アニメーション基準
export type Star = {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
};

// 今回は初期画面時のみの仕様のためこの型を採用している
// 他にアニメーションを使いたい場合はDispatch<SetStateAction<boolean>>を検討する
export type AnimationContextType = {
  hasPlayedOpening: boolean;
  setHasPlayedOpening: (value: boolean) => void;
};

export type GameButtonProps = {
  href: string;
  label: ReactNode;
  variant?: "primary" | "secondary";
  size?: "large" | "medium";
};

