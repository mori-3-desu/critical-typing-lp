"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const BASE_GAME_URL = "https://typing-game-eta-lime.vercel.app/";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative w-full z-50 font-[family-name:var(--font-rounded)] transition-all duration-300 bg-gradient-to-b from-[#0f2027]/95 via-[#203a43]/95 to-[#2c5364]/90 border-b-[4px] border-[#99FF99]/40 shadow-[0_4px_20px_rgba(148,163,184,0.2)] overflow-hidden">
      {/* 背景のキラキラ星 */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && [...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle opacity-0"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)"
            }}
          />
        ))}
      </div>

      <div className="w-full px-4 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20 md:h-28"> 
          <div className="shrink-0 flex items-center group cursor-pointer select-none overflow-visible">
            <Link href="/" className="flex flex-col items-center gap-1">
              <div className="flex gap-[3px] p-1">
                {"CRITICAL".split("").map((char, i) => (
                  <GamingKey key={`c-${i}`} char={char} hue="twilight" index={i} />
                ))}
              </div>
              <div className="flex gap-[3px] p-1">
                {"TYPING".split("").map((char, i) => (
                  <GamingKey key={`t-${i}`} char={char} hue="twilight" index={i + 8} />
                ))}
              </div>
            </Link>
          </div>

          {/* PCメニュー (lg以上) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <HeaderBtn href={BASE_GAME_URL} text="今すぐプレイ" />
            <HeaderBtn href={`${BASE_GAME_URL}?muted=true`} text="静かにプレイ" />
            {/* リンク先をページに変更 */}
            <HeaderBtn href="/faq" text="Q&A" />
            <HeaderBtn href="/contact" text="お問い合わせ" />
          </nav>

          {/* ハンバーガーボタン (lg未満) */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-[#fff9c4] hover:bg-white/10 transition-colors border border-white/20">
              {isOpen ? (
                <svg className="h-7 w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isOpen && (
        <div className="lg:hidden border-t-2 border-[#94a3b8]/30 bg-[#0f2027]/95 backdrop-blur-xl shadow-2xl">
          <div className="px-6 py-6 space-y-4 flex flex-col items-center">
            <HeaderBtn href={BASE_GAME_URL} text="今すぐプレイ" fullWidth />
            <HeaderBtn href={`${BASE_GAME_URL}?muted=true`} text="静かにプレイ" fullWidth />
            <div className="w-full h-[1px] bg-white/20 my-2"></div>
            {/* リンク先をページに変更 */}
            <HeaderBtn href="/faq" text="Q&A" fullWidth />
            <HeaderBtn href="/contact" text="お問い合わせ" fullWidth />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle linear infinite;
        }
      `}</style>
    </header>
  );
}

const GamingKey = ({ char, index }: { char: string, hue: string, index: number }) => {
  const twilightStyles = [
    { bg: "from-indigo-600 to-purple-800", border: "border-indigo-400", text: "text-white", glow: "shadow-[0_0_15px_rgba(99,102,241,0.8)]" },
    { bg: "from-violet-600 to-fuchsia-800", border: "border-violet-400", text: "text-white", glow: "shadow-[0_0_15px_rgba(139,92,246,0.8)]" },
    { bg: "from-slate-700 to-blue-900", border: "border-slate-400", text: "text-white", glow: "shadow-[0_0_15px_rgba(148,163,184,0.8)]" },
  ];
  const style = twilightStyles[index % twilightStyles.length];
  return (
    <div className="relative group transition-transform duration-75 active:scale-95">
      <div className={`relative z-10 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-b ${style.bg} rounded-lg md:rounded-xl border-t-[1px] md:border-t-2 border-l border-r border-b-[2px] md:border-b-4 ${style.border} border-b-black/30 shadow-[0_2px_0_rgba(0,0,0,0.3)] ${style.glow} transform transition-all group-hover:-translate-y-1 group-hover:brightness-110 group-active:translate-y-1 group-active:shadow-none group-active:border-b-0`}>
        <div className="absolute inset-[3px] rounded-md bg-black/10 shadow-inner pointer-events-none"></div>
        <span className={`relative z-20 text-xs md:text-lg lg:text-xl font-[900] ${style.text} drop-shadow-md`}>{char}</span>
        <div className="absolute top-[2px] left-[2px] right-[2px] h-[35%] bg-gradient-to-b from-white/40 to-transparent rounded-t-md pointer-events-none"></div>
      </div>
    </div>
  );
};

function HeaderBtn({ href, text, fullWidth = false }: { href: string; text: string; fullWidth?: boolean }) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"} 
      rel="noopener noreferrer" 
      className={`
        relative group flex items-center justify-center
        font-bold text-white tracking-wide whitespace-nowrap
        text-xs lg:text-base py-2 px-3 lg:px-6 lg:py-2.5
        rounded-full border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] 
        transition-all duration-200 ease-out hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 active:translate-y-0 overflow-hidden 
        ${fullWidth ? "w-full max-w-xs" : ""}
      `} 
      style={{ background: "linear-gradient(135deg, #fcd34d 0%, #fbbf24 40%, #c084fc 100%)", textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)" }}
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute top-[10%] left-[10%] w-[80%] h-[40%] bg-white/30 rounded-full pointer-events-none" />
    </Link>
  );
}