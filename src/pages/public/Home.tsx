import Destinations from "@/components/home/Destinations";
import GuestStory from "@/components/home/GuestStory";
import HeroSection from "@/components/home/HeroSection";
import Newsletter from "@/components/home/NewsLetter";
import PopularHotels from "@/components/home/PopularHotels";
import SearchCard from "@/components/home/SearchCard";
import SeasonalOffer from "@/components/home/SeasonalOffer";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <SearchCard />
      <PopularHotels />
      <Destinations />
      <WhyChooseUs />
      <SeasonalOffer />
      <GuestStory />
      <Newsletter />
    </div>
  );
};

export default Home;
