"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { env } from "@/env";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const scrollToTop = () => {
    document.getElementById("top")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // LOGOを変えてもここを改良するだけで反映される
  // reduce初期値0、次は8...という感じ
  const LOGO_WORD = ["CRITICAL", "TYPING"] as const;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Safariは一度別URLへ飛んでbackするとbfcacheが働き、
  // isOpenがtrueのまま復元されてCSSのtransitionが実行されず挙動がおかしくなる
  // pageshowを使う
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setIsOpen(false);
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return (
    <>
      {/* z-30: ドロワー(z-50)より低くすることで、ドロワーがヘッダーの上に出られる */}
      <header className="sticky top-0 z-30 w-full font-rounded bg-linear-to-b from-[#0f2027]/95 via-[#203a43]/95 to-[#2c5364]/90 border-b-4 border-[#99FF99]/40 shadow-[0_4px_20px_rgba(148,163,184,0.2)]">
        <div className="w-full px-4 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-28">
            {/* ロゴ */}
            <div className="shrink-0 flex items-center group cursor-pointer select-none overflow-visible">
              <Link
                href="/"
                className="flex flex-col items-center gap-1"
                onClick={scrollToTop}
              >
                {LOGO_WORD.map((word, wordIndex) => {
                  const offset = LOGO_WORD.slice(0, wordIndex).reduce(
                    (sum, w) => sum + w.length,
                    0,
                  );
                  return (
                    <div key={word} className="flex gap-0.75 p-1">
                      {word.split("").map((char, i) => (
                        <GamingKey
                          key={`${word}-${i}`}
                          char={char}
                          index={offset + i}
                        />
                      ))}
                    </div>
                  );
                })}
              </Link>
            </div>

            {/* PCナビゲーション */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              <HeaderBtn href={env.GAME_URL} text="今すぐプレイ" />
              <HeaderBtn
                href={`${env.GAME_URL}?muted=true`}
                text="静かにプレイ"
              />
              <HeaderBtn href="/faq" text="Q&A" />
              <HeaderBtn href="/contact" text="お問い合わせ" />
            </nav>

            {/* ハンバーガーボタンのレイアウト用スペーサー（実体はheaderの外） */}
            <div className="lg:hidden w-11 h-11" aria-hidden="true" />
          </div>
        </div>
      </header>

      {/* ハンバーガーボタン本体
          headerの外でfixed配置。z-[60]でドロワー(z-[50])より上に常に表示される。
          headerのstacking context(z-30)の影響を受けないためここに置く。 */}
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="lg:hidden fixed top-4 right-4 md:top-8 z-60 p-2 rounded-xl text-[#fff9c4] hover:bg-white/25 transition-colors border border-white/75"
      >
        <div className="relative w-7 h-7 md:w-8 md:h-8">
          <span
            className={`absolute left-0 w-full h-0.75 bg-current rounded transition-all duration-300 ease-in-out ${
              isOpen ? "top-1/2 -translate-y-1/2 rotate-315" : "top-1"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.75 bg-current rounded transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0 -translate-x-2.5" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 w-full h-0.75 bg-current rounded transition-all duration-300 ease-in-out ${
              isOpen ? "bottom-1/2 translate-y-1/2 -rotate-315" : "bottom-1"
            }`}
          />
        </div>
      </button>

      {/* モバイルドロワー：z-50でheader(z-30)の上、ボタン(z-60)の下
          aria-hidden: 閉じている間はスクリーンリーダーから完全に隠す */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="ナビゲーションメニュー"
        aria-hidden={!isOpen}
        className="lg:hidden fixed inset-0 z-50 pointer-events-none"
      >
        {/* 背景オーバーレイ */}
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* ドロワー本体：右からスライドイン
            inert: 閉じている間はキーボードフォーカス・クリックを完全にブロック */}
        <nav
          inert={!isOpen}
          className={`absolute top-0 right-0 h-full w-[60%] max-w-xs font-rounded font-bold bg-[#1c045a] backdrop-blur-xl flex flex-col justify-center items-center px-6 gap-6 border-l border-white/10 pointer-events-auto transition-transform duration-500 ease-in-out shadow-[-8px_0_32px_rgba(255,207,156,0.25)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <DrawerBtn
            href={env.GAME_URL}
            text="今すぐプレイ"
            onClick={closeMenu}
          />
          <DrawerBtn
            href={`${env.GAME_URL}?muted=true`}
            text="静かにプレイ"
            onClick={closeMenu}
          />
          <DrawerBtn href="/faq" text="Q&A" onClick={closeMenu} />
          <DrawerBtn href="/contact" text="お問い合わせ" onClick={closeMenu} />
        </nav>
      </div>
    </>
  );
}

const GamingKey = ({ char, index }: { char: string; index: number }) => {
  const twilightStyles = [
    {
      background: "linear-gradient(to bottom, #4f46e5, #6b21a8)",
      border: "border-indigo-400",
      glow: "shadow-[0_0_15px_rgba(99,102,241,0.8)]",
    },
    {
      background: "linear-gradient(to bottom, #7c3aed, #86198f)",
      border: "border-violet-400",
      glow: "shadow-[0_0_15px_rgba(139,92,246,0.8)]",
    },
    {
      background: "linear-gradient(to bottom, #334155, #1e3a5f)",
      border: "border-slate-400",
      glow: "shadow-[0_0_15px_rgba(148,163,184,0.8)]",
    },
  ];
  const style = twilightStyles[index % twilightStyles.length];

  return (
    <div className="relative group transition-transform duration-75 active:scale-95">
      <div
        className={`relative z-10 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-lg md:rounded-xl border-t md:border-t-2 border-l border-r border-b-2 md:border-b-4 ${style.border} border-b-black/30 shadow-[0_2px_0_rgba(0,0,0,0.3)] ${style.glow} transform transition-all group-hover:-translate-y-1 group-hover:brightness-110 group-active:translate-y-1 group-active:shadow-none group-active:border-b-0`}
        style={{ background: style.background }}
      >
        <div className="absolute inset-0.75 rounded-md bg-black/10 shadow-inner pointer-events-none" />
        <span className="relative z-20 text-xs md:text-lg lg:text-xl font-black text-white drop-shadow-md">
          {char}
        </span>
        <div className="absolute top-0.5 left-0.5 right-0.5 h-[35%] bg-linear-to-b from-white/40 to-transparent rounded-t-md pointer-events-none" />
      </div>
    </div>
  );
};

// PC用ナビゲーションボタン
function HeaderBtn({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="relative group flex items-center bg-transparent font-bold text-white tracking-wide whitespace-nowrap text-base lg:text-xl px-3 lg:px-6 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 hover:text-[#ffd700] active:translate-y-1.5"
    >
      <span className="relative z-10 border-b border-transparent transition-colors duration-300 ease-out group-hover:border-[#ffd700]">
        {text}
      </span>
    </Link>
  );
}

// ドロワー用ナビゲーションボタン（文字大きめ）
function DrawerBtn({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="relative group flex items-center justify-center w-full font-bold text-white tracking-wide text-xl transition-all duration-300 ease-out hover:text-[#ffd700] active:scale-95 py-2"
    >
      <span className="border-b border-transparent transition-colors duration-300 ease-out group-hover:border-[#ffd700]">
        {text}
      </span>
    </Link>
  );
}
