import React from "react";
import { cn } from "../utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  cardRef?: React.Ref<HTMLDivElement>;
  status?: "upcoming" | "inProgress" | "finished" | "none";
}

export function Card({
  children,
  className,
  cardRef,
  status = "none",
  ...props
}: CardProps) {
  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl bg-white p-6 backdrop-blur-sm border border-slate-200/50 shadow-md",
        {
          "border-l-4 border-l-green-500": status === "upcoming",
          "border-l-4 border-l-yellow-500": status === "inProgress",
          "border-l-4 border-l-red-500": status === "finished",
        },
        className
      )}
      {...props}
    >
      <div className={cn("z-20", className)}>{children}</div>
      <div className="pointer-events-none absolute inset-0 -translate-y-full animate-[shimmer_4s_infinite] bg-gradient-to-t from-transparent via-slate-100/10 to-transparent" />
    </div>
  );
}
