import { cn } from "@/lib/utils";
import { useRef } from "react";

function Textbox({
  label,
  text,
  className,
  isCopyable,
  ...props
}: {
  label?: string;
  text: string;
  className?: string;
  isCopyable?: boolean;
  [key: string]: any;
}) {
  const copiedOverlayRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {label && (
        <h3 className="text-brand col-span-3 col-start-1 mb-2 flex justify-start text-right text-xl md:col-span-1 md:ml-8">
          {label}
        </h3>
      )}
      <div
        className={cn(
          "bg-background-tertiary relative col-span-3 col-start-1 box-border break-words focus:border-2 focus:outline-none md:col-start-2 md:whitespace-pre-wrap",
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
        {isCopyable && (
          <div
            ref={copiedOverlayRef}
            className="absolute flex h-full w-full items-center justify-center bg-black/50 text-2xl text-white opacity-0 transition-opacity duration-300 ease-in-out"
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
