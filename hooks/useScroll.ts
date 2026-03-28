import { useRef } from "react";
import { HEADER_OFFSET_PX } from "../utils/constants";

// スマホ用キーボード対応表で見たいセクションに飛ばせるように
export const useSmoothScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    if (!containerRef.current) return;
    const element = document.getElementById(id);

    if (element) {
      // getBoundingClientRect() は「画面（viewport）上の位置」を返す
      // containerTop : コンテナ上端の画面上の位置
      // elementTop   : 目的セクション上端の画面上の位置
      // elementTop - containerTop = コンテナ内でのセクションの相対位置
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;

      // scrollTop は「コンテナが現在どこまでスクロールされているか」の累積量
      // currentScroll + 相対位置 = コンテナ内でのセクションの絶対スクロール位置
      // - HEADER_OFFSET_PX でヘッダーに隠れる分を補正
      const currentScroll = containerRef.current.scrollTop;
      const targetTop =
        currentScroll + (elementTop - containerTop) - HEADER_OFFSET_PX;

      // window ではなくコンテナ要素自体をスクロールさせる
      // （このページは fixed inset-0 overflow-y-auto の独立コンテナのため）
      containerRef.current.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  };
  return { containerRef, scrollToSection };
};
