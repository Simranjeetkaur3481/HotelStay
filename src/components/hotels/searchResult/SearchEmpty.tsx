import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchEmptyProps {
  onReset: () => void;
}

export default function SearchEmpty({
  onReset,
}: SearchEmptyProps) {
  return (
    <div className="flex flex-col items-center rounded-3xl border py-20 text-center">

      <SearchX className="mb-5 h-14 w-14 text-muted-foreground" />

      <h2 className="text-2xl font-semibold">
        No rooms found
      </h2>

      <p className="mt-2 text-muted-foreground">
        Try changing your dates or filters.
      </p>

      <Button
        className="mt-6"
        onClick={onReset}
      >
        Clear Filters
      </Button>

    </div>
  );
}