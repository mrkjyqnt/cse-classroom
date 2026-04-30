import { cn } from "@/lib/utils";
export function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-[#e8e2d9]", className)} />;
}
