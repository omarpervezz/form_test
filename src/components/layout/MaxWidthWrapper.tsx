import { cn } from "@/lib/utils";
import { ReactNode } from "react";
const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full py-0 px-[14px] sm:px-[24px] max-w-screen-2xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};
export default MaxWidthWrapper;
