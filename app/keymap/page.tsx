"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const ROMA_VARIATIONS: Record<string, string[]> = {
  a: ["a"], i: ["i"], u: ["u"], e: ["e"], o: ["o"],
  ka: ["ka"], ki: ["ki"], ku: ["ku"], ke: ["ke"], ko: ["ko"],
  sa: ["sa"], si: ["si"], su: ["su"], se: ["se"], so: ["so"],
  ta: ["ta"], ti: ["ti"], tu: ["tu"], te: ["te"], to: ["to"],
  na: ["na"], ni: ["ni"], nu: ["nu"], ne: ["ne"], no: ["no"],
  ha: ["ha"], hi: ["hi"], hu: ["hu"], he: ["he"], ho: ["ho"],
  ma: ["ma"], mi: ["mi"], mu: ["mu"], me: ["me"], mo: ["mo"],
  ya: ["ya"], yu: ["yu"], yo: ["yo"],
  ra: ["ra"], ri: ["ri"], ru: ["ru"], re: ["re"], ro: ["ro"],
  wa: ["wa"], wo: ["wo"], n: ["n", "nn"],
  ga: ["ga"], gi: ["gi"], gu: ["gu"], ge: ["ge"], go: ["go"],
  za: ["za"], ji: ["ji"], zu: ["zu"], ze: ["ze"], zo: ["zo"],
  da: ["da"], di: ["di"], du: ["du"], de: ["de"], do: ["do"],
  ba: ["ba"], bi: ["bi"], bu: ["bu"], be: ["be"], bo: ["bo"],
  pa: ["pa"], pi: ["pi"], pu: ["pu"], pe: ["pe"], po: ["po"],
  la: ["la"], li: ["li"], lu: ["lu"], le: ["le"], lo: ["lo"],
  ltu: ["ltu"], lya: ["lya"], lyu: ["lyu"], lyo: ["lyo"],
  "-": ["-"], "、": [","], "。": ["."],
  "!": ["Shift+1"], "?": ["Shift+/"]
};

const GROUP_CONFIG = [
  {
    id: "basic",
    title: "基本 (Basic)",
    rows: [
      { chars: ["あ", "い", "う", "え", "お"], keys: ["a", "i", "u", "e", "o"] },
      { chars: ["か", "き", "く", "け", "こ"], keys: ["ka", "ki", "ku", "ke", "ko"] },
      { chars: ["さ", "し", "す", "せ", "そ"], keys: ["sa", "si", "su", "se", "so"] },
      { chars: ["た", "ち", "つ", "て", "と"], keys: ["ta", "ti", "tu", "te", "to"] },
      { chars: ["な", "に", "ぬ", "ね", "の"], keys: ["na", "ni", "nu", "ne", "no"] },
      { chars: ["は", "ひ", "ふ", "へ", "ほ"], keys: ["ha", "hi", "hu", "he", "ho"] },
      { chars: ["ま", "み", "む", "め", "も"], keys: ["ma", "mi", "mu", "me", "mo"] },
      { chars: ["や", "ゆ", "よ", "わ", "ん"], keys: ["ya", "yu", "yo", "wa", "n"] },
      { chars: ["ら", "り", "る", "れ", "ろ"], keys: ["ra", "ri", "ru", "re", "ro"] },
    ]
  },
  {
    id: "dakuon",
    title: "濁音 (Dakuon)",
    rows: [
      { chars: ["が", "ぎ", "ぐ", "げ", "ご"], keys: ["ga", "gi", "gu", "ge", "go"] },
      { chars: ["ざ", "じ", "ず", "ぜ", "ぞ"], keys: ["za", "ji", "zu", "ze", "zo"] },
      { chars: ["だ", "ぢ", "づ", "で", "ど"], keys: ["da", "di", "du", "de", "do"] },
      { chars: ["ば", "び", "ぶ", "べ", "ぼ"], keys: ["ba", "bi", "bu", "be", "bo"] },
      { chars: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"], keys: ["pa", "pi", "pu", "pe", "po"] },
    ]
  },
  {
    id: "yoon",
    title: "拗音 (Yoon)",
    rows: [
      { chars: ["きゃ", "きゅ", "きょ"], keys: ["kya", "kyu", "kyo"] },
      { chars: ["しゃ", "しゅ", "しょ"], keys: ["sya", "syu", "syo"] },
      { chars: ["ちゃ", "ちゅ", "ちょ"], keys: ["tya", "tyu", "tyo"] },
      { chars: ["にゃ", "にゅ", "にょ"], keys: ["nya", "nyu", "nyo"] },
      { chars: ["ひゃ", "ひゅ", "ひょ"], keys: ["hya", "hyu", "hyo"] },
      { chars: ["みゃ", "みゅ", "みょ"], keys: ["mya", "myu", "myo"] },
      { chars: ["りゃ", "りゅ", "りょ"], keys: ["rya", "ryu", "ryo"] },
      { chars: ["ぎゃ", "ぎゅ", "ぎょ"], keys: ["gya", "gyu", "gyo"] },
      { chars: ["じゃ", "じゅ", "じょ"], keys: ["ja", "ju", "jo"] },
      { chars: ["びゃ", "びゅ", "びょ"], keys: ["bya", "byu", "byo"] },
      { chars: ["ぴゃ", "ぴゅ", "ぴょ"], keys: ["pya", "pyu", "pyo"] },
    ]
  },
  {
    id: "symbols",
    title: "小書き・記号",
    rows: [
      { chars: ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ"], keys: ["la", "li", "lu", "le", "lo"] },
      { chars: ["っ", "ゃ", "ゅ", "ょ", "ー"], keys: ["ltu", "lya", "lyu", "lyo", "-"] },
      { chars: ["、", "。", "！", "？"], keys: ["、", "。", "!", "?"] },
    ]
  },
];

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

export default function KeymapPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    if (!containerRef.current) return;
    const element = document.getElementById(id);
    if (element) {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const currentScroll = containerRef.current.scrollTop;
      const headerOffset = 140; 
      const targetTop = currentScroll + (elementTop - containerTop) - headerOffset;
      containerRef.current.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-100dvh text-white font-[family-name:var(--font-rounded)] overflow-y-auto z-[9999]"
      style={{
        background: "linear-gradient(to bottom, #00008b, #4169e1)", 
        border: "2px solid rgba(255, 180, 200, 0.5)",
        boxShadow: "0 0 20px rgba(255, 100, 150, 0.5), 0 20px 50px rgba(0, 0, 0, 0.5)"
      }}
    >
      <style jsx global>{`
        ::-webkit-scrollbar { width: 14px; }
        ::-webkit-scrollbar-track { background-color: rgba(30, 27, 75, 0.5); border-left: 1px solid rgba(255, 255, 255, 0.05); }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #fff9c4 0%, #fbbf24 40%, #ffffff 50%, #fbbf24 60%, #fff9c4 100%);
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
        @media (max-width: 1024px) {
          ::-webkit-scrollbar { display: none; }
          * { -ms-overflow-style: none; scrollbar-width: none; }
        }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
      <StarryBackground />

      <main className="relative w-[95%] xl:w-[90%] max-w-[1800px] mx-auto py-6 md:py-10 flex flex-col items-center">
        
        <div className="w-full flex flex-col gap-3 mb-6">
          <div className="flex justify-between items-center bg-indigo-900/80 backdrop-blur-md py-3 px-5 rounded-xl border border-white/10 shadow-lg">
            <h1 className="text-xl md:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#fcd34d] to-[#fbbf24] whitespace-nowrap">
              KEYMAP
            </h1>
            <Link href="/" className="hidden xl:flex group relative px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-bold transition-all hover:scale-105 active:scale-95 items-center gap-2 whitespace-nowrap">
               <span>TOPへ戻る</span>
               <span className="text-amber-300">↩</span>
            </Link>
          </div>

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
        </div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-10 pb-32">
          <div className="xl:col-span-5 flex flex-col gap-6">
            <div id="basic">
              <SectionBox title="基本 (Basic)">
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {GROUP_CONFIG[0].rows.map((row, i) => (
                    row.chars.map((char, j) => (
                      <KeyCap key={i+j} char={char} code={row.keys[j]} />
                    ))
                  ))}
                </div>
              </SectionBox>
            </div>
            <div id="dakuon">
              <SectionBox title="濁音 (Dakuon)">
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {GROUP_CONFIG[1].rows.map((row, i) => (
                    row.chars.map((char, j) => (
                      <KeyCap key={i+j} char={char} code={row.keys[j]} />
                    ))
                  ))}
                </div>
              </SectionBox>
            </div>
          </div>

          <div className="xl:col-span-7 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="yoon">
                <SectionBox title="拗音 (Yoon)">
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {GROUP_CONFIG[2].rows.map((row, i) => (
                      row.chars.map((char, j) => (
                        <KeyCap key={i+j} char={char} code={row.keys[j]} />
                      ))
                    ))}
                  </div>
                </SectionBox>
              </div>
              <div id="symbols">
                <SectionBox title="小書き・記号 (Symbols)">
                  <div className="grid grid-cols-5 gap-2 md:gap-3">
                    {GROUP_CONFIG[3].rows.map((row, i) => (
                      row.chars.map((char, j) => (
                        <KeyCap key={i+j} char={char} code={row.keys[j]} highlight={char === "！" || char === "？"} />
                      ))
                    ))}
                  </div>
                </SectionBox>
              </div>
            </div>

            <div id="tips" className="bg-black/30 rounded-2xl p-4 md:p-5 border border-white/10 flex flex-col gap-4 shadow-lg mt-2">
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
                  <p className="text-[10px] text-white/60 mt-1.5 text-center leading-tight">※母音の前や文末はnn</p>
                </TipBox>
                <TipBox title="「っ」 (促音)">
                  <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <div className="flex flex-col items-center"><KeySmall char="T" /><span className="text-[8px] text-amber-200/70 -mt-0.5">子音</span></div>
                    <div className="flex flex-col items-center"><KeySmall char="T" /><span className="text-[8px] text-amber-200/70 -mt-0.5">子音</span></div>
                    <span className="text-white font-bold text-xs">A</span>
                    <span className="text-white/50 text-[10px]">→</span>
                    <span className="text-white font-bold text-sm">った</span>
                  </div>
                  <p className="text-[10px] text-white/60 mt-1.5 text-center leading-tight">子音を2回重ねる</p>
                </TipBox>
                 <TipBox title="記号 (! ?)">
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                      <span className="bg-amber-800 text-white text-[9px] px-1 py-0.5 rounded border border-white/20 font-bold">Shift</span>
                      <span className="text-white/50 text-[9px]">+</span>
                      <KeySmall char="1" />
                      <span className="text-white/50 text-[9px]">=</span>
                      <span className="text-amber-300 font-bold text-sm">!</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                      <span className="bg-amber-800 text-white text-[9px] px-1 py-0.5 rounded border border-white/20 font-bold">Shift</span>
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

        <Link href="/" className="xl:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 border border-white/30 shadow-[0_4px_20px_rgba(79,70,229,0.6)] active:scale-95 transition-transform">
          <span className="text-2xl text-white">↩</span>
        </Link>
      </main>
    </div>
  );
}

const SectionBox = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-black/20 rounded-2xl p-4 md:p-6 border border-white/5 shadow-xl relative mt-3 md:mt-4 group">
    <div className="absolute -top-3 left-4 bg-gradient-to-b from-indigo-600 to-indigo-800 px-5 py-2 rounded-lg border-t border-white/20 shadow-[0_4px_0_#312e81] flex items-center gap-2 cursor-pointer transition-all active:translate-y-1 active:shadow-none select-none">
      <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:animate-pulse" />
      <h3 className="text-sm md:text-base font-bold text-white tracking-wider uppercase drop-shadow-sm">{title}</h3>
    </div>
    <div className="mt-5">{children}</div>
  </div>
);

const TipBox = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white/5 rounded-xl p-2 md:p-3 border border-white/5 flex flex-col items-center justify-center min-h-[90px]">
    <span className="text-xs text-indigo-300 font-bold mb-2 border-b border-white/10 pb-1 w-full text-center truncate px-1">{title}</span>
    {children}
  </div>
);

const KeySmall = ({ char }: { char: string }) => (
  <div className="w-6 h-6 md:w-7 md:h-7 rounded bg-slate-700 border-t border-white/20 shadow-[0_2px_0_#0f172a] flex items-center justify-center text-[10px] md:text-xs font-bold text-white shrink-0">{char}</div>
);

const KeyCap = ({ char, code, highlight = false }: { char: string, code: string, highlight?: boolean }) => {
  const variations = ROMA_VARIATIONS[code] || [code];
  const mainKey = variations[0];
  return (
    <div className="relative group select-none w-full">
      <div className={`absolute inset-0 rounded-lg translate-y-[3px] md:translate-y-[5px] ${highlight ? "bg-amber-900" : "bg-slate-950"}`} />
      <div className={`relative w-full rounded-lg border-t border-white/10 flex flex-col items-center justify-center transition-transform active:translate-y-[3px] md:active:translate-y-[5px] h-11 md:h-14 xl:h-auto xl:aspect-[1/0.8] ${highlight ? "bg-gradient-to-b from-amber-600 to-amber-700 shadow-[0_1px_0_rgba(255,255,255,0.2)_inset]" : "bg-gradient-to-b from-slate-700 to-slate-800 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] hover:from-slate-600 hover:to-slate-700"}`}>
        <span className="text-[clamp(14px,1.5vw,24px)] font-bold text-white leading-none mb-0.5 md:mb-1 drop-shadow-md">{char}</span>
        <span className={`text-[clamp(9px,0.8vw,14px)] font-mono leading-none ${highlight ? "text-amber-100" : "text-indigo-200"}`}>{mainKey}</span>
      </div>
    </div>
  );
};