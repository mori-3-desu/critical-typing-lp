"use client";

import { InfoCard } from "@/components/common/InfoCard";
import { useAppAnimation } from "@/hooks/useAppAnimation";
import { MainBgStar } from "../common/MainBgStar";
import { GuideButtonNote } from "./GuideButtonNote";
import { PlayGuide } from "./PlayGuide";
import dynamic from "next/dynamic";

const CurtainAnim = dynamic(() =>
  import("./CurtainAnim").then((m) => m.CurtainAnim)
);
const News = dynamic(() => import("./News"));

// --- 3. メインコンポーネント ---
export default function Hero() {
  const { shouldAnimate } = useAppAnimation();

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-linear-to-b from-indigo-700 via-purple-500 to-amber-400 font-rounded px-4 lg:px-[2vw] pt-8 lg:pt-[3vh] pb-10 lg:pb-[4vh]">
      <CurtainAnim />
      <MainBgStar />

      <div className="z-10 w-full lg:w-[95vw] flex flex-col items-center text-center mx-auto max-w-7xl">
        {/* メインカード */}
        <div className={`w-[95vw] max-w-3xl lg:w-[60vw] lg:max-w-none ${shouldAnimate ? "animate-slide-up" : ""}`}>
          <InfoCard type="main">
            <PlayGuide />
          </InfoCard>
        </div>
        <GuideButtonNote />
        <News />
      </div>
    </section>
  );
}
