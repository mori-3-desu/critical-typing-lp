// ★適用するテーマスタイル
const THEME_NORMAL = {
  background: "rgba(244, 156, 105, 0.85)", // 指定された色
  borderColor: "#ffe7c7",               // 指定された枠線色
  borderWidth: "2px",
  borderStyle: "solid",
  boxShadow: "0 10px 30px rgba(255, 150, 50, 0.4)", // 指定された影
  backdropFilter: "blur(4px)", // すりガラス効果も追加しておきます
};

const newsItems = [
  {
    date: "2026.01.27",
    title: "サイトを公開しました！ CRITICAL TYPING リリース！",
    category: "Release"
  }
];

export default function News() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* 見出し */}
      <div className="flex items-center gap-2 mb-4 pl-2 text-white/90">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
        <h3 className="text-lg font-bold tracking-widest drop-shadow-md">SYSTEM LOG</h3>
      </div>

      {/* ログウィンドウ本体 */}
      <div 
        className="w-full rounded-2xl p-6 text-left"
        style={THEME_NORMAL}
      >
        <ul className="space-y-4">
          {newsItems.map((item, index) => (
            <li 
              key={index} 
              className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 border-b border-white/30 pb-3 last:border-0 last:pb-0"
            >
              {/* 日付とタグ */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-white font-mono font-bold drop-shadow-sm">{item.date}</span>
                <span className={`
                  text-xs font-bold px-2 py-0.5 rounded border border-white/50 shadow-sm
                  ${item.category === 'Release' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-500 text-white'
                  }
                `}>
                  {item.category}
                </span>
              </div>
              
              {/* タイトル */}
              <p className="text-white font-bold drop-shadow-sm text-sm md:text-base">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}