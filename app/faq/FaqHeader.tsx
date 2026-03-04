import Link from "next/link";

export const FaqHeader = () => {
  return (
    <>
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

      <Link
        href="/"
        className="xl:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border border-white/30 shadow-[0_4px_20px_rgba(6,182,212,0.6)] active:scale-95 transition-transform"
      >
        <span className="text-2xl text-white">↩</span>
      </Link>
    </>
  );
};
