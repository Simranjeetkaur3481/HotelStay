import { Building2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function EmptyHotels() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed">
      <div className="rounded-full bg-primary/10 p-5">
        <Building2 className="size-10 text-primary" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">
        No Hotels Yet
      </h2>

      <p className="mt-2 max-w-md text-center text-muted-foreground">
        Add your first hotel and start welcoming guests from around the world.
      </p>

      <Button className="mt-6">
        <Plus className="mr-2 size-4" />
        Add Hotel
      </Button>
    </div>
  );
}