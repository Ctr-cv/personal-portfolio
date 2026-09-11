"use client";

import { useEffect, useState } from "react";

/**
 * Copy-to-clipboard for the email address. Small but worth having: plenty of
 * people want to paste an address into their own client rather than trigger a
 * mailto: handler they don't use.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof navigator !== "undefined" && !!navigator.clipboard);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
        } catch {
          // Clipboard access can be denied; the mailto link beside this still works.
          setCopied(false);
        }
      }}
      className="type-label inline-flex items-center gap-2.5 border border-bone-400/25 px-5 py-4 text-bone-300 transition-colors duration-300 hover:border-bone-400/50 hover:text-bone-100"
    >
      {copied ? "Copied" : "Copy address"}
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full transition-colors duration-300 ${
          copied ? "bg-oxide-400" : "bg-bone-500"
        }`}
      />
      <span aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
