"use client";

import { CONFIG, CURTAIN_GRADIENT, PALETTE } from "@/app/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CurtainDecorations } from "../common/CurtainDecorations";
import { type CurtainStar } from "@/app/types";
import { useAnimationContext } from "../../app/providers"; 

// Propsの型を定義
type CurtainAnimProps = {
  leftCurtainStars: CurtainStar[];
  rightCurtainStars: CurtainStar[];
};

// CONFIGから値を抽出
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

  return (
    <motion.div
      initial="initial"
      animate={{ opacity: 1 }}
      exit="exit"
      variants={exitVariants}
      className="relative w-1/2 h-full"
      style={{
        background: CURTAIN_GRADIENT,
        boxShadow: isLeft
          ? "20px 0 60px rgba(255, 255, 255, 0.6)"
          : "-20px 0 60px rgba(255, 255, 255, 0.6)",
        [isLeft ? "borderRight" : "borderLeft"]:
          `4px solid ${PALETTE.curtainBorder}`,
        transformOrigin: isLeft ? "top left" : "top right",
      }}
    >
      <CurtainDecorations stars={stars} />
    </motion.div>
  );
};

// --- メインのカーテンアニメーションコンポーネント ---
// 👈 Propsを正しく受け取る形に修正
export const CurtainAnim = ({ leftCurtainStars, rightCurtainStars }: CurtainAnimProps) => {
  // 👈 必要なContextを引っ張ってくる
  const { hasPlayedOpening, setHasPlayedOpening } = useAnimationContext();
  const shouldAnimate = !hasPlayedOpening;
  
  const [showCurtain, setShowCurtain] = useState(shouldAnimate);

  // 👈 useEffectはreturnの「前」に書く
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

  // 👈 全体を Fragment（<> 〜 </>）で囲んで返す
  return (
    <>
      <AnimatePresence>
        {showCurtain && (
          <motion.div
            key="curtain-wrapper"
            className="fixed inset-0 z-[9999] flex pointer-events-none"
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
          </motion.div>
        )}
      </AnimatePresence>
  
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite alternate;
        }
      `}</style>
  
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