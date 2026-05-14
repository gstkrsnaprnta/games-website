import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function GlassCard({ children, className = "", hover = false }: GlassCardProps) {
  return (
    <div className={`games-card rounded-[1.5rem] ${hover ? "games-card-hover" : ""} ${className}`}>
      {children}
    </div>
  );
}
