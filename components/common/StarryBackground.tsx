"use client";

import dynamic from "next/dynamic";

// ssr: false でクライアントのみでレンダリングし、Math.random()によるハイドレーションミスマッチを回避
const StarryBackgroundClient = dynamic(() => import("./StarryBackgroundClient"), { ssr: false });

export const StarryBackground = () => <StarryBackgroundClient />;
