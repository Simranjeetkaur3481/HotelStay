type AuthHeroProps = {
  title: string;
  description: string;
  image: string;
};

const AuthHero = ({ title, description, image }: AuthHeroProps) => {
  return (
    <div className="relative hidden lg:flex">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/60 to-black/80" />
      <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
        {/* Top */}
        <div>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">✈️ HotelHub</span>
        </div>

        {/* Center */}
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold leading-tight">{title}</h1>

          <p className="text-lg text-zinc-200">{description}</p>

          <div className="mt-8 space-y-4">
            <div>✓ Verified Hotels</div>

            <div>✓ Best Price Guarantee</div>

            <div>✓ Instant Booking</div>

            <div>✓ 24/7 Customer Support</div>
          </div>
        </div>

        {/* Bottom */}
        <div>
          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="text-3xl font-bold">15,000+</p>

            <p className="text-white/80">Happy Travelers Worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
