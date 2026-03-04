"use client";
import { useState } from "react";
import { CatLoader } from "./ContactLoading";

const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_URL || "";

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  // フォームの「箱」と「猫」だけを返す！
  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative min-h-[600px]">
      <CatLoader fadeOut={!isLoading} />

      <iframe
        src={GOOGLE_FORM_URL}
        className="w-full h-[800px] md:h-[1000px] border-0"
        onLoad={() => setIsLoading(false)}
        title="Contact Form"
        loading="lazy"
        sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-top-navigation"
        referrerPolicy="no-referrer"
      >
        読み込んでいます…
      </iframe>
    </div>
  );
};
