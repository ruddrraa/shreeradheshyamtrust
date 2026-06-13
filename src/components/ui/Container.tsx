import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
  wide?: boolean;
}

export function Container({
  children,
  className,
  as: Component = "div",
  wide = false,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 lg:px-10",
        wide ? "max-w-[90rem]" : "max-w-7xl",
        className
      )}
    >
      {children}
    </Component>
  );
}
