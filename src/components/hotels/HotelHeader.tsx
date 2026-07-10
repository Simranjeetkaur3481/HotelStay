interface HotelHeaderProps {
  name: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
}

import { Heart, MapPin, Share2, Star } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAddToWishListMutation, useRemoveWishListMutation } from "@/store/api/wishListAPi";
import toast from "react-hot-toast";

interface HotelHeaderProps {
  name: string;
  city: string;
  state: string;
  starRating: number;
  totalReviews: number;
  isWishlisted: boolean;
  id: number;
}

export default function HotelHeader({
  name,
  city,
  state,
  starRating,
  totalReviews,
  isWishlisted,
  id,
}: HotelHeaderProps) {
  const [wishlisted, setWishlisted] = useState(Boolean(isWishlisted));
  const [addToWishListed] = useAddToWishListMutation();
  const [removeFromWishList] = useRemoveWishListMutation();

  const handleWishList = async () => {
    try {
      if (wishlisted) {
        await removeFromWishList(id).unwrap();
        setWishlisted(false);
        toast.success(`Hotel ${name} removed from wishlist`);
      } else {
        await addToWishListed({ hotelId: id }).unwrap();
        setWishlisted(true);
        toast.success(`Hotel ${name} added to wishlist`);
      }
    } catch {
      toast.error("Unable to update wishlist");
    }
  };
  return (
    <section className="mx-auto mt-8 max-w-7xl ">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />

              <span className="font-semibold">{starRating}</span>

              <span className="text-muted-foreground">({totalReviews} reviews)</span>
            </div>

            <span className="text-muted-foreground">•</span>

            <span className="text-sm font-medium text-primary">Top Rated</span>
          </div>

          <h1 className="mt-3 text-4xl font-bold">{name}</h1>

          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-5 text-primary" />

            <span>
              {city}, {state}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Badge variant="secondary">🏖 Beachfront</Badge>

            <Badge variant="secondary">✔ Free Cancellation</Badge>

            <Badge variant="secondary">⭐ Top Rated</Badge>

            <Badge variant="secondary">🏆 Best Seller</Badge>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Share2 className="size-4" />
            Share
          </Button>

          <Button variant="outline" size="icon" className="cursor-pointer" onClick={handleWishList}>
            <Heart className={`size-5 ${wishlisted ? "text-red-700 fill-red-700 " : ""}`} />
          </Button>
        </div>
      </div>
    </section>
  );
}
