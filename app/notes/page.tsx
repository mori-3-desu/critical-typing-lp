import { StarryBackground } from "@/components/common/StarryBackground";
import { NoteHeader } from "./NoteHeader";
import { NoteCaution } from "./NoteCaution";

export default function NotesPage() {
  return (
    <div
      className="fixed inset-0 w-full h-100dvh text-white font-rounded overflow-y-auto z-9999 theme-red"
      style={{
        background: "linear-gradient(to bottom, #28143C, #B43C64)",
        boxShadow:
          "0 0 20px rgba(255, 100, 150, 0.5), 0 20px 50px rgba(0, 0, 0, 0.5)",
      }}
    >
      <StarryBackground />

      <main className="relative w-[95%] xl:w-[80%] max-w-250px mx-auto py-10 flex flex-col items-center">
        <NoteHeader />
        <NoteCaution />
      </main>
    </div>
  );
}
