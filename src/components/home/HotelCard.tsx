import { Heart, MapPin, Star, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { API_BASE_URL } from "@/constants/api";
import { Link } from "react-router-dom";
import {
  useAddToWishListMutation,
  useRemoveWishListMutation,
} from "@/store/api/wishListAPi";
import { useState } from "react";
import type { MouseEvent } from "react";
import toast from "react-hot-toast";

type HotelCardProps = {
  id: number;
  name: string;
  city: string;
  state: string;
  amenities: { id: number; name: string }[];
  starRating: number;
  totalReviews: number;
  startingRoomPrice: number;
  images: { imageUrl: string }[];
  isWishlisted: boolean;
};

export default function HotelCard({
  id,
  name,
  city,
  state,
  amenities,
  starRating,
  totalReviews,
  startingRoomPrice,
  images,
  isWishlisted,
}: HotelCardProps) {
  const [wishlisted, setWishlisted] = useState(Boolean(isWishlisted));
  const [addToWishList] = useAddToWishListMutation();
  const [removeWishList] = useRemoveWishListMutation();

  const handleWishlist = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (wishlisted) {
        await removeWishList(id).unwrap();
        setWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        await addToWishList({ hotelId: id }).unwrap();
        setWishlisted(true);
        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Unable to update wishlist");
    }
  };
  return (
    <Link to={`/hotelDetails/${id}`}>
      <Card className="group overflow-hidden rounded-2xl border-0 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl pt-0 min-w-[18rem]">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={`${API_BASE_URL}${images[0].imageUrl}`}
            alt={name}
            className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <button 
            onClick={handleWishlist}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow">
            <Heart className={`size-5 transition ${
      wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
    }`} />
          </button>

          <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
            Best Seller
          </div>
        </div>

        <CardContent className="space-y-4 p-2">
          {/* Rating */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-sm font-medium">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              {starRating}
              <span className="text-muted-foreground">({totalReviews} reviews)</span>
            </span>
          </div>

          {/* Name */}
          <div>
            <h3 className="line-clamp-1 text-xl font-bold">{name}</h3>

            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {city}, {state}
            </p>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1">
            {amenities.slice(0, 3).map((amenity) => (
              <span key={amenity.id} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs">
                {/* <Wifi className="size-3.5" /> */}
                {amenity.name}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Starting from</p>

              <div className="mt-1 flex items-end gap-1">
                <span className="text-xl font-bold text-primary">₹{startingRoomPrice}</span>

                <span className="pb-1 text-sm text-muted-foreground">/ night</span>
              </div>
            </div>

            <ChevronRight className="size-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
