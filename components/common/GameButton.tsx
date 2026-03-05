import Link from "next/link";
import { GameButtonProps } from "@/app/types";
import { CONFIG } from "@/app/utils/constants";

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
        "w-[85vw] max-w-md lg:w-[45vw] lg:max-w-5xl h-16 lg:h-[5.5vw] text-xl lg:text-[1.8vw] border-[3px] lg:border-[0.3vw]"
      : // Mobile/Tablet: 画面40%幅 (2つ並べても入る)、最大200px
        // PC (lg以上): 画面21.5%幅 (迫力復活)、最大500pxまで許容
        "w-[40vw] max-w-[200px] lg:w-[21.5vw] lg:max-w-2xl h-14 lg:h-[4.5vw] text-xs lg:text-[1.1vw] border-[2px] lg:border-[0.3vw]";

  const bg =
    variant === "primary" ? CONFIG.ui.btnPrimary : CONFIG.ui.btnSecondary;

  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`relative flex items-center justify-center font-extrabold text-white rounded-full border-white shadow-lg hover:scale-105 transition-transform overflow-hidden leading-none ${sizeClasses}`}
      style={{ background: bg, textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
    >
      <span className="relative z-10 px-2">{label}</span>
      <div className="absolute top-1 left-4 w-3/4 h-1/2 bg-white/30 rounded-full pointer-events-none" />
    </Link>
  );
};