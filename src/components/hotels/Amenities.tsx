type AmenitiesProps = {
  name: string;
  id:number
}[];

export default function Amenities({ amenities }: { amenities: AmenitiesProps }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Amenities</h2>

        <p className="text-sm text-muted-foreground">Everything you need for a comfortable stay.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {amenities?.map(({ name,id }) => (
          <div key={id} className="flex items-center gap-2 rounded-xl border p-3  transition hover:shadow-md hover:-translate-y-1">
            <span className="text-primary">✔</span>
            <span className="text-sm">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
