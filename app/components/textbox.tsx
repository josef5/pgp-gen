import { cn } from "@/lib/utils";
import { useRef } from "react";

function Textbox({
  text,
  className,
  isCopyable,
  ...props
}: {
  text: string;
  className?: string;
  isCopyable?: boolean;
  [key: string]: any;
}) {
  const copiedOverlayRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={cn(
          "bg-background-tertiary relative box-border focus:border-2 focus:outline-none md:whitespace-pre-wrap",
          className,
        )}
        onClick={() => {
          if (text && isCopyable) {
            navigator.clipboard.writeText(text);

            if (copiedOverlayRef.current) {
              copiedOverlayRef.current.style.opacity = "1";

              setTimeout(() => {
                if (copiedOverlayRef.current) {
                  copiedOverlayRef.current.style.opacity = "0";
                }
              }, 1000);
            }
          }
        }}
        {...props}
      >
        {/* Overlay for copy confirmation */}
        {isCopyable && (
          <div
            ref={copiedOverlayRef}
            className="text-background-tertiary bg-foreground/75 absolute flex h-full w-full items-center justify-center text-2xl opacity-0 transition-opacity duration-300"
          >
            copied
          </div>
        )}
        <div className="px-5 py-2 text-base">{text}</div>
      </div>
    </>
  );
}

export default Textbox;
