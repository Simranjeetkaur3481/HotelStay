import { CalendarDays, Eye, MapPin, Pencil, Star, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "@/constants/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type HotelCardProps = {
  hotel: {
    id: number;
    name: string;
    city: string;
    state: string;
    description?: string;
    country?: string;
    address?: string;
    starRating?: number;
    images: { imageUrl: string }[];
    averageRating: number;
    totalReviews: number;
    totalRooms: number;
    totalBookings: number;
    isActive: boolean;
  };
  onEdit?: (hotel: HotelCardProps["hotel"]) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
};

export default function HotelCard({ hotel, onEdit, onDelete, showActions = true }: HotelCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:shadow-md">
      <div className="flex flex-col lg:flex-row">
        <img
          src={`${API_BASE_URL}${hotel.images?.[0]?.imageUrl}`}
          alt={hotel.name}
          className="h-60 w-full object-cover lg:h-auto lg:w-72"
        />

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{hotel.name}</h2>
                <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" />
                  <span>{hotel.city}, {hotel.state}</span>
                </div>
              </div>
              <Badge variant={hotel.isActive ? "default" : "secondary"}>
                {hotel.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="mt-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{hotel.averageRating}</span>
                <span className="text-muted-foreground">({hotel.totalReviews})</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                <span>{hotel.totalBookings} Bookings</span>
              </div>
            </div>
          </div>

          {showActions && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/hotelOwner/rooms">Manage Rooms</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to={`/hotelOwner/bookings?hotelId=${hotel.id}`}>Bookings</Link>
              </Button>
              {onEdit && (
                <Button variant="outline" onClick={() => onEdit(hotel)}>
                  <Pencil className="mr-2 size-4" />
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button variant="outline" className="text-destructive hover:text-destructive" onClick={() => onDelete(hotel.id)}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </Button>
              )}
              <Button variant="ghost" asChild>
                <Link to={`/hotelDetails/${hotel.id}`}>
                  <Eye className="mr-2 size-4" />
                  Preview
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
