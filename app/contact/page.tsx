import { generateStars } from "../utils/star";
import { StarryBackground } from "@/components/common/StarBackground";
import { ContactForm } from "@/app/contact/ContactForm";
import { SubPageHeader } from "./ContactHeader";
import { SubPageFooter } from "./ContactFooter";

export default function ContactPage() {
  const initialStars = generateStars();

  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] text-white font-[family-name:var(--font-rounded)] overflow-y-auto z-[9999] theme-blue"
      style={{
        background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="fixed inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" />

      {/* サーバーで作った星を渡す */}
      <StarryBackground stars={initialStars} />

      <main className="relative w-[95%] md:w-[80%] xl:w-[80%] max-w-[1000px] mx-auto py-10 flex flex-col items-center">
        <SubPageHeader title="お問い合わせ" />
        <ContactForm />
        <SubPageFooter />
      </main>
    </div>
  );
}
