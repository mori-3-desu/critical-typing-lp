import Link from "next/link";
import { type SubPageHeaderProps } from "../types";

export const SubPageHeader = ({ title }: SubPageHeaderProps) => {
  return (
    // 🌟 魔法の透明な箱 `<>` で全体を囲む！
    <>
      {/* 1. ヘッダー本体（PC用ボタン含む） */}
      <div className="w-full flex justify-between items-center bg-white/10 backdrop-blur-md py-4 px-6 rounded-2xl border border-white/20 shadow-xl mb-6 md:mb-10">
        
        <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400 drop-shadow-sm flex items-center gap-2">
          {title}
        </h1>

        {/* PC用 戻るボタン（xl 以上で表示） */}
        <Link
          href="/"
          className="hidden xl:flex group relative px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-bold transition-all hover:scale-105 active:scale-95 items-center gap-2 whitespace-nowrap"
        >
          <span>TOPへ戻る</span>
          <span className="text-cyan-200">↩</span>
        </Link>
      </div>

      {/* 🌟 2. スマホ用 戻るボタン（Keymapと同じように右下に完全固定！） */}
      <Link
        href="/"
        className="xl:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 border border-white/30 shadow-[0_4px_20px_rgba(6,182,212,0.6)] active:scale-95 transition-transform"
      >
        <span className="text-2xl text-white">↩</span>
      </Link>
    </>
  );
};