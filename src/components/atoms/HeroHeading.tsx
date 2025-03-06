import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const HeroHeading = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <h1
      className={cn(
        "text-[32px] leading-[38.4px] sm:text-[32px] sm:leading-[38.4px] md:text-[32px] md:leading-[38.4px] lg:text-[32px] lg:leading-[38.4px] font-semibold text-[#243045]",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default HeroHeading;

// sm:text-[24px] sm:leading-[32.68px] md:text-[24px] md:leading-[32.68px] lg:text-[24px] lg:leading-[32.68px] text-[#243045] font-bold
