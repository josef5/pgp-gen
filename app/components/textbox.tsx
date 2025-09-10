import { cn } from "@/lib/utils";

function Textbox({
  label,
  text,
  className,
  ...props
}: {
  label?: string;
  text: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <>
      {label && (
        <h3 className="text-brand col-span-3 col-start-1 mb-2 flex justify-start text-right text-xl md:col-span-1 md:ml-8">
          {label}
        </h3>
      )}
      <div
        className={cn(
          "bg-background-tertiary col-span-3 col-start-1 box-border rounded-none border-none px-5 py-2 text-base break-words focus:border-2 focus:outline-none md:col-start-2 md:whitespace-pre-wrap",
          className,
        )}
        {...props}
      >
        {text}
      </div>
    </>
  );
}

export default Textbox;
