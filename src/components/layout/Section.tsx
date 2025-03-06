import { cn } from "@/lib/utils";
import { FC } from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: FC<SectionProps> = ({ children, className }) => {
  return (
    <section className={cn("relative box-border", className)}>
      {children}
    </section>
  );
};

export default Section;

// pt-4 pb-4 md:pt-6 md:pb-6 lg:pt-0 lg:pb-0
