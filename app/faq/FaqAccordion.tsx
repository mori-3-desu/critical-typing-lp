import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaqProps } from "../types";

// --- アコーディオン部品 ---
export function AccordionItem({ question, answer }: FaqProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/40 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm shadow-sm transition-all hover:bg-white/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-5 text-left transition-colors"
      >
        <div className="font-bold text-white text-base md:text-lg flex items-start gap-3 w-[90%]">
          <span className="text-cyan-200 text-xl shrink-0 leading-tight">
            Q.
          </span>
          <span className="leading-tight">{question}</span>
        </div>
        <svg
          className={`w-6 h-6 text-cyan-200 shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-black/10 border-t border-white/20"
          >
            <div className="p-5 text-white leading-relaxed font-medium flex items-start gap-3">
              <span className="font-bold text-cyan-300 text-lg shrink-0 pt-[2px]">
                A.
              </span>
              <span>{answer}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
