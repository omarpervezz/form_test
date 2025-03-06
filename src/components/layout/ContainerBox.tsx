import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const ContainerBox = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn("p-3 md:p-6 lg:p-10 xl:p-12", className)}>
      {children}
    </div>
  );
};
export default ContainerBox;
