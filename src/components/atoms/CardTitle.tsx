import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <h3 className={cn(className)}>{children}</h3>;
};

export default CardTitle;
