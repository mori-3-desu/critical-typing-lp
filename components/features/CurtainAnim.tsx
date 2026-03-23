"use client";

import { useAnimationContext } from "@/app/providers";
import { CONFIG, CURTAIN_GRADIENT, PALETTE } from "@/utils/constants";
import { type CurtainStar } from "@/types";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CurtainDecorations } from "../common/CurtainDecorations";

type CurtainAnimProps = {
  leftCurtainStars: CurtainStar[];
  rightCurtainStars: CurtainStar[];
};

const { animDuration, openDelay } = CONFIG.curtain;
const { skewAngle, shrinkScale, keyframeTimes } = CONFIG.curtain.physics;

// --- 左・右のカーテンパネル部品 ---
const CurtainPanel = ({
  side,
  stars,
}: {
  side: "left" | "right";
  stars: CurtainStar[];
}) => {
  const isLeft = side === "left";

  const exitVariants = {
    initial: { x: 0 },
    exit: {
      x: isLeft ? "-100%" : "100%",
      skewX: isLeft ? [0, skewAngle, 0] : [0, -skewAngle, 0],
      scaleX: shrinkScale,
      transition: {
        duration: animDuration,
        ease: "easeInOut" as const,
        times: keyframeTimes,
      },
    },
  };

  // box-shadowを使っていたので上記で宣言しているscale等の動きで
  // リフロー(再計算)が起きてしまい、CPU負荷が増加していた。
  // box-shadowをlinearに変えることでブラウザはただの一枚の画像として扱う
  // scale等で歪ませてもGPUは画像をゆがませるだけ。これによってCPU負荷を削減し、
  // ブラウザではグラデーションの箱が親と一緒に歪んでいるだけの状態を作れる
  return (
    <m.div
      initial="initial"
      animate={{ opacity: 1 }}
      exit="exit"
      variants={exitVariants}
      className="relative w-1/2 h-full"
      style={{
        background: CURTAIN_GRADIENT,
        [isLeft ? "borderRight" : "borderLeft"]:
          `4px solid ${PALETTE.curtainBorder}`,
        transformOrigin: isLeft ? "top left" : "top right",
      }}
    >
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          width: "60px",
          ...(isLeft
            ? {
                right: "-60px",
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.6), transparent)",
              }
            : {
                left: "-60px",
                background:
                  "linear-gradient(to left, rgba(255,255,255,0.6), transparent)",
              }),
        }}
      />

      <CurtainDecorations stars={stars} />
    </m.div>
  );
};

// --- メインのカーテンアニメーションコンポーネント ---
export const CurtainAnim = ({
  leftCurtainStars,
  rightCurtainStars,
}: CurtainAnimProps) => {
  const { hasPlayedOpening, setHasPlayedOpening } = useAnimationContext();
  const shouldAnimate = !hasPlayedOpening;

  const [showCurtain, setShowCurtain] = useState(shouldAnimate);

  useEffect(() => {
    if (hasPlayedOpening) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        setShowCurtain(false);
        setHasPlayedOpening(true);
        document.body.style.overflow = "auto";
      }, openDelay);

      return () => clearTimeout(timer);
    }
  }, [hasPlayedOpening, setHasPlayedOpening]);

  return (
    <>
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {showCurtain && (
          <m.div
            key="curtain-wrapper"
            className="fixed inset-0 z-9999 flex pointer-events-none"
            exit={{
              opacity: 0,
              transition: {
                delay: shouldAnimate ? 1.5 : 0,
                duration: shouldAnimate ? 0.5 : 0,
              },
            }}
          >
            <CurtainPanel side="left" stars={leftCurtainStars} />
            <CurtainPanel side="right" stars={rightCurtainStars} />
          </m.div>
        )}
      </AnimatePresence>

    </LazyMotion>

      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </>
  );
};
