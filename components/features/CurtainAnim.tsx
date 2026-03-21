"use client";

import { CONFIG, CURTAIN_GRADIENT, PALETTE } from "@/app/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CurtainDecorations } from "../common/CurtainDecorations";
import { type CurtainStar } from "@/app/types";
import { useAnimationContext } from "@/app/providers"; 

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
export const CurtainAnim = ({ leftCurtainStars, rightCurtainStars }: CurtainAnimProps) => {
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