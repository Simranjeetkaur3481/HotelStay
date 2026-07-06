import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Beach Resorts",
    image: "/categories/beach.jpg",
    hotels: 240,
  },
  {
    title: "Mountain Retreats",
    image: "/categories/mountain.jpg",
    hotels: 180,
  },
  {
    title: "Luxury Resorts",
    image: "/categories/luxury.jpg",
    hotels: 95,
  },
  {
    title: "City Hotels",
    image: "/categories/city.jpg",
    hotels: 320,
  },
  {
    title: "Family Stays",
    image: "/categories/family.jpg",
    hotels: 150,
  },
  {
    title: "Romantic Escapes",
    image: "/categories/couple.jpg",
    hotels: 110,
  },
];

export default function BrowseByCategory() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <p className="font-semibold text-primary">
          Browse by Category
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          Find Your Perfect Stay
        </h2>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Whether you're planning a relaxing vacation or a business trip,
          explore hotels that match your travel style.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            {...category}
          />
        ))}
      </div>
    </section>
  );
}