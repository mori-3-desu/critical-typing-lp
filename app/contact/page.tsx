import { ContactForm } from "@/app/contact/Form";
import { SubPageTitle } from "@/app/contact/SubPageTitle";
import { StarryBackground } from "@/components/common/StarryBackground";
import { ContactNote } from "./Note";
import { env } from "@/env";

export default function ContactPage() {
  return (
    <div
      className="fixed inset-0 w-full h-dvh text-white font-rounded overflow-y-auto z-9999 theme-blue"
      style={{
        background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="fixed inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" />
      <StarryBackground />

      <main className="relative w-[95%] md:w-[80%] xl:w-[80%] max-w-250 mx-auto py-10 flex flex-col items-center">
        <SubPageTitle title="お問い合わせ" />
        <ContactForm googleFormUrl={env.GOOGLE_FORM_URL} />
        <ContactNote />
      </main>
    </div>
  );
}
