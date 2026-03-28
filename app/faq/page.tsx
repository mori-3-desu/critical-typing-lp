import { StarryBackground } from "@/components/common/StarryBackground";
import { FaqInfo } from "./FaqInfo";
import { FaqHeader } from "./FaqHeader";
import { faqs } from "./FaqQA";

export default function FAQPage() {
  return (
    <div
      className="fixed inset-0 w-full h-dvh text-white font-rounded overflow-y-auto z-9999 theme-blue"
      style={{
        background: "linear-gradient(to bottom, #143C5A, #86B6E0)",
      }}
    >
      <StarryBackground />

      <main className="relative w-[95%] xl:w-[90%] max-w-350 mx-auto py-10 flex flex-col items-center">
        <FaqHeader />
        <FaqInfo faqs={faqs}/>
      </main>
    </div>
  );
}
