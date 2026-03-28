"use client";
import { useState } from "react";
import { FaqProps } from "../../types";

export function AccordionItem({ question, answer }: FaqProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="border border-white/40 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm shadow-sm transition-all hover:bg-white/20">
      <button
        onClick={toggleMenu}
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

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="p-5 text-white flex items-start gap-3">
            <span className="font-bold text-cyan-300">A.</span>
            <span>{answer}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
