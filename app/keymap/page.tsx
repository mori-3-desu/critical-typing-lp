"use client";
import { StarryBackground } from "@/components/common/StarBackground";
import { generateStars } from "../utils/star";
import { KeyHeader } from "./KeyHeader";
import { useSmoothScroll } from "../hooks/useScroll";
import { KeySection } from "./KeySection";

export default function KeymapPage() {
  const { containerRef, scrollToSection } = useSmoothScroll();
  const initialStars = generateStars();

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-100dvh text-white font-[family-name:var(--font-rounded)] overflow-y-auto z-[9999] theme-blue"
      style={{
        background: "linear-gradient(to bottom, #00008b, #4169e1)",
        border: "2px solid rgba(255, 180, 200, 0.5)",
        boxShadow:
          "0 0 20px rgba(255, 100, 150, 0.5), 0 20px 50px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="fixed inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
      <StarryBackground stars={initialStars} />

      <main className="relative w-[95%] xl:w-[90%] max-w-[1800px] mx-auto py-6 md:py-10 flex flex-col items-center">
        <KeyHeader />
        <KeySection scrollToSection={scrollToSection} />
      </main>
    </div>
  );
}
