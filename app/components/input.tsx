import { cn } from "@/lib/utils";

function Input({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) {
  return (
    <input
      className={cn(
        "bg-background-secondary focus:bg-background-tertiary box-border h-10 border-none px-5 py-2 text-base focus:border-2 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export default Input;
