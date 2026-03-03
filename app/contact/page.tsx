"use client";
import Link from "next/link";
import { generateStars } from "../utils/star";
import { StarryBackground } from "@/components/common/StarBackground";
import { ContactForm } from "@/components/features/ContactForm"; // 👈 呼び出す

export default function ContactPage() {
  const initialStars = generateStars();

  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] text-white font-[family-name:var(--font-rounded)] overflow-y-auto z-[9999]"
      style={{
        background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      <style jsx global>{`
        /* スクロールバーやキラキラのアニメーション定義（今のまま） */
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
        @media (min-width: 1024px) {
          ::-webkit-scrollbar { display: block; width: 14px; }
          * { -ms-overflow-style: auto; scrollbar-width: auto; }
          ::-webkit-scrollbar-track { background-color: rgba(15, 32, 39, 0.5); border-left: 1px solid rgba(255, 255, 255, 0.1); }
          ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #a5f3fc 0%, #06b6d4 100%); border-radius: 99px; border: 3px solid #0f2027; background-clip: content-box; }
        }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" />
      
      {/* 🌟 サーバーで作った星を渡す */}
      <StarryBackground stars={initialStars} />

      <main className="relative w-[95%] xl:w-[80%] max-w-[1000px] mx-auto py-10 flex flex-col items-center">
        
        {/* ヘッダーエリア（タイトルと戻るボタン） */}
        <div className="w-full flex justify-between items-center bg-white/10 backdrop-blur-md py-4 px-6 rounded-2xl border border-white/20 shadow-xl mb-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400 drop-shadow-sm">
            お問い合わせ
          </h1>
          <Link
            href="/"
            className="hidden xl:flex group relative px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-bold transition-all hover:scale-105 active:scale-95 items-center gap-2 whitespace-nowrap"
          >
            <span>TOPへ戻る</span>
            <span className="text-cyan-200">↩</span>
          </Link>
        </div>

        {/* 🌟 フォーム本体（ここで呼び出す！） */}
        <ContactForm />

        {/* フッターエリア */}
        <div className="mt-8 text-center text-xs text-gray-400">
          ※ 送信内容はGoogleフォームを経由して管理者に届きます。
          <br />※ 個人情報は
          <Link href="/privacy" className="underline hover:text-cyan-300">
            プライバシーポリシー
          </Link>
          に基づき管理されます。
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