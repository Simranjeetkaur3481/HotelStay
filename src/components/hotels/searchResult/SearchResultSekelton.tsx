import { Skeleton } from "@/components/ui/skeleton";

export default function SearchResultSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border p-5">
      <div className="flex flex-col gap-6 lg:flex-row">

        <Skeleton className="h-56 w-full rounded-2xl lg:h-64 lg:w-80" />

        <div className="flex flex-1 flex-col justify-between space-y-4">

          <div className="space-y-3">
            <Skeleton className="h-7 w-60" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <div className="flex justify-between">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>

        </div>

      </div>
    </div>
  );
}