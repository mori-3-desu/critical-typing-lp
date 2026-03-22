import { ContactForm } from "@/app/contact/Form";
import { ContactTitle } from "@/app/contact/Title";
import { StarryBackground } from "@/components/common/StarBackground";
import { generateStars } from "@/utils/star";
import { ContactNote } from "./Note";
import { env } from "@/env";

export default function ContactPage() {
  const initialStars = generateStars();

  return (
    <div
      className="fixed inset-0 w-full h-dvh text-white font-rounded overflow-y-auto z-9999 theme-blue"
      style={{
        background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="fixed inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" />

      {/* サーバーで作った星を渡す */}
      <StarryBackground stars={initialStars} />

      <main className="relative w-[95%] md:w-[80%] xl:w-[80%] max-w-250 mx-auto py-10 flex flex-col items-center">
        <ContactTitle title="お問い合わせ" />
        <ContactForm googleFormUrl={env.GOOGLE_FORM_URL} />
        <ContactNote />
      </main>
    </div>
  );
}
