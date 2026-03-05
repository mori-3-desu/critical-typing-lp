import Link from "next/link";
import { GROUP_CONFIG, ROMA_VARIATIONS } from "./RomaTable";

type Props = {
  scrollToSection: (id: string) => void;
};

type SectionBoxProps = {
  title: string;
  children: React.ReactNode;
};

type TipBoxProps = {
  title: string;
  children: React.ReactNode;
};

type KeySmallProps = {
  char: string;
};

type KeyCapProps = {
    char: string;
    code: string;
    highlight?: boolean;
}

export const KeySection = ({ scrollToSection }: Props) => {
  return (
    <>
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-10 pb-32">
        <div className="xl:hidden sticky top-0 z-50 flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar touch-pan-x bg-[#1e1b4b]/80 backdrop-blur-sm p-2 rounded-lg border border-white/5 shadow-md">
          {GROUP_CONFIG.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => scrollToSection(group.id)}
              className="whitespace-nowrap px-4 py-2 rounded-lg bg-indigo-900/80 border border-indigo-500/30 text-xs font-bold text-indigo-100 shadow-md active:bg-indigo-700 active:scale-95 transition-all"
            >
              {group.title.split(" ")[0]} {/* 短いタイトルを表示 */}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection("tips")}
            className="whitespace-nowrap px-4 py-2 rounded-lg bg-indigo-900/80 border border-indigo-500/30 text-xs font-bold text-indigo-100 shadow-md active:bg-indigo-700 active:scale-95 transition-all"
          >
            Tips
          </button>
        </div>

        <div className="xl:col-span-5 flex flex-col gap-6">
          <div id="basic">
            <SectionBox title="基本 (Basic)">
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {GROUP_CONFIG[0].rows.map((row, i) =>
                  row.chars.map((char, j) => (
                    <KeyCap key={i + j} char={char} code={row.keys[j]} />
                  )),
                )}
              </div>
            </SectionBox>
          </div>

          <div id="dakuon">
            <SectionBox title="濁音 (Dakuon)">
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {GROUP_CONFIG[1].rows.map((row, i) =>
                  row.chars.map((char, j) => (
                    <KeyCap key={i + j} char={char} code={row.keys[j]} />
                  )),
                )}
              </div>
            </SectionBox>
          </div>
        </div>

        <div className="xl:col-span-7 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div id="yoon">
              <SectionBox title="拗音 (Yoon)">
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {GROUP_CONFIG[2].rows.map((row, i) =>
                    row.chars.map((char, j) => (
                      <KeyCap key={i + j} char={char} code={row.keys[j]} />
                    )),
                  )}
                </div>
              </SectionBox>
            </div>

            <div id="symbols">
              <SectionBox title="小書き・記号 (Symbols)">
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {GROUP_CONFIG[3].rows.map((row, i) =>
                    row.chars.map((char, j) => (
                      <KeyCap
                        key={i + j}
                        char={char}
                        code={row.keys[j]}
                        highlight={char === "!" || char === "?"}
                      />
                    )),
                  )}
                </div>
              </SectionBox>
            </div>
          </div>

          <div
            id="tips"
            className="bg-black/30 rounded-2xl p-4 md:p-5 border border-white/10 flex flex-col gap-4 shadow-lg mt-2"
          >
            <h3 className="text-xs md:text-sm font-bold text-amber-200 uppercase tracking-wider pl-2 border-l-4 border-amber-500">
              入力のコツ (Tips)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <TipBox title="「ん」の入力">
                <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                  <KeySmall char="N" /> <KeySmall char="N" />
                  <span className="text-white/50 text-[10px]">→</span>
                  <span className="text-white font-bold text-sm">ん</span>
                </div>
                <p className="text-[10px] text-white/60 mt-1.5 text-center leading-tight">
                  ※母音の前や文末はnn
                </p>
              </TipBox>
              <TipBox title="「っ」 (促音)">
                <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                  <div className="flex flex-col items-center">
                    <KeySmall char="T" />
                    <span className="text-[8px] text-amber-200/70 -mt-0.5">
                      子音
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <KeySmall char="T" />
                    <span className="text-[8px] text-amber-200/70 -mt-0.5">
                      子音
                    </span>
                  </div>
                  <span className="text-white font-bold text-xs">A</span>
                  <span className="text-white/50 text-[10px]">→</span>
                  <span className="text-white font-bold text-sm">った</span>
                </div>
                <p className="text-[10px] text-white/60 mt-1.5 text-center leading-tight">
                  子音を2回重ねる
                </p>
              </TipBox>
              <TipBox title="記号 (! ?)">
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                    <span className="bg-amber-800 text-white text-[9px] px-1 py-0.5 rounded border border-white/20 font-bold">
                      Shift
                    </span>
                    <span className="text-white/50 text-[9px]">+</span>
                    <KeySmall char="1" />
                    <span className="text-white/50 text-[9px]">=</span>
                    <span className="text-amber-300 font-bold text-sm">!</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                    <span className="bg-amber-800 text-white text-[9px] px-1 py-0.5 rounded border border-white/20 font-bold">
                      Shift
                    </span>
                    <span className="text-white/50 text-[9px]">+</span>
                    <KeySmall char="/" />
                    <span className="text-white/50 text-[9px]">=</span>
                    <span className="text-amber-300 font-bold text-sm">?</span>
                  </div>
                </div>
              </TipBox>
            </div>
          </div>
        </div>
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

const SectionBox = ({ title, children }: SectionBoxProps) => (
  <div className="bg-black/20 rounded-2xl p-4 md:p-6 border border-white/5 shadow-xl relative mt-3 md:mt-4 group">
    <div className="absolute -top-3 left-4 bg-gradient-to-b from-indigo-600 to-indigo-800 px-5 py-2 rounded-lg border-t border-white/20 shadow-[0_4px_0_#312e81] flex items-center gap-2 cursor-pointer transition-all active:translate-y-1 active:shadow-none select-none">
      <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:animate-pulse" />
      <h3 className="text-sm md:text-base font-bold text-white tracking-wider uppercase drop-shadow-sm">
        {title}
      </h3>
    </div>
    <div className="mt-5">{children}</div>
  </div>
);

const TipBox = ({ title, children }: TipBoxProps) => (
  <div className="bg-white/5 rounded-xl p-2 md:p-3 border border-white/5 flex flex-col items-center justify-center min-h-[90px]">
    <span className="text-xs text-indigo-300 font-bold mb-2 border-b border-white/10 pb-1 w-full text-center truncate px-1">
      {title}
    </span>
    {children}
  </div>
);

const KeySmall = ({ char }: KeySmallProps) => (
  <div className="w-6 h-6 md:w-7 md:h-7 rounded bg-slate-700 border-t border-white/20 shadow-[0_2px_0_#0f172a] flex items-center justify-center text-[10px] md:text-xs font-bold text-white shrink-0">
    {char}
  </div>
);

const KeyCap = ({
  char,
  code,
  highlight = false,
}: KeyCapProps) => {
  const variations = ROMA_VARIATIONS[code] || [code];
  const mainKey = variations[0];
  return (
    <div className="relative group select-none w-full">
      <div
        className={`absolute inset-0 rounded-lg translate-y-[3px] md:translate-y-[5px] ${highlight ? "bg-amber-900" : "bg-slate-950"}`}
      />
      <div
        className={`relative w-full rounded-lg border-t border-white/10 flex flex-col items-center justify-center transition-transform active:translate-y-[3px] md:active:translate-y-[5px] h-11 md:h-14 xl:h-auto xl:aspect-[1/0.8] ${highlight ? "bg-gradient-to-b from-amber-600 to-amber-700 shadow-[0_1px_0_rgba(255,255,255,0.2)_inset]" : "bg-gradient-to-b from-slate-700 to-slate-800 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] hover:from-slate-600 hover:to-slate-700"}`}
      >
        <span className="text-[clamp(14px,1.5vw,24px)] font-bold text-white leading-none mb-0.5 md:mb-1 drop-shadow-md">
          {char}
        </span>
        <span
          className={`text-[clamp(9px,0.8vw,14px)] font-mono leading-none ${highlight ? "text-amber-100" : "text-indigo-200"}`}
        >
          {mainKey}
        </span>
      </div>
    </div>
  );
};
