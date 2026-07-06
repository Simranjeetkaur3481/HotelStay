export const SORT_OPTIONS = [
  {
    label: "Recommended",
    value: "recommended",
  },
  {
    label: "Price: Low to High",
    value: "priceAsc",
  },
  {
    label: "Price: High to Low",
    value: "priceDesc",
  },
  {
    label: "Highest Rated",
    value: "ratingDesc",
  },
  {
    label: "Most Reviewed",
    value: "reviewsDesc",
  },
  {
    label: "Newest",
    value: "newest",
  },
];
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({
  value,
  onChange,
}: SortDropdownProps) {
  return (
    <div className="flex items-center gap-3">

      <span className="hidden text-sm text-muted-foreground sm:block">
        Sort By
      </span>

      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}


{/* <div className="flex items-center justify-between">

  <p className="text-muted-foreground">
    {data?.totalHotels} Hotels Found
  </p>

  <SortDropdown
    value={filters.sort}
    onChange={(value) =>
      setFilters((prev) => ({
        ...prev,
        sort: value,
        page: 1,
      }))
    }
  />

</div> */}