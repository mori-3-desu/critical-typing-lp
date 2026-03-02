"use client";

import React from "react";
import { CONFIG } from "@/app/constants/constants";

// InfoCardで使う色だけを定義 ）
const CARD_COLORS = {
  primary: "linear-gradient(160deg, #4535b2 0%, #ae4868 100%)",
  news: "rgba(244, 156, 105, 0.85)",
  border: "#ffe0cb",
};

export const InfoCard = ({ 
  children, 
  type = "main" 
}: { 
  children: React.ReactNode; 
  type?: "main" | "news" 
}) => {
  const isMain = type === "main";
  const radiusClass = isMain ? "rounded-3xl lg:rounded-[2.5rem]" : "rounded-2xl";

  const style = {
    background: isMain ? CARD_COLORS.primary : CARD_COLORS.news,
    borderColor: isMain ? CARD_COLORS.border : "#ffe7c7",
    borderWidth: isMain ? CONFIG.ui.cardBorderMain : CONFIG.ui.cardBorderNews,
    boxShadow: isMain
      ? "0 0 2vw rgba(0,0,0,0.5)"
      : "0 10px 30px rgba(255, 150, 50, 0.4)",
    backdropFilter: isMain ? "none" : "blur(10px)",
  };

  return (
    <div
      className={`w-full ${radiusClass} ${isMain ? "mb-8 lg:mb-[2vw]" : "p-5 lg:p-[1.5vw]"}`}
      style={{
        ...style,
        borderStyle: "solid",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};