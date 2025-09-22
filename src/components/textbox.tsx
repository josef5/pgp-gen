import { cn } from "@/lib/utils";
import { useState } from "react";

function Textbox({
  className,
  isCopyable,
  children,
  ...props
}: {
  className?: string;
  isCopyable?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  const [copyText, setCopyText] = useState<string | null>("copy");
  const text = String(children);
  const COPIED_TIMEOUT_DURATION = 3000;

  return (
    <>
      <div
        className={cn(
          "bg-background-tertiary relative box-border break-words whitespace-pre-wrap focus:border-2 focus:outline-none",
          className,
        )}
        {...props}
      >
        {/* Overlay for copy confirmation */}
        {isCopyable && (
          <div className="text-background-tertiary pointer-events-none absolute flex h-full w-full items-start justify-end text-2xl transition-opacity duration-300">
            <div
              className="bg-foreground/25 hover:bg-foreground/70 pointer-events-auto cursor-pointer px-3 py-2 text-base"
              onClick={() => {
                if (text && isCopyable) {
                  navigator.clipboard.writeText(text);

                  setCopyText("copied");

                  setTimeout(() => {
                    setCopyText("copy");
                  }, COPIED_TIMEOUT_DURATION);
                }
              }}
            >
              {copyText}
            </div>
          </div>
        )}
        <div className="px-5 py-2 text-base">{children}</div>
      </div>
    </>
  );
}

export default Textbox;
