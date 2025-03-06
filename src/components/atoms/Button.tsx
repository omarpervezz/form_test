import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center max-w-full justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
    
        mediumRoundedBtn:
          " text-white text-sm font-bold bg-black hover:bg-[#232323] rounded-[8px] leading-[18px]",
        subscribeBtn:"w-full px-4 py-2 bg-sky-700 hover:bg-sky-800 transition-all duration-300 rounded-md shadow-md text-white  font-semibold",
        counterBtn:"text-3xl font-semibold px-4 py-1  hover:bg-gray-200  transition-all",
        addToCartBtn:"bg-black text-white w-full  px-6 shadow-md py-2 rounded-full  text-base font-semibold hover:bg-[#232323]",

        giftBtn: "text-black hover:text-white hover:bg-black font-medium text-base rounded-md shadow-sm  px-4 py-1 border border-black"

      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      // variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
