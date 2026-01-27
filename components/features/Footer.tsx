"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full z-10 font-[family-name:var(--font-rounded)] bg-gradient-to-b from-[#0f2027]/95 via-[#203a43]/95 to-[#2c5364]/90 border-t-[3px] border-[#94a3b8]/40 shadow-[0_-4px_20px_rgba(148,163,184,0.2)] overflow-hidden text-white py-10 px-6 md:px-12">
      
      {/* md:flex-row を xl:flex-row に変更。
          これにより、タブレットや一般的なノートPC（~1280px未満）までは
          「縦並び（センター揃え）」が維持され、崩れを防ぎます。 */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-center gap-8">
        
        {/* 左側: ロゴと説明 */}
        {/* xl未満はセンター揃え、xl以上で左寄せ */}
        <div className="flex flex-col gap-2 text-center xl:text-left">
          <h2 className="text-2xl font-[900] tracking-wider drop-shadow-md">
            <span className="bg-gradient-to-r from-[#fff9c4] via-[#fcd34d] to-[#fff9c4] bg-clip-text text-transparent bg-[length:200%_auto] animate-shine">
              CRITICAL TYPING
            </span>
          </h2>
        </div>

        {/* 右側: リンクメニュー */}
        {/* ここも xl:flex-row に変更。
            これにより、幅が十分にある大画面（xl以上）以外は、
            画像のように「縦にリスト表示」され、文字が見やすくなります。 */}
        <div className="flex flex-col xl:flex-row items-center gap-5 xl:gap-8">
          <Link href="/faq" className="text-sm font-bold text-gray-300 hover:text-[#fff9c4] transition-colors whitespace-nowrap">
            Q&A
          </Link>
          <Link href="/contact" className="text-sm font-bold text-gray-300 hover:text-[#fff9c4] transition-colors whitespace-nowrap">
            お問い合わせ
          </Link>
          <Link href="/terms" className="text-sm font-bold text-gray-300 hover:text-[#fff9c4] transition-colors whitespace-nowrap">
            利用規約
          </Link>
          <Link href="/privacy" className="text-sm font-bold text-gray-300 hover:text-[#fff9c4] transition-colors whitespace-nowrap">
            プライバシーポリシー
          </Link>
          <Link href="/notes" className="text-sm font-bold text-gray-300 hover:text-[#fff9c4] transition-colors whitespace-nowrap">
            ご利用時の注意
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-10 text-center text-xs text-gray-400 border-t border-white/10 pt-6 font-light">
        &copy; 2026 CRITICAL TYPING. All rights reserved.
      </div>
    </footer>
  );
}