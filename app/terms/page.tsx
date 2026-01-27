"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// --- 背景エフェクト ---
const StarryBackground = () => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    const starCount = 60;
    const newStars = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        size: Math.random() * 2 + 1 + "px",
        delay: Math.random() * 5 + "s",
      });
    }
    setStars(newStars);
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white rounded-full animate-twinkle opacity-50"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
};

export default function TermsPage() {
  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] text-white font-[family-name:var(--font-rounded)] overflow-y-auto z-[9999]"
      style={{
        background: "linear-gradient(to bottom, #28143C, #B43C64)",
        boxShadow:
          "0 0 20px rgba(255, 100, 150, 0.5), 0 20px 50px rgba(0, 0, 0, 0.5)",
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
            background-color: rgba(30, 27, 75, 0.5);
            border-left: 1px solid rgba(255, 255, 255, 0.05);
          }
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
            border: 3px solid rgba(30, 27, 75, 1);
            background-clip: content-box;
            box-shadow: inset 0 0 10px rgba(251, 191, 36, 0.5);
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #ffffff 0%, #fcd34d 100%);
            border: 3px solid rgba(30, 27, 75, 1);
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

      <div className="fixed inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
      <StarryBackground />

      <main className="relative w-[95%] xl:w-[80%] max-w-[1000px] mx-auto py-10 flex flex-col items-center">
        <div className="w-full flex justify-between items-center bg-[#1e1b4b]/80 backdrop-blur-md py-4 px-6 rounded-2xl border border-white/20 shadow-xl mb-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#fcd34d] to-[#fbbf24]">
            利用規約
          </h1>
          <Link
            href="/"
            className="hidden xl:flex group relative px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-bold transition-all hover:scale-105 active:scale-95 items-center gap-2 whitespace-nowrap"
          >
            <span>TOPへ戻る</span>
            <span className="text-amber-300">↩</span>
          </Link>
        </div>

        <div className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10 shadow-lg mb-32 text-gray-200 leading-relaxed">
          <div className="space-y-8">
            <section>
              <p className="text-sm md:text-base mb-4">
                この利用規約（以下「本規約」）は、個人が運営するタイピングゲームサイト「CRITICAL
                TYPING」（以下「当サイト」）を利用する際のルールを定めたものです。
                <br />
                当サイトを利用することで、本規約に同意したものとみなされます。楽しく遊ぶために、一度目を通して下さると助かります。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
                第1条（著作権と利用範囲）
              </h2>
              <p className="text-sm md:text-base mb-3">
                当サイト内の画像、デザイン、音声（BGM・SE）、フォント等の著作権は、各素材の提供元（権利者）に帰属します。<br/>
                また、当サイトを構成するソースコード（プログラム）の著作権は運営者に帰属します。
              </p>

              <h3 className="font-bold text-amber-100 mt-6 mb-2">✅ 許可されていること</h3>
              <ul className="list-disc list-inside space-y-3 text-sm md:text-base pl-4 opacity-90">
                <li>
                  <strong className="text-cyan-200">動画配信・実況（収益化OK）:</strong><br/>
                  YouTubeやTwitch等でのプレイ動画の配信、および各プラットフォームの機能を用いた収益化。
                </li>
                <li>
                  <strong className="text-cyan-200">SNSへの投稿:</strong><br/>
                  スクリーンショットやプレイ結果のシェア。
                </li>
                {/* 追加箇所：ブログ紹介 */}
                <li>
                  <strong className="text-cyan-200">ブログやメディアでの紹介:</strong><br/>
                  当サイトへのリンクや紹介記事の作成。
                </li>
              </ul>

              <h3 className="font-bold text-red-200 mt-6 mb-2">🚫 禁止されていること</h3>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm md:text-base">
                <ul className="list-disc list-inside space-y-2 opacity-90">
                   <li>
                     <strong>ソースコードの盗用・流用:</strong><br/>
                     プログラムをコピーして、ご自身の著作物として公開・配布する行為。
                   </li>
                   <li>
                     <strong>素材の抜き出し:</strong><br/>
                     ゲーム内の画像や音声を個別に抜き出して保存・利用すること。
                   </li>
                   <li>
                     <strong>素材自体の再配布:</strong><br/>
                     フリー素材等の提供元が定めた利用規約に反する行為。
                   </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
                第2条（やってはいけないこと）
              </h2>
              <p className="text-sm md:text-base mb-2">
                みんなが楽しく遊べるよう、以下の行為は禁止します。
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base pl-4 opacity-90">
                {/* 追加箇所：公序良俗・イメージ毀損 */}
                <li>公序良俗に反する内容や、当サイトのイメージを著しく損なう形での利用・配信行為</li>
                <li>法律やマナーに違反する行為</li>
                <li>自動ツール（BOTやチートツール）を使ってプレイする行為</li>
                <li>
                  サーバーに意図的に過度な負担をかける行為（DDoS攻撃など）
                </li>
                <li>
                  プログラムの中身を解析、分解、改変する行為（リバースエンジニアリング）
                </li>
                <li>不正な方法でスコアを改ざん・送信する行為</li>
                <li>
                  運営者の許可なく、当サイトを利用して営利活動を行うこと（第1条で許可した配信等は除く）
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
                第3条（サービスの停止・変更）
              </h2>
              <p className="text-sm md:text-base">
                個人運営のため、以下のような場合に予告なくサービスを停止したり、内容を変更・終了したりすることがあります。これによって生じた損害（データ消失など）については責任を負いかねますのでご了承ください。
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base pl-4 opacity-90">
                <li>システムのメンテナンスを行う場合</li>
                <li>地震、火災、停電などのトラブルが起きた場合</li>
                <li>その他、運営継続が困難になった場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
                第4条（利用制限）
              </h2>
              <p className="text-sm md:text-base">
                ルール違反（不正なスコア送信など）が見つかった場合、予告なくランキングからの削除や、サイトへのアクセス制限を行う場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
                第5条（免責事項）
              </h2>
              <p className="text-sm md:text-base">
                当サイトは現状有姿（そのままの状態）で提供されます。バグや不具合がないことを保証するものではありません。
                <br />
                当サイトの利用によって利用者のPCやスマホに何らかの不具合が生じたり、トラブルが起きたりしても、運営者は責任を負えませんので、ご自身の責任でご利用ください。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
                第6条（規約の変更・その他）
              </h2>
              <p className="text-sm md:text-base">
                運営者は、必要に応じてこの規約を変更できるものとします。変更後も利用を続けている場合は、新しい規約に同意したとみなされます。
                <br />
                もし法的なトラブルになり裁判が必要になった場合は、運営者の居住地を管轄する裁判所で解決することとします（日本法準拠）。
              </p>
            </section>

            <div className="pt-8 text-center text-xs text-gray-400">
              2026年1月25日 制定
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