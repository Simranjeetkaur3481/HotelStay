import { Link, useNavigate } from "react-router-dom";
import { BedDouble, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants/api";
import { getEffectiveRoomPricing } from "@/lib/roomPricing";

export default function SearchResultCard({ result }: any) {
  const { hotelId, hotelName, images, id, name, description, bedType, maxOccupancy } = result;
  const navigate = useNavigate();
  const pricing = getEffectiveRoomPricing(result);
  return (
    <Link to={`/roomDetails/${id}`}>
      <article className="overflow-hidden rounded-2xl border bg-background transition-all hover:border-primary/20 hover:shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="h-52 w-full shrink-0 overflow-hidden md:h-auto md:w-56">
            <img
              src={`${API_BASE_URL}${images?.[0]?.imageUrl}`}
              alt={hotelName}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/hotelDetails/${hotelId}`);
                    }}
                    className="text-xl font-semibold hover:text-primary"
                  >
                    {hotelName}
                  </button>

                  <h3 className="mt-1 text-sm font-medium text-muted-foreground">{name}</h3>
                </div>

                <Badge variant="secondary">Available</Badge>
              </div>

              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <BedDouble className="h-4 w-4" />
                  {bedType}
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {maxOccupancy} Guests
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {pricing.hasDiscount && (
                  <p className="text-sm text-muted-foreground line-through">₹{pricing.basePrice.toLocaleString()}</p>
                )}
                <p className="text-2xl font-bold text-primary">₹{pricing.effectivePrice.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">per night • Taxes extra</p>
                {pricing.promotionLabel && <p className="mt-1 text-xs font-medium text-emerald-600">{pricing.promotionLabel}</p>}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate(`/roomDetails/${id}`)}>
                  View
                </Button>

                <Button size="sm">Select Room</Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
