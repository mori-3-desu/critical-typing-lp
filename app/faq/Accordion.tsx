"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaqProps } from "../../types";

export function AccordionItem({ question, answer }: FaqProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="border border-white/40 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm shadow-sm transition-all hover:bg-white/20"
    >
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center justify-between w-full p-5 text-left transition-colors cursor-pointer"
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
            key="content"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            style={{ originY: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.45, 0.73, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ scaleY: 1.5 }}
              animate={{ scaleY: 1 }}
              style={{ originY: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.45, 0.73, 1] }}
            >
              <div className="p-5 text-white flex items-start gap-3">
                <span className="font-bold text-cyan-300">A.</span>
                <span>{answer}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
