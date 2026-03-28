type NoteSection = {
  number: number;
  title: string;
  children: React.ReactNode;
};

// デザインを統一させるために各セクションの共通化ラッパーコンポーネントを作成
const NoteSectionItem = ({ number, title, children }: NoteSection) => (
  <section>
    <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
      {number}. {title}
    </h2>
    {children}
  </section>
);

const NoteList = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc list-inside space-y-1 text-sm md:text-base pl-4 opacity-90">
    {children}
  </ul>
);

const NoteText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm md:text-base mb-3">{children}</p>
);

export const NoteCaution = () => {
  return (
    <div className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10 shadow-lg mb-32 text-gray-200 leading-relaxed">
      <div className="space-y-8">
        <NoteSectionItem number={1} title="プレイ環境について">
          <NoteText>
            ハイスコアを目指すなら、<strong>PCと物理キーボード</strong>
            でのプレイが一番のオススメです！
          </NoteText>
          <NoteList>
            <li>スマホ・タブレットでも遊べますが、画面キーボードだと本来の速度が出にくい場合があります。</li>
            <li>Bluetoothキーボード等は、無線の遅延（ラグ）により判定がズレる可能性があります。</li>
          </NoteList>
        </NoteSectionItem>

        <NoteSectionItem number={2} title="音量について">
          <NoteText>このゲームはタイプ音やBGMが鳴ります。</NoteText>
          <NoteList>
            <li>カフェや電車内などで遊ぶときは、周りの迷惑にならないようイヤホンを使うか、設定画面でミュートにしてお楽しみください。</li>
            <li>静かに始める、ナビゲーションの静かにプレイを選択して頂くとミュート状態から始められるので是非ご活用ください。</li>
          </NoteList>
        </NoteSectionItem>

        <NoteSectionItem number={3} title="手や目の健康のために">
          <NoteText>タイピングに熱中しすぎると、気づかないうちに手首や指、目に負担がかかります。</NoteText>
          <NoteList>
            <li>1時間プレイしたら10分休憩するなど、こまめに休みましょう。</li>
            <li>手首に違和感（痛みやしびれ）を感じたら、無理せずすぐにプレイを中断してください（腱鞘炎にご注意！）。</li>
            <li>画面の激しい点滅が苦手な方は、部屋を明るくして離れて見てください。</li>
          </NoteList>
        </NoteSectionItem>

        <NoteSectionItem number={4} title="フェアプレイのお願い">
          <NoteList>
            <li>自動入力ツールやマクロを使って出したスコアは、ランキングから削除させていただきます。</li>
            <li>みんなで楽しく競い合う場所を守るために、ご協力をお願いします。</li>
          </NoteList>
        </NoteSectionItem>

        <div className="pt-8 text-center text-base text-amber-200">
          ルールを守って、楽しみながら上位ランカーを目指そう！
        </div>
      </div>
    </div>
  );
};
