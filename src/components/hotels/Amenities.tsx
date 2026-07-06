type AmenitiesProps = {
  icon: any;
  name: string;
}[];

export default function Amenities({ amenities }: { amenities: AmenitiesProps }) {
  return (
    <section className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">Amenities</h2>

        <p className="text-sm text-muted-foreground">Everything you need for a comfortable stay.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {amenities?.map(({ icon: Icon, name }) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-2xl border bg-background p-2 transition hover:shadow-md hover:-translate-y-1"
          >
            {/* <div className="rounded-xl bg-primary/10 p-2"><Icon className="size-5 text-primary" /></div> */}

            <span className="text-sm font-medium">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
