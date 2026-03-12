import { ReactNode } from "react";

// 星空アニメーション基準
export type Star = {
    id: number,
    top: string,
    left: string,
    size: string,
    delay: string
};

export type AnimationContextType = {
  hasPlayedOpening: boolean;
  setHasPlayedOpening: (value: boolean) => void;
};

export type SubPageHeaderProps = {
  title: string;
};

export type FaqProps = {
  question: string;
  answer: string;
};

export type CurtainStar = {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
  isGlow: boolean;
};

export type BgStar = {
  id: string;
  top: string;
  left: string;
  delay: string;
  dur: string;
  size: string;
};

export type GameButtonProps = {
  href: string;
  label: ReactNode;
  variant?: "primary" | "secondary";
  size?: "large" | "medium"
}

export type HeaderStar = {
  id: number;
  top: string;
  left: string;
  width: string;
  height: string;
  delay: string;
  dur: string;
  bshadow: string;
}

