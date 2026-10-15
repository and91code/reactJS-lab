import { cn } from "@/lib/utils";
import React from "react";

export default function DD({
  value,
  className,
  hidden = false,
}: {
  value: unknown;
  className?: string;
  hidden?: boolean;
}) {
  return hidden ? null : (
    <pre
      className={cn(
        "border-[1px] border-black m-1 p-2 h-[200px] overflow-y-scroll",
        className
      )}
    >
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}
