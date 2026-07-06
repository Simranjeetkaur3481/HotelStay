type AuthHeroProps = {
  title: string;
  description: string;
  image: string;
};

const AuthHero = ({ title, description, image }: AuthHeroProps) => {
  return (
    <div className="relative hidden lg:flex">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex h-full items-center  p-10 text-white">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
