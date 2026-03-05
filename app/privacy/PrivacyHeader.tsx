import Link from "next/link";

export const PrivacyHeader = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center bg-[#0ea5e9]/20  backdrop-blur-md py-4 px-6 rounded-2xl border border-white/20 shadow-xl mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          プライバシーポリシー
        </h1>
        <Link
          href="/"
          className="hidden xl:flex group relative px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-bold transition-all hover:scale-105 active:scale-95 items-center gap-2 whitespace-nowrap"
        >
          <span>TOPへ戻る</span>
          <span className="text-amber-300">↩</span>
        </Link>
      </div>

      <Link
        href="/"
        className="xl:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 border border-white/30 shadow-[0_4px_20px_rgba(79,70,229,0.6)] active:scale-95 transition-transform"
      >
        <span className="text-2xl text-white">↩</span>
      </Link>
    </>
  );
};
