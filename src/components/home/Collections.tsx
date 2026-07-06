import CollectionCard from "./CollectionCard";

const collections = [
  {
    title: "Romantic Escape",
    subtitle: "Perfect for couples",
    image: "/collections/romantic.jpg",
  },
  {
    title: "Mountain Retreat",
    subtitle: "Nature at its finest",
    image: "/collections/mountain.jpg",
  },
  {
    title: "Beach Paradise",
    subtitle: "Relax by the sea",
    image: "/collections/beach.jpg",
  },
  {
    title: "Family Fun",
    subtitle: "Spacious stays for everyone",
    image: "/collections/family.jpg",
  },
];

const Collections = () => {
  return (
    <section className="py-20">
  <div className="mx-auto max-w-7xl px-6">

    <div className="mb-10">
      <h2 className="text-4xl font-bold">
        Curated For Every Journey
      </h2>

      <p className="mt-3 max-w-xl text-muted-foreground">
        Whether you're chasing sunsets, mountain trails,
        or memorable family vacations, we've curated
        stays that fit every adventure.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      {collections.map((item) => (
        <CollectionCard key={item.title} {...item} />
      ))}
    </div>

  </div>
</section>
  )
}

export default Collections