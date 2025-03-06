import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <p className={cn(className)}>{children}</p>;
};

export default CardDescription;
