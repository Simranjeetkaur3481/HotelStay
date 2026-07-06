import { useSearchParams } from "react-router-dom";



export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();

  const city = searchParams.get("city") ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = Number(searchParams.get("guests") ?? 1);

  // Later:
  // const { data, isLoading } = useSearchHotelsQuery({
  //   city,
  //   checkIn,
  //   checkOut,
  //   guests,
  // });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <SearchSearchBar /> */}

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          {/* <SearchFilters /> */}
        </aside>

        <main className="space-y-6 lg:col-span-9">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing available rooms in <span className="font-medium">{city}</span>
            </p>

            {/* <SearchSortDropdown /> */}
          </div>

          {/* <SearchResultList /> */}
        </main>
      </div>
    </div>
  );
}