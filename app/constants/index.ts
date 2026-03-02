// page.tsx
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

/* Hero.tsx */
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