"use client";

import Link from "next/link";
import { StarryBackground } from "@/components/common/StarBackground";
import { generateStars } from "../utils/star";

export default function NotesPage() {
  const initialStars = generateStars();

  return (
    <div 
      className="fixed inset-0 w-full h-100dvh text-white font-[family-name:var(--font-rounded)] overflow-y-auto z-[9999] theme-red"
      style={{
        background: "linear-gradient(to bottom, #28143C, #B43C64)", 
        boxShadow: "0 0 20px rgba(255, 100, 150, 0.5), 0 20px 50px rgba(0, 0, 0, 0.5)"
      }}
    >
      <StarryBackground stars={initialStars}/>

      <main className="relative w-[95%] xl:w-[80%] max-w-[1000px] mx-auto py-10 flex flex-col items-center">
        
        {/* ヘッダーエリア */}
        <div className="w-full flex justify-between items-center bg-[#1e1b4b]/80 backdrop-blur-md py-4 px-6 rounded-2xl border border-white/20 shadow-xl mb-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#fcd34d] to-[#fbbf24]">
            ご利用時の注意
          </h1>
          <Link href="/" className="hidden xl:flex group relative px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-bold transition-all hover:scale-105 active:scale-95 items-center gap-2 whitespace-nowrap">
             <span>TOPへ戻る</span>
             <span className="text-amber-300">↩</span>
          </Link>
        </div>

        {/* コンテンツエリア */}
        <div className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10 shadow-lg mb-32 text-gray-200 leading-relaxed">
          <div className="space-y-8">
            
            <section>
              <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
                1. プレイ環境について
              </h2>
              <p className="text-sm md:text-base mb-3">
                ハイスコアを目指すなら、<strong>PCと物理キーボード</strong>でのプレイが一番のオススメです！
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base pl-4 opacity-90">
                <li>スマホ・タブレットでも遊べますが、画面キーボードだと本来の速度が出にくい場合があります。</li>
                <li>Bluetoothキーボード等は、無線の遅延（ラグ）により判定がズレる可能性があります。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
                2. 音量について
              </h2>
              <p className="text-sm md:text-base">
                このゲームはタイプ音やBGMが鳴ります。<br/>
                カフェや電車内などで遊ぶときは、周りの迷惑にならないようイヤホンを使うか、設定画面でミュートにしてお楽しみください。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
                3. 手や目の健康のために
              </h2>
              <p className="text-sm md:text-base mb-3">
                タイピングに熱中しすぎると、気づかないうちに手首や指、目に負担がかかります。
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base pl-4 opacity-90">
                <li>1時間プレイしたら10分休憩するなど、こまめに休みましょう。</li>
                <li>手首に違和感（痛みやしびれ）を感じたら、無理せずすぐにプレイを中断してください（腱鞘炎にご注意！）。</li>
                <li>画面の激しい点滅が苦手な方は、部屋を明るくして離れて見てください。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
                4. フェアプレイのお願い
              </h2>
              <p className="text-sm md:text-base">
                自動入力ツールやマクロを使って出したスコアは、ランキングから削除させていただきます。<br/>
                みんなで楽しく競い合う場所を守るために、ご協力をお願いします。
              </p>
            </section>

            <div className="pt-8 text-center text-xs text-gray-400">
              ルールを守って、楽しみながら上位ランカーを目指そう！
            </div>
          </div>
        </div>

        {/* スマホ用 戻るボタン */}
        <Link 
          href="/" 
          className="xl:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 border border-white/30 shadow-[0_4px_20px_rgba(79,70,229,0.6)] active:scale-95 transition-transform"
        >
          <span className="text-2xl text-white">↩</span>
        </Link>

      </main>
    </div>
  );
}