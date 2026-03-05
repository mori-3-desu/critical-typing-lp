import { StarryBackground } from "@/components/common/StarBackground";
import { generateStars } from "../utils/star";
import { TermsHeader } from "./TermsHeader";
import { TermsOfSerVice } from "./TermsOfSerVice";

export default function TermsPage() {
  const initialStars = generateStars();

  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] text-white font-[family-name:var(--font-rounded)] overflow-y-auto z-[9999] theme-red"
      style={{
        background: "linear-gradient(to bottom, #28143C, #B43C64)",
        boxShadow:
          "0 0 20px rgba(255, 100, 150, 0.5), 0 20px 50px rgba(0, 0, 0, 0.5)",
      }}
    >

      <div className="fixed inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
      <StarryBackground stars={initialStars}/>

      <main className="relative w-[95%] xl:w-[80%] max-w-[1000px] mx-auto py-10 flex flex-col items-center">
        <TermsHeader />
        <TermsOfSerVice />
      </main>
    </div>
  );
}