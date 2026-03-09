"use client";

import { PALETTE } from "@/app/utils/constants";
import { InfoCard } from "@/components/common/InfoCard";
import News from "@/components/features/News";
import { CurtainAnim } from "./CurtainAnim";
import { motion, Target } from "framer-motion";
import { useAnimationContext } from "../../app/providers";
import { StarryBackground } from "../common/MainBgStar";
import { GameButton } from "../common/GameButton";
import { type CurtainStar } from "@/app/types"; // ←インポートされていなければ追加
import { PlayGuide } from "./PlayGuide";

type HeroProps = {
  leftCurtainStars: CurtainStar[];
  rightCurtainStars: CurtainStar[];
};

const BASE_GAME_URL = process.env.NEXT_PUBLIC_GAME_URL || "";

// --- 3. メインコンポーネント ---
export default function Hero({ leftCurtainStars, rightCurtainStars}: HeroProps){
  const { hasPlayedOpening } = useAnimationContext();
  const shouldAnimate = !hasPlayedOpening;
  const commonTransition = (delay: number = 0, duration: number = 0.8) => ({
    duration: shouldAnimate ? duration : 0,
    delay: shouldAnimate ? delay : 0,
  });

  const initialStyle = (fromStyle: Target, toStyle: Target): Target =>
    shouldAnimate ? fromStyle : toStyle;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-indigo-700 via-purple-500 to-amber-400 font-[family-name:var(--font-rounded)] px-4 lg:px-[2vw] pt-8 lg:pt-[3vh] pb-10 lg:pb-[4vh]">
      <CurtainAnim leftCurtainStars={leftCurtainStars} rightCurtainStars={rightCurtainStars} />
      <StarryBackground />

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

        {/* 誘導 */}
        <motion.div
          initial={initialStyle({ opacity: 1 }, { opacity: 1 })}
          animate={{ opacity: 1 }}
          transition={commonTransition(1.0)}
          className="mb-4 lg:mb-[1.5vw] mt-4 lg:mt-[0.5vw] animate-bounce"
        >
          <p
            className="text-sm lg:text-[1.4vw] font-bold drop-shadow-md tracking-widest"
            style={{ color: PALETTE.highlight }}
          >
            ▼ タイピングゲームはこちらから ▼
          </p>
        </motion.div>

        <motion.div
          initial={initialStyle({ opacity: 1, y: 20 }, { opacity: 1, y: 0 })}
          animate={{ opacity: 1, y: 0 }}
          transition={commonTransition(1.1, 0.5)}
          className="flex flex-col items-center gap-4 lg:gap-[1.5vw] w-full mb-10 lg:mb-[3vw]"
        >
          <GameButton
            href={BASE_GAME_URL}
            size="large"
            label="CRITICAL TYPINGを始める"
          />

          <div className="flex flex-row gap-4 lg:gap-[1.5vw] w-full justify-center">
            <GameButton
              href="/keymap"
              variant="secondary"
              size="medium"
              label="ローマ字対応表"
            />

            <GameButton
              href={BASE_GAME_URL ? `${BASE_GAME_URL}?muted=true` : "#"}
              variant="secondary"
              size="medium"
              label="静かに始める (ミュート)"
            />
          </div>
          <p
            className="text-[10px] lg:text-[0.9vw] font-bold mt-2 lg:mt-[0.8vw] shadow-black drop-shadow-md opacity-90"
            style={{ color: "#fffad4" }}
          >
            ※ タイトル画面の設定から音量の調整や名前の変更が行えます！
            <br />
            初回ログイン時は名前入力しないと出てこないのでご注意ください🙇‍♂️
            <br />
            もしゲーム中反応しなくなりましたら一度画面をクリックしてみてください！
          </p>
        </motion.div>
        <News />
      </div>
    </section>
  );
}
