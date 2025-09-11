import { cn } from "@/lib/utils";

function Label({
  label,
  className,
  ...props
}: {
  label: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <label
      className={cn(
        "text-brand flex justify-start text-right text-xl",
        className,
      )}
      {...props}
    >
      {label}
    </label>
  );
}

export default Label;
