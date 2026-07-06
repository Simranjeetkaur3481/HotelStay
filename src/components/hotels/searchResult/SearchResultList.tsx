import SearchEmpty from "./SearchEmpty";
import SearchPagination from "./SearchPagination";
import SearchResultCard from "./SearchResultCard";
import SearchResultSkeleton from "./SearchResultSkeleton";

interface SearchResultListProps {
  results: SearchResult[];
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onReset: () => void;
}

export default function SearchResultList({
  results,
  isLoading,
  totalPages,
  currentPage,
  onPageChange,
  onReset,
}: SearchResultListProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <SearchResultSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return <SearchEmpty onReset={onReset} />;
  }

  return (
    <div className="space-y-6">

      {results.map((result) => (
        <SearchResultCard
          key={`${result.hotel.id}-${result.room.id}`}
          result={result}
        />
      ))}

      <SearchPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

    </div>
  );
}