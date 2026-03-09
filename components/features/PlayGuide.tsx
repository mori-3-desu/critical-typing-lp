import { PALETTE } from "@/app/utils/constants";

const Highlight = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`font-bold inline-block ${className}`}
    style={{ color: "yellow", textShadow: `1px 1px 2px ${PALETTE.shadow}` }}
  >
    {children}
  </span>
);

export const PlayGuide = () => {
  return (
    <>
      <div className="p-4 lg:p-[1.5vw] relative z-10 flex flex-col items-center">
        <h2
          className="text-lg lg:text-[1.5vw] font-bold mb-4 lg:mb-[0.5vw] drop-shadow-md"
          style={{ color: PALETTE.border }}
        >
          〜 ポップで触りやすい、実践型タイピングゲーム 〜
        </h2>

        <div className="space-y-4 lg:space-y-[0.8vw] text-base lg:text-[1.1vw] leading-relaxed font-medium w-full text-white">
          <p>
            こちらのゲームは
            <Highlight className="mx-1 lg:mx-[0.3vw]">正確性</Highlight>と
            <Highlight className="mx-1 lg:mx-[0.3vw]">継続性</Highlight>
            をコンセプトに作られた
            <br className="hidden lg:block" />
            全国ランキング搭載のスコア制の完全無料のタイピングゲームです！
          </p>

          <div className="my-4 lg:my-[1.2vw] relative w-full flex justify-center">
            <div className="relative w-full max-w-[500px] lg:max-w-none lg:w-[32vw] aspect-video bg-black rounded-lg lg:rounded-[0.8vw] border-[3px] lg:border-[4px] border-white/90 shadow-xl overflow-hidden">
              <video
                src="/demo.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>

          <div className="mt-2 lg:mt-[0.5vw] bg-white/5 border border-white/20 rounded-lg lg:rounded-[0.8vw] py-3 px-4 lg:py-[0.6vw] lg:px-[1.2vw] w-full max-w-[95%] mx-auto">
            <p
              className="font-bold flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-[0.5vw]"
              style={{ color: PALETTE.border }}
            >
              <span className="text-xl lg:text-[1.0vw]">⌨️</span>
              <span>
                複数の入力に対応しており、お好きな打ち方でタイピングできます！
              </span>
            </p>
            <p className="text-white/70 text-xs lg:text-[0.8vw] mt-2 lg:mt-[0.2vw]">
              例: し si/shi/ci &nbsp; ち ti/chi &nbsp; つ tu/tsu &nbsp; ん n/nn
              <span className="text-[10px] lg:text-[0.7vw] ml-2 lg:ml-[0.5vw] opacity-60">
                ※母音の前や末尾はnn必須
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
