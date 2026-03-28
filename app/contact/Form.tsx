"use client";
import { useEffect, useRef, useState } from "react";

const LOAD_TIMEOUT_MS = 10000;

type LoadStatus = "loading" | "loaded" | "error";

interface Props {
  googleFormUrl: string;
}

export const ContactForm = ({ googleFormUrl }: Props) => {
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [iframeKey, setIframeKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "error" : prev));
    }, LOAD_TIMEOUT_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [iframeKey]);

  const handleLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStatus("loaded");
  };

  const handleRetry = () => {
    setStatus("loading");
    setIframeKey((prev) => prev + 1);
  };

  const srOnlyMessage = {
    loading: "フォームを読み込んでいます、しばらくお待ちください。",
    loaded: "フォームの読み込みが完了しました。",
    error: "フォームの読み込みに失敗しました。",
  }[status];

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative min-h-150"
      aria-busy={status === "loading"}
    >
      <div role="status" className="sr-only">
        {srOnlyMessage}
      </div>

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 z-50">
          <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-500 animate-spin"></div>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-indigo-50 z-50 p-8">
          <p className="text-gray-600 text-sm">
            フォームの読み込みに失敗しました
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            >
              再試行
            </button>
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-indigo-600 text-indigo-600 text-sm rounded-lg hover:bg-indigo-50 transition-colors"
            >
              フォームを直接開く
            </a>
          </div>
        </div>
      )}

      {/* 再試行時にiframeを再マウントして読み込みをリセットする為、keyを使用
          srcだけだと再読み込みされないケースがあるため */}
      <iframe
        key={iframeKey}
        src={googleFormUrl}
        className="w-full h-200 md:h-250 border-0"
        onLoad={handleLoad}
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
