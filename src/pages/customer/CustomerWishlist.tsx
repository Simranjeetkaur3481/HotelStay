import { Heart, Loader2, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import EmptyState from "@/components/dashboard/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetWishListQuery, useRemoveWishListMutation } from "@/store/api/wishListAPi";
import { API_BASE_URL } from "@/constants/api";
import toast from "react-hot-toast";

const CustomerWishlist = () => {
  const { data, isLoading } = useGetWishListQuery(undefined);
  const [removeWishlist] = useRemoveWishListMutation();
  const wishlist = data?.data ?? [];

  const handleRemove = async (hotelId: number) => {
    try {
      await removeWishlist(hotelId).unwrap();
      toast.success("Removed from wishlist");
    } catch {
      toast.error("Failed to remove from wishlist");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="My Wishlist" description="Your saved hotels — book your dream stay anytime." />

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : !wishlist.length ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save hotels you love and come back to book them later."
          action={
            <Button asChild>
              <Link to="/hotels">Discover Hotels</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((hotel: {
            id: number;
            name: string;
            city: string;
            state: string;
            starRating: number;
            startingRoomPrice: number;
            images: { imageUrl: string }[];
          }) => (
            <Card key={hotel.id} className="group overflow-hidden border-0 shadow-sm ring-1 ring-border/60 transition hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${API_BASE_URL}${hotel.images?.[0]?.imageUrl}`}
                  alt={hotel.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-3 top-3 size-9 rounded-full bg-white/90 shadow"
                  onClick={() => handleRemove(hotel.id)}
                >
                  <Heart className="size-4 fill-red-500 text-red-500" />
                </Button>
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {hotel.city}, {hotel.state}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{hotel.starRating}</span>
                  </div>
                  <p className="font-bold">
                    ₹{hotel.startingRoomPrice?.toLocaleString()}
                    <span className="text-xs font-normal text-muted-foreground">/night</span>
                  </p>
                </div>
                <Button asChild className="mt-4 w-full rounded-xl">
                  <Link to={`/hotelDetails/${hotel.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerWishlist;
