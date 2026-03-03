"use client";

import Link from "next/link";
import { useState } from "react";
import { generateStars } from "../utils/star";
import { StarryBackground } from "@/components/common/StarBackground";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "./faq";

// --- アコーディオン部品 ---
function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/40 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm shadow-sm transition-all hover:bg-white/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-5 text-left transition-colors"
      >
        <div className="font-bold text-white text-base md:text-lg flex items-start gap-3 w-[90%]">
          <span className="text-cyan-200 text-xl shrink-0 leading-tight">
            Q.
          </span>
          <span className="leading-tight">{question}</span>
        </div>
        <svg
          className={`w-6 h-6 text-cyan-200 shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-black/10 border-t border-white/20"
          >
            <div className="p-5 text-white leading-relaxed font-medium flex items-start gap-3">
              <span className="font-bold text-cyan-300 text-lg shrink-0 pt-[2px]">
                A.
              </span>
              <span>{answer}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  
  const initialStars = generateStars();
  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] text-white font-[family-name:var(--font-rounded)] overflow-y-auto z-[9999]"
      style={{
        background: "linear-gradient(to bottom, #143C5A, #86B6E0)",
      }}
    >
      <style jsx global>{`
        /* デフォルト(スマホ)はスクロールバー非表示 */
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* 1024px以上(13インチPCなど)でスクロールバーを表示 */
        @media (min-width: 1024px) {
          ::-webkit-scrollbar {
            display: block;
            width: 14px;
          }
          * {
            -ms-overflow-style: auto;
            scrollbar-width: auto;
          }

          ::-webkit-scrollbar-track {
            background-color: rgba(10, 40, 60, 0.5);
            border-left: 1px solid rgba(255, 255, 255, 0.1);
          }
          /* ★変更: つまみ部分を黄色〜オレンジに変更（他ページと統一） */
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(
              180deg,
              #fff9c4 0%,
              #fbbf24 40%,
              #ffffff 50%,
              #fbbf24 60%,
              #fff9c4 100%
            );
            border-radius: 99px;
            border: 3px solid #143c5a; /* 背景色に合わせる */
            background-clip: content-box;
            box-shadow: inset 0 0 10px rgba(251, 191, 36, 0.5);
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #ffffff 0%, #fcd34d 100%);
            border: 3px solid #143c5a;
            background-clip: content-box;
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>

      <StarryBackground stars={initialStars} />

      <main className="relative w-[95%] xl:w-[90%] max-w-[1400px] mx-auto py-10 flex flex-col items-center">
        {/* ヘッダーエリア */}
        <div className="w-full flex justify-between items-center bg-[#0ea5e9]/20 backdrop-blur-md py-4 px-6 rounded-2xl border border-cyan-200/30 shadow-lg mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Q&A (よくある質問)
          </h1>
          <Link
            href="/"
            className="hidden xl:flex group relative px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 border border-white/40 text-sm font-bold transition-all hover:scale-105 active:scale-95 items-center gap-2 whitespace-nowrap"
          >
            <span>TOPへ戻る</span>
            <span className="text-cyan-100">↩</span>
          </Link>
        </div>

        {/* 2カラムレイアウト */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">
          <div className="lg:col-span-7 flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-cyan-100 border-b border-white/20 pb-2">
                <span>💻</span> 動作環境について
              </h3>
              <div className="flex flex-col gap-4 text-sm md:text-base">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-cyan-200">推奨ブラウザ</span>
                  <span>Google Chrome (最新版), Edge, Safari</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-cyan-200">推奨デバイス</span>
                  <span>物理キーボードを接続したPC</span>
                </div>
                <div className="mt-2 bg-black/20 p-3 rounded-lg text-xs text-gray-200">
                  ※
                  スマートフォン・タブレットでもプレイ可能ですが、画面サイズや入力方式により一部機能が制限される場合があります。
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-900/60 to-blue-900/60 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/30 text-center shadow-lg">
              <h3 className="text-lg font-bold mb-3 text-white">
                解決しない場合・バグ報告
              </h3>
              <p className="text-cyan-100 mb-6 text-sm">
                FAQにない質問や不具合は
                <br />
                お問い合わせフォームへ。
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-cyan-900 font-bold rounded-full shadow-lg hover:scale-105 hover:bg-cyan-50 transition-all text-sm md:text-base"
              >
                <span>📩</span> お問い合わせページへ
              </Link>
            </div>
          </div>
        </div>

        {/* スマホ用 戻るボタン */}
        <Link
          href="/"
          className="xl:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border border-white/30 shadow-[0_4px_20px_rgba(6,182,212,0.6)] active:scale-95 transition-transform"
        >
          <span className="text-2xl text-white">↩</span>
        </Link>
      </main>
    </div>
  );
}
