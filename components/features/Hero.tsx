"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAnimationContext } from "../../app/providers";

// --- 1. 定数・設定 (CONFIG) ---

const PLEAT_WIDTH = "8vw";

const PALETTE = {
  primary: "linear-gradient(160deg, #4535b2 0%, #ae4868 100%)",
  news: "rgba(244, 156, 105, 0.85)",
  border: "#ffe0cb",
  highlight: "#fff9c4",
  text: "white",
  shadow: "rgba(0,0,0,0.5)",
  curtainBorder: "rgba(255, 255, 255, 0.8)",
  curtainBaseBorder: "rgba(255,255,255,0.1)",
  curtainBg: `
    linear-gradient(
      to bottom,
      hsla(225, 70%, 15%, 1) 0%,
      rgb(40, 62, 134) 60%,
      rgb(21, 81, 186) 100%
    )
  `,
};

const CURTAIN_GRADIENT = `
  repeating-linear-gradient(
    90deg,
    rgba(0,0,0, 0.7) 0,
    rgba(0,0,0, 0.2) calc(${PLEAT_WIDTH} * 0.2),
    rgba(255,255,255, 0.1) calc(${PLEAT_WIDTH} * 0.4),
    rgba(255,255,255, 0.4) calc(${PLEAT_WIDTH} * 0.5),
    rgba(255,255,255, 0.1) calc(${PLEAT_WIDTH} * 0.6),
    rgba(0,0,0, 0.2) calc(${PLEAT_WIDTH} * 0.8),
    rgba(0,0,0, 0.7) ${PLEAT_WIDTH}
  ),
  ${PALETTE.curtainBg}
`;

const CONFIG = {
  curtain: {
    animDuration: 2.0,
    openDelay: 100,
    starCount: 40,
  },
  ui: {
    cardBorderMain: "min(0.8vw, 6px)",
    cardBorderNews: "min(0.8vw, 5px)",
    btnPrimary: "linear-gradient(135deg, #ffb84d 0%, #ff7e5f 50%, #d459ff 100%)",
    btnSecondary: "linear-gradient(135deg, #fcd34d 0%, #fbbf24 40%, #c084fc 100%)",
  },
} as const;

const NEWS_ITEMS = [
  {
    date: "2026.02.03",
    tag: "fix",
    text: "特定条件でタイマー演出が二重に出てしまう不具合を修正しました。",
  },
  {
    date: "2026.01.27",
    tag: "Release",
    text: "サイトを公開しました！ CRITICAL TYPING リリース！",
  },
];

// --- 2. サブコンポーネント ---

const CurtainPanel = ({ side }: { side: "left" | "right" }) => {
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
      }
    }
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
      <CurtainDecorations count={CONFIG.curtain.starCount} />
    </motion.div>
  );
};

const CurtainDecorations = ({ count }: { count: number }) => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    const newStars = Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: Math.random() * 90 + "%",
      left: Math.random() * 100 + "%",
      size: Math.random() * 3 + 2 + "px",
      delay: `-${Math.random() * 3}s`,
      isGlow: Math.random() > 0.6,
    }));
    setStars(newStars);
  }, [count]);

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className={`absolute bg-white rounded-full ${s.isGlow ? "shadow-[0_0_8px_rgba(255,255,255,0.9)]" : ""}`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: 0.9,
            animation: `twinkle 3s infinite ease-in-out ${s.delay}`,
          }}
        />
      ))}
    </>
  );
};

const StarryBackground = () => {
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 100 : 400; 
    const cols = isMobile ? 10 : 20; 
    const rows = isMobile ? 10 : 20;
    const newStars = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newStars.length >= starCount) break;
        const xOffset = 10 + Math.random() * 80; 
        const yOffset = 10 + Math.random() * 80;
        const left = (c * (100 / cols)) + (xOffset / cols);
        const top = (r * (100 / rows)) + (yOffset / rows);
        const baseSize = isMobile ? 0.5 : 1.5;
        const sizeVar = isMobile ? 1.0 : 2.0;
        const size = (Math.random() < 0.7 ? baseSize + Math.random() * 0.5 : baseSize + 1 + Math.random() * sizeVar) + "px";

        newStars.push({
          id: `${r}-${c}`,
          top: `${top}%`,
          left: `${left}%`,
          delay: `-${Math.random() * 5}s`,
          dur: 2 + Math.random() * 4 + "s",
          size: size, 
        });
      }
    }
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.dur,
            boxShadow: "0 0 3px 1px rgba(255, 255, 204, 0.8)", 
          }}
        />
      ))}
    </div>
  );
};

const InfoCard = ({ children, type = "main" }: { children: React.ReactNode; type?: "main" | "news" }) => {
  const isMain = type === "main";
  const radiusClass = isMain ? "rounded-3xl lg:rounded-[2.5rem]" : "rounded-2xl";

  const style = {
    background: isMain ? PALETTE.primary : PALETTE.news,
    borderColor: isMain ? PALETTE.border : "#ffe7c7",
    borderWidth: isMain ? CONFIG.ui.cardBorderMain : CONFIG.ui.cardBorderNews,
    boxShadow: isMain
      ? "0 0 2vw rgba(0,0,0,0.5)"
      : "0 10px 30px rgba(255, 150, 50, 0.4)",
    backdropFilter: isMain ? "none" : "blur(10px)",
  };

  return (
    <div
      className={`w-full ${radiusClass} ${isMain ? "mb-8 lg:mb-[2vw]" : "p-5 lg:p-[1.5vw]"}`}
      style={{
        ...style,
        borderStyle: "solid",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

// PCでの「迫力」を復活させつつ、タブレット以下では崩れないように調整
const GameButton = ({ href, children, variant = "primary", size = "large" }: any) => {
  const sizeClasses =
    size === "large"
      // Mobile/Tablet: 画面85%幅、最大450px (これでタブレットでも崩れない)
      // PC (lg以上): 画面45%幅 (迫力復活)、最大1000pxまで許容
      ? "w-[85vw] max-w-md lg:w-[45vw] lg:max-w-5xl h-16 lg:h-[5.5vw] text-xl lg:text-[1.8vw] border-[3px] lg:border-[0.3vw]" 
      
      // Mobile/Tablet: 画面40%幅 (2つ並べても入る)、最大200px
      // PC (lg以上): 画面21.5%幅 (迫力復活)、最大500pxまで許容
      : "w-[40vw] max-w-[200px] lg:w-[21.5vw] lg:max-w-2xl h-14 lg:h-[4.5vw] text-xs lg:text-[1.1vw] border-[2px] lg:border-[0.3vw]";

  const bg = variant === "primary" ? CONFIG.ui.btnPrimary : CONFIG.ui.btnSecondary;
  
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

const Highlight = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span
    className={`font-bold inline-block ${className}`}
    style={{ color: "yellow", textShadow: `1px 1px 2px ${PALETTE.shadow}` }}
  >
    {children}
  </span>
);

// --- 3. メインコンポーネント ---
export default function Hero() {
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

  const initialStyle = (fromStyle: any, toStyle: any) => 
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
                duration: shouldAnimate ? 0.5 : 0 
              } 
            }}
          >
            <CurtainPanel side="left" />
            <CurtainPanel side="right" />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-shine { animation: shine 6s linear infinite; }
        .animate-twinkle { animation: twinkle ease-in-out infinite alternate; }

        ::-webkit-scrollbar { display: none; }
        ::-webkit-scrollbar-button { display: none; }

        @media (min-width: 1024px) {
            ::-webkit-scrollbar { display: block; width: 16px; }
            ::-webkit-scrollbar-track {
              background-color: #020617; 
              border-left: 1px solid rgba(255, 255, 255, 0.1);
            }
            ::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #fcd34d 0%, #d97706 100%);
              border-radius: 99px;
              border: 3px solid #020617; 
              box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.4);
            }
            ::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(180deg, #fffbeb 0%, #f59e0b 100%);
            }
            ::-webkit-scrollbar-button { display: none; height: 0; width: 0; }
            ::-webkit-scrollbar-button:vertical:start:decrement {
              display: block; height: 28px; width: 16px; background-color: #020617;
              background-repeat: no-repeat; background-position: center; background-size: 16px;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 6L4 18H20L12 6Z' fill='%23fbbf24'/%3E%3C/svg%3E");
            }
            ::-webkit-scrollbar-button:vertical:end:increment {
              display: block; height: 28px; width: 16px; background-color: #020617;
              background-repeat: no-repeat; background-position: center; background-size: 16px;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 18L20 6H4L12 18Z' fill='%23fbbf24'/%3E%3C/svg%3E");
            }
            ::-webkit-scrollbar-button:vertical:start:decrement:hover,
            ::-webkit-scrollbar-button:vertical:end:increment:hover {
              background-color: #0f172a; box-shadow: inset 0 0 10px rgba(251, 191, 36, 0.2);
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
          backgroundSize: '50px 50px'
        }}
      />
      <StarryBackground />

      <div className="z-10 w-full lg:w-[95vw] flex flex-col items-center text-center mx-auto max-w-7xl">
        {/* タイトル */}
        <motion.div
          initial={initialStyle({ opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })}
          animate={{ opacity: 1, scale: 1 }}
          transition={commonTransition(0.5, 0.8)}
          className="w-full flex justify-center mb-6 lg:mb-[1.5vw]"
        >
          <h1 className="flex flex-col lg:flex-row gap-[0.5vw] lg:gap-[2vw] items-center whitespace-nowrap leading-none">
            <span
              className="text-[clamp(40px,9vw,200px)] font-[900] tracking-wider animate-shine bg-[size:200%_auto]"
              style={{
                backgroundImage: "linear-gradient(to right, #fff9c4 0%, #fbbf24 40%, #ffffff 50%, #fbbf24 60%, #fff9c4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 1.5vw rgba(253, 224, 71, 0.4))",
              }}
            >
              CRITICAL
            </span>
            <span
              className="text-[clamp(40px,9vw,200px)] font-[900] tracking-wider animate-shine bg-[size:200%_auto]"
              style={{
                backgroundImage: "linear-gradient(to right, #fff9c4 0%, #fbbf24 40%, #ffffff 50%, #fbbf24 60%, #fff9c4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 1.5vw rgba(253, 224, 71, 0.4))",
                animationDelay: "0.5s",
              }}
            >
              TYPING
            </span>
          </h1>
        </motion.div>

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
            ※ タイトル画面の設定から音量の調整や名前の変更が行えます！<br />
            初回ログイン時は名前入力しないと出てこないのでご注意ください🙇‍♂️<br />
            もしゲーム中反応しなくなりましたら一度画面をクリックしてみてください！
          </p>
        </motion.div>

        {/* NEWS */}
        <motion.div
          initial={initialStyle({ opacity: 0, y: 10 }, { opacity: 1, y: 0 })}
          animate={{ opacity: 1, y: 0 }}
          transition={commonTransition(1.2)}
          className="w-[95vw] max-w-3xl lg:w-[50vw] lg:max-w-none mb-20 lg:mb-[5vw] mt-6 lg:mt-[4vw]"
        >
          <div className="flex items-center gap-2 lg:gap-[0.5vw] mb-3 lg:mb-[0.8vw] pl-2 lg:pl-[0.5vw] text-white/90">
            <div className="w-2 h-2 lg:w-[0.6vw] lg:h-[0.6vw] bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
            <h3 className="text-xl lg:text-[1.2vw] font-bold tracking-widest drop-shadow-md">
              NEWS
            </h3>
          </div>

          <InfoCard type="news">
            <ul className="space-y-3 lg:space-y-[0.8vw]">
              {NEWS_ITEMS.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-[2vw] border-b border-white/20 pb-3 lg:pb-[0.8vw] last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4 lg:gap-[1.5vw] shrink-0">
                    <span className="text-white text-sm lg:text-[1.0vw] font-mono font-bold min-w-[80px] lg:w-[6.5vw] text-left shrink-0">
                      {item.date}
                    </span>
                    <span
                      className={`
                      text-xs lg:text-[0.8vw] font-bold 
                      px-3 lg:px-0 lg:w-[5.5vw] flex justify-center items-center shrink-0
                      py-[2px] lg:py-[0.3vw] rounded-full border border-white/40 bg-white/20 text-white
                    `}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-white text-sm lg:text-[1.1vw] font-medium drop-shadow-sm leading-snug text-left">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </InfoCard>
        </motion.div>
      </div>
    </section>
  );
}