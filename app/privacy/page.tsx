import { StarryBackground } from "@/components/common/StarryBackground";
import { PrivacyHeader } from "./PrivacyHeader";
import { PrivacyPolicy } from "./PrivacyPolicy";

export default function PrivacyPage() {
  return (
    <div
      className="fixed inset-0 w-full h-dvh text-white font-rounded overflow-y-auto z-9999 theme-blue"
      style={{
        background: "linear-gradient(to bottom, #143C5A, #86B6E0)",
      }}
    >
      <StarryBackground />

      <main className="relative w-[95%] xl:w-[80%] max-w-250 mx-auto py-10 flex flex-col items-center">
        <PrivacyHeader />
        <PrivacyPolicy />
      </main>
    </div>
  );
}
