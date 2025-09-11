import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) {
  return (
    <textarea
      className={cn(
        "bg-background-secondary focus:bg-background-tertiary box-border h-48 rounded-none border-none px-5 py-2 text-base focus:border-2 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export default Textarea;
