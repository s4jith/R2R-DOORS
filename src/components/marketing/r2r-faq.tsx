"use client";

import { useState } from "react";

type Faq = { question: string; answer: string };

export default function R2RFaq({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="border-t border-border">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.question} className="border-b border-border">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-archivo text-[18px] font-semibold tracking-[-0.01em] text-foreground">
                {f.question}
              </span>
              <span
                className={`font-archivo text-[24px] leading-none ${
                  isOpen ? "text-brass" : "text-ink-mono"
                }`}
              >
                {isOpen ? "–" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="m-0 max-w-[600px] pb-[26px] text-[15.5px] leading-[1.65] text-ink-soft">
                {f.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
