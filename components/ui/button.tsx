import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        outline:
          "border border-border/80 bg-card/80 backdrop-blur-md hover:bg-accent/80 hover:text-accent-foreground hover:border-primary/40 shadow-sm transition-all duration-200",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-white shadow-sm hover:opacity-90",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-zinc-950 text-white hover:bg-zinc-900 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 shadow-xl shadow-zinc-950/15 dark:shadow-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group border border-zinc-800 dark:border-white/40 font-bold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-12 px-6 text-base font-semibold rounded-xl",
        xl: "h-14 px-8 text-lg font-bold rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  glow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glow = false, children, ...props }, ref) => {
    const isGradient = variant === "gradient";
    
    const buttonElement = (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isGradient && (
          <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/25 dark:via-zinc-950/20 to-transparent skew-x-12 group-hover:animate-shimmer pointer-events-none" />
        )}
        {children}
      </button>
    );

    if (glow || isGradient) {
      const isFullWidth = className?.includes("w-full");
      return (
        <div className={cn("relative group inline-block", isFullWidth ? "w-full" : "w-full sm:w-auto")}>
          <div className="absolute -inset-1 rounded-2xl bg-zinc-950/15 dark:bg-white/20 opacity-30 blur-md transition duration-500 group-hover:opacity-60 group-hover:blur-lg pointer-events-none" />
          {buttonElement}
        </div>
      );
    }

    return buttonElement;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
