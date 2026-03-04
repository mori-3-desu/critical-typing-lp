"use client";

import Link from "next/link";
import { faqs } from "./FaqQA";
import { AccordionItem } from "./FaqAccordion";

export const FaqInfo = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">
      <div className="lg:col-span-7 flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>

      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-cyan-100 border-b border-white/20 pb-2">
            <span>💻</span> 動作環境について
          </h3>
          <div className="flex flex-col gap-4 text-sm md:text-base">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-cyan-200">推奨ブラウザ</span>
              <span>Google Chrome (最新版), Edge, Safari</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-cyan-200">推奨デバイス</span>
              <span>物理キーボードを接続したPC</span>
            </div>
            <div className="mt-2 bg-black/20 p-3 rounded-lg text-xs text-gray-200">
              ※
              スマートフォン・タブレットでもプレイ可能ですが、画面サイズや入力方式により一部機能が制限される場合があります。
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-900/60 to-blue-900/60 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/30 text-center shadow-lg">
          <h3 className="text-lg font-bold mb-3 text-white">
            解決しない場合・バグ報告
          </h3>
          <p className="text-cyan-100 mb-6 text-sm">
            FAQにない質問や不具合は
            <br />
            お問い合わせフォームへ。
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-cyan-900 font-bold rounded-full shadow-lg hover:scale-105 hover:bg-cyan-50 transition-all text-sm md:text-base"
          >
            <span>📩</span> お問い合わせページへ
          </Link>
        </div>
      </div>
    </div>
  );
};
