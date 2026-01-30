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
        <div key={s.id} className="absolute bg-white rounded-full animate-twinkle opacity-50"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }} />
      ))}
    </div>
  );
};

export default function PrivacyPage() {
  return (
    <div 
      className="fixed inset-0 w-full h-[100dvh] text-white font-[family-name:var(--font-rounded)] overflow-y-auto z-[9999]"
      style={{
        background: "linear-gradient(to bottom, #143C5A, #86B6E0)", 
      }}
    >
      <style jsx global>{`
        /* デフォルト(スマホ)はスクロールバー非表示 */
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }

        /* 1024px以上(13インチPCなど)でスクロールバーを表示 */
        @media (min-width: 1024px) {
          ::-webkit-scrollbar { display: block; width: 14px; }
          * { -ms-overflow-style: auto; scrollbar-width: auto; }
          
          ::-webkit-scrollbar-track { 
            background-color: rgba(10, 40, 60, 0.5); 
            border-left: 1px solid rgba(255, 255, 255, 0.1); 
          }
          /* ★変更: つまみ部分を黄色〜オレンジに変更（他ページと統一） */
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #fff9c4 0%, #fbbf24 40%, #ffffff 50%, #fbbf24 60%, #fff9c4 100%);
            border-radius: 99px;
            border: 3px solid rgba(20, 60, 90, 1);
            background-clip: content-box;
            box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #ffffff 0%, #fcd34d 100%);
            border: 3px solid rgba(20, 60, 90, 1);
            background-clip: content-box;
          }
        }

        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
      `}</style>

      <StarryBackground />

      <main className="relative w-[95%] xl:w-[80%] max-w-[1000px] mx-auto py-10 flex flex-col items-center">
        
        {/* ヘッダーエリア */}
        <div className="w-full flex justify-between items-center bg-[#0ea5e9]/20 backdrop-blur-md py-4 px-6 rounded-2xl border border-cyan-200/30 shadow-lg mb-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            プライバシーポリシー
          </h1>
          <Link href="/" className="hidden xl:flex group relative px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 border border-white/40 text-sm font-bold transition-all hover:scale-105 active:scale-95 items-center gap-2 whitespace-nowrap">
             <span>TOPへ戻る</span>
             <span className="text-cyan-100">↩</span>
          </Link>
        </div>

        {/* コンテンツエリア */}
        <div className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10 shadow-lg mb-32 text-gray-200 leading-relaxed">
          <div className="space-y-8">
            
            <section>
              <p className="text-sm md:text-base mb-4">
                「CRITICAL TYPING」（以下、「当サイト」といいます）は、ユーザーの情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます）を定めます。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-cyan-200 border-b border-white/20 pb-2 mb-4">
                第1条（収集する情報）
              </h2>
              <p className="text-sm md:text-base mb-3">
                当サイトでは、サービスの提供にあたり以下の情報を自動的に取得・保存します。これらは個人を特定する情報（氏名、住所、電話番号など）とは紐付かない形で管理されます。
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base pl-4 opacity-90">
                <li><strong>匿名ID:</strong> ユーザーを一意に識別するためのランダムな文字列</li>
                <li><strong>ゲームプレイデータ:</strong> タイピングスコア、ランク、プレイ履歴、設定情報など</li>
                <li><strong>ブラウザへの保存データ:</strong> 音量設定やキーマップ設定などの環境設定情報（ローカルストレージ）</li>
                <li><strong>利用環境情報:</strong> アクセス日時、IPアドレス、ブラウザの種類など</li>
              </ul>
              <p className="text-sm md:text-base mt-3 text-white/70 bg-black/20 p-3 rounded-lg border border-white/10">
                ※ 当サイトには会員登録機能はなく、サイト上で直接個人情報の入力を求めることはありません。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-cyan-200 border-b border-white/20 pb-2 mb-4">
                第2条（情報の利用目的）
              </h2>
              <p className="text-sm md:text-base mb-2">取得した情報は、以下の目的で利用します。</p>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base pl-4 opacity-90">
                <li>ランキングの集計および表示のため</li>
                <li>ゲームの進行状況や設定の保存のため</li>
                <li>不正行為の防止およびセキュリティ確保のため</li>
                <li>サービスの利用状況の分析および改善のため</li>
                <li>週間ランキング等、新たな機能追加のため</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-cyan-200 border-b border-white/20 pb-2 mb-4">
                第3条（お問い合わせ時の個人情報）
              </h2>
              <p className="text-sm md:text-base">
                お問い合わせフォーム（Googleフォーム等）をご利用いただく際、返信のためにメールアドレス等の個人情報の入力を求める場合があります。<br/>
                これらの情報は、お問い合わせへの対応および確認のみに利用し、当サイトのデータベース（ゲームデータの管理場所）には保存されず、ゲームプレイデータと紐付けられることもありません。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-cyan-200 border-b border-white/20 pb-2 mb-4">
                第4条（Cookie・保存データについて）
              </h2>
              <p className="text-sm md:text-base mb-3">
                当サイトでは、以下の目的でお使いのブラウザにデータを保存する技術（Cookieおよびローカルストレージ）を使用しています。
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base pl-4 opacity-90">
                <li>
                  <strong>ゲーム設定の保存:</strong><br/>
                  音量やキー設定などを保存するためにローカルストレージを使用します。ブラウザのキャッシュを削除すると、これらの設定はリセットされます。
                </li>
                <li>
                  <strong>アクセス解析:</strong><br/>
                  Googleアナリティクスを使用した利用状況の計測のためにCookieを使用します。このデータは匿名で収集されており、個人を特定するものではありません。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-cyan-200 border-b border-white/20 pb-2 mb-4">
                第5条（免責事項）
              </h2>
              <p className="text-sm md:text-base">
                当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。<br/>
                当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、完全性・正確性を保証するものではありません。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-cyan-200 border-b border-white/20 pb-2 mb-4">
                第6条（プライバシーポリシーの変更）
              </h2>
              <p className="text-sm md:text-base">
                当サイトは、必要に応じて本ポリシーを変更することがあります。<br/>
                変更後のプライバシーポリシーは、当サイトに掲載したときから効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-bold text-cyan-200 border-b border-white/20 pb-2 mb-4">
                第7条（お問い合わせ窓口）
              </h2>
              <p className="text-sm md:text-base">
                本ポリシーに関するお問い合わせは、当サイトの
                <Link href="/contact" className="text-cyan-300 underline hover:text-white transition-colors mx-1">
                  お問い合わせページ
                </Link>
                よりお願いいたします。
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
          className="xl:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border border-white/30 shadow-[0_4px_20px_rgba(6,182,212,0.6)] active:scale-95 transition-transform"
        >
          <span className="text-2xl text-white">↩</span>
        </Link>

      </main>
    </div>
  );
}