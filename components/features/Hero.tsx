"use client";

import { CONFIG, CURTAIN_GRADIENT, PALETTE } from "@/app/utils/constants";
import { InfoCard } from "@/components/common/InfoCard";
import News from "@/components/features/News";
import { AnimatePresence, motion, Target } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAnimationContext } from "../../app/providers";
import { StarryBackground } from "../common/MainBgStar";
import { CurtainDecorations } from "../common/CurtainDecorations";
import { type CurtainStar, type GameButtonProps } from "@/app/types";

// 星の型を定義
type HeroProps = {
  leftCurtainStars: CurtainStar[];
  rightCurtainStars: CurtainStar[];
};

// --- 2. サブコンポーネント ---

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
      skewX: isLeft ? [0, 15, 0] : [0, -15, 0],
      scaleX: [1, 0.9, 1],
      transition: {
        duration: CONFIG.curtain.animDuration,
        ease: "easeInOut" as const,
        times: [0, 0.4, 1],
      },
    },
  };

  return (
    <motion.div
      initial="initial"
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

// PCでの「迫力」を復活させつつ、タブレット以下では崩れないように調整
const GameButton = ({
  href,
  children,
  variant = "primary",
  size = "large",
}: GameButtonProps) => {
  const sizeClasses =
    size === "large"
      ? // Mobile/Tablet: 画面85%幅、最大450px (これでタブレットでも崩れない)
        // PC (lg以上): 画面45%幅 (迫力復活)、最大1000pxまで許容
        "w-[85vw] max-w-md lg:w-[45vw] lg:max-w-5xl h-16 lg:h-[5.5vw] text-xl lg:text-[1.8vw] border-[3px] lg:border-[0.3vw]"
      : // Mobile/Tablet: 画面40%幅 (2つ並べても入る)、最大200px
        // PC (lg以上): 画面21.5%幅 (迫力復活)、最大500pxまで許容
        "w-[40vw] max-w-[200px] lg:w-[21.5vw] lg:max-w-2xl h-14 lg:h-[4.5vw] text-xs lg:text-[1.1vw] border-[2px] lg:border-[0.3vw]";

  const bg =
    variant === "primary" ? CONFIG.ui.btnPrimary : CONFIG.ui.btnSecondary;

  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`relative flex items-center justify-center font-extrabold text-white rounded-full border-white shadow-lg hover:scale-105 transition-transform overflow-hidden leading-none ${sizeClasses}`}
      style={{ background: bg, textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
    >
      <span className="relative z-10 px-2">{children}</span>
      <div className="absolute top-1 left-4 w-3/4 h-1/2 bg-white/30 rounded-full pointer-events-none" />
    </Link>
  );
};

const Highlight = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`font-bold inline-block ${className}`}
    style={{ color: "yellow", textShadow: `1px 1px 2px ${PALETTE.shadow}` }}
  >
    {children}
  </span>
);

// --- 3. メインコンポーネント ---
export default function Hero({
  leftCurtainStars,
  rightCurtainStars,
}: HeroProps) {
  const BASE_GAME_URL = process.env.NEXT_PUBLIC_GAME_URL || "";

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
      }, CONFIG.curtain.openDelay);

      return () => clearTimeout(timer);
    }
  }, [hasPlayedOpening, setHasPlayedOpening]);

  const commonTransition = (delay: number = 0, duration: number = 0.8) => ({
    duration: shouldAnimate ? duration : 0,
    delay: shouldAnimate ? delay : 0,
  });

  const initialStyle = (fromStyle: Target, toStyle: Target): Target =>
    shouldAnimate ? fromStyle : toStyle;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-indigo-700 via-purple-500 to-amber-400 font-[family-name:var(--font-rounded)] px-4 lg:px-[2vw] pt-8 lg:pt-[3vh] pb-10 lg:pb-[4vh]">
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
        .animate-twinkle {
          animation: twinkle ease-in-out infinite alternate;
        }
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
      <StarryBackground />

      <div className="z-10 w-full lg:w-[95vw] flex flex-col items-center text-center mx-auto max-w-7xl">
        {/* メインカード */}
        <motion.div
          initial={initialStyle({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })}
          animate={{ opacity: 1, y: 0 }}
          transition={commonTransition(0.8, 0.8)}
          className="w-[95vw] max-w-3xl lg:w-[60vw] lg:max-w-none"
        >
          <InfoCard type="main">
            <div className="p-4 lg:p-[1.5vw] relative z-10 flex flex-col items-center">
              <h2
                className="text-lg lg:text-[1.5vw] font-bold mb-4 lg:mb-[0.5vw] drop-shadow-md"
                style={{ color: PALETTE.border }}
              >
                〜 ポップで触りやすい、実践型タイピングゲーム 〜
              </h2>

              <div className="space-y-4 lg:space-y-[0.8vw] text-base lg:text-[1.1vw] leading-relaxed font-medium w-full text-white">
                <p>
                  こちらのゲームは
                  <Highlight className="mx-1 lg:mx-[0.3vw]">正確性</Highlight>と
                  <Highlight className="mx-1 lg:mx-[0.3vw]">継続性</Highlight>
                  をコンセプトに作られた
                  <br className="hidden lg:block" />
                  全国ランキング搭載のスコア制の完全無料のタイピングゲームです！
                </p>

                <div className="my-4 lg:my-[1.2vw] relative w-full flex justify-center">
                  <div className="relative w-full max-w-[500px] lg:max-w-none lg:w-[32vw] aspect-video bg-black rounded-lg lg:rounded-[0.8vw] border-[3px] lg:border-[4px] border-white/90 shadow-xl overflow-hidden">
                    <video
                      src="/demo.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                </div>

                <div className="mt-2 lg:mt-[0.5vw] bg-white/5 border border-white/20 rounded-lg lg:rounded-[0.8vw] py-3 px-4 lg:py-[0.6vw] lg:px-[1.2vw] w-full max-w-[95%] mx-auto">
                  <p
                    className="font-bold flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-[0.5vw]"
                    style={{ color: PALETTE.border }}
                  >
                    <span className="text-xl lg:text-[1.0vw]">⌨️</span>
                    <span>
                      複数の入力に対応しており、お好きな打ち方でタイピングできます！
                    </span>
                  </p>
                  <p className="text-white/70 text-xs lg:text-[0.8vw] mt-2 lg:mt-[0.2vw]">
                    例: し si/shi/ci &nbsp; ち ti/chi &nbsp; つ tu/tsu &nbsp; ん
                    n/nn
                    <span className="text-[10px] lg:text-[0.7vw] ml-2 lg:ml-[0.5vw] opacity-60">
                      ※母音の前や末尾はnn必須
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </InfoCard>
        </motion.div>

        {/* 誘導 & ボタン */}
        <motion.div
          initial={initialStyle({ opacity: 0 }, { opacity: 1 })}
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
          initial={initialStyle({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })}
          animate={{ opacity: 1, y: 0 }}
          transition={commonTransition(1.1, 0.5)}
          className="flex flex-col items-center gap-4 lg:gap-[1.5vw] w-full mb-10 lg:mb-[3vw]"
        >
          <GameButton href={BASE_GAME_URL} size="large">
            CRITICAL TYPINGを始める
          </GameButton>

          <div className="flex flex-row gap-4 lg:gap-[1.5vw] w-full justify-center">
            <GameButton href="/keymap" variant="secondary" size="medium">
              ローマ字対応表
            </GameButton>

            <GameButton
              href={BASE_GAME_URL ? `${BASE_GAME_URL}?muted=true` : "#"}
              variant="secondary"
              size="medium"
            >
              静かに始める (ミュート)
            </GameButton>
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
