import { StarryBackground } from "@/components/common/StarBackground";
import { generateStars } from "../utils/star";
import { PrivacyHeader } from "./PrivacyHeader";
import { PrivacyPolicy } from "./PrivacyPolicy";

export default function PrivacyPage() {
  const initialStars = generateStars();

  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] text-white font-[family-name:var(--font-rounded)] overflow-y-auto z-[9999] theme-blue"
      style={{
        background: "linear-gradient(to bottom, #143C5A, #86B6E0)",
      }}
    >
      <StarryBackground stars={initialStars} />

      <main className="relative w-[95%] xl:w-[80%] max-w-[1000px] mx-auto py-10 flex flex-col items-center">
        <PrivacyHeader />
        <PrivacyPolicy />
      </main>
    </div>
  );
}
