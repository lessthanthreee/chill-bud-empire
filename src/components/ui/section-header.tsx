
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-2 text-center mb-8", className)}>
      <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground max-w-[700px] mx-auto text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
