"use client";
import { useState } from "react";
import { CatLoader } from "./Loading";

interface Props {
  googleFormUrl: string;
}

export const ContactForm = ({googleFormUrl}: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const loadingStatus = isLoading
    ? "フォームを読み込んでいます、しばらくお待ちください。"
    : "フォームの読み込みが完了しました。";

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative min-h-150"
      aria-busy={isLoading}
    >
      <div role="status" className="sr-only">
        {loadingStatus}
      </div>

      <CatLoader fadeOut={!isLoading} />

      <iframe
        src={googleFormUrl}
        className="w-full h-200 md:h-250 border-0"
        onLoad={() => setIsLoading(false)}
        title="Contact Form"
        aria-label="Googleフォームで作成されたお問い合わせ用入力欄"
        sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-top-navigation-by-user-activation"
        referrerPolicy="no-referrer"
      >
        お使いのブラウザはフォームの表示に対応していません。
      </iframe>
    </div>
  );
};
