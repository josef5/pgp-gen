import { cn } from "@/lib/utils";

function Button({
  label,
  className,
  ...props
}: {
  label: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <button
      type="submit"
      className={cn(
        "border-foreground-secondary text-foreground-secondary active:bg-background-secondary hover:border-hover disabled:hover:border-foreground-secondary disabled:active:bg-background disabled:active:border-foreground-secondary h-10 cursor-pointer border-1 active:border-none disabled:cursor-default disabled:opacity-25 disabled:active:border-solid",
        className,
      )}
      {...props}
    >
      {label}
    </button>
  );
}

export default Button;
