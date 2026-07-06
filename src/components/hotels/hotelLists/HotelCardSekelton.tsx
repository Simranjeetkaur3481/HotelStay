import { Skeleton } from "@/components/ui/skeleton";

export default function HotelCardSkeleton() {
  return (
    <div className="flex gap-5 rounded-2xl border p-4">

      <Skeleton className="h-48 w-72 rounded-xl" />

      <div className="flex-1 space-y-4">

        <Skeleton className="h-6 w-52" />

        <Skeleton className="h-4 w-80" />

        <Skeleton className="h-4 w-40" />

        <Skeleton className="h-4 w-60" />

      </div>

      <div className="space-y-3">

        <Skeleton className="h-8 w-28" />

        <Skeleton className="h-10 w-32" />

      </div>

    </div>
  );
}