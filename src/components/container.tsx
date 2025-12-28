import { cn } from "@/lib/utils";
import React from "react";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex justify-center">
      <div className={cn("w-full max-w-lg", className)}>{children}</div>
    </div>
  );
}
