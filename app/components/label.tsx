import { cn } from "@/lib/utils";

function Label({
  text,
  children,
  className,
  ...props
}: {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <label
      className={cn("text-brand flex justify-start text-xl", className)}
      {...props}
    >
      {children ?? text}
    </label>
  );
}

export default Label;
