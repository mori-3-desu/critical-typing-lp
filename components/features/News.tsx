import { FadeIn } from "../common/FadeIn";
import { InfoCard } from "../common/InfoCard";

type NewsItem = {
  id: number;
  date: string;
  tag: string;
  text: string;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 4,
    date: "2026.06.16",
    tag: "お詫び",
    text: "旧環境での発行手続きを進めておりましたが、システムの都合上、発行が不可能となりました。ご期待に沿えず誠に申し訳ございません。データの引き継ぎをご希望される方は、個別に対応いたしますので、大変お手数ですが運営までご連絡いただけますと幸いです。",
  },
  {
    id: 3,
    date: "2026.06.16",
    tag: "feat",
    text: "環境変更に伴い、引継ぎ機能を追加いたしました！",
  },
  {
    id: 2,
    date: "2026.03.17",
    tag: "feat",
    text: "新難易度【EXTRA】を追加しました!",
  },
  {
    id: 1,
    date: "2026.02.03",
    tag: "fix",
    text: "特定条件でタイマー演出が二重に出てしまう不具合を修正しました。",
  },
];

// Newsをサーバーコンポーネントとして維持し、SEOと表示速度を最適化
// アニメーションの演出のみFadeInコンポーネントに委ねることで関心の分離を実現
export default function News() {
  return (
    <div className="w-[95vw] max-w-3xl lg:w-[50vw] lg:max-w-none mb-20 lg:mb-[5vw] mt-6 lg:mt-[4vw]">
      <FadeIn>
        <div className="flex items-center gap-2 lg:gap-[0.5vw] mb-3 lg:mb-[0.8vw] pl-2 lg:pl-[0.5vw] text-white/90">
          <div className="w-2 h-2 lg:w-[0.6vw] lg:h-[0.6vw] bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
          <h3 className="text-xl lg:text-[1.2vw] font-bold tracking-widest drop-shadow-md">
            NEWS
          </h3>
        </div>

        {/* InfoCard を呼び出す */}
        <InfoCard type="news">
          <ul className="space-y-3 lg:space-y-[0.8vw]">
            {NEWS_ITEMS.map((item) => (
              <li
                key={item.id}
                className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-[2vw] border-b border-white/20 pb-3 lg:pb-[0.8vw] last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4 lg:gap-[1.5vw] shrink-0">
                  <span className="text-white text-sm lg:text-[1.0vw] font-mono font-bold min-w-20 lg:w-[6.5vw] text-left shrink-0">
                    {item.date}
                  </span>
                  <span
                    className={`
                  text-xs lg:text-[0.8vw] font-bold 
                  px-3 lg:px-0 lg:w-[5.5vw] flex justify-center items-center shrink-0
                  py-0.5 lg:py-[0.3vw] rounded-full border border-white/40 bg-white/20 text-white
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
      </FadeIn>
    </div>
  );
}
