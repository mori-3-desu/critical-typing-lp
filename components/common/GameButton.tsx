import { CONFIG } from "@/utils/constants";
import { GameButtonProps } from "@/types";
import Link from "next/link";

export const GameButton = ({
  href,
  label,
  variant = "primary",
  size = "large",
}: GameButtonProps) => {
  const sizeClasses =
    size === "large"
      ? // Mobile/Tablet: 画面85%幅、最大450px (これでタブレットでも崩れない)
        // PC (lg以上): 画面45%幅 (迫力復活)、最大1000pxまで許容
        "w-[80vw] max-w-md lg:w-[45vw] lg:max-w-5xl h-15 lg:h-[5.5vw] text-xl lg:text-[1.8vw] border-[3px] lg:border-[0.3vw]"
      : // Mobile/Tablet: 画面40%幅 (2つ並べても入る)、最大200px
        // PC (lg以上): 画面21.5%幅 (迫力復活)、最大500pxまで許容
        "w-[50vw] max-w-[200px] lg:w-[21.5vw] lg:max-w-2xl h-11 lg:h-[4.5vw] text-xs lg:text-[1.1vw] border-[2px] lg:border-[0.3vw]";
  const bg =
    variant === "primary" ? CONFIG.ui.btnPrimary : CONFIG.ui.btnSecondary;

  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`flex items-center justify-center font-extrabold text-white rounded-full border-white shadow-lg hover:scale-105 active:scale-95 transition-transform leading-none ${sizeClasses}`}
      style={{
        background: bg,
        textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
        boxShadow:
          "inset 0 3px 5px rgba(255,255,255,0.9), inset 0 11px 16px rgba(255,255,255,0.4), inset 0 -4px 9px rgba(0,0,0,0.15)",
      }}
    >
      <span>{label}</span>
    </Link>
  );
};
