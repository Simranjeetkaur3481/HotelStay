import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  pending: "bg-amber-500/10 text-amber-700 border-amber-200",
  cancelled: "bg-red-500/10 text-red-700 border-red-200",
  completed: "bg-blue-500/10 text-blue-700 border-blue-200",
  active: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  inactive: "bg-slate-500/10 text-slate-600 border-slate-200",
};

type StatusBadgeProps = {
  status: string;
  className?: string;
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const key = status?.toLowerCase() ?? "pending";
  return (
    <Badge variant="outline" className={cn("capitalize", statusStyles[key] ?? statusStyles.pending, className)}>
      {status}
    </Badge>
  );
}
