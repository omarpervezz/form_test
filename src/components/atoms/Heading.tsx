import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const Heading = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <h2
      className={cn(
        "sm:text-[24px] sm:leading-[32.68px] md:text-[24px] md:leading-[32.68px] lg:text-[24px] lg:leading-[32.68px] text-[#243045] font-bold",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading;
