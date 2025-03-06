import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const Paragraph = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <p
      className={cn(
        "text-[16px] leading-[19.2px] sm:text-[16px] sm:leading-[19.2px] md:text-[16px] md:leading-[19.2px] lg:text-[14px] lg:leading-[19.2px] text-[#243045]",
        className
      )}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export default Paragraph;
