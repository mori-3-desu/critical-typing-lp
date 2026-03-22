"use client";

import { useAppAnimation } from "@/hooks/useAppAnimation";
import { InfoCard } from "@/components/common/InfoCard";
import News from "@/components/features/News";
import { type CurtainStar } from "@/types";
import { motion } from "framer-motion";
import { MainBgStar } from "../common/MainBgStar";
import { CurtainAnim } from "./CurtainAnim";
import { GuideButtonNote } from "./GuideButtonNote";
import { PlayGuide } from "./PlayGuide";

type HeroProps = {
  leftCurtainStars: CurtainStar[];
  rightCurtainStars: CurtainStar[];
};

// --- 3. メインコンポーネント ---
export default function Hero({
  leftCurtainStars,
  rightCurtainStars,
}: HeroProps) {
  const { commonTransition, initialStyle } = useAppAnimation();

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-linear-to-b from-indigo-700 via-purple-500 to-amber-400 --font-rounded px-4 lg:px-[2vw] pt-8 lg:pt-[3vh] pb-10 lg:pb-[4vh]">
      <CurtainAnim
        leftCurtainStars={leftCurtainStars}
        rightCurtainStars={rightCurtainStars}
      />
      <MainBgStar />

      <div className="z-10 w-full lg:w-[95vw] flex flex-col items-center text-center mx-auto max-w-7xl">
        {/* メインカード */}
        <motion.div
          initial={initialStyle({ opacity: 1, y: 20 }, { opacity: 1, y: 0 })}
          animate={{ opacity: 1, y: 0 }}
          transition={commonTransition(0.8, 0.8)}
          className="w-[95vw] max-w-3xl lg:w-[60vw] lg:max-w-none"
        >
          <InfoCard type="main">
            <PlayGuide />
          </InfoCard>
        </motion.div>
        <GuideButtonNote />
        <News />
      </div>
    </section>
  );
}
