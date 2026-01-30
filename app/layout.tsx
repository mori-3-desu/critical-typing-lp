import type { Metadata } from "next";
import { Inter, M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/features/Footer";
import { AnimationProvider } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-rounded",
});

// ★SEO設定: サイトの基本URL
const SITE_URL = process.env.NEXT_PUBLIC_GAME_URL || "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CRITICAL TYPING",
    template: "%s | CRITICAL TYPING",
  },
  description:
    "ミスったら自分で修正！BackSpace対応の新しい無料ブラウザタイピングゲーム！ポップな世界観で、初心者からガチ勢まで全国ランキングで競い合おう！登録なしですぐ遊べます。",
  
  keywords: [
    "タイピング",
    "タイピングゲーム",
    "無料",
    "練習",
    "ブラインドタッチ",
    "ブラウザゲーム",
    "PCゲーム",
    "ローマ字入力",
    "初心者",
    "全国ランキング",
    "CRITICAL TYPING",
    "エンジニア",
  ],

  // SNSシェア設定 (OGP)
  openGraph: {
    title: "CRITICAL TYPING | 打ち心地が気持ちいい無料タイピング",
    description: "ミスったらBackSpaceで修正！全国ランキング搭載の無料ブラウザタイピングゲーム！楽しくタイピング練習して目指せ上位ランカー！",
    url: SITE_URL,
    siteName: "CRITICAL TYPING",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/title.jpg", 
        width: 1200,
        height: 630,
        alt: "CRITICAL TYPING Title Screen",
      },
    ],
  },

  // X (Twitter) 設定
  twitter: {
    card: "summary_large_image",
    title: "CRITICAL TYPING",
    description: "ミスったらBackSpaceで修正！正確さを極めるポップな無料タイピングゲーム。",
    images: ["/title.jpg"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* 外枠（白い額縁） */}
      <body
        className={`${inter.variable} ${mPlusRounded.variable} font-sans text-gray-900 bg-white p-[5px] h-screen overflow-hidden box-border`}
      >
        {/* メインコンテナ
            1. overflow-y-auto: スクロールはこの要素内で行う
            2. gold-scrollbar: オリジナルのスクロールバーを適用
        */}
        <div className="relative w-full h-full rounded-[20px] overflow-y-auto overflow-x-hidden bg-white shadow-2xl scroll-smooth gold-scrollbar">
          <Header />

          {/* ページ遷移アニメーションの管理 */}
          <AnimationProvider>{children}</AnimationProvider>

          <Footer />
        </div>
      </body>
    </html>
  );
}