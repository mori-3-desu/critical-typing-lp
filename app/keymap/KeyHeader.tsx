import Link from "next/link";

export const KeyHeader = () => {
  return (
    <div className="w-full flex flex-col gap-3 mb-6">
      <div className="flex justify-between items-center bg-indigo-900/80 backdrop-blur-md py-3 px-5 rounded-xl border border-white/10 shadow-lg">
        <h1 className="text-xl md:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#fcd34d] to-[#fbbf24] whitespace-nowrap">
          KEYMAP
        </h1>
        <Link
          href="/"
          className="hidden xl:flex group relative px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-bold transition-all hover:scale-105 active:scale-95 items-center gap-2 whitespace-nowrap"
        >
          <span>TOPへ戻る</span>
          <span className="text-amber-300">↩</span>
        </Link>
      </div>
    </div>
  );
};
