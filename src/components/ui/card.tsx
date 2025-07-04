// components/ui/card.tsx
import React from "react";
import { cn } from "@/lib/utils"; // Optional: your utility for className merging

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("bg-white dark:bg-gray-900 rounded-xl", className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-4", className)}>{children}</div>;
}
