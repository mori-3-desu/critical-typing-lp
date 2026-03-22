import { useRef } from "react";
import { HEADER_OFFSET_PX } from "../utils/constants";

export const useSmoothScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    if (!containerRef.current) return;
    const element = document.getElementById(id);
    if (element) {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const currentScroll = containerRef.current.scrollTop;
      const targetTop =
        currentScroll + (elementTop - containerTop) - HEADER_OFFSET_PX;
      containerRef.current.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  };
  return { containerRef, scrollToSection };
};
