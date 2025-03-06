import * as React from "react";

import { cn } from "@/lib/utils";

const InputFile = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn("hidden", className)}
      ref={ref}
      {...props}
    />
  );
});
InputFile.displayName = "InputFile";

export { InputFile };
