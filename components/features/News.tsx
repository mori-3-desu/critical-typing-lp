"use client";

import { motion } from "framer-motion";
import { InfoCard } from "../common/InfoCard";

// データのキー（tag, text）は下のHTMLの呼び出し名と統一しておきます
const NEWS_ITEMS = [
  {
    date: "2026.02.03",
    tag: "fix",
    text: "特定条件でタイマー演出が二重に出てしまう不具合を修正しました。",
  },
  {
    date: "2026.01.27",
    tag: "Release",
    text: "サイトを公開しました！ CRITICAL TYPING リリース！",
  },
];

export default function News() {
  return (
    <motion.div
      // ▼ ここを shouldAnimate に頼らない「画面表示時のアニメーション」に変更！
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }} // 画面に半分入ったら1回だけ発動
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-[95vw] max-w-3xl lg:w-[50vw] lg:max-w-none mb-20 lg:mb-[5vw] mt-6 lg:mt-[4vw]"
    >
      <div className="flex items-center gap-2 lg:gap-[0.5vw] mb-3 lg:mb-[0.8vw] pl-2 lg:pl-[0.5vw] text-white/90">
        <div className="w-2 h-2 lg:w-[0.6vw] lg:h-[0.6vw] bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
        <h3 className="text-xl lg:text-[1.2vw] font-bold tracking-widest drop-shadow-md">
          NEWS
        </h3>
      </div>

      {/* InfoCard を呼び出す */}
      <InfoCard type="news">
        <ul className="space-y-3 lg:space-y-[0.8vw]">
          {NEWS_ITEMS.map((item, index) => (
            <li
              key={index}
              className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-[2vw] border-b border-white/20 pb-3 lg:pb-[0.8vw] last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4 lg:gap-[1.5vw] shrink-0">
                <span className="text-white text-sm lg:text-[1.0vw] font-mono font-bold min-w-[80px] lg:w-[6.5vw] text-left shrink-0">
                  {item.date}
                </span>
                <span
                  className={`
                  text-xs lg:text-[0.8vw] font-bold 
                  px-3 lg:px-0 lg:w-[5.5vw] flex justify-center items-center shrink-0
                  py-[2px] lg:py-[0.3vw] rounded-full border border-white/40 bg-white/20 text-white
                `}
                >
                  {item.tag}
                </span>
              </div>
              <span className="text-white text-sm lg:text-[1.1vw] font-medium drop-shadow-sm leading-snug text-left">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </InfoCard>
    </motion.div>
  );
}