// components/ui/button.tsx
import React from "react";
import { cn } from "@/lib/utils"; // Optional, Tailwind class merging

export function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      className={cn(
        "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
