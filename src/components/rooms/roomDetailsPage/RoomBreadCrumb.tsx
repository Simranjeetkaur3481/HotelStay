import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

type RoomBreadcrumbProps = {
  hotelId: string;
  hotelName: string;
  roomName: string;
};

export default function RoomBreadcrumb({ hotelId=1, hotelName="Pp", roomName="tt" }: RoomBreadcrumbProps) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <Link to="/" className="flex items-center gap-1 hover:text-primary">
        <Home className="h-4 w-4" />
        Home
      </Link>

      <ChevronRight className="h-4 w-4" />

      <Link to="/hotels" className="hover:text-primary">
        Hotels
      </Link>

      <ChevronRight className="h-4 w-4" />

      <Link to={`/hotels/${hotelId}`} className="hover:text-primary">
        {hotelName}
      </Link>

      <ChevronRight className="h-4 w-4" />

      <span className="font-medium text-foreground">{roomName}</span>
    </nav>
  );
}
