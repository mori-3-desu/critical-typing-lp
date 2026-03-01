"use client";

import Link from "next/link";
import { useState } from "react";
import { StarryBackground } from "@/components/common/StarBackground";

const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_URL || "";
// --- 猫ミミローディングコンポーネント ---
const CatLoader = ({ fadeOut }: { fadeOut: boolean }) => {
  return (
    <div id="loading-screen" className={fadeOut ? "fade-out" : ""}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

        /* =========================================
           ★ローディング画面（明るめブルーVer）
           ========================================= */
        #loading-screen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          
          /* ★修正: 暗すぎない、爽やかな青〜紫のグラデーション */
          background: linear-gradient(
            to bottom,
            #4338ca 0%,   /* インディゴ */
            #6366f1 40%,  /* 明るい紫青 */
            #60a5fa 70%,  /* 明るい青 */
            #a5f3fc 100%  /* 爽やかな水色 */
          );
          z-index: 50;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          transition: opacity 1.5s ease, visibility 1.5s ease;
          opacity: 1;
          visibility: visible;
          pointer-events: all;
        }

        #loading-screen.fade-out {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .keyboard-loader {
          display: flex;
          gap: 12px;
          padding-top: 25px;
          transform: perspective(500px) rotateX(15deg);
        }
        
        @media (max-width: 768px) {
          .keyboard-loader { gap: 8px; transform: perspective(500px) rotateX(10deg) scale(0.85); }
        }

        /* --- ネコミミキーキャップ --- */
        .key.cat {
          position: relative;
          width: 60px;
          height: 60px;

          /* ★修正: 背景が明るくなったので、キーは「白」を基調に見やすく */
          background: 
              /* 左耳 */ linear-gradient(135deg, transparent 50%, #ffffff 50%) no-repeat -10px -15px / 40px 40px,
            /* 右耳 */ linear-gradient(225deg, transparent 50%, #ffffff 50%) no-repeat 30px -15px / 40px 40px,
            /* 本体 */ linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);

          border-radius: 16px;
          font-family: "Fredoka One", cursive, sans-serif;
          font-size: 32px;
          color: #4f46e5; /* 文字色はクッキリしたインディゴ */
          text-shadow: 1px 1px 0 rgba(199, 210, 254, 0.5);

          display: flex;
          justify-content: center;
          align-items: center;

          /* 影を少し強めにして浮遊感を出す */
          box-shadow: 0 10px 0 #818cf8, 0 15px 20px rgba(0, 0, 0, 0.2);

          animation: catBounce 1.2s infinite ease-in-out;
          overflow: hidden;
        }

        .key.cat::before {
          content: "";
          position: absolute;
          top: 5px;
          left: 5px;
          width: 85%;
          height: 40%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.1));
          border-radius: 12px 12px 20px 20px;
          z-index: 1;
          pointer-events: none;
        }

        .key.cat:nth-child(1) { animation-delay: 0s; }
        .key.cat:nth-child(2) { animation-delay: 0.1s; }
        .key.cat:nth-child(3) { animation-delay: 0.2s; }
        .key.cat:nth-child(4) { animation-delay: 0.3s; }
        .key.cat:nth-child(5) { animation-delay: 0.4s; }
        .key.cat:nth-child(6) { animation-delay: 0.5s; }
        .key.cat:nth-child(7) { animation-delay: 0.6s; }

        @keyframes catBounce {
          0%, 100% {
            transform: translateY(0) scale(1, 1);
            box-shadow: 0 10px 0 #818cf8, 0 15px 20px rgba(0, 0, 0, 0.2);
          }
          30% {
            transform: translateY(-25px) scale(1.1, 0.9) rotateX(-10deg);
            box-shadow: 0 35px 0 #818cf8, 0 40px 25px rgba(0, 0, 0, 0.15);
          }
          50% {
            transform: translateY(8px) scale(0.85, 1.15);
            box-shadow: 0 0 0 #818cf8, 0 0 0 rgba(0, 0, 0, 0);
            background: linear-gradient(135deg, transparent 50%, #818cf8 50%) no-repeat -10px -5px / 40px 40px,
              linear-gradient(225deg, transparent 50%, #818cf8 50%) no-repeat 30px -5px / 40px 40px,
              linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          }
          70% {
            transform: translateY(-5px) scale(1.05, 0.95);
            box-shadow: 0 12px 0 #818cf8, 0 15px 15px rgba(0, 0, 0, 0.2);
            background: linear-gradient(135deg, transparent 50%, #ffffff 50%) no-repeat -10px -15px / 40px 40px,
              linear-gradient(225deg, transparent 50%, #ffffff 50%) no-repeat 30px -15px / 40px 40px,
              linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          }
        }

        .loading-text {
          margin-top: 60px;
          font-family: "Fredoka One", cursive, sans-serif;
          color: #fff;
          font-size: 32px;
          letter-spacing: 0.1em;
          text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transform: perspective(500px) rotateX(15deg);
        }

        .paw {
          display: inline-block;
          font-size: 1.2em;
          filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.2));
          animation: pawFloatBig 2s infinite ease-in-out;
        }

        @keyframes pawFloatBig {
          0%, 100% { transform: rotate(0deg) translateY(0) scale(1); }
          50% { transform: rotate(20deg) translateY(-15px) scale(1.1); }
        }
      `}</style>

      <div className="keyboard-loader">
        <div className="key cat">L</div>
        <div className="key cat">O</div>
        <div className="key cat">A</div>
        <div className="key cat">D</div>
        <div className="key cat">I</div>
        <div className="key cat">N</div>
        <div className="key cat">G</div>
      </div>
      <div className="loading-text">
        NOW LOADING <span className="paw">🐾</span>
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className="fixed inset-0 w-full h-[100dvh] text-white font-[family-name:var(--font-rounded)] overflow-y-auto z-[9999]"
      style={{
        background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)", 
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)"
      }}
    >
      <style jsx global>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }

        @media (min-width: 1024px) {
          ::-webkit-scrollbar { display: block; width: 14px; }
          * { -ms-overflow-style: auto; scrollbar-width: auto; }
          
          ::-webkit-scrollbar-track { 
            background-color: rgba(15, 32, 39, 0.5); 
            border-left: 1px solid rgba(255, 255, 255, 0.1); 
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #a5f3fc 0%, #06b6d4 100%);
            border-radius: 99px;
            border: 3px solid #0f2027;
            background-clip: content-box;
          }
        }

        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" />
      <StarryBackground />

      <main className="relative w-[95%] xl:w-[80%] max-w-[1000px] mx-auto py-10 flex flex-col items-center">
        
        {/* ヘッダーエリア */}
        <div className="w-full flex justify-between items-center bg-white/10 backdrop-blur-md py-4 px-6 rounded-2xl border border-white/20 shadow-xl mb-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400 drop-shadow-sm">
            お問い合わせ
          </h1>
          <Link href="/" className="hidden xl:flex group relative px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-bold transition-all hover:scale-105 active:scale-95 items-center gap-2 whitespace-nowrap">
             <span>TOPへ戻る</span>
             <span className="text-cyan-200">↩</span>
          </Link>
        </div>

        {/* フォームコンテナ */}
        <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative min-h-[600px]">
          
          {/* 明るめ猫ローディング */}
          <CatLoader fadeOut={!isLoading} />

          {/* Googleフォーム */}
          <iframe
            src={GOOGLE_FORM_URL}
            className="w-full h-[800px] md:h-[1000px] border-0"
            onLoad={() => setIsLoading(false)}
            title="Contact Form"
            loading="lazy" 
            sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-top-navigation"
            referrerPolicy="no-referrer"
          >
            読み込んでいます…
          </iframe>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          ※ 送信内容はGoogleフォームを経由して管理者に届きます。<br/>
          ※ 個人情報は<Link href="/privacy" className="underline hover:text-cyan-300">プライバシーポリシー</Link>に基づき管理されます。
        </div>

        {/* スマホ用 戻るボタン */}
        <Link 
          href="/" 
          className="xl:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 border border-white/30 shadow-[0_4px_20px_rgba(6,182,212,0.6)] active:scale-95 transition-transform"
        >
          <span className="text-2xl text-white">↩</span>
        </Link>

      </main>
    </div>
  );
}