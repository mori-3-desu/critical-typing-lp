export const NoteCaution = () => {
  return (
    <div className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10 shadow-lg mb-32 text-gray-200 leading-relaxed">
      <div className="space-y-8">
        <section>
          <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
            1. プレイ環境について
          </h2>
          <p className="text-sm md:text-base mb-3">
            ハイスコアを目指すなら、<strong>PCと物理キーボード</strong>
            でのプレイが一番のオススメです！
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-base pl-4 opacity-90">
            <li>
              スマホ・タブレットでも遊べますが、画面キーボードだと本来の速度が出にくい場合があります。
            </li>
            <li>
              Bluetoothキーボード等は、無線の遅延（ラグ）により判定がズレる可能性があります。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
            2. 音量について
          </h2>
          <p className="text-sm md:text-base">
            このゲームはタイプ音やBGMが鳴ります。
            <br />
            カフェや電車内などで遊ぶときは、周りの迷惑にならないようイヤホンを使うか、設定画面でミュートにしてお楽しみください。
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
            3. 手や目の健康のために
          </h2>
          <p className="text-sm md:text-base mb-3">
            タイピングに熱中しすぎると、気づかないうちに手首や指、目に負担がかかります。
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-base pl-4 opacity-90">
            <li>1時間プレイしたら10分休憩するなど、こまめに休みましょう。</li>
            <li>
              手首に違和感（痛みやしびれ）を感じたら、無理せずすぐにプレイを中断してください（腱鞘炎にご注意！）。
            </li>
            <li>
              画面の激しい点滅が苦手な方は、部屋を明るくして離れて見てください。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-amber-200 border-b border-white/20 pb-2 mb-4">
            4. フェアプレイのお願い
          </h2>
          <p className="text-sm md:text-base">
            自動入力ツールやマクロを使って出したスコアは、ランキングから削除させていただきます。
            <br />
            みんなで楽しく競い合う場所を守るために、ご協力をお願いします。
          </p>
        </section>

        <div className="pt-8 text-center text-xs text-gray-400">
          ルールを守って、楽しみながら上位ランカーを目指そう！
        </div>
      </div>
    </div>
  );
};
