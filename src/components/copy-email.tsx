"use client";

import { useEffect, useState } from "react";

/**
 * Copy-to-clipboard for the email address. Worth having: plenty of people want
 * to paste an address into their own client rather than trigger a mailto:
 * handler they don't use.
 *
 * Clipboard support is checked at click time rather than on mount, so there's no
 * capability-detection render pass and no hydration mismatch. If the write
 * fails — denied permission, insecure context — the mailto: link beside this
 * still works, so failing quietly is the right behaviour.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
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
